import React, {useState} from 'react';
import ImageUploading from 'react-images-uploading';
import { Switch } from 'react-switch-input';
import Page from 'components/Templates/Page';

import Msg from 'components/Msg';
import Avatar from 'components/Avatar';
import BtnLink from 'components/BtnLink';
import Fieldset from 'components/Fieldset';
import Button from 'components/Button';

import api from 'services/api';

import './style.css';

export default function MyAccount() {
    
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [avatar, setAvatar] = useState('');
    const [password, setPassword] = useState('');
    const [verifyPassword, setVerifyPassword] = useState('');


    const [dashboard, setdashboard] = useState(true);
    const [clients, setclients] = useState(true);
    const [faq, setfaq] = useState(true);
    const [logs, setlogs] = useState(true);
    const [users, setusers] = useState(true);
    const [settings, setsettings] = useState(true);
    

    const [isLoading, setIsLoading] = useState(false);
    const [msg, setMsg] = useState({message: '', type: ''});


    const addUser = async (e) => {
        e.preventDefault();

        if(!validate() && !isLoading){return};

        setIsLoading(true);

        const rolesAdmin = {
            dashboard,
            clients,
            faq,
            logs,
            settings,
            users
        }

        try{
            await api.post('/admin/users', {name, email, avatar, rolesAdmin, password});
            setIsLoading(false);
            setMsg({message:'Usuário Adicionado com sucesso.', type: 'success'});

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
        if(!name){
            setMsg({message: 'Preencha o campo nome', type: 'warning'});
            return false;
        }

        if(!email){
            setMsg({message: 'Preencha o campo e-mail', type: 'warning'});
            return false;
        }

        if(!password){
            setMsg({message: 'Digite uma senha.', type: 'warning'});
            return false;
        }

        if(password.length < 6){
            setMsg({message: 'Sua senha deve ter no mínimo 6 caracteres.', type: 'warning'});
            return false;
        }

        if(!verifyPassword){
            setMsg({message: 'Confirme sua senha', type: 'warning'});
            return false;
        }

        if(verifyPassword !== password){
            setMsg({message: 'As senhas digitadas não conferem.', type: 'warning'});
            return false;
        }
        return true;
    }

    return (
        <Page name="my-account">
            <h1>Meus Dados</h1>
            <div className="areaInfo">

            <div className="container cardAvatar">
                <div className="areaAvatar">
                    <Avatar name={name} image={avatar} size={100} icon="cloud-upload"/>

                    <ImageUploading
                    acceptType={['jpg', 'jpeg', 'gif', 'png']}
                    resolutionType="ratio"
                    multiple={false}
                    onChange={(image) => {
                        setAvatar(image[0].data_url);
                    }}
                    dataURLKey="data_url"
                    >
                        {({ imageList, onImageUpload, onImageRemoveAll }) => (
                            <BtnLink label="Editar" handleOnClick={onImageUpload}/>
                        )}
                    </ImageUploading>

                </div>
                </div>
                <form onSubmit={addUser} className="areaInformacoes">
                    <div className="informacoes">

                    <div className="container">
                        <h3>Informações Básicas</h3>
                        <Fieldset label="Nome" type="text" placeholder="Informe o seu nome" autofocus={true} handleValue={name} handleOnChange={(e) => setName(e.target.value)}/>
                        <Fieldset label="E-mail" type="text" placeholder="Informe o seu nome"  handleValue={email} handleOnChange={(e) => setEmail(e.target.value)}/>
                    </div>

                    <div className="container">
                        <h3>Segurança</h3>
                        <Fieldset label="Senha" type="password" placeholder="Digite uma senha (min. 6 caracteres)" handleValue={password} handleOnChange={(e) => setPassword(e.target.value)}/>
                        <Fieldset label="Confirmar Senha" type="password" placeholder="Confirme sua nova senha" handleValue={verifyPassword} handleOnChange={(e) => setVerifyPassword(e.target.value)}/>
                    </div>

                    <div className="container areaFuncionalidades">
                        <h3>Permissões</h3>
                        <table className="uk-table uk-table-striped uk-table-small uk-table-middle">
                        <thead>
                            <tr>
                                <th>Funcionalidade</th>
                                <th width="40">Ativar?</th>
                            </tr>
                        </thead>
                        <tbody>

                            <tr>
                                <td>Dashboard</td>
                                <td><Switch name={'dashboard'} checked={dashboard} onChange={(e) => setdashboard(e.target.checked)}/></td>
                            </tr>
                            <tr>
                                <td>Clientes</td>
                                <td><Switch name={'clients'} checked={clients} onChange={(e) => setclients(e.target.checked)}/></td>
                            </tr>
                            <tr>
                                <td>Perguntas Frequentes (FAQ)</td>
                                <td><Switch name={'faq'} checked={faq} onChange={(e) => setfaq(e.target.checked)}/></td>
                            </tr>
                            <tr>
                                <td>Logs</td>
                                <td><Switch name={'logs'} checked={logs} onChange={(e) => setlogs(e.target.checked)}/></td>
                            </tr>

                            <tr>
                                <td>Usuários</td>
                                <td><Switch name={'users'} checked={users} onChange={(e) => setusers(e.target.checked)}/></td>
                            </tr>
                            <tr>
                                <td>Configurações</td>
                                <td><Switch name={'settings'} checked={settings} onChange={(e) => setsettings(e.target.checked)}/></td>
                            </tr>
                            
                        </tbody>
                        </table>
                        
                    </div>

                    { msg.message ? <Msg type={msg.type} message={msg.message} /> : null}

                    <div className="areaBtn">
                        <Button label="Adicionar" isLoading={isLoading} handleOnClick={addUser} handleType="submit" />
                    </div>


            
            </div>
                </form>




            </div>




       </Page>
    )
}
