function Logout() {
    window.localStorage.removeItem("usuario");
    window.localStorage.removeItem("accessToken");
}
 
export default Logout;