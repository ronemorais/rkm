import React, {useState} from 'react';

import Fieldset from 'components/Fieldset';
import Button from 'components/Button';
import Msg from 'components/Msg';
import {Link } from 'react-router-dom';

import  api from 'services/api';

import logo from 'assets/images/logo.png';


export default function LembrarSenha() {

   
    const [email, setEmail] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [msg, setMsg] = useState({message: '', type: ''});

    const sendNewPassword = async (e) => {
        e.preventDefault();

        if(!validate()){return};
        setIsLoading(true);
        try{
            const response = await api.post('/auth/remember_password', {email});
            setIsLoading(false);
            setEmail('');
            setMsg({message:response?.msg, type: 'success'});
        }catch(error){
            console.log(error)
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
        return true;
    }
    
    return (
        <div className="paginaLogin">
            
            <div className="areaMarca">
                <img src={logo} alt="Phast" className="animated fadeInLeft"/>
            </div>

            <div className="areaLogin">

                <div className="formLogin animated fadeIn">
                
                    <h1>Esqueci minha senha</h1>  

                    <p>Digite o seu e-mail no campo abaixo que enviaremos uma <b>nova senha</b> para você.</p>

                    <form onSubmit={sendNewPassword}>
                        <Fieldset label="E-mail" type="email" placeholder="Digite o seu e-mail" autofocus={true} handleValue={email} handleOnChange={(e) => setEmail(e.target.value)}/>

                        { msg && <Msg type={msg.type} message={msg.message} />}

                        <div className="areaSubmit">
                            <Link className="link" to="/">Voltar</Link>
                            <Button label="Enviar" handleOnClick={sendNewPassword} isLoading={isLoading} handleType='submit' />
                        </div>
                    </form>


                </div>

            </div>
        </div>

    )
}