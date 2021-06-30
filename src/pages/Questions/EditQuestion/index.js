import React, {useState, useEffect} from 'react';
import Page from 'components/Templates/Page';

import Msg from 'components/Msg';

import BtnTitle from 'components/BtnTitle';
import Fieldset from 'components/Fieldset';
import Button from 'components/Button';

import api from 'services/api';
import { useHistory, useParams } from "react-router-dom";

// import './style.css';

export default function EditQuestion() {

    const {_id} = useParams();

    const history = useHistory();
    
    const [ question, setQuestion ] = useState('');
    const [ response, setResponse ] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [msg, setMsg] = useState({message: '', type: ''});

    useEffect(() => {   
        const loadQuestion = async () => {
            let response = await api.get(`/questions/${_id}`)
            let question = response.data;
            setQuestion(question.question);
            setResponse(question.response);
        }
        loadQuestion();
    }, [_id])

    const editQuestion = async () => {
        
        if(!validate() && !isLoading){return};

        setIsLoading(true);

        try{
            await api.put('/admin/questions', {_id, question, response});
            setIsLoading(false);
            setMsg({message:'Pergunta  alterada com sucesso.', type: 'success'});
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


    const removeQuestion = async () => {
        var response = window.confirm("Tem certeza que quer remover esse tipo de avaliação?");
        if(response === true){
            await api.delete(`/admin/questions/${_id}`);
            history.goBack();
        }
    }


    function validate(){
        if(!question){
            setMsg({message: 'Digite uma pergunta.', type: 'warning'});
            return false;
        }

        if(!response){
            setMsg({message: 'Digite uma resposta.', type: 'warning'});
            return false;
        }

        return true;
    }


    return (
        <Page name="questions">
            <h1>
                Adicionar Pergunta
                <BtnTitle label="Voltar" iconName="chevron-left" handleOnClick={()=> history.goBack() } />
                <BtnTitle label="Remover" iconName="trash" iconColor="#e63946" handleOnClick={()=> removeQuestion() } />
            </h1>

            <div className="areaInfo">
                <div className="container cardFull">
                    <Fieldset label="Pergunta" type="text" placeholder="Digite uma pergunta frequente." multiline={true} handleValue={question} handleOnChange={(e) => setQuestion(e.target.value)}/>
                    <Fieldset label="Resposta" type="text" placeholder="Digite uma resposta para essa pergunta." multiline={true} handleValue={response} handleOnChange={(e) => setResponse(e.target.value)}/>
                </div>
            </div>
            
            { msg.message ? <Msg type={msg.type} message={msg.message} /> : null}

            <div className="areaBtnTest">
                <Button label="Editar Pergunta" isLoading={isLoading} handleOnClick={editQuestion} handleType="submit" />
            </div>

           
            
       </Page>
    )
}
