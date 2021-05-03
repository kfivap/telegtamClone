import React, {useContext} from 'react';
import './Navbar.css'
import {observer} from "mobx-react-lite";
import LeftNavbar from "./LeftNavbar";
import {Context} from "../../index";

const NavBar = observer(() => {

const {user} =useContext(Context)

    return (
        <div className={'navbar'}>

            <h2>{user.userName}</h2>

            <LeftNavbar/>

        </div>
    );
})

export default NavBar;