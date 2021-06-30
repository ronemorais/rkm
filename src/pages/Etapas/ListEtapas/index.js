import React, {useState, useEffect} from 'react';
import { parseISO, format } from 'date-fns';
import Page from 'components/Templates/Page';
import api from 'services/api';
import { useHistory, Link } from "react-router-dom";
import BtnTitle from 'components/BtnTitle';

export default function Etapas() {
    const history = useHistory();
    const [etapas, setEtapas] = useState([]);
    const [isLoading, setIsLoading] = useState(true);


    useEffect(() => {
        const loadEtapas = async () => {
            setIsLoading(true);
            try{
                const response = await api.get(`/admin/steps`);
                setEtapas(response.data);
                setIsLoading(false);
            }catch(error){
                setIsLoading(false);
            }
        }
        loadEtapas();
    }, []);

    return (
        <Page name="etapas" loading={isLoading}>
            <h1>Etapas
                <BtnTitle label="Adicionar" iconName="plus-circle" handleOnClick={()=> history.push('/etapas/add') } />
            </h1>

            <div className="container">
                <table className="uk-table uk-table-striped uk-table-small  uk-table-middle">
                <thead>
                    <tr>
                        <th>Nº</th>
                        <th width="200">Nome</th>
                        <th>Descrição</th>
                        <th width="130">Criado em:</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        etapas.map((etapa, index) => (
                            <tr key={index}>
                                <td>{etapa.number }</td>
                                <td><Link to={`/etapas/edit/${etapa._id}`}>{etapa.name}</Link></td>
                                <td>{etapa.description}</td>
                                <td><i className='bx bx-calendar'></i>{format(parseISO(etapa.createdAt), 'dd/M/Y')}</td>
                            </tr>
                        ))
                    }
                </tbody>
                </table>

            </div>

            
       </Page>
    )
}
