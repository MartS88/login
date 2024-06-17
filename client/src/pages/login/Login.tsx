import React, {ChangeEvent, useContext, useEffect, useState} from 'react';
import classes from './Login.module.scss';
import axios from 'axios';
import {AuthContext} from '@/components/context';
import {useNavigateHandler} from "@/utils/useCustomNavigate";
import Layout from "@/components/layout/Layout";
import Loader from '@/components/loader/Loader';
import PopUp from "@/pages/login/popup/PopUp";
import MyButton from '@/components/ui/button/MyButton';
import {AiOutlineUser,} from 'react-icons/ai';
import {MdPassword} from "react-icons/md";


const Login = () => {


    const {isAuth, setIsAuth, isLoading, setLoading} = useContext(AuthContext);
    const navigateHandler = useNavigateHandler();

    const [user, setUser] = useState<string>('');
    const [userError, setUserError] = useState<string>('Username  is required*');
    const [userDirty, setUserDirty] = useState<boolean>(false);

    const [password, setPassword] = useState<string>('');
    const [passwordError, setPasswordError] = useState<string>('Password is required*');
    const [passwordDirty, setPasswordDirty] = useState<boolean>(false);

    const [activeForm, setActiveForm] = useState<boolean>(false);
    const [count, setCount] = useState<number | undefined>(undefined);
    const [sendButtonDisabled, setSendButtonDisabled] = useState<boolean>(false);
    const [errorMsg, setErrorMsg] = useState<string>('');
    const [popUpActive, setPopUpActive] = useState<boolean>(false);


    const userHandler = (e: ChangeEvent<HTMLInputElement>) => {
        const usernameRegex = /^user\d+$/;
        const newValue = e.target.value;
        setUser(newValue);


        if (!usernameRegex.test(newValue)) {
            setUserError('Username must be user followed by number*');
        } else {
            setUserError('');
        }
    };

    const passwordHandler = (e: ChangeEvent<HTMLInputElement>) => {
        const newValue = e.target.value
        setPassword(newValue)


        if (newValue !== 'password') {
            setPasswordError('Password must always be "password"');

        } else {
            setPasswordError('');
        }
    };




    const blurHandler = (e: React.FocusEvent<HTMLInputElement>) => {
        switch (e.target.name) {
            case  'user' :
                setUserDirty(true);

                break;
            case 'password' :
                setPasswordDirty(true);
                break;

        }
    };
    useEffect(() => {
        if (userError.length > 0 || passwordError.length > 0) {
            setActiveForm(false);
        } else {
            setActiveForm(true);
        }

    }, [userError, passwordError]);

    const loginHandler = async () => {
        try {
            const body = {
                username: user,
                password: password,
            }
            const response = await axios.post('http://localhost:5000/auth/ru/data/v3/testmethods/docs/login', body)
            setLoading(true);

            if (response.data.error) {
                setTimeout(() => {
                    setErrorMsg(response.data.error)
                    setLoading(false)
                    setPopUpActive(true)
                }, 1000)
            }

            if (response.data.success && response.data.user.token) {
                setTimeout(() => {
                    setLoading(false)
                    const token = response.data.user.token;
                    localStorage.setItem('token', token);
                    setIsAuth(true)
                    navigateHandler('/main')
                    return response
                }, 1000)
            }
            if (!response.data.success) {
                setTimeout(() => {
                    setErrorMsg(response.data.error)
                    setLoading(false)
                    setPopUpActive(true)
                }, 1000)

            }
            return response


        } catch (error: any) {
            console.log(error)
            setPopUpActive(true)
            setErrorMsg(error.message)
        }
    }


    return (
        <Layout>
            {isLoading ? (
                <div className={classes.loader}><Loader width={'70'} height={'70'} color="gray"/></div>
            ) : (
                <div className={classes.login}>

                    <div>
                        <div className={classes.block}>
                        <span className={classes.info}>
                           Please enter the user and password to log
                        in successfully.</span>
                        </div>

                        <div className={classes.block}>

                            <label>
                                <AiOutlineUser size={20}/>
                                Username
                            </label>
                            <div
                                className={`${classes.error} ${userError && userDirty && classes.visible}`}>{userError}</div>

                            <div className={classes.input_wrap}>
                                <input
                                    type="text"
                                    name="user"
                                    autoComplete="off"
                                    autoCorrect="off"
                                    maxLength={15}
                                    value={user}
                                    onBlur={e => blurHandler(e)}
                                    onChange={userHandler}
                                />

                            </div>
                        </div>

                        <div className={classes.block}>

                            <label><MdPassword size={20}/> Password</label>

                            <div
                                className={`${classes.error} ${passwordError && passwordDirty && classes.visible}`}>{passwordError}</div>

                            <input
                                type={userError || user.length === 0 ? undefined : 'text'}
                                name="password"
                                autoComplete="off"
                                autoCorrect="off"
                                maxLength={12}
                                value={userError || user.length === 0 ? '' : password}
                                onBlur={e => blurHandler(e)}
                                onChange={userError || user.length === 0 ? undefined : passwordHandler}
                                className={userError || user.length === 0 ? classes.disabled : ''}
                            />
                        </div>


                        <div className={classes.button_block}>
                            <MyButton onClick={loginHandler} disabled={!activeForm}>Log in</MyButton>
                        </div>

                        <div className={classes.button}>
                            <MyButton onClick={() => navigateHandler('/home')}>Back to menu</MyButton>
                        </div>

                    </div>


                    {popUpActive &&
                        <div className={classes.popup_error}>
                            <PopUp errorMsg={errorMsg} setErrorMsg={setErrorMsg} setPopUpActive={setPopUpActive}/>
                        </div>
                    }

                </div>
            )}
        </Layout>

    );
};


export default Login;
