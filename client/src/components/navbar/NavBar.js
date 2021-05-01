import React, {useContext} from 'react';
import './Navbar.css'
import {Context} from "../../index";
import {observer} from "mobx-react-lite";
const NavBar = observer(() => {

    const {user} = useContext(Context)

    return (
        <div className={'navbar'}>
            Navbar
            <button
                onClick={()=>
                {
                    user.setIsAuth(false)
                    localStorage.removeItem('token')
                    localStorage.removeItem('userId')
                }

                }
            >Log out</button>
        </div>
    );
})

export default NavBar;