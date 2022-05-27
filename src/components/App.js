import {useState} from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import UserContext from "../contexts/UserContext";
import Login from "./Login";
import SingUP from "./SingUp"
import Habits from "./Habits";

export default function App () {

    const [userImage, setUserImage] = useState(null);
    const [token, setToken] = useState(null);

    

    return (
        <>
        <UserContext.Provider value={{ userImage, setUserImage, token, setToken }}>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Login />} />
                    <Route path="/cadastro" element={<SingUP />} />
                    <Route path="/habitos" element={<Habits />} />
                </Routes>
            </BrowserRouter>
        </UserContext.Provider>
        </>
    )
}