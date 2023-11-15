import { List, ListItem } from "@chakra-ui/react";
import { NavLink } from "react-router-dom";

const Sidebar = () => {
    return (
        <List>
            <ListItem color="whitesmoke">
                <NavLink to="/dashboard">
                    Dashboard
                </NavLink>
            </ListItem>
            <ListItem color="whitesmoke">
                <NavLink to="/locais">
                    Locais
                </NavLink>
            </ListItem>
            <ListItem color="whitesmoke">
                <NavLink to="/reciclagem">
                    Reciclagens realizadas
                </NavLink>
            </ListItem>
            <ListItem color="whitesmoke">
                <NavLink to="/novareciclagem">
                    Registrar reciclagem
                </NavLink>
            </ListItem>
        </List>
    );
}
 
export default Sidebar;