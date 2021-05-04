import React, {useContext} from 'react';
import './Navbar.css'
import {observer} from "mobx-react-lite";
import LogOut from "./LogOut";
import {Context} from "../../index";
import EditProfile from "./EditProfile";

const NavBar = observer(() => {

const {user} =useContext(Context)

    return (
        <div className={'navbar'}>

            <h2>{user.userName}</h2>
<EditProfile/>
            <LogOut/>

        </div>
    );
})

export default NavBar;