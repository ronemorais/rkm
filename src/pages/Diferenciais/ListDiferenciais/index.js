import React, {useState, useEffect} from 'react';
import { parseISO, format } from 'date-fns';
import Page from 'components/Templates/Page';
import api from 'services/api';
import { useHistory, Link } from "react-router-dom";
import BtnTitle from 'components/BtnTitle';
import Avatar from 'components/Avatar';
import './style.css';

export default function Diferenciais() {
    const history = useHistory();
    const [diferenciais, setDiferenciais] = useState([]);
    const [isLoading, setIsLoading] = useState(true);


    useEffect(() => {
        const loadDiferenciais = async () => {
            setIsLoading(true);
            try{
                const response = await api.get(`/admin/differentials`);
                setDiferenciais(response.data);
                setIsLoading(false);
            }catch(error){
                setIsLoading(false);
            }
        }
        loadDiferenciais();
    }, []);

    return (
        <Page name="diferenciais" loading={isLoading}>
            <h1>Diferenciais
                <BtnTitle label="Adicionar" iconName="plus-circle" handleOnClick={()=> history.push('/empreendimentos/diferenciais/add') } />
            </h1>

            <div className="container">
                <table className="uk-table uk-table-striped uk-table-small  uk-table-middle">
                <thead>
                    <tr>
                        <th width="80">Ícone</th>
                        <th>Descrição</th>
                        <th width="130">Criado em:</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        diferenciais.map((diferencial, index) => (
                            <tr key={index}>
                                <td><Avatar image={diferencial.icon} size={58} handleClass="iconDiferencial"/></td>
                                <td><Link to={`/empreendimentos/diferenciais/edit/${diferencial._id}`}>{diferencial.description}</Link></td>
                                <td><i className='bx bx-calendar'></i>{format(parseISO(diferencial.createdAt), 'dd/M/Y')}</td>
                            </tr>
                        ))
                    }
                </tbody>
                </table>

            </div>

            
       </Page>
    )
}
