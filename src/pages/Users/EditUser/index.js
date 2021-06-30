import React, {useState, useEffect} from 'react';
import ImageUploading from 'react-images-uploading';
import { Switch } from 'react-switch-input';
import Page from 'components/Templates/Page';

import Msg from 'components/Msg';
import Avatar from 'components/Avatar';
import BtnLink from 'components/BtnLink';
import Fieldset from 'components/Fieldset';
import Button from 'components/Button';
import BtnTitle from 'components/BtnTitle';

import { useHistory, useParams } from "react-router-dom";

import api from 'services/api';

import './style.css';

export default function MyAccount() {


    const history = useHistory();
    const {_id} = useParams();
    
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [avatar, setAvatar] = useState('');

    const [dashboard, setdashboard] = useState(false);
    const [clients, setclients] = useState(false);
    const [faq, setfaq] = useState(false);
    const [logs, setlogs] = useState(false);
    const [users, setusers] = useState(false);
    const [settings, setsettings] = useState(false);
    

    const [isLoading, setIsLoading] = useState(false);
    const [msg, setMsg] = useState({message: '', type: ''});


    useEffect(() => {   
        const loadUser = async () => {
            let response = await api.get(`/admin/users/${_id}`)
            let user = response.data;


            setName(user.name);
            setEmail(user.email);
            setAvatar(user.avatar);
            setdashboard(user?.rolesAdmin?.dashboard || false);
            setclients(user?.rolesAdmin?.clients || false);
            setfaq(user?.rolesAdmin?.faq || false);
            setlogs(user?.rolesAdmin?.logs || false);
            setusers(user?.rolesAdmin?.users || false);
            setsettings(user?.rolesAdmin?.settings || false);
            

        }
        loadUser();
    }, [_id])


    const editUser = async (e) => {
        e.preventDefault();

        if(!validate() && !isLoading){return};

        setIsLoading(true);

        const rolesAdmin = {
            _id,
            dashboard,
            clients,
            faq,
            logs,
            users,
            settings
        }

        try{
            await api.put('/admin/users', {name, email, avatar, rolesAdmin, _id});
            setIsLoading(false);
            setMsg({message:'Dados alterados com sucesso.', type: 'success'});

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

        return true;
    }


    const removeUser = async () => {
        var response = window.confirm("Tem certeza que quer remover esse usuário?");
        if(response === true){
            await api.delete(`/admin/users/${_id}`);
            history.goBack();
        }
    }


    return (
        <Page name="my-account">
            <h1>Meus Dados
                <BtnTitle label="Voltar" iconName="chevron-left" handleOnClick={()=> history.goBack() } />
                <BtnTitle label="Remover" iconName="trash" iconColor="#e63946" handleOnClick={()=> removeUser() } />
            </h1>
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
                <form onSubmit={editUser} className="areaInformacoes">
                    <div className="informacoes">

                    <div className="container">
                        <h3>Informações Básicas</h3>
                        <Fieldset label="Nome" type="text" placeholder="Informe o seu nome" autofocus={true} handleValue={name} handleOnChange={(e) => setName(e.target.value)}/>
                        <Fieldset label="E-mail" type="text" placeholder="Informe o seu nome"  handleValue={email} handleOnChange={(e) => setEmail(e.target.value)}/>
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
                        <Button label="Editar" isLoading={isLoading} handleOnClick={editUser} handleType="submit" />
                    </div>


            
            </div>
                </form>




            </div>




       </Page>
    )
}
