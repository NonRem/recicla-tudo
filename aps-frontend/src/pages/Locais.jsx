import { Box, Button, FormLabel, HStack, Heading, Input, Tab, TabList, TabPanel, TabPanels, Table, TableCaption, Tabs, Tbody, Td, Text, Th, Thead, Tr } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { Form } from "react-router-dom"
import api from "../services/api"
import axios from "axios";

const Locais = () => {
    const token = JSON.parse(window.localStorage.getItem('accessToken'))
    const [locais, setLocais] = useState();
    const [dados, setDados] = useState();
    const [cep, setCep] = useState();
    const [logradouro, setLogradouro] = useState();
    const [cidade, setCidade] = useState();
    const [uf, setUf] = useState();
    const [nome, setNome] = useState();
    const [numero, setNumero] = useState();
    const viacep = axios.create({baseURL: "https://viacep.com.br/ws"});

    useEffect(() => {
        getLocais()
    },[cidade])

    async function getCEP(cep) {
        const response = await viacep.get(`${cep}/json`)
        setLogradouro(response.data.logradouro);
        setCidade(response.data.localidade);
        setUf(response.data.uf);
    }

        async function mostrarMapa(cidade, logradouro, uf, numero) {

        }

    async function getLocais() {
        const response = await api.get("/local", {headers: {'accept': 'application/json', 'Authorization': `Bearer ${token.value}`}, withCredentials: true})
        setLocais(response.data)
    }

    async function handleSubmit() {
        const response = await api.post("/local/add", {nome: nome, cep: cep, cidade: cidade, logradouro: logradouro, uf: uf, numero: numero}, {headers: {'accept': 'application/json', 'Authorization': `Bearer ${token.value}`, 'Content-Type': 'application/json'}, withCredentials: true})
        console.log(response.data)
    }

    return (
        <Tabs>
            <TabList>
                <Tab>Locais registrados</Tab>
                <Tab>Adicionar Local</Tab>
            </TabList>

            <TabPanels>
                <TabPanel>
                    <Table bg="gray.300">
                        <TableCaption>Lista de locais salvos pelos usuários</TableCaption>
                        <Thead>
                            <Tr>
                                <Th>ID</Th>
                                <Th>Nome</Th>
                                <Th>CEP</Th>
                                <Th>Logradouro</Th>
                                <Th>Cidade</Th>
                                <Th>UF</Th>
                                <Th>Número</Th>
                                <Th></Th>
                            </Tr>    
                        </Thead>    
                        <Tbody>
                            {locais && locais.map(local => 
                                <Tr>
                                    <Td>{local.id}</Td>
                                    <Td>{local.nome}</Td>
                                    <Td>{local.cep}</Td>
                                    <Td>{local.logradouro}</Td>
                                    <Td>{local.cidade}</Td>
                                    <Td>{local.uf}</Td>
                                    <Td>{local.numero}</Td>
                                    <Td><Button colorScheme="blue" onClick={() => mostrarMapa(local.cidade, local.logradouro, local.uf, local.numero)}>Ver no mapa</Button></Td>
                                </Tr>)}
                        </Tbody>
                    </Table>

                    

                </TabPanel>

                <TabPanel>
                    <Box m="auto" maxW="500px" bg="green.500" p="20px" borderRadius="15px">
                        <Form onSubmit={handleSubmit}>
                                <Heading mb="10px">Informações do local</Heading>
                                <FormLabel m="5px">Nome do local:</FormLabel>
                                <Input bg="whitesmoke" type="text" name="nome" required onChange={(e) => setNome(e.target.value)} />

                                <FormLabel m="5px">CEP:</FormLabel>
                                <HStack>
                                    <Input bg="whitesmoke" type="number" name="cep" required onChange={(e) => setCep(e.target.value)} />
                                    <Button onClick={() => getCEP(cep)}>Procurar</Button>
                                </HStack>

                                <FormLabel m="5px">Cidade:</FormLabel>
                                <Input bg="whitesmoke" value={cidade} name="cidade" required disabled/>

                                <FormLabel m="5px">UF:</FormLabel>
                                <Input bg="whitesmoke" value={uf} name="uf" required disabled/>
                                
                                <FormLabel m="5px">Logradouro:</FormLabel>
                                <Input bg="whitesmoke" value={logradouro} name="logradouro" required disabled/>
                                
                                <FormLabel m="5px">Número:</FormLabel>
                                <Input bg="whitesmoke" type="number" nome="numero" required onChange={(e) => setNumero(e.target.value)} />

                                <Button type="submit" mt="10px" p="15px" >Salvar endereço</Button>
                        </Form>
                    </Box>
                </TabPanel>
            </TabPanels>
        </Tabs>
    );
}
 
export default Locais;