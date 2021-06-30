import React, {useState, useEffect} from 'react';
import { useHistory, useParams } from "react-router-dom";

import Page from 'components/Templates/Page';
import Msg from 'components/Msg';
import BtnTitle from 'components/BtnTitle';
import Fieldset from 'components/Fieldset';
import Button from 'components/Button';

import api from 'services/api';


import './style.css';

export default function EditPlan() {

    const history = useHistory();
    const {_id} = useParams();

    const [name, setName] = useState('');
    const [number, setNumber] = useState('');
    const [description, setDescription] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [msg, setMsg] = useState({message: '', type: ''});


    useEffect(() => {
        const loadPlan = async () => {
            const response = await api.get(`/admin/steps/${_id}`);
            const step = response.data;
            setNumber(step.number);
            setName(step.name);
            setDescription(step.description);
        }
        loadPlan();
    
        }, [_id])

    

    const editEtapa = async () => {

        setIsLoading(true);

        try{
            await api.put('/admin/steps', {_id, name, description, number});
            setIsLoading(false);
            setMsg({message:'Etapa alterada com sucesso.', type: 'success'});
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
        var response = window.confirm("Tem certeza que quer remover essa etapa da plataforma?");
        if(response === true){
            await api.delete(`/admin/steps/${_id}`);
            history.goBack();
        }
    }


    return (
        <Page name="assessment-types">
            <h1>
                Editar Etapa
                <BtnTitle label="Voltar" iconName="chevron-left" handleOnClick={()=> history.goBack() } />
                <BtnTitle label="Remover" iconName="trash" iconColor="#e63946" handleOnClick={()=> removePlan() } />
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
            
            <div className="areaBtn">
                <Button label="Editar" isLoading={isLoading} handleOnClick={editEtapa} handleType="submit" />
            </div>



        </Page>
    )
}
