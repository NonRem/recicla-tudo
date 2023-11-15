import { Box, Card, CardBody, CardHeader, Heading, Text, VStack } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import api from "../services/api";

const Dashboard = () => {
    const user = JSON.parse(window.localStorage.getItem('usuario'))
    const token = JSON.parse(window.localStorage.getItem('accessToken'))
    const [resumo, setResumo] = useState()

    useEffect(() => {
        getResumo()
    }, [])

    async function getResumo() {
        const response = await api.get("/resumo", {headers: {'accept': 'application/json', 'Authorization': `Bearer ${token.value}`}, withCredentials: true})
        setResumo(response.data)
        console.log(resumo)
    }

    return (
        <Card maxW={"500px"} minH={"300px"} m="auto" mt="50px">
            <CardHeader>
                <Heading>Bem vindo de volta, {user.value}</Heading>
            </CardHeader>
            <CardBody>
                <VStack>
                    {resumo && <Text fontSize="1.5em">Ultima entrega: {resumo.ultima_entrega}</Text>}
                    {resumo && <Text fontSize="1.5em">Total de reciclagens: {resumo.total_reciclagens}</Text>}
                </VStack>
            </CardBody>
        </Card>
    );
}
 
export default Dashboard;