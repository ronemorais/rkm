import React, { useState, useEffect, } from 'react';
import { parseISO, format } from 'date-fns';
import Page from 'components/Templates/Page';
import api from 'services/api';
import FieldSelect from 'components/FieldSelect';
import Avatar from 'components/Avatar';
import Status from 'components/Status';
import BtnTitle from 'components/BtnTitle';
import Fieldset from 'components/Fieldset';
import Msg from 'components/Msg';
import { formatReal } from 'utils/moeda';
import BtnIcon from 'components/BtnIcon';
import { useHistory, useParams } from "react-router-dom";
import ButtonInlineSmall from 'components/ButtonInlineSmall';

import slugify from 'react-slugify';

import CKEditor from 'ckeditor4-react';
import Button from 'components/Button';
import ButtonInline from 'components/ButtonInline';



export default function ShowSimulacao() {

    const { _id } = useParams();
    const history = useHistory();

    const [msg, setMsg] = useState({ message: '', type: '' });
    const [simulacao, setSimulacao] = useState({});
    const [documentos, setDocumentos] = useState({});
    const [isLoading, setIsLoading] = useState(true);
    const [etapaAtual, setEtapaAtual] = useState('');
    const [etapas, setEtapas] = useState([]);
    const [showModalContract, setShowModalContract] = useState(false);


    const [contractContent, setContractContent] = useState('');



    useEffect(() => {
        const loadSimulacao = async () => {
            setIsLoading(true);
            try {
                const response = await api.get(`/admin/simulations/${_id}`);
                let simulation = response.data;
                setSimulacao(simulation);
                setEtapaAtual(simulation.step.number);
                setIsLoading(false);
            } catch (error) {
                setIsLoading(false);
            }
        }
        loadSimulacao();

    }, [_id, etapaAtual]);


    // Load documentos
    useEffect(() => {
        let loadDocs = async () => {
            let response = await api.get(`admin/documents/simulation/${_id}`);
            if (response.data) {
                setDocumentos(response.data);
                setContractContent(response.data.contractContent);
            }
        }

        loadDocs();


    }, [etapaAtual, _id]);


    // load os passos
    useEffect(() => {
        const loadEtapas = async () => {
            const response = await api.get(`/admin/steps`);
            setEtapas(response.data);
        }
        loadEtapas();
    }, []);

    const reprovarDocumentos = async () => {
        var confirm = window.confirm("Tem certeza que quer reprovar a documentação?");
        if (!confirm) return;
        try {
            await api.put(`admin/documents/disapprove`, { ...documentos });
            setMsg({ message: 'Documentação Reprovada.', type: 'success' });
        } catch (error) {
            if (error.response?.data.msg) {
                const msg = error.response.data.msg;
                setMsg({ message: msg, type: 'error' });
                return;
            }
            setMsg({ message: 'Falha de conexão.', type: 'error' });
        }
    }


    const generateContractPdf = async () => {

        var confirm = window.confirm("Tem certeza que quer gerar um novo PDF e enviar para o cliente?");
        if (!confirm) return;

        try {
            let response = await api.put(`admin/documents/contract/generate/pdf`, { simulationId: _id });
            setMsg({ message: response.msg, type: 'success' });
        } catch (error) {
            if (error.response?.data.msg) {
                const msg = error.response.data.msg;
                setMsg({ message: msg, type: 'error' });
                return;
            }
            setMsg({ message: 'Falha de conexão.', type: 'error' });
        }
    }

    const changeEtapa = async (numEtapa) => {
        var confirm = window.confirm("Tem certeza que quer alterar a etapa?");
        if (!confirm) return;

        try {
            await api.put(`/admin/simulations/step/change/`, {
                simulationId: simulacao._id,
                step: numEtapa
            });
            setEtapaAtual(numEtapa)
            setMsg({ message: 'Etapa alterada com sucesso.', type: 'success' });
        } catch (error) {
            if (error.response?.data.msg) {
                const msg = error.response.data.msg;
                setMsg({ message: msg, type: 'error' });
                return;
            }
            setMsg({ message: 'Falha de conexão.', type: 'error' });
        }

    }


    const reviewContract = async () => {
        var confirm = window.confirm("Tem certeza que quer salvar esses ajustes no contrato?");
        if (!confirm) return;
        try {
            await api.put(`admin/documents/contract_review`, { _id: documentos._id, contractContent });
            setMsg({ message: 'Contrato revisado com sucesso.', type: 'success' });
            setShowModalContract(false);
        } catch (error) {
            if (error.response?.data.msg) {
                const msg = error.response.data.msg;
                setMsg({ message: msg, type: 'error' });
                return;
            }
            setMsg({ message: 'Falha de conexão.', type: 'error' });
        }
    }

    const showContractPDF = async () => {
        try {
            let response = await api.get(`admin/documents/contract/pdf/${documentos._id}`, { responseType: 'blob' });
            const url = window.URL.createObjectURL(new Blob([response]));
            const link = document.createElement('a');
            const nameContract = slugify(documentos.fullname, { delimiter: '_', prefix: 'contrato_' })
            link.href = url;
            link.setAttribute('download', `${nameContract}.pdf`); //or any other extension
            document.body.appendChild(link);
            link.click();


        } catch (error) {
            if (error.response?.data.msg) {
                const msg = error.response.data.msg;
                setMsg({ message: msg, type: 'error' });
                return;
            }
            setMsg({ message: 'Falha de conexão.', type: 'error' });
        }
    }


    const removeSimulation = async () => {
        var response = window.confirm("Tem certeza que quer remover essa simulação?");
        if (response === true) {
            await api.delete(`/admin/simulations/${_id}`);
            history.goBack();
        }
    }


    if (isLoading) {
        return <></>;
    }



    return (
        <Page name="simulacoes" loading={isLoading}>
            <h1>Simulação
                <BtnTitle label="Voltar" iconName="chevron-left" handleOnClick={() => history.goBack()} />
                <BtnTitle label="Remover" iconName="trash" iconColor="#e63946" handleOnClick={() => removeSimulation()} />
            </h1>

            { msg.message ? <Msg type={msg.type} message={msg.message} /> : null}

            <div className="areaInfo">
                <div className="informacoes">
                    <div className="container">
                        <h3>Informações</h3>

                        <div className="areaDados">

                            <div className="dado">
                                <label>Cliente</label>
                                <div className="info-user"><Avatar name={simulacao.user?.name} image={simulacao.user?.avatar} size={24} /><p>{simulacao.user.name}</p></div>
                            </div>
                            <div className="dado">
                                <label>Empreendimento</label>
                                <p>{simulacao.results?.unit.enterprise.name}</p>
                            </div>
                            <div className="dado">
                                <label>Unidade</label>
                                <p>Unid.: {simulacao.results?.unit.number} / Torre: {simulacao.results?.unit.tower}</p>
                            </div>

                            <div className="dado">
                                <label>Data de Envio</label>
                                <p><i className='bx bx-calendar'></i> {format(parseISO(simulacao.createdAt), 'dd/MM/yy')} às {format(parseISO(simulacao.createdAt), 'HH:mm')}hrs</p>
                            </div>


                        </div>

                    </div>


                    {
                        Object.keys(documentos).length > 0 &&
                        <>
                            <div className="container">
                                <h3>Documentos</h3>
                                <div className="areaDados">

                                    <div className="dado">
                                        <label>Nome Completo</label>
                                        <p>{documentos.fullname}</p>
                                    </div>
                                    <div className="dado">
                                        <label>E-mail</label>
                                        <p>{documentos.email}</p>
                                    </div>

                                    <div className="dado">
                                        <label>Data de Nascimento</label>
                                        <p>{documentos.birthday}</p>
                                    </div>

                                    <div className="dado">
                                        <label>RG</label>
                                        <p>{documentos.rg}</p>
                                    </div>
                                    <div className="dado">
                                        <label>CPF</label>
                                        <p>{documentos.cpf}</p>
                                    </div>
                                </div>

                                {documentos.married &&
                                    <div className="areaDados">
                                        <div className="dado">
                                            <label>Casado(a)</label>
                                            <p>{documentos.married ? 'Sim' : 'Não'}</p>
                                        </div>

                                        <div className="dado">
                                            <label>Nome Cônjuge</label>
                                            <p>{documentos.spouseFullName}</p>
                                        </div>

                                        <div className="dado">
                                            <label>Data Nascimento Cônjuge</label>
                                            <p>{documentos.spouseBirthday}</p>
                                        </div>

                                        <div className="dado">
                                            <label>RG Cônjuge</label>
                                            <p>{documentos.spouseRG}</p>
                                        </div>
                                        <div className="dado">
                                            <label>CPF Cônjuge</label>
                                            <p>{documentos.spouseCPF}</p>
                                        </div>
                                    </div>
                                }

                                <div className="areaDados">

                                    <div className="dado">
                                        <label>Endereço</label>
                                        <p>{documentos.address}, {documentos.number}, {documentos.district}, {documentos.city}, {documentos.state} - Cep: {documentos.cep}</p>
                                    </div>

                                </div>

                            </div>

                            {documentos.photoRGFront &&
                                <div className="container">
                                    <h3>Anexos</h3>
                                    <div className="areaThumbs">

                                        {documentos.photoRGFront && documentos.photoRGFront !== 'refused' &&
                                            <div className="thumbPhoto thumbDoc" style={{ backgroundImage: `url(${documentos.photoRGFront})` }}>
                                                <div className="btnRemove" onClick={() => {
                                                    documentos.photoRGFront = 'refused'
                                                    setDocumentos({ ...documentos });
                                                    console.log(documentos)
                                                }}><i className='bx bx-x'></i></div>
                                            </div>
                                        }

                                        {documentos.photoRGBack && documentos.photoRGBack !== 'refused' &&
                                            <div className="thumbPhoto thumbDoc" style={{ backgroundImage: `url(${documentos.photoRGBack})` }}>
                                                <div className="btnRemove" onClick={() => {
                                                    documentos.photoRGBack = 'refused'
                                                    setDocumentos({ ...documentos });
                                                    console.log(documentos)
                                                }}><i className='bx bx-x'></i></div>
                                            </div>
                                        }

                                        {documentos.photoAddress && documentos.photoAddress !== 'refused' &&
                                            <div className="thumbPhoto thumbDoc" style={{ backgroundImage: `url(${documentos.photoAddress})` }}>
                                                <div className="btnRemove" onClick={() => {
                                                    documentos.photoAddress = 'refused'
                                                    setDocumentos({ ...documentos });
                                                    console.log(documentos)
                                                }}><i className='bx bx-x'></i></div>
                                            </div>
                                        }

                                        {documentos.photoCertificate && documentos.photoCertificate !== 'refused' &&
                                            <div className="thumbPhoto thumbDoc" style={{ backgroundImage: `url(${documentos.photoCertificate})` }}>
                                                <div className="btnRemove" onClick={() => {
                                                    documentos.photoCertificate = 'refused'
                                                    setDocumentos({ ...documentos });
                                                    console.log(documentos)
                                                }}><i className='bx bx-x'></i></div>
                                            </div>
                                        }

                                        {documentos.selfPhotoSmile && documentos.selfPhotoSmile !== 'refused' &&
                                            <div className="thumbPhoto thumbDoc" style={{ backgroundImage: `url(${documentos.selfPhotoSmile})` }}>
                                                <div className="btnRemove" onClick={() => {
                                                    documentos.selfPhotoSmile = 'refused'
                                                    setDocumentos({ ...documentos });
                                                    console.log(documentos)
                                                }}><i className='bx bx-x'></i></div>
                                            </div>
                                        }

                                        {documentos.selfPhotoWithDocument && documentos.selfPhotoWithDocument !== 'refused' &&
                                            <div className="thumbPhoto thumbDoc" style={{ backgroundImage: `url(${documentos.selfPhotoWithDocument})` }}>
                                                <div className="btnRemove" onClick={() => {
                                                    documentos.selfPhotoWithDocument = 'refused'
                                                    setDocumentos({ ...documentos });
                                                    console.log(documentos)
                                                }}><i className='bx bx-x'></i></div>
                                            </div>
                                        }

                                        {documentos.selfPhotoNormal && documentos.selfPhotoNormal !== 'refused' &&
                                            <div className="thumbPhoto thumbDoc" style={{ backgroundImage: `url(${documentos.selfPhotoNormal})` }}>
                                                <div className="btnRemove" onClick={() => {
                                                    documentos.selfPhotoNormal = 'refused'
                                                    setDocumentos({ ...documentos });
                                                    console.log(documentos)
                                                }}><i className='bx bx-x'></i></div>
                                            </div>
                                        }


                                    </div>

                                </div>
                            }
                        </>

                    }


                    <div className="container">
                        <h3>Dados Financiamento <span className="uk-label">Valor Imóvel: <b>{formatReal(simulacao.results?.unit.price)}</b></span></h3>
                        <div className="areaDados">

                            <div className="dado">
                                <label>Entrada / {simulacao.results?.unit.percentageInput}%</label>
                                <p>{formatReal(simulacao.results?.financiamento.entrada.valor)}</p>
                            </div>

                            <div className="dado">
                                <label>Mensal / {simulacao.results?.unit.percentageMonthly}%</label>
                                <p>{formatReal(simulacao.results?.financiamento.mensais.valorTotalMensal)}</p>
                            </div>

                            <div className="dado">
                                <label>Semestral / {simulacao.results?.unit.percentageSemiannual}%</label>
                                <p>{formatReal(simulacao.results?.financiamento.semestrais.valorTotalSemestral)}</p>
                            </div>

                            <div className="dado">
                                <label>Chaves / {simulacao.results?.unit.percentageKeys}%</label>
                                <p>{formatReal(simulacao.results?.financiamento.chaves.valor)}</p>
                            </div>

                        </div>

                    </div>


                    <div className="container">
                        <h3>Descontos Aplicados <span className="uk-label">Total de Desconto: <b>{simulacao.results?.descontos.porcentagemDesconto}</b></span></h3>
                        <div className="areaDados">

                            <div className="dado">
                                <label>Entrada</label>
                                <p>{formatReal(simulacao.results?.descontos.entrada)}</p>
                            </div>

                            <div className="dado">
                                <label>Mensal</label>
                                <p>{formatReal(simulacao.results?.descontos.mensal)}</p>
                            </div>

                            <div className="dado">
                                <label>Semestral</label>
                                <p>{formatReal(simulacao.results?.descontos.semestral)}</p>
                            </div>

                            <div className="dado">
                                <label>Total de Desconto</label>
                                <p>{formatReal(simulacao.results?.descontos.totalDesconto)}</p>
                            </div>

                        </div>
                    </div>

                    {simulacao.proposal &&
                        <div className="container">
                            <h3>Proposta do Cliente</h3>
                            <p className="texto">{simulacao.proposal}</p>
                        </div>
                    }

                    <div className="container">
                        <h3>Mensalidades <span className="uk-label">Nº Parcelas: <b>{simulacao.results?.financiamento.mensais.numParcelas}</b></span></h3>
                        <table className="uk-table uk-table-striped uk-table-small  uk-table-middle">
                            <thead>
                                <tr>
                                    <th>Parcelas</th>
                                    <th width="90">Valores</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    simulacao.results?.financiamento.mensais.mensalidades.map((mensalidade, index) => (
                                        <tr key={index}>
                                            <td><p>{mensalidade.data}</p></td>
                                            <td><p>{formatReal(mensalidade.valor)}</p></td>
                                        </tr>
                                    ))
                                }
                            </tbody>
                        </table>
                    </div>

                    <div className="container">
                        <h3>Semestrais <span className="uk-label">Nº Parcelas: <b>{simulacao.results?.financiamento.semestrais.numParcelas}</b></span></h3>
                        <table className="uk-table uk-table-striped uk-table-small  uk-table-middle">
                            <thead>
                                <tr>
                                    <th>Parcelas</th>
                                    <th width="90">Valores</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    simulacao.results?.financiamento.semestrais.mensalidades.map((mensalidade, index) => (
                                        <tr key={index}>
                                            <td><p>{mensalidade.data}</p></td>
                                            <td><p>{formatReal(mensalidade.valor)}</p></td>
                                        </tr>
                                    ))
                                }
                            </tbody>
                        </table>
                    </div>



                    {
                        simulacao.results?.additionals.length > 0 &&

                        <div className="container">
                            <h3>Adicionais <span className="uk-label">Nº de Itens: <b>{simulacao.results?.additionals.length}</b></span></h3>
                            <table className="uk-table uk-table-striped uk-table-small  uk-table-middle">
                                <thead>
                                    <tr>
                                        <th width="40">Foto</th>
                                        <th>Nome</th>
                                        <th width="90">Preço</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        simulacao.results?.additionals.map((adicional, index) => (
                                            <tr key={index}>
                                                <td><Avatar name={adicional.name} image={adicional.additional.photos[0]} size={38} /></td>
                                                <td>{adicional.name}</td>
                                                <td>{formatReal(adicional.price)}</td>
                                            </tr>
                                        ))
                                    }
                                </tbody>
                            </table>
                        </div>
                    }


                </div>

                <div className="infoLateral">
                    <div className="container">
                        <h3>Status <Status completed={simulacao.complete} canceled={simulacao.canceled} /></h3>

                        <div className="dado">
                            <FieldSelect handleValue={etapaAtual} handleOnChange={(e) => changeEtapa(e.target.value)} label="Alterar Etapa">
                                <option value="">Alterar Etapa</option>
                                {
                                    etapas.map((step, index) => (
                                        <option key={index} value={step.number}>{step.name}</option>
                                    ))
                                }
                            </FieldSelect>
                        </div>

                        <div className="dado">
                            <label>Etapa Atual</label>
                            <div className="itemEtapa">
                                <span className="uk-badge">{simulacao.step.number}</span>
                                <p><b>{simulacao.step.name}</b><br /> <small>{simulacao.step.description}</small></p>
                            </div>
                        </div>

                        {
                            (Object.keys(documentos).length > 0 && simulacao.step.number === '2') &&
                            <>
                                <Fieldset label="" type="text" placeholder="Escreva uma pequena justificativa pela reprovação dos dados enviados." multiline={true} handleValue={documentos.reasonRepprove} handleOnChange={(e) => setDocumentos({ ...documentos, reasonRepprove: e.target.value })} />
                                <ButtonInlineSmall label="Reprovar Documentação" handleOnClick={() => reprovarDocumentos()} />
                            </>
                        }

                        {
                            (Object.keys(documentos).length > 0 && simulacao.step.number === '3') &&
                            <>
                                <ButtonInlineSmall label="Revisar Contrato" handleOnClick={() => setShowModalContract(true)} />
                                <ButtonInlineSmall label="Enviar Contrato p/ Cliente" handleOnClick={() => generateContractPdf()} handleStyle={{ marginTop: '10px' }} />
                                <ButtonInlineSmall label="Download do Contrato" handleOnClick={() => showContractPDF()} handleStyle={{ marginTop: '10px' }} />
                            </>
                        }


                        {
                            (simulacao.step.number === '4' && documentos.contractSignature) &&
                            <>
                                <div className="thumbSignature" style={{ backgroundImage: `url(data:image/png;base64,${documentos.contractSignature})` }}></div>
                                <ButtonInlineSmall label="Confirmar Assinatura" handleOnClick={() => changeEtapa(5)} />
                            </>
                        }




                    </div>
                </div>
            </div>


            {
                showModalContract &&

                <div className="modal">
                    <div className="container animated bounceInUp">
                        <h3><span>Revisar Contrato</span> <BtnIcon icon="close" handleOnClick={() => setShowModalContract(false)} /></h3>
                        <div className="contractCss">
                            <CKEditor data={contractContent} onChange={(e) => {
                                setContractContent(e.editor.getData());
                            }} config={{
                                height: 270
                            }} />
                        </div>

                        <div className="footerModal">
                            <ButtonInline label="Cancelar" handleOnClick={() => setShowModalContract(false)} />
                            <Button label="Salvar Revisão" handleOnClick={() => reviewContract()} />
                        </div>


                    </div>
                </div>
            }

        </Page >
    )
}