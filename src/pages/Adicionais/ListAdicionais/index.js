import React, {useState, useEffect} from 'react';
import { parseISO, format } from 'date-fns';
import Page from 'components/Templates/Page';
import api from 'services/api';
import { useHistory, Link } from "react-router-dom";
import BtnTitle from 'components/BtnTitle';
import './style.css';

export default function Adicionais() {
    const history = useHistory();
    const [adicionais, setAdicionais] = useState([]);
    const [isLoading, setIsLoading] = useState(true);


    useEffect(() => {
        const loadAdicionais = async () => {
            setIsLoading(true);
            try{
                const response = await api.get(`/admin/additionals`);
                setAdicionais(response.data);
                setIsLoading(false);
            }catch(error){
                setIsLoading(false);
            }
        }
        loadAdicionais();
    }, []);

    return (
        <Page name="adicionais" loading={isLoading}>
            <h1>Adicionais
                <BtnTitle label="Adicionar" iconName="plus-circle" handleOnClick={()=> history.push('/empreendimentos/adicionais/add') } />
            </h1>

            <div className="container">
                <table className="uk-table uk-table-striped uk-table-small  uk-table-middle">
                <thead>
                    <tr>
                        <th>Nome</th>
                        <th>Descrição</th>
                        <th width="130">Criado em:</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        adicionais.map((adicional, index) => (
                            <tr key={index}>
                                <td><Link to={`/empreendimentos/adicionais/edit/${adicional._id}`}>{adicional.name}</Link></td>
                                <td>{adicional.description}</td>
                                <td><i className='bx bx-calendar'></i>{format(parseISO(adicional.createdAt), 'dd/M/Y')}</td>
                            </tr>
                        ))
                    }
                </tbody>
                </table>

            </div>

            
       </Page>
    )
}
