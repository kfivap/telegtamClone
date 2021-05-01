import React, {useContext} from 'react';
import {observer} from "mobx-react-lite";
import {Context} from "../../index";

const AuthPage = observer(() => {

    const {user} = useContext(Context)

    const clickHandler = ()=> {
        user.setIsAuth(true)
    }


    return (
        <div>
Auth Page <button onClick={clickHandler}> log in </button>
        </div>
    );
});

export default AuthPage;