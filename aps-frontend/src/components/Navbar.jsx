import { Button, Flex, HStack, Heading, Spacer, Text } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import Logout from "./Logout";

const Navbar = () => {
    const navigate = useNavigate()
    const usuario = JSON.parse(window.localStorage.getItem("usuario"))

    function redirect() {
        Logout()
        navigate("/")
    }

    return (
        <Flex as="nav" alignItems="center" bg={"gray.100"} p="10px" borderBottom="1px solid black">
            <Heading ml={"10px"}>Recicla Tudo</Heading>
            <Spacer />

            <HStack spacing={20}>
                <Text>{usuario.value}</Text>
                <Button onClick={redirect} colorScheme="red" >Logout</Button>
            </HStack>
        </Flex>
    );
}
 
export default Navbar;