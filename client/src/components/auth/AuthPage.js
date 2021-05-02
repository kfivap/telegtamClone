import React, {useContext} from 'react';
import {observer} from "mobx-react-lite";
import {Context} from "../../index";
import './Auth.css'
import {login, registration} from "../../http/userAPI";

const {useState} = require("react");

const AuthPage = observer(() => {

    const {user} = useContext(Context)
    const [isRegistration, setRegistration] = useState(false)

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [nick, setNick] = useState('')

    const AuthorizationButton = async () => {
        let data
        if(!isRegistration){
            data = await login(email, password)
        } else {
            data  = await registration(email, password, nick)
        }
        console.log(data)
        // console.log(email, password, nick)
        user.setIsAuth(true)
        window.location.reload()
    }


    const toggleRegistration = () => {
        setRegistration(prevState => !prevState)
    }

    return (
        <div className={'authPage'}>

<div className={'header'}>
<h1>Welcome!</h1>
</div>
            <div className='authCard'>
                <h2>{
                    isRegistration?
                        'Registration'
                        :
                        "Authorization"
                }</h2>
            <div>
                <input
                    className='authInput'
                    placeholder={'email'}
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                />
            </div>

            {
                isRegistration ?

                    <div>
                        <input
                            placeholder={'userName'}
                            className='authInput'
                            value={nick}
                            onChange={e => setNick(e.target.value)}
                        />
                    </div>
                    :
                    null
            }


            <div>
                <input
                    placeholder={'password'}
                    type='password'
                    className='authInput'
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                />
            </div>

            <div>
                <button onClick={AuthorizationButton}
                className='button'
                >
                    <span>
                    {
                        isRegistration ?
                            'Register'
                            :
                            "Login"
                    }
                    </span>
                </button>
            </div>

            <div>
                {
                    isRegistration ?

                        <span>
                            Already have an account?
                            <span
                                className='appLink noselect'
                                onClick={toggleRegistration}
                            >Login</span>
                        </span>
                    :
                        <span>
                            Don`t have an account?
                            <span
                                className='appLink noselect'
                                onClick={toggleRegistration}
                            >Register</span>
                        </span>



                }
            </div>
            </div>

        </div>
    );
});

export default AuthPage;