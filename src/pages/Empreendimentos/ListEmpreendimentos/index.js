import React, {useState, useEffect} from 'react';
import { parseISO, format } from 'date-fns';
import Page from 'components/Templates/Page';
import api from 'services/api';
import Avatar from 'components/Avatar';
import './style.css';
import Pagination from "react-js-pagination";
import { useHistory, Link } from "react-router-dom";
import BtnTitle from 'components/BtnTitle';
import TagActive from 'components/TagActive';

export default function ListEmpreendimentos() {
    const history = useHistory();
    const [empreendimentos, setEmpreendimentos] = useState([])
    const [isLoading, setIsLoading] = useState(true);
    const [paginate, setPaginate] = useState({});
    const [page, setPage] = useState(1);

    useEffect(() => {
        const loadEmpreendimentos = async () => {
            try{
                const response = await api.get(`/admin/enterprises?page=${page.toString()}`);
                setEmpreendimentos(response.data);
                setIsLoading(false);
                setPaginate(response.paginate);
                
            }catch(error){
                setIsLoading(false);
                // setMsg({message: 'Falha ao listar os useres.', type: 'error'});
                console.log(error)
            }
        }
        loadEmpreendimentos();
    }, [page])


    return (
        <Page name="empreendimentos" loading={isLoading}>
            <h1>Empreendimentos
                <BtnTitle label="Adicionar" iconName="plus-circle" handleOnClick={()=> history.push('/empreendimentos/add') } />
            </h1>

            <div className="container">
                <table className="uk-table uk-table-striped uk-table-small  uk-table-middle">
                <thead>
                    <tr>
                        <th width="40">Logo</th>
                        <th>Nome</th>
                        <th>Categoria</th>
                        <th>Início Obra</th>
                        <th>Término Obra</th>
                        <th width="40">Publicado</th>
                        <th width="130">Adicionado em:</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        empreendimentos.map((empreendimento, index) => (
                            <tr key={index}>
                                <td><Avatar name={empreendimento.name} image={empreendimento.logo} size={38} /></td>
                                <td><Link to={`/empreendimentos/edit/${empreendimento._id}`}>{empreendimento.name}</Link></td>
                                <td>{empreendimento.category.name}</td>
                                <td>{empreendimento.start ? <><i className='bx bx-calendar'></i>{format(parseISO(empreendimento.start), 'dd/M/Y')}</> : '-'}</td>
                                <td>{empreendimento.end ? <><i className='bx bx-calendar'></i>{format(parseISO(empreendimento.end), 'dd/M/Y')}</> : '-'}</td>
                                <td align="center"><TagActive active={empreendimento.public} /></td>
                                <td><i className='bx bx-calendar'></i>{format(parseISO(empreendimento.createdAt), 'dd/M/Y')}</td>
                            </tr>
                        ))
                    }
                </tbody>
                </table>
            </div>

            <Pagination
                    innerClass="pagination"
                    activePage={Number(paginate.page)}
                    totalItemsCount={Number(paginate.total)}
                    pageRangeDisplayed={10}
                    hideNavigation={true}
                    hideFirstLastPages={true}
                    onChange={(page) => {
                        setPage(page);
                    }}
                />
            
       </Page>
    )
}
