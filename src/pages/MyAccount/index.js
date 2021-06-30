import React, {useState, useEffect} from 'react';
import {useDispatch } from 'react-redux';
import ImageUploading from 'react-images-uploading';
import Page from 'components/Templates/Page';

import Msg from 'components/Msg';
import Avatar from 'components/Avatar';
import BtnLink from 'components/BtnLink';
import Fieldset from 'components/Fieldset';
import Button from 'components/Button';

import api from 'services/api';
import { getAuthUser, setAuthUser } from 'services/auth';
import './style.css';

export default function MyAccount() {
    const [user, setUser] = useState({})
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [avatar, setAvatar] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [msg, setMsg] = useState({message: '', type: ''});
    const dispatch = useDispatch();


    useEffect(() => {
        async function getUser(){
            const user = await getAuthUser();
            setUser(user);
            setName(user.name);
            setEmail(user.email);
            setAvatar(user.avatar);
        }
        getUser();
    }, [])

    const editar = async (e) => {
        e.preventDefault();

        if(!validate() && !isLoading){return};

        setIsLoading(true);

        try{
            const response = await api.put('/users', {_id: user._id, name, email, avatar});
            setIsLoading(false);
            setMsg({message:'Dados Alterados com', type: 'success'});
            let userEdited = response.data;
            userEdited.token = user.token;
            setAuthUser(userEdited);
            dispatch({type: 'SET_USER_LOGGED', value: userEdited});

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

    return (
        <Page name="my-account">
            <h1>Meus Dados</h1>
            <div className="areaInfo">

            <div className="container cardAvatar">
                <div className="areaAvatar">
                
                    <Avatar name={name} image={avatar} size={100}/>

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
                
                
                <div className="container informacoes">
                    <h3>Informações Básicas</h3>
                <form onSubmit={editar}>
                    <Fieldset label="Nome" type="text" placeholder="Informe o seu nome" autofocus={true} handleValue={name} handleOnChange={(e) => setName(e.target.value)}/>
                    <Fieldset label="E-mail" type="text" placeholder="Informe o seu nome"  handleValue={email} handleOnChange={(e) => setEmail(e.target.value)}/>
                    { msg.message ? <Msg type={msg.type} message={msg.message} /> : null}
                    <div className="areaBtn">
                        <Button label="Alterar" isLoading={isLoading} handleOnClick={editar} handleType="submit" />
                    </div>
                </form>
            </div>

            </div>




       </Page>
    )
}
