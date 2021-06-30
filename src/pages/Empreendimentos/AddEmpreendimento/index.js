import React, { useState, useEffect } from 'react';
import ImageUploading from 'react-images-uploading';


import Page from 'components/Templates/Page';
import Msg from 'components/Msg';
import BtnTitle from 'components/BtnTitle';
import Fieldset from 'components/Fieldset';
import Address from 'components/Address';
import FieldSelect from 'components/FieldSelect';
import Avatar from 'components/Avatar';
import BtnLink from 'components/BtnLink';
import Button from 'components/Button';
import { Switch } from 'react-switch-input';
import api from 'services/api';
import { useHistory } from "react-router-dom";

import './style.css';

export default function AddEmpreendimento() {

    const history = useHistory();


    const [name, setname] = useState('');
    const [draft, setdraft] = useState('');
    const [description, setdescription] = useState('');
    const [logo, setlogo] = useState('');
    const [category, setcategory] = useState('');
    const [photos, setphotos] = useState([]);
    const [differentials, setdifferentials] = useState([]);
    const [hotsiteUrl, sethotsiteUrl] = useState('');
    const [bookUrl, setbookUrl] = useState('');
    const [latitude, setlatitude] = useState('');
    const [longitude, setlongitude] = useState('');
    const [address, setaddress] = useState('');
    const [state, setstate] = useState('');
    const [country, setcountry] = useState('');
    const [city, setcity] = useState('');
    const [enterprisePublic, setEnterprisePublic] = useState(true);
    const [start, setstart] = useState('');
    const [end, setend] = useState('');
    const [status, setstatus] = useState('');
    const [tourVirtualUrl, settourVirtualUrl] = useState('');



    const [categorias, setCategorias] = useState([])

    const [selectDifferential, setSelectDifferential] = useState({});
    const [diferenciais, setDiferenciais] = useState([]);
    const [selectedsDifferentials, setSelectedsDifferentials] = useState([]);

    const [isLoading, setIsLoading] = useState(false);
    const [msg, setMsg] = useState({ message: '', type: '' });



    useEffect(() => {
        const loadCategorias = async () => {
            const response = await api.get(`admin/categories`);
            setCategorias(response.data);
        }
        loadCategorias();
    }, []);


    useEffect(() => {
        const loadDiferenciais = async () => {
            const response = await api.get(`admin/differentials`);
            setDiferenciais(response.data);
        }
        loadDiferenciais();
    }, []);


    const adicionar = async () => {

        setIsLoading(true);

        try {

            await api.post('/admin/enterprises', {
                name,
                draft,
                description,
                logo,
                category,
                photos: photos.length > 0 ? JSON.stringify(photos) : null,
                differentials: differentials.length > 0 ? JSON.stringify(differentials) : null,
                hotsiteUrl,
                bookUrl,
                latitude,
                longitude,
                address,
                state,
                country,
                city,
                start,
                end,
                status,
                tourVirtualUrl,
                public: enterprisePublic
            });

            setIsLoading(false);
            setMsg({ message: 'Empreendimento adicionado com sucesso.', type: 'success' });

            setname('');
            setdraft('');
            setdescription('');
            setlogo('');
            setcategory('');
            setphotos([]);
            setdifferentials([]);
            sethotsiteUrl('');
            setbookUrl('');
            setlatitude('');
            setlongitude('');
            setaddress('');
            setstate('');
            setcountry('');
            setcity('');
            setstart('');
            setend('');
            setstatus('');
            setSelectDifferential([])
            setDiferenciais([])
            setSelectedsDifferentials([])

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

    const setInfoAddress = (place) => {
        setaddress(place?.formatted_address || '')
        setstate(place?.address_components[3].long_name);
        setcity(place?.address_components[2].long_name);
        setcountry(place?.address_components[4].long_name);
        setlatitude(place.geometry.location.lat())
        setlongitude(place.geometry.location.lng())
    }

    const removePhoto = (index) => {
        const imgs = [...photos];
        imgs.splice(index, 1)
        setphotos(imgs)
    }

    useEffect(() => {
        const addDiferencial = () => {
            const diferencial = diferenciais[selectDifferential];
            if (diferencial && selectedsDifferentials.indexOf(diferencial) === -1) {
                setSelectedsDifferentials([diferencial, ...selectedsDifferentials]);
                setdifferentials([diferencial._id, ...differentials]);
                setSelectDifferential({})
            }
        }

        addDiferencial();

    }, [selectDifferential, selectedsDifferentials, differentials, diferenciais])


    const removeDiferencial = (diferencial) => {

        const diferenciaisEditado = [...selectedsDifferentials];
        diferenciaisEditado.splice(selectedsDifferentials.indexOf(diferencial), 1)
        setSelectedsDifferentials(diferenciaisEditado);

        const difrenciaisIdsEditado = [...differentials];
        difrenciaisIdsEditado.splice(differentials.indexOf(diferencial._id), 1)
        setdifferentials(difrenciaisIdsEditado);

    }


    return (
        <Page name="assessment-types">
            <h1>
                Adicionar Empreendimento
                <BtnTitle label="Voltar" iconName="chevron-left" handleOnClick={() => history.goBack()} />
            </h1>


            <div className="areaInfo">

                <div className="container cardAvatar">
                    <div className="areaAvatar">
                        <Avatar name={name} image={logo} size={78} icon="cloud-upload" />

                        <ImageUploading
                            acceptType={['jpg', 'jpeg', 'gif', 'png']}
                            resolutionType="ratio"
                            multiple={false}
                            onChange={(image) => {
                                setlogo(image[0].data_url);
                            }}
                            dataURLKey="data_url"
                        >
                            {({ imageList, onImageUpload, onImageRemoveAll }) => (
                                <BtnLink label="Adicionar Logo" handleOnClick={onImageUpload} />
                            )}
                        </ImageUploading>

                    </div>
                </div>


                <div className="informacoes">

                    <div className="container">
                        <h3>Informações</h3>

                        <Fieldset label="Nome" type="text" placeholder="Digite um nome para o empreendimento." handleValue={name} handleOnChange={(e) => setname(e.target.value)} />
                        <Fieldset label="Resumo" type="text" placeholder="Digite uma descrição para o empreendimento." multiline={true} handleValue={draft} handleOnChange={(e) => setdraft(e.target.value)} />
                        <Fieldset label="Descrição" type="text" placeholder="Digite uma descrição para o empreendimento." multiline={true} handleValue={description} handleOnChange={(e) => setdescription(e.target.value)} />
                        <Fieldset label="Status" type="text" placeholder="Digite um status para o empreendimento." handleValue={status} handleOnChange={(e) => setstatus(e.target.value)} />
                        <FieldSelect label="Categoria" handleValue={category} handleOnChange={(e) => setcategory(e.target.value)}>
                            <option value="">Selecione</option>
                            {
                                categorias.map((categoria, index) => (
                                    <option key={index} value={categoria._id}>{categoria.name}</option>
                                ))
                            }
                        </FieldSelect>
                        <div className="areaAddress">
                            <Fieldset label="Início da Obra" type="date" placeholder="Informe a data de início da obra" handleValue={start} handleOnChange={(e) => setstart(e.target.value)} />
                            <Fieldset label="Termíno da Obra" type="date" placeholder="informe a data de conclusão da obra" handleValue={end} handleOnChange={(e) => setend(e.target.value)} />
                        </div>

                    </div>


                    <div className="container">
                        <h3>Localização</h3>
                        <Address label="Endreço" handleValue={(place) => setInfoAddress(place)} />
                        <div className="areaAddress">
                            <Fieldset label="Cidade" type="text" placeholder="Nome da Cidade" handleValue={city} handleOnChange={(e) => setcity(e.target.value)} />
                            <Fieldset label="Estado" type="text" placeholder="Digite o Estado" handleValue={state} handleOnChange={(e) => setstate(e.target.value)} />
                            <Fieldset label="País" type="text" placeholder="Digite o país" handleValue={country} handleOnChange={(e) => setcountry(e.target.value)} />
                        </div>

                    </div>

                    <div className="container">
                        <h3>Fotos <span>Tamnaho indicado: <b>933x1032px</b></span></h3>

                        <ImageUploading
                            acceptType={['jpg', 'jpeg', 'gif', 'png']}
                            resolutionType="ratio"
                            multiple={true}
                            onChange={(images) => {
                                let selecionadas = []
                                images.forEach(image => {
                                    selecionadas.push(image.data_url)
                                })

                                setphotos([...photos, ...selecionadas])
                            }}
                            dataURLKey="data_url"
                        >
                            {({ imageList, onImageUpload, onImageRemoveAll }) => (
                                <>
                                    <BtnLink label="Adicionar Fotos" handleOnClick={onImageUpload} />
                                    <div className="areaThumbs">
                                        {
                                            photos.map((image, index) => (
                                                <div key={index} className="thumbPhoto animated bounceIn" style={{ backgroundImage: `url(${image})` }}>
                                                    <div className="btnRemove" onClick={() => removePhoto(index)}><i className='bx bx-trash'></i></div>
                                                </div>
                                            ))
                                        }
                                    </div>
                                </>

                            )}
                        </ImageUploading>

                    </div>

                    <div className="container">
                        <h3>Diferênciais</h3>

                        <FieldSelect handleValue={selectDifferential} handleOnChange={(e) => setSelectDifferential(e.target.value)}>
                            <option value="">Selecione</option>
                            {
                                diferenciais.map((diferencial, i) => (
                                    <option key={i} value={i}>{diferencial.description}</option>
                                ))
                            }
                        </FieldSelect>

                        {
                            selectedsDifferentials.length > 0 &&
                            <table className="uk-table uk-table-striped uk-table-small uk-table-middle">
                                <thead>
                                    <tr>
                                        <th width="60">Ícone</th>
                                        <th>Descrição</th>
                                        <th width="26">#</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        selectedsDifferentials.map((diferencial, index) => (
                                            <tr key={index} className="itemDiferencial">
                                                <td><Avatar image={diferencial.icon} size={58} handleClass="iconDiferencial" /></td>
                                                <td>{diferencial.description}</td>
                                                <td><div className="btnRemove" onClick={() => removeDiferencial(diferencial)}><i className='bx bx-trash'></i></div></td>
                                            </tr>
                                        ))
                                    }
                                </tbody>
                            </table>
                        }
                    </div>


                    <div className="container">
                        <h3>Materiais de Divulgação</h3>
                        <Fieldset label="Hotsite URL" type="text" placeholder="Informe a url do hotsite" handleValue={hotsiteUrl} handleOnChange={(e) => sethotsiteUrl(e.target.value)} />
                        <Fieldset label="PDF URL" type="text" placeholder="Informe a url do pdf" handleValue={bookUrl} handleOnChange={(e) => setbookUrl(e.target.value)} />
                        <Fieldset label="Tour Virtual URL" type="text" placeholder="Informe a url do tour" handleValue={tourVirtualUrl} handleOnChange={(e) => settourVirtualUrl(e.target.value)} />
                    </div>

                    <div className="container">
                        <h3>Privacidade</h3>
                        <table className="uk-table uk-table-striped uk-table-small uk-table-middle">
                            <thead>
                                <tr>
                                    <th>Publicação</th>
                                    <th width="40">Ativar?</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>Deixar esse empreendimento public no app.</td>
                                    <td><Switch name={"enterprisePublic"} checked={enterprisePublic} onChange={(e) => setEnterprisePublic(e.target.checked)} /></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>


                    {msg.message ? <Msg type={msg.type} message={msg.message} /> : null}

                    <div className="areaBtnPlan">
                        <Button label="Adicionar" isLoading={isLoading} handleOnClick={adicionar} handleType="submit" />
                    </div>

                </div>




            </div>


        </Page>
    )
}
