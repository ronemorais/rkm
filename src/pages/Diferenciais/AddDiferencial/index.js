import React, { useState } from 'react';
import ImageUploading from 'react-images-uploading';
import Page from 'components/Templates/Page';
import Msg from 'components/Msg';
import Avatar from 'components/Avatar';
import BtnLink from 'components/BtnLink';
import Fieldset from 'components/Fieldset';
import Button from 'components/Button';
import api from 'services/api';
import BtnTitle from 'components/BtnTitle';
import { useHistory } from "react-router-dom";

import './style.css';

export default function AddDiferencial() {

    const history = useHistory();

    const [icon, setIcon] = useState('');
    const [description, setDescription] = useState('');
    
    const [isLoading, setIsLoading] = useState(false);
    const [msg, setMsg] = useState({ message: '', type: '' });



    const add = async () => {
        setIsLoading(true);
        try {
            await api.post('/admin/differentials', { icon, description });
            setIsLoading(false);
            setMsg({ message: 'Diferencial adicionado com sucesso.', type: 'success' });
            setIcon('');
            setDescription('');
        } catch (error) {
            setIsLoading(false);
            if (error.response?.data.msg) {
                const msg = error.response.data.msg;
                setMsg({ message: msg, type: 'error' });
                return;
            }
            setMsg({ message: 'Falha de conexão.', type: 'error' });
        }
    }
 

    return (
        <Page name="diferenciais">
        <h1>
            Adicionar Diferencial
            <BtnTitle label="Voltar" iconName="chevron-left" handleOnClick={() => history.goBack()} />
        </h1>

        <div className="areaInfo">

        <div className="container cardAvatar">
            <div className="areaAvatar">
            
            <Avatar name={description} image={icon} size={130} icon="cloud-upload"/>

            <ImageUploading
            acceptType={['jpg', 'jpeg', 'gif', 'png']}
            resolutionType="ratio"
            multiple={false}
            onChange={(image) => {
                setIcon(image[0].data_url);
            }}
            dataURLKey="data_url"
            >
                {({ imageList, onImageUpload, onImageRemoveAll }) => (
                    <BtnLink label="Adicionar ícone'" handleOnClick={onImageUpload}/>
                )}
            </ImageUploading>

            
            </div>
            </div>
            
            
            <div className="container informacoes">
                <form onSubmit={add}>
                    <Fieldset label="Descrição" type="text" placeholder="Digite um pequena descrição do diferencial" autofocus={true} handleValue={description} handleOnChange={(e) => setDescription(e.target.value)}/>
                    
                    { msg.message ? <Msg type={msg.type} message={msg.message} /> : null}
                    <div className="areaBtn">
                        <Button label="Adicionar" isLoading={isLoading} handleOnClick={add} handleType="submit" />
                    </div>
                </form>
            </div>

        </div>




   </Page>
    )
}
