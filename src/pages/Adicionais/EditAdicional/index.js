import React, { useState, useEffect } from 'react';
import ImageUploading from 'react-images-uploading';
import Page from 'components/Templates/Page';
import Msg from 'components/Msg';
import BtnLink from 'components/BtnLink';
import Fieldset from 'components/Fieldset';
import Button from 'components/Button';
import api from 'services/api';
import BtnTitle from 'components/BtnTitle';
import { useHistory, useParams } from "react-router-dom";

import './style.css';


export default function AddAdicional() {

    const history = useHistory();
    const {_id} = useParams();

    
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [photos, setphotos] = useState([]);
    
    
    const [isLoading, setIsLoading] = useState(false);
    const [msg, setMsg] = useState({ message: '', type: '' });

    useEffect(() => {
        const loadAdicional = async () => {
            const response = await api.get(`/admin/additionals/${_id}`);
            const additional = response.data;
            setName(additional.name);
            setDescription(additional.description);
            setphotos(additional.photos ? additional.photos : []);
        }
        loadAdicional();
    
    }, [_id])



    const edit = async () => {
        setIsLoading(true);
        try {
            await api.put('/admin/additionals', {
                _id,
                name, 
                description, 
                photos: photos.length > 0 ? JSON.stringify(photos) : null,
             });
            setIsLoading(false);
            setMsg({ message: 'Adicional editado com sucesso.', type: 'success' });
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

    const removeAdditional = async () => {
        var response = window.confirm("Tem certeza que quer remover esse adicional da plataforma?");
        if(response === true){
            await api.delete(`/admin/additionals/${_id}`);
            history.goBack();
        }
    }
 

    return (
        <Page name="adicionais">
        <h1>
            Editar Adicional
            <BtnTitle label="Voltar" iconName="chevron-left" handleOnClick={() => history.goBack()} />
            <BtnTitle label="Remover" iconName="trash" iconColor="#e63946" handleOnClick={()=> removeAdditional() } />
        </h1>

        <div className="areaInfo">
            
            <div class="informacoes">

            
            <div className="container">
                <form onSubmit={edit}>
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
                        <Button label="Editar" isLoading={isLoading} handleOnClick={edit} handleType="submit" />
                    </div>

                </div>
        </div>




   </Page>
    )
}
