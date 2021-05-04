import React, {useContext} from 'react';
import {Context} from "../../index";
import {observer} from "mobx-react-lite";


const LogOut = observer(() => {

    const {user} = useContext(Context)

    return (
        <div>
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
});

export default LogOut;