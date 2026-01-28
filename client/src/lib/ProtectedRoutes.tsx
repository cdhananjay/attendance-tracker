import {useEffect, useState} from "react";
import axios from "axios";
import {Navigate, Outlet} from "react-router-dom";

const ProtectedRoutes = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    useEffect(() => {
        (async () => {
            try {
                const {data} = await axios.get("/api/auth/");
                if (data.ok) setIsLoggedIn(true);
                else alert(data.message);
            }
            catch (e) {
                console.log(e);
            }
        })()
    }, []);
    return isLoggedIn ? <Outlet/> : <Navigate to={"/login"}/>
};

export default ProtectedRoutes;