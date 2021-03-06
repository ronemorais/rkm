import BtnLink from 'components/BtnLink';
import BtnTitle from 'components/BtnTitle';
import Button from 'components/Button';
import ButtonInline from 'components/ButtonInline';
import FieldSelect from 'components/FieldSelect';
import FieldsetMoney from 'components/FieldsetMoney';
import Fieldset from 'components/Fieldset';
import Msg from 'components/Msg';
import Page from 'components/Templates/Page';
import React, { useEffect, useState } from 'react';
import ImageUploading from 'react-images-uploading';
import { useHistory } from "react-router-dom";
import { Switch } from 'react-switch-input';
import api from 'services/api';
import './style.css';




export default function AddUnidade() {

    const history = useHistory();



    const [enterprise, setenterprise] = useState('');
    const [description, setdescription] = useState('');
    const [plant, setplant] = useState('');
    const [photos, setphotos] = useState([]);
    const [meters, setmeters] = useState('');
    const [number, setnumber] = useState('');
    const [videoUrl, setvideoUrl] = useState('');
    const [rooms, setrooms] = useState('');
    const [suites, setsuites] = useState('');
    const [semissuites, setsemissuites] = useState('');
    const [garage, setgarage] = useState('');
    const [bathrooms, setbathrooms] = useState('');
    const [price, setprice] = useState('');
    const [percentageInput, setpercentageInput] = useState('');
    const [percentageMonthly, setpercentageMonthly] = useState('');
    const [percentageSemiannual, setpercentageSemiannual] = useState('');
    const [percentageKeys, setpercentageKeys] = useState('');
    const [interestRate, setinterestRate] = useState('');
    const [features, setfeatures] = useState([]);


    const [tower, setTower] = useState('');
    const [unitPublic, setUnitPublic] = useState(true);
    const [reserved, setReserved] = useState(false);
    const [sold, setSold] = useState(false);

    const [empreendimentos, setEmpreendimentos] = useState([]);

    const [isLoading, setIsLoading] = useState(false);
    const [msg, setMsg] = useState({ message: '', type: '' });
    const [caracteristica, setcaracteristica] = useState('')

    const [adicionais, setAdicionais] = useState([]);
    const [adicional, setAdicional] = useState({});
    const [precoAdicional, setPrecoAdicional] = useState('');
    const [additionals, setadditionals] = useState([]);

    useEffect(() => {
        const loadEmpreendimentos = async () => {
            const response = await api.get(`admin/enterprises`);
            setEmpreendimentos(response.data);
        }
        loadEmpreendimentos();
    }, []);


    useEffect(() => {
        const loadAdicionais = async () => {
            const response = await api.get(`admin/additionals`);
            setAdicionais(response.data);
        }
        loadAdicionais();
    }, []);




    const adicionar = async () => {

        setIsLoading(true);

        try {

            await api.post('/admin/units', {
                description,
                enterprise,
                meters,
                number,
                videoUrl,
                rooms,
                suites,
                semissuites,
                garage,
                bathrooms,
                price,
                percentageInput,
                percentageMonthly,
                percentageSemiannual,
                percentageKeys,
                interestRate,
                plant,
                photos: photos.length > 0 ? JSON.stringify(photos) : null,
                features: features.length > 0 ? JSON.stringify(features) : null,
                additionals: additionals.length > 0 ? JSON.stringify(additionals) : null,
                public: unitPublic,
                tower,
                reserved,
                sold
            });

            setIsLoading(false);
            setMsg({ message: 'Unidade adicionado com sucesso.', type: 'success' });

            setenterprise('');
            setdescription('');
            setplant('');
            setphotos([]);
            setfeatures([]);
            setmeters('');
            setnumber('');
            setvideoUrl('');
            setrooms('');
            setsuites('');
            setsemissuites('');
            setgarage('');
            setbathrooms('');
            setprice('');
            setpercentageInput('');
            setpercentageMonthly('');
            setpercentageSemiannual('');
            setpercentageKeys('');
            setinterestRate('');
            setReserved(false);
            setSold(false);
            setTower('');

        } catch (error) {
            setIsLoading(false);
            if (error.response?.data.msg) {
                const msg = error.response.data.msg;
                setMsg({ message: msg, type: 'error' });
                return;
            }
            setMsg({ message: 'Falha de conex??o.', type: 'error' });
        }
    }


    const removePhoto = (index) => {
        const imgs = [...photos];
        imgs.splice(index, 1)
        setphotos(imgs)
    }


    const addCaracteristica = (e) => {
        e.preventDefault();
        const caracteristicas = [...features, caracteristica];
        setcaracteristica('')
        setfeatures(caracteristicas)
    }

    const removeFeature = (index) => {
        const caracteristicas = [...features];
        caracteristicas.splice(index, 1);
        setfeatures(caracteristicas);
    }


    const addAdicional = () => {

        let adicionalSelecionado = adicionais[adicional];
        let newAdicional = {
            additional: adicionalSelecionado._id,
            name: adicionalSelecionado.name,
            price: precoAdicional
        }

        setadditionals([...additionals, newAdicional])
        setAdicional({});
        setPrecoAdicional('');

    }

    const removeAdicional = (index) => {

        let ad = [...additionals];
        ad.splice(index, 1);
        setadditionals([...ad]);

    }


    return (
        <Page name="assessment-types">
            <h1>
                Adicionar Unidade
                <BtnTitle label="Voltar" iconName="chevron-left" handleOnClick={() => history.goBack()} />
            </h1>


            <div className="areaInfo">


                <div className="informacoes">

                    <div className="container">
                        <h3>Informa????es B??sicas</h3>
                        <FieldSelect label="Empreendimento" handleValue={enterprise} handleOnChange={(e) => setenterprise(e.target.value)}>
                            <option value="">Selecione</option>
                            {
                                empreendimentos.map((empreendimento, index) => (
                                    <option key={index} value={empreendimento._id}>{empreendimento.name}</option>
                                ))
                            }
                        </FieldSelect>


                        <div className="inputGrid">
                            <Fieldset label="N??mero do Im??vel" type="text" placeholder="Digite o n?? do im??vel." handleValue={number} handleOnChange={(e) => setnumber(e.target.value)} />
                            <Fieldset label="N??mero da Torre" type="number" placeholder="Digite on n?? da torre." handleValue={tower} handleOnChange={(e) => setTower(e.target.value)} />
                        </div>


                        <Fieldset label="Descri????o" type="text" multiline={true} placeholder="Digite uma breve descri????p do im??vel." handleValue={description} handleOnChange={(e) => setdescription(e.target.value)} />

                        <div className="inputGrid">
                            <Fieldset label="Tamanho do Im??vel" type="number" placeholder="m??" handleValue={meters} handleOnChange={(e) => setmeters(e.target.value)} />
                            <Fieldset label="N?? de Quartos" type="number" placeholder="Quantidade de quartos" handleValue={rooms} handleOnChange={(e) => setrooms(e.target.value)} />
                            <Fieldset label="N?? de Vagas" type="number" placeholder="Quantidade de vagas" handleValue={garage} handleOnChange={(e) => setgarage(e.target.value)} />
                        </div>

                        <div className="inputGrid">
                            <Fieldset label="N?? de Su??tes" type="number" placeholder="Quantidade de su??tes" handleValue={suites} handleOnChange={(e) => setsuites(e.target.value)} />
                            <Fieldset label="N?? de Semissu??tes" type="number" placeholder="Quantidade de semissu??tes" handleValue={semissuites} handleOnChange={(e) => setsemissuites(e.target.value)} />
                            <Fieldset label="N?? de Banheiros" type="number" placeholder="Quantidade de banheiros" handleValue={bathrooms} handleOnChange={(e) => setbathrooms(e.target.value)} />
                        </div>
                    </div>

                    <div className="container">
                        <h3>Refer??ncia Simula????o</h3>
                        <div className="inputGrid">
                            {/* <Fieldset label="Valor" type="text"  placeholder="Valor total do im??vel" handleValue={price} handleOnChange={(e) => setprice(e.target.value)} /> */}
                            <FieldsetMoney label="Valor da Unidade" handleValue={price} handleOnChange={(e, value) => setprice(value)} />
                            <Fieldset label="% Entrada" type="number" placeholder="Valor em %" handleValue={percentageInput} handleOnChange={(e) => setpercentageInput(e.target.value)} />
                            <Fieldset label="Taxa Desconta Antecipa????o" type="number" placeholder="Valor em %" handleValue={interestRate} handleOnChange={(e) => setinterestRate(e.target.value)} />
                        </div>

                        <div className="inputGrid">
                            <Fieldset label="% Mensal" type="number" placeholder="Valor em %" handleValue={percentageMonthly} handleOnChange={(e) => setpercentageMonthly(e.target.value)} />
                            <Fieldset label="% Semestral" type="number" placeholder="Valor em %" handleValue={percentageSemiannual} handleOnChange={(e) => setpercentageSemiannual(e.target.value)} />
                            <Fieldset label="% Chaves" type="number" placeholder="Valor em %" handleValue={percentageKeys} handleOnChange={(e) => setpercentageKeys(e.target.value)} />
                        </div>

                    </div>


                    <div className="container">
                        <h3>Caracter??sticas <span>Ex.: Sala ampla</span></h3>
                        <form onSubmit={addCaracteristica} className="inputGrid">
                            <Fieldset type="text" placeholder="Digite uma caracter??stica e aperte a tecla enter." handleValue={caracteristica} handleOnChange={(e) => setcaracteristica(e.target.value)} />
                        </form>

                        {
                            features.length > 0 &&
                            <table className="uk-table uk-table-striped uk-table-small uk-table-middle">
                                <thead>
                                    <tr>
                                        <th>Descri????o</th>
                                        <th width="26">#</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        features.map((feature, index) => (
                                            <tr key={index} className="itemDiferencial">
                                                <td>{feature}</td>
                                                <td><div className="btnRemove" onClick={() => removeFeature(index)}><i className='bx bx-trash'></i></div></td>
                                            </tr>
                                        ))
                                    }
                                </tbody>
                            </table>
                        }

                    </div>

                    <div className="container">

                        <h3>Adicionais</h3>

                        <div className="inputGrid baseline">
                            <FieldSelect label="Adicional" handleValue={adicional} handleOnChange={(e) => setAdicional(e.target.value)}>
                                <option value="">Selecione</option>
                                {
                                    adicionais.map((item, index) => (
                                        <option key={index} value={index}>{item.name}</option>
                                    ))
                                }
                            </FieldSelect>
                            <Fieldset label="Pre??o" type="number" placeholder="Pre??o para esse adicional" handleValue={precoAdicional} handleOnChange={(e) => setPrecoAdicional(e.target.value)} />
                            <div className="btnAdd">
                                <ButtonInline label="Adicionar" handleOnClick={() => addAdicional()} />
                            </div>

                        </div>

                        {
                            additionals.length > 0 &&
                            <table className="uk-table uk-table-striped uk-table-small uk-table-middle">
                                <thead>
                                    <tr>
                                        <th>Nome</th>
                                        <th>Pre??o</th>
                                        <th width="26">#</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        additionals.map((item, index) => (
                                            <tr key={index} className="itemDiferencial">
                                                <td>{item.name}</td>
                                                <td>{item.price}</td>
                                                <td><div className="btnRemove" onClick={() => removeAdicional(index)}><i className='bx bx-trash'></i></div></td>
                                            </tr>
                                        ))
                                    }
                                </tbody>
                            </table>
                        }

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
                        <h3>V??deo <span>URL do Youtube</span></h3>
                        <Fieldset type="text" placeholder="Informe a url do v??deo." handleValue={videoUrl} handleOnChange={(e) => setvideoUrl(e.target.value)} />
                    </div>


                    <div className="container">
                        <h3>Planta do Im??vel</h3>
                        <ImageUploading
                            acceptType={['jpg', 'jpeg', 'gif', 'png']}
                            resolutionType="ratio"
                            multiple={false}
                            onChange={(image) => {
                                setplant(image[0].data_url);
                            }}
                            dataURLKey="data_url"
                        >
                            {({ imageList, onImageUpload, onImageRemoveAll }) => (
                                <BtnLink label="Adicionar Planta" handleOnClick={onImageUpload} />
                            )}
                        </ImageUploading>

                        {plant && <div className="planta animated bounceIn" style={{ backgroundImage: `url(${plant})` }}></div>}

                    </div>


                    <div className="container">
                        <h3>Venda</h3>
                        <table className="uk-table uk-table-striped uk-table-small uk-table-middle">
                            <thead>
                                <tr>
                                    <th>Status</th>
                                    <th width="40">Ativar?</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>Unidade Reservada</td>
                                    <td><Switch name={"reserved"} checked={reserved} onChange={(e) => setReserved(e.target.checked)} /></td>
                                </tr>

                                <tr>
                                    <td>Unidade Vendida</td>
                                    <td><Switch name={"sold"} checked={sold} onChange={(e) => setSold(e.target.checked)} /></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>


                    <div className="container">
                        <h3>Privacidade</h3>
                        <table className="uk-table uk-table-striped uk-table-small uk-table-middle">
                            <thead>
                                <tr>
                                    <th>Publica????o</th>
                                    <th width="40">Ativar?</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>Deixar essa unidade publica no app.</td>
                                    <td><Switch name={"unitPublic"} checked={unitPublic} onChange={(e) => setUnitPublic(e.target.checked)} /></td>
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
