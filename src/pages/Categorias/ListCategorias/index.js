import React, {useState, useEffect} from 'react';
import { parseISO, format } from 'date-fns';
import Page from 'components/Templates/Page';
import api from 'services/api';
import { useHistory, Link } from "react-router-dom";
import BtnTitle from 'components/BtnTitle';

export default function Categorias() {
    const history = useHistory();
    const [categorias, setCategorias] = useState([]);
    const [isLoading, setIsLoading] = useState(true);


    useEffect(() => {
        const loadCategorias = async () => {
            setIsLoading(true);
            try{
                const response = await api.get(`/admin/categories`);
                setCategorias(response.data);
                setIsLoading(false);
            }catch(error){
                setIsLoading(false);
            }
        }
        loadCategorias();
    }, []);

    return (
        <Page name="categorias" loading={isLoading}>
            <h1>Categorias
                <BtnTitle label="Adicionar" iconName="plus-circle" handleOnClick={()=> history.push('/empreendimentos/categorias/add') } />
            </h1>

            <div className="container">
                <table className="uk-table uk-table-striped uk-table-small  uk-table-middle">
                <thead>
                    <tr>
                        <th width="200">Nome</th>
                        <th>Descrição</th>
                        <th width="130">Criado em:</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        categorias.map((categoria, index) => (
                            <tr key={index}>
                                <td><Link to={`/empreendimentos/categorias/edit/${categoria._id}`}>{categoria.name}</Link></td>
                                <td>{categoria.description}</td>
                                <td><i className='bx bx-calendar'></i>{format(parseISO(categoria.createdAt), 'dd/M/Y')}</td>
                            </tr>
                        ))
                    }
                </tbody>
                </table>

            </div>

            
       </Page>
    )
}
