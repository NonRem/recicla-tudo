import { Grid, GridItem } from "@chakra-ui/react";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar"
import Navbar from "./Navbar"


const Layout = () => {
    return (
        <Grid templateColumns={"repeat(6, 1fr)"} bg="gray.100">
            <GridItem colSpan={{base:6, lg:2, xl:1}} bg={"green.700"} h="100vh">
                <Sidebar />
            </GridItem>
            <GridItem colSpan={{base:6, lg:4, xl:5}}>
                <Navbar />
                <Outlet />
            </GridItem>
        </Grid>
    );
}
 
export default Layout;