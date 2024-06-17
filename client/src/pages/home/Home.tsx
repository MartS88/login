import React from 'react';
import classes from './Home.module.scss';
import Layout from "@/components/layout/Layout";
import MyButton from "@/components/ui/button/MyButton";
import {useNavigateHandler} from "@/utils/useCustomNavigate";


const Home = () => {

    const navigateHandler = useNavigateHandler();

    return (
        <Layout>
            <div className={classes.home}>
                <h1>Welcome</h1>

                <div className={classes.buttons_block}>
                    <MyButton onClick={() => navigateHandler('/login')}>Log in</MyButton>
                    <MyButton onClick={() => navigateHandler('/signup')}>Sign up</MyButton>
                </div>
            </div>

        </Layout>
    )
        ;
};

export default Home;