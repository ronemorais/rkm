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
    const [description, setDescription] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [msg, setMsg] = useState({message: '', type: ''});


    useEffect(() => {
        const loadPlan = async () => {
            const response = await api.get(`/admin/categories/${_id}`);
            const plan = response.data;
            setName(plan.name);
            setDescription(plan.description);
        }
        loadPlan();
    
        }, [_id])

    

    const editCategoria = async () => {

        setIsLoading(true);

        try{
            await api.put('/admin/categories', {_id, name, description});
            setIsLoading(false);
            setMsg({message:'Categoria alterada com sucesso.', type: 'success'});
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
        var response = window.confirm("Tem certeza que quer remover essa categoria da plataforma?");
        if(response === true){
            await api.delete(`/admin/categories/${_id}`);
            history.goBack();
        }
    }


    return (
        <Page name="assessment-types">
            <h1>
                Editar Categoria
                <BtnTitle label="Voltar" iconName="chevron-left" handleOnClick={()=> history.goBack() } />
                <BtnTitle label="Remover" iconName="trash" iconColor="#e63946" handleOnClick={()=> removePlan() } />
            </h1>


            <div className="informacoes">


                <div className="container">
                    <h3>Informações</h3>
                    <Fieldset label="Nome" type="text" placeholder="Digite um nome para o plano." handleValue={name} handleOnChange={(e) => setName(e.target.value)} />
                    <Fieldset label="Descrição" type="text" placeholder="Digite uma descrição para o plano." multiline={true} handleValue={description} handleOnChange={(e) => setDescription(e.target.value)} />
                </div>

            </div>

            { msg.message ? <Msg type={msg.type} message={msg.message} /> : null}
            
            <div className="areaBtn">
                <Button label="Editar Cateogira" isLoading={isLoading} handleOnClick={editCategoria} handleType="submit" />
            </div>



        </Page>
    )
}
