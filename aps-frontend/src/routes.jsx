import { createBrowserRouter, createRoutesFromElements, Route } from "react-router-dom"
import Login from "./pages/Login"
import Cadastro from "./pages/Cadastro"
import Reciclagens from "./pages/Reciclagens"
import NovaReciclagem from "./pages/NovaReciclagem"
import Locais from "./pages/Locais"
import Dashboard from "./pages/Dashboard"
import RequireAuth from "./components/RequireAuth";
import Layout from "./components/Layout";

const router = createBrowserRouter(
    createRoutesFromElements(
        <Route path="/">
            <Route index exact element={<Login />} />
            <Route path="cadastro" exact element={<Cadastro />} />
            <Route element={<RequireAuth />}>
                <Route element={<Layout />}>
                    <Route path="dashboard" element={<Dashboard />} />
                    <Route path="reciclagem" element={<Reciclagens />} />
                    <Route path="novareciclagem" element={<NovaReciclagem />} />
                    <Route path="locais" element={<Locais />} />
                </Route>
            </Route>
        </Route>
    )
)

export default router;