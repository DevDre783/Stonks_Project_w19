// import { FaArrowAltCircleRight } from "react-icons/fa";
import GetStartedModal from '../auth/SignUp';
import LoginFormModal from '../auth/Login';
import * as sessionActions from "../../store/session"
import { Redirect } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import './index.css'
import { useEffect } from 'react';

const Splash = () => {
    const user = useSelector(state => state.session.user);
    const dispatch = useDispatch();

    const handleClick = async (e) => {

        console.log("hello")

        // const email = 'demo@aa.io';
        // const password = 'password';

        await dispatch(sessionActions.login('demo@aa.io', 'password'))
    }

    return (
        <div className='container'>
            <div className='content'>
                <h1> The Stonks </h1>
                <h3>Investing for everyone</h3>
            </div>

            {user ? null : <div className='buttonWrapper'>
                <LoginFormModal />
                <GetStartedModal />
                <button onClick={handleClick} className='authButton'>Demo</button>
            </div>}
        </div>
    );
};

export default Splash;
