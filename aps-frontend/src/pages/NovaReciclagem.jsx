import { Box, Button, ButtonGroup, Editable, EditableInput, EditablePreview, FormLabel, HStack, Heading, Input, Select, Spacer, Tab, TabList, TabPanel, TabPanels, Tabs, Text, VStack } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import api from "../services/api";
import { Form, useNavigate } from "react-router-dom";

const NovaReciclagem = () => {
    
    const [local, setLocal] = useState();
    const [locais, setLocais] = useState();
    const [registro, setRegistro] = useState({});
    const [itens, setItens] = useState([{material: "", peso: 0, medida: ""}]);
    const token = JSON.parse(window.localStorage.getItem('accessToken'));
    const navigate = useNavigate();

    useEffect(() => {
        getLocais()
    }, [])

    async function getLocais() {
        const response = await api.get("/local", {headers: {'accept': 'application/json', 'Authorization': `Bearer ${token.value}`}, withCredentials: true})
        setLocais(response.data)
    }
    
    async function handleSubmit(e) {
        e.preventDefault()
        let obj = {}
        for (let index = 0; index < itens.length; index++) {
            let key = itens[index]["material"];
            obj[key] = `${itens[index]["peso"]}${itens[index]["medida"]}`;
        }
        console.log({itens: registro, id_local: obj})
        const response = await api.post("/recicla/add/", {itens: obj, id_local: local}, {headers: {'accept': 'application/json', 'Authorization': `Bearer ${token.value}`, 'Content-Type': 'application/json'}, withCredentials: true})        
        if(response.status === 200) {
            navigate("/reciclagem")
        }
    }

    function handleChange(e, i) {
        const field = e.target.name;
        const novosItens = [...itens];
        novosItens[i][field] = e.target.value;
        setItens(novosItens);
    }

    function handleDelete(i) {
        const novosItens = [...itens];
        novosItens.splice(i, 1);
        setItens(novosItens);
    }
    
    function handleAdd() {
        setItens([...itens, {material: "", peso: 0, medida: ""}]);
    }
    
    return (
                    <Box maxW={800} bg="green.500" p={20} pt={0} pb={5} mx={"auto"} mt={10} borderRadius={15} align="center">
                        <Form onSubmit={handleSubmit}>
                            <Heading pt={10} mb={5}>Insira os dados da reciclagem:</Heading>
                            <HStack>
                                <Text fontSize="lg">Material</Text>
                                <Spacer />
                                <Text fontSize="lg">Quantidade</Text>
                                <Spacer />
                                <Text fontSize="lg" mr={20}>Peso</Text>
                                <Spacer />
                            </HStack>
                            <VStack spacing={5}>
                                {itens && itens.map((item, index) =>
                                    <HStack key={index}>
                                        <Editable ml={0} minW={40} maxW={40} minH={10} fontSize="lg" bg="white" borderRadius={8} defaultValue="Material">
                                            <EditablePreview />
                                            <EditableInput required name="material" value={item.material} type="text" onChange={(e) => handleChange(e, index)}/>
                                        </Editable>
                                        <Spacer />
                                        <Input type="number" bg="white" required name="peso" value={item.peso} onChange={(e) => handleChange(e, index)}/>
                                        <Spacer />
                                        <Select placeholder="-" mr={20} maxW={20} bg="white" required defaultValue="kg" name="medida" value={item.medida} onChange={(e) => handleChange(e, index)}>
                                            <option value="kg">Kg</option>
                                            <option value="g">g</option>
                                        </Select>
                                        <Button colorScheme="red" onClick={() => handleDelete(index)}>X</Button>    
                                    </HStack>)}
                            <FormLabel>
                                Local:
                            </FormLabel>
                            <Select placeholder="Local - CEP" bg="white" required name="local" onChange={(e) => setLocal(e.target.value)}>
                                {locais && locais.map(opt_local =>
                                    <option value={opt_local.id}>{opt_local.nome} - {opt_local.cep}</option>)}
                            </Select>
                            </VStack>
                            <ButtonGroup gap={4}>
                                <Button colorScheme="yellow" onClick={() => handleAdd()} px={10} py={5} mt={10}>Novo material</Button>
                                <Button type="submit" colorScheme="twitter" px={10} py={5} mt={10}>Salvar</Button>
                            </ButtonGroup>
                        </Form>
                    </Box>
    )
}
 
export default NovaReciclagem;