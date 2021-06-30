import React, {useState, useEffect} from 'react';
import { parseISO, format } from 'date-fns';
import Page from 'components/Templates/Page';
import api from 'services/api';
import BtnTitle from 'components/BtnTitle';
import { useHistory, Link } from "react-router-dom";

import './style.css';

export default function ListQuestions() {

    const [questions, setQuestions] = useState([])
    const [isLoading, setIsLoading] = useState(true);
    let history = useHistory();

    useEffect(() => {
        const loadQuestions = async () => {
            setIsLoading(true);
            try{
                const response = await api.get(`/admin/questions`);
                setQuestions(response.data);
                setIsLoading(false);
            }catch(error){
                setIsLoading(false);
                // setMsg({message: 'Falha ao listar os questions.', type: 'error'});
            }
        }
        loadQuestions();
    }, [])

    return (
        <Page name="questions" loading={isLoading}>
            <h1>Perguntas Frequentes
                <BtnTitle label="Adicionar" iconName="plus-circle" handleOnClick={()=> history.push('/questions/add') } />
            </h1>

            <div className="container">
                <table className="uk-table uk-table-striped uk-table-small  uk-table-middle">
                <thead>
                    <tr>
                        <th width="400">Pergunta</th>
                        <th>Resposta</th>
                        <th width="130">Criado em:</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        questions.map((question, index) => (
                            <tr key={index}>
                                <td><Link to={`/questions/edit/${question._id}`}>{question.question}</Link></td>
                                <td>{question.response}</td>
                                <td><i className='bx bx-calendar'></i>{format(parseISO(question.createdAt), 'dd/M/Y')}</td>
                            </tr>
                        ))
                    }
                </tbody>
                </table>

            </div>


            
       </Page>
    )
}
