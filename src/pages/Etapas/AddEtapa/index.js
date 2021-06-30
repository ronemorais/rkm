import React, { useState } from 'react';
import Page from 'components/Templates/Page';
import Msg from 'components/Msg';
import BtnTitle from 'components/BtnTitle';
import Fieldset from 'components/Fieldset';
import Button from 'components/Button';
import api from 'services/api';
import { useHistory } from "react-router-dom";

import './style.css';

export default function AddEtapa() {

    const history = useHistory();
    const [number, setNumber] = useState('');
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    
    const [isLoading, setIsLoading] = useState(false);
    const [msg, setMsg] = useState({ message: '', type: '' });



    const addEtapa = async () => {

        setIsLoading(true);

        try {
            await api.post('/admin/steps', { name, description, number });
            setIsLoading(false);
            setMsg({ message: 'Etapa adicionada com sucesso.', type: 'success' });
            setName('');
            setDescription('');
            setNumber('');
            
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
        <Page name="assessment-types">
            <h1>
                Adicionar Etapa
                <BtnTitle label="Voltar" iconName="chevron-left" handleOnClick={() => history.goBack()} />
            </h1>


            <div className="informacoes">

                <div className="container">
                    <h3>Informações</h3>
                    <Fieldset label="Número" type="number" placeholder="Digite um número para etapa." handleValue={number} handleOnChange={(e) => setNumber(e.target.value)} />
                    <Fieldset label="Nome" type="text" placeholder="Digite um nome para etapa." handleValue={name} handleOnChange={(e) => setName(e.target.value)} />
                    <Fieldset label="Descrição" type="text" placeholder="Digite uma descrição para etapa." multiline={true} handleValue={description} handleOnChange={(e) => setDescription(e.target.value)} />
                </div>

            </div>

            { msg.message ? <Msg type={msg.type} message={msg.message} /> : null}

            <div className="areaBtnPlan">
                <Button label="Adicionar Etapa" isLoading={isLoading} handleOnClick={addEtapa} handleType="submit" />
            </div>

        </Page>
    )
}
