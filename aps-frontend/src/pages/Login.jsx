import { Box, Button, FormLabel, Heading, Input, Text, VStack } from "@chakra-ui/react";
import { useState } from "react";
import { Form, Link, Navigate, useNavigate } from "react-router-dom";
import api from "../services/api"

const Login = () => {

    const [username, setUsername] = useState();
    const [password, setPassword] = useState();
    const navigate = useNavigate();
    const now = new Date();

    const handleSubmit = async (e) => {
        e.preventDefault()
        const response = await api.post('/auth/token', {username: username, password: password}, {headers: {'Content-Type': 'application/x-www-form-urlencoded'}, withCredentials: true});
        console.log(response.data)
        const token = response.data.access_token;
        const expire = now.getTime() + 600000
        window.localStorage.setItem("accessToken", `{"value": "${token}", "expires": ${expire}}`);
        window.localStorage.setItem("usuario", `{"value": \"${username}\", "expires": ${expire}}`);
        navigate("/dashboard")
    }

    return (
        <Box align="center" m="auto" maxW={500} mt={200} border="1px solid gray" borderRadius={20} p={5} bg="gray.100">
            <Form onSubmit={handleSubmit}>
                <Heading>Insira seus dados</Heading>
                <VStack>
                    <FormLabel mt={5}>
                        Usuário:
                    </FormLabel>
                    <Input type="text" name="username" required onChange={(e) => setUsername(e.target.value)} bg="white" border="1px solid black" />
                    <FormLabel mt={5}>
                        Senha:
                    </FormLabel>
                    <Input type="password" name="password" required onChange={(e) => setPassword(e.target.value)} bg="white" border="1px solid black" />
                    <Button type="submit" mt={5} colorScheme="twitter">Fazer Login</Button>
                </VStack>
            </Form>
            <Text color="black">Não possui conta? <Link to="/cadastro">Crie sua conta</Link></Text>
        </Box>
    );
}
 
export default Login;