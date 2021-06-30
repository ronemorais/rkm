import React, { useState, useEffect } from 'react';
import { parseISO, format } from 'date-fns';
import Page from 'components/Templates/Page';
import api from 'services/api';
import './style.css';
import Pagination from "react-js-pagination";
import { useHistory, Link } from "react-router-dom";
import BtnTitle from 'components/BtnTitle';
import TagActive from 'components/TagActive';

export default function ListUnidades() {
    const history = useHistory();
    const [unidades, setUnidades] = useState([])
    const [isLoading, setIsLoading] = useState(true);
    const [paginate, setPaginate] = useState({});
    const [page, setPage] = useState(1);

    useEffect(() => {
        const loadUnidades = async () => {
            try {
                const response = await api.get(`/admin/units`);
                setUnidades(response.data);
                setIsLoading(false);
                setPaginate(response.paginate);
                console.log(response)

            } catch (error) {
                setIsLoading(false);
                console.log(error)
            }
        }
        loadUnidades();
    }, [page])


    return (
        <Page name="unidades" loading={isLoading}>
            <h1>Unidades
                <BtnTitle label="Adicionar" iconName="plus-circle" handleOnClick={() => history.push('/empreendimentos/unidades/add')} />
            </h1>

            <div className="container">
                <table className="uk-table uk-table-striped uk-table-small  uk-table-middle">
                    <thead>
                        <tr>
                            <th>Nome</th>
                            <th>Empreendimento</th>
                            <th>Reservado</th>
                            <th>Vendido</th>
                            <th width="40">Publicado</th>
                            <th width="130">Adicionado em:</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            unidades.map((unidade, index) => (
                                <tr key={index}>
                                    <td><Link to={`/empreendimentos/unidades/edit/${unidade._id}`}>Unidade - {unidade.number}</Link></td>
                                    <td>{unidade.enterprise.name}</td>
                                    <td align="center"><TagActive active={unidade.reserved} /></td>
                                    <td align="center"><TagActive active={unidade.sold} /></td>
                                    <td align="center"><TagActive active={unidade.public} /></td>
                                    <td><i className='bx bx-calendar'></i>{format(parseISO(unidade.createdAt), 'dd/M/Y')}</td>
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
