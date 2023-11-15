import { Accordion, AccordionButton, AccordionItem, AccordionPanel, Box, Button, ButtonGroup, Editable, EditableInput, EditablePreview, HStack, Heading, Input, Select, Spacer, Tab, TabList, TabPanel, TabPanels, Tabs, Text, VStack } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import api from "../services/api";
import { Form } from "react-router-dom";

const Reciclagens = () => {
    
    const [registro, setRegistro] = useState({});
    const [itens, setItens] = useState([{material: "", peso: 0, medida: ""}]);
    const [reciclagens, setReciclagens] = useState();
    const token = JSON.parse(window.localStorage.getItem('accessToken'))

    useEffect(() => {
        getReciclagens()
    }, [])

    async function getReciclagens() {
        const response = await api.get("/recicla/", {headers: {'accept': 'application/json', 'Authorization': `Bearer ${token.value}`}, withCredentials: true})
        setReciclagens(response.data)
    }


    return (
            <Box maxW={800} m="auto" mt={50}>
                <Accordion>
                    {reciclagens && reciclagens.map(reciclagem => 
                        <AccordionItem border="1px solid black">
                            <AccordionButton bg="gray.300">
                                <HStack spacing={4}>
                                    <Text>Local: {reciclagem.posto.nome}</Text>
                                    <Text>Endereço: {reciclagem.posto.cep} - {reciclagem.posto.numero}</Text>
                                    <Text>Data: {reciclagem.entrega_data}</Text>
                                </HStack>
                            </AccordionButton>
                            <AccordionPanel bg={"green.100"}>
                                {reciclagem && Object.keys(reciclagem.itens).map(item =>
                                    <Text ml={4}>{item}: {reciclagem.itens[item]}</Text>)}
                            </AccordionPanel>
                        </AccordionItem>)}
                </Accordion>
            </Box>
    );
}
 
export default Reciclagens;