import React, {useState} from 'react';
import Page from 'components/Templates/Page';

import Msg from 'components/Msg';
import Fieldset from 'components/Fieldset';
import Button from 'components/Button';
import api from 'services/api';
import './style.css';

export default function UpdatePassword() {
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [verifyPassword, setVerifyPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [msg, setMsg] = useState({message: '', type: ''});
    
    const editar = async (e) => {
        e.preventDefault();

        if(!validate() && !isLoading){return};

        setIsLoading(true);

        try{
            await api.put('/users/update_password', {senhaAtual: currentPassword, novaSenha: newPassword});
            setNewPassword('');
            setCurrentPassword('');
            setVerifyPassword('');
            setIsLoading(false);
            setMsg({message:'Senha Alterada com Sucesso', type: 'success'});

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
        if(!currentPassword){
            setMsg({message: 'Digite sua senha atual.', type: 'warning'});
            return false;
        }

        if(!newPassword){
            setMsg({message: 'Digite sua nova senha.', type: 'warning'});
            return false;
        }

        if(newPassword.length < 6){
            setMsg({message: 'Sua nova senha deve ter no mínimo 6 caracteres.', type: 'warning'});
            return false;
        }

        if(!verifyPassword){
            setMsg({message: 'Confirme sua nova senha', type: 'warning'});
            return false;
        }

        if(verifyPassword !== newPassword){
            setMsg({message: 'As senhas digitadas não conferem.', type: 'warning'});
            return false;
        }

        return true;
    }

    return (
        <Page name="update-password">
            <h1>Alterar Senha</h1>
            <div className="container areaInfo areaForm">
                
                <form onSubmit={editar} className="informacoes">
                    <Fieldset label="Senha Atual" type="password" placeholder="Digite sua senha atual" autofocus={true} handleValue={currentPassword} handleOnChange={(e) => setCurrentPassword(e.target.value)}/>
                    <Fieldset label="Nova Senha" type="password" placeholder="Digite sua nova senha (min. 6 caracteres)" autofocus={true} handleValue={newPassword} handleOnChange={(e) => setNewPassword(e.target.value)}/>
                    <Fieldset label="Confirmar Senha" type="password" placeholder="Confirme sua nova senha" autofocus={true} handleValue={verifyPassword} handleOnChange={(e) => setVerifyPassword(e.target.value)}/>
                    { msg.message ? <Msg type={msg.type} message={msg.message} /> : null}
                    <div className="areaBtn">
                        <Button label="Alterar" isLoading={isLoading} handleOnClick={editar} handleType="submit" />
                    </div>
                </form>
            </div>




       </Page>
    )
}
