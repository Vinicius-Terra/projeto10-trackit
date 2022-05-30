import {useState} from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import UserContext from "../contexts/UserContext";
import Login from "./Login";
import SingUP from "./SingUp"
import Habits from "./Habits";
import Hoje from "./Hoje";

export default function App () {

    const [userImage, setUserImage] = useState(null);

    

    return (
        <>
        <UserContext.Provider value={{ userImage, setUserImage}}>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Login />} />
                    <Route path="/cadastro" element={<SingUP />} />
                    <Route path="/habitos" element={<Habits />} />
                    <Route path="/hoje" element={<Hoje />} />
                </Routes>
            </BrowserRouter>
        </UserContext.Provider>
        </>
    )
}