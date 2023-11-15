import { Navigate, Outlet, useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import Logout from "./Logout";

const RequireAuth = () => {
    const {auth} = useAuth();
    const location = useNavigate();
    const now = new Date();
    const token = JSON.parse(window.localStorage.getItem("accessToken"))

    return (
        auth?.username
        ? <Outlet />
        : token !== null && token?.expires > now.getTime()
        ? <Outlet />
        : <><Logout /> <Navigate to="/" /></>

    );
}
 
export default RequireAuth;