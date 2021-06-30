import React, { useLayoutEffect, useState} from 'react';
import {useSelector} from 'react-redux';
import { isAuthenticated } from 'services/auth';
import Private from './private';
import Public from './public';

export default function Routes() {
    const logged = useSelector(state => state.loginState.isLogged);
    const [ isLogged, setIsLogged] = useState(false);

    useLayoutEffect(() => {
        async function isAtuh(){
            const auth = await isAuthenticated();
            setIsLogged(auth);
        }
        isAtuh();
    }, [logged, isLogged])
  
    return isLogged ? <Private /> : <Public />;
        
  }
  

