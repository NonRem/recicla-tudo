import { Box, Button, FormLabel, Heading, Input, Text, VStack } from "@chakra-ui/react";
import { useState } from "react";
import { Form, Link, useNavigate } from "react-router-dom";
import api from "../services/api"

const Login = () => {

    const [nome, setNome] = useState();
    const [senha, setSenha] = useState();
    const [login, setLogin] = useState();
    const [err, setErr] = useState("");
    const navigate = useNavigate();


    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            console.log(login)
            console.log(senha)
            console.log(nome)
            const response = await api.post('/usuario/registro', {"nome": nome, "senha": senha, "login": login}, {headers: {'accept': 'application/json', 'Content-Type': 'application/json'}, withCredentials: true});
            if(response.status === 200) {
                navigate("/login")
            }
        }
        catch(err) {
            if(!err.response?.status === 400) {
                setErr("Usuário já existente.")
            }
        }
    }

    return (
        <Box align="center" m="auto" maxW={500} mt={200} border="1px solid gray" borderRadius={20} p={5} bg="gray.100">
            <Form onSubmit={handleSubmit}>
                <Heading>Insira seus dados para cadastro</Heading>
                <VStack>
                    <FormLabel mt={5}>
                        Nome:
                    </FormLabel>
                    <Input type="text" name="nome" required onChange={(e) => setNome(e.target.value)} bg="white" border="1px solid black" />
                    <FormLabel mt={5}>
                        Login:
                    </FormLabel>
                    <Input type="text" name="login" required onChange={(e) => setLogin(e.target.value)} bg="white" border="1px solid black" />
                    <FormLabel mt={5}>
                        Senha:
                    </FormLabel>
                    <Input type="password" name="senha" required onChange={(e) => setSenha(e.target.value)} bg="white" border="1px solid black" />
                    <Button type="submit" mt={5} colorScheme="twitter">Fazer Cadastro</Button>
                    <Text>Já possui conta? <Link to="/"> Fazer login</Link></Text>
                    {err !== "" && <Text>{err}</Text>}
                </VStack>
            </Form>
        </Box>
    );
}
 
export default Login;