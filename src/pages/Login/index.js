import React, {useState} from 'react';
import './style.css';
import Fieldset from 'components/Fieldset';
import Button from 'components/Button';
import Msg from 'components/Msg';
import {Link} from 'react-router-dom';
import {useDispatch } from 'react-redux';
import  api from 'services/api';
import {setAuthUser} from 'services/auth';

import logo from 'assets/images/logo.png';

function Login() {
  
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [msg, setMsg] = useState({message: '', type: ''});
    
    const dispatch = useDispatch();

    const login = async (e) => {
        e.preventDefault();
        
        if(!validate()){return};
        setIsLoading(true);
        try{
            const response = await api.post('/admin/auth', {email, password});
            const user = response.data;
            
            setAuthUser(user);
            dispatch({type: 'SET_USER_LOGGED', value: user});
            dispatch({type: 'SET_LOGGED', isLogged: true});
            setIsLoading(false);
            
        }catch(error){
            setIsLoading(false);
            if (error.response?.data.msg) {
                const msg = error.response.data.msg;
                setMsg({message:msg, type: 'error'});
                return;
              }
            
            setMsg({message: 'Falha de conexão.', type: 'error'});
        }
    }

    function validate(){
        if(!email){
            setMsg({message: 'Preencha o campo e-mail', type: 'warning'});
            return false;
        }
        if(!password){
            setMsg({message: 'Preencha sua senha.', type: 'warning'});
            return false;
        }
        return true;
    }

    return (
        <div className="paginaLogin">
            
            <div className="areaMarca">
                <img src={logo} alt="Phast" className="animated fadeInLeft"/>
            </div>

            <div className="areaLogin">

                <div className="formLogin animated fadeIn">
                
                    <h1>Login</h1>  

                    <form onSubmit={login}>
                        <Fieldset label="E-mail" type="email" placeholder="Digite o seu e-mail" autofocus={true} handleOnChange={(e) => setEmail(e.target.value)}/>
                        <Fieldset label="Senha" type="password" placeholder="Digite a sua senha" handleOnChange={(e) => setPassword(e.target.value)} />
                    

                    { msg && <Msg type={msg.type} message={msg.message} />}
                    
                    <div className="areaSubmit">
                        <Link className="link" to="/lembrar_senha">Esqueci minha senha</Link>
                        <Button label="Acessar" handleOnClick={login} isLoading={isLoading} handleType='submit' />
                    </div>
                    </form>

                </div>

            </div>
        </div>
    )
}

export default Login;