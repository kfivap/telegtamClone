import React, {useContext, useState} from 'react';
// import {Button, Card, Container, Form, Row} from "react-bootstrap";
// import {NavLink, useLocation, useHistory} from "react-router-dom";
// import {LOGIN_ROUTE, REGISTRATION_ROUTE} from "../utils/consts";
// import {login, registration} from "../http/userAPI";
import {observer} from "mobx-react-lite";
import {Context} from "../../index";


const Auth = observer(() => {
    const {user} = useContext(Context)
    // const location = useLocation()
    // const history = useHistory()
    // const isLogin = location.pathname === LOGIN_ROUTE
    const isLogin = false
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [nick, setNick] = useState('')

    const click = async () => {
        try {
            let data
            if (isLogin) {
              //  data = await login(email, password)
            } else {
                // data = await registration(email, password, nick)
                console.log(data)
            }

            // user.setIsAuth(true)
            // history.push('/')
            // window.location.reload();
        } catch (e) {
            // alert(e.response.data.message)
            alert(e)
        }
    }

    return (
        <div
            className={'d-flex justify-content-center align-items-center'}
            style={{height: window.innerHeight - 54}}
        >
            <div style={{width: 600}} className={'p-5'}>
                <h2 className={'m-auto'}>

                    {isLogin ? "Авторизация" : "Регистрация"}
                </h2>
                <form className={'d-flex flex-column'}>
                    {isLogin ?
                        null :
                        <div><span className='ml-2'>Nickname</span>
                            <input
                                className={'mb-3'}
                                placeholder={"Type your nick"}
                                value={nick}
                                onChange={e => setNick(e.target.value)}

                            /></div>
                    }
                    <div className='mt-2'><span className='ml-2'>Email</span>
                    <input
                        className={'mb-3'}
                        placeholder={"Type your email"}
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                    />
                    </div>

                    <div><span className='ml-2'>Password</span>
                    <input
                        className={'mb-3'}
                        placeholder={"Type your password"}
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        type={'password'}
                    /></div>

                </form>
                <span className="d-flex justify-content-between mt-3 pl-3 pr-3">

                    {isLogin ?
                        <div>
                            Don`t have account?&nbsp;
                            {/*<a to={REGISTRATION_ROUTE}>Register</a>*/}
                        </div>
                        :
                        <div>
                            Already have account?&nbsp;
                            {/*<a to={LOGIN_ROUTE}>Login</a>*/}
                        </div>

                    }


                    <button
                        variant={'outline-success'}
                        onClick={click}
                    >
                        {isLogin ? 'Login' : "Register"}
                    </button>
                </span>
            </div>
        </div>
    );
})

export default Auth;