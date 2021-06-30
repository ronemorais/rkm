import React, { useState, useEffect } from 'react';
import ImageUploading from 'react-images-uploading';
import Page from 'components/Templates/Page';
import Msg from 'components/Msg';
import Avatar from 'components/Avatar';
import BtnLink from 'components/BtnLink';
import Fieldset from 'components/Fieldset';
import Button from 'components/Button';
import api from 'services/api';
import BtnTitle from 'components/BtnTitle';
import { useHistory, useParams } from "react-router-dom";



import './style.css';

export default function EditPlan() {

    const history = useHistory();
    const {_id} = useParams();

    const [icon, setIcon] = useState('');
    const [description, setDescription] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [msg, setMsg] = useState({message: '', type: ''});


    useEffect(() => {
        const loadDiferencial = async () => {
            const response = await api.get(`/admin/differentials/${_id}`);
            const differential = response.data;
            setIcon(differential.icon);
            setDescription(differential.description);
        }
        loadDiferencial();
    
        }, [_id])

    

    const editDiferencial = async () => {

        setIsLoading(true);

        try{
            await api.put('/admin/differentials', {_id, icon, description});
            setIsLoading(false);
            setMsg({message:'Diferencial alterado com sucesso.', type: 'success'});
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


    const removePlan = async () => {
        var response = window.confirm("Tem certeza que quer remover esse diferencial da plataforma?");
        if(response === true){
            await api.delete(`/admin/differentials/${_id}`);
            history.goBack();
        }
    }


    return (

<Page name="diferenciais">
<h1>
    Editar Diferencial
    <BtnTitle label="Voltar" iconName="chevron-left" handleOnClick={() => history.goBack()} />
    <BtnTitle label="Remover" iconName="trash" iconColor="#e63946" handleOnClick={()=> removePlan() } />
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
        <form onSubmit={editDiferencial}>
            <Fieldset label="Descrição" type="text" placeholder="Digite um pequena descrição do diferencial" autofocus={true} handleValue={description} handleOnChange={(e) => setDescription(e.target.value)}/>
            
            { msg.message ? <Msg type={msg.type} message={msg.message} /> : null}
            <div className="areaBtn">
                <Button label="Editar" isLoading={isLoading} handleOnClick={editDiferencial} handleType="submit" />
            </div>
        </form>
    </div>

</div>


</Page>
    )
}
