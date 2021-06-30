import React, {useState} from 'react';
import Page from 'components/Templates/Page';

import Msg from 'components/Msg';

import BtnTitle from 'components/BtnTitle';
import Fieldset from 'components/Fieldset';
import Button from 'components/Button';

import api from 'services/api';
import { useHistory } from "react-router-dom";

// import './style.css';

export default function AddQuestion() {

    const history = useHistory();
    
    const [ question, setQuestion ] = useState('');
    const [ response, setResponse ] = useState('');

    const [isLoading, setIsLoading] = useState(false);
    const [msg, setMsg] = useState({message: '', type: ''});
    

    const addQuestion = async () => {
        
        if(!validate() && !isLoading){return};

        setIsLoading(true);

        try{
            await api.post('/admin/questions', {question, response});
            setIsLoading(false);
            setMsg({message:'Pergunta  adicionada com sucesso.', type: 'success'});
            setQuestion('');
            setResponse('');
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
        <Page name="assessment-types">
            <h1>
                Adicionar Pergunta
                <BtnTitle label="Voltar" iconName="chevron-left" handleOnClick={()=> history.goBack() } />
            </h1>


            { msg.message ? <Msg type={msg.type} message={msg.message} /> : null}

            <div className="areaInfo">
                <div className="container cardFull">
                    <Fieldset label="Pergunta" type="text" placeholder="Digite uma pergunta frequente." multiline={true} handleValue={question} handleOnChange={(e) => setQuestion(e.target.value)}/>
                    <Fieldset label="Resposta" type="text" placeholder="Digite uma resposta para essa pergunta." multiline={true} handleValue={response} handleOnChange={(e) => setResponse(e.target.value)}/>
                </div>

            </div>


            <div className="areaBtnTest">
                <Button label="Adicionar Pergunta" isLoading={isLoading} handleOnClick={addQuestion} handleType="submit" />
            </div>

           
            
       </Page>
    )
}
