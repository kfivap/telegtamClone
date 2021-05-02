import React, {} from 'react';
import './Navbar.css'
import {observer} from "mobx-react-lite";
import LeftNavbar from "./LeftNavbar";

const NavBar = observer(() => {



    return (
        <div className={'navbar'}>
            Navbar
            <LeftNavbar/>

        </div>
    );
})

export default NavBar;