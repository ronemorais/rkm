import React, {useState, useEffect} from 'react';
import { parseISO, format } from 'date-fns';
import Page from 'components/Templates/Page';
import api from 'services/api';
import { Link } from "react-router-dom";
import Avatar from 'components/Avatar';
import Status from 'components/Status';

export default function ListSimulacoes() {
    const [simulacoes, setSimulacoes] = useState([]);
    const [isLoading, setIsLoading] = useState(true);


    useEffect(() => {
        const loadSimulacoes = async () => {
            setIsLoading(true);
            try{
                const response = await api.get(`/admin/simulations`);
                setSimulacoes(response.data);
                setIsLoading(false);
            }catch(error){
                setIsLoading(false);
            }
        }
        loadSimulacoes();
    }, []);

    return (
        <Page name="simulacoes" loading={isLoading}>
            <h1>Simulações
                {/* <BtnTitle label="Adicionar" iconName="plus-circle" handleOnClick={()=> history.push('/simulacoes/add') } /> */}
            </h1>

            <div className="container">
                <table className="uk-table uk-table-striped uk-table-small  uk-table-middle">
                <thead>
                    <tr>
                        <th>Cliente</th>
                        <th>Empreendimento</th>
                        <th>Unidade</th>
                        <th>Etapa Atual</th>
                        <th>Status  </th>
                        <th width="100">Enviada em:</th>
                        <th width="60">#</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        simulacoes.map((simulacao, index) => (
                            <tr key={index}>
                                <td><div className="info-user"><Avatar name={simulacao.user?.name} image={simulacao.user?.avatar} size={24} /><p>{simulacao.user.name}</p></div></td>
                                <td>{simulacao.results?.unit.enterprise.name}</td>
                                <td>Unid.: {simulacao.results?.unit.number} / Torre: {simulacao.results?.unit.tower}</td>
                                <td><span className="uk-label">{simulacao.step.number}-{simulacao.step.name}</span></td>
                                <td><Status completed={simulacao.complete} canceled={simulacao.canceled}/></td>
                                <td><i className='bx bx-calendar'></i>{format(parseISO(simulacao.createdAt), 'dd/M/Y')}</td>
                                <td><Link className="btnSmall" to={`/simulations/info/${simulacao._id}`}>Acessar</Link></td>
                            </tr>
                        ))
                    }
                </tbody>
                </table>

            </div>

            
       </Page>
    )
}
