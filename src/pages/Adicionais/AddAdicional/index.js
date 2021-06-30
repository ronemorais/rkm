import React, { useState } from 'react';
import ImageUploading from 'react-images-uploading';
import Page from 'components/Templates/Page';
import Msg from 'components/Msg';
import BtnLink from 'components/BtnLink';
import Fieldset from 'components/Fieldset';
import Button from 'components/Button';
import api from 'services/api';
import BtnTitle from 'components/BtnTitle';
import { useHistory } from "react-router-dom";

import './style.css';

export default function AddAdicional() {

    const history = useHistory();

    
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [photos, setphotos] = useState([]);
    
    
    const [isLoading, setIsLoading] = useState(false);
    const [msg, setMsg] = useState({ message: '', type: '' });



    const add = async () => {
        setIsLoading(true);
        try {
            await api.post('/admin/additionals', { 
                name, 
                description, 
                photos: photos.length > 0 ? JSON.stringify(photos) : null,
             });
            setIsLoading(false);
            setMsg({ message: 'Adicional inserido com sucesso.', type: 'success' });
            setName('');
            setDescription('');
            setphotos([]);
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

    const removePhoto = (index) => {
        const imgs = [...photos];
        imgs.splice(index, 1)
        setphotos(imgs)
    }
 

    return (
        <Page name="adicionais">
        <h1>
            Novo Adicional
            <BtnTitle label="Voltar" iconName="chevron-left" handleOnClick={() => history.goBack()} />
        </h1>

        <div className="areaInfo">
            
            <div class="informacoes">

            
            <div className="container">
                <form onSubmit={add}>
                    <Fieldset label="Nome" type="text"  placeholder="Informe o nome do adicional" autofocus={true} handleValue={name} handleOnChange={(e) => setName(e.target.value)} />
                    <Fieldset label="Descrição" type="text" placeholder="Digite um pequena descrição do adicional" multiline={true} handleValue={description} handleOnChange={(e) => setDescription(e.target.value)}/>
                </form>
            </div>


            <div className="container">
                    <h3>Fotos <span>Tamnaho indicado: <b>933x1032px</b></span></h3>

                    <ImageUploading
                    acceptType={['jpg', 'jpeg', 'gif', 'png']}
                    resolutionType="ratio"
                    multiple={true}
                    onChange={(images) => {
                        const selecionadas = []
                        images.forEach(image => {
                            selecionadas.push(image.data_url)
                        })
                        
                        setphotos([...photos, ...selecionadas])
                    }}
                    dataURLKey="data_url"
                    >
                        {({ imageList, onImageUpload, onImageRemoveAll }) => (
                            <>
                                <BtnLink label="Adicionar Fotos" handleOnClick={onImageUpload}/>
                                <div className="areaThumbs">
                                    {
                                        photos.map((image, index) => (
                                            <div key={index} className="thumbPhoto animated bounceIn" style={{backgroundImage: `url(${image})`}}>
                                                <div className="btnRemove" onClick={() => removePhoto(index)}><i className='bx bx-trash'></i></div>
                                            </div>
                                        ))
                                    }
                                </div>
                            </>
                            
                        )}
                    </ImageUploading>

                </div>

                { msg.message ? <Msg type={msg.type} message={msg.message} /> : null}
                    <div className="areaBtn">
                        <Button label="Adicionar" isLoading={isLoading} handleOnClick={add} handleType="submit" />
                    </div>

                </div>
        </div>




   </Page>
    )
}
