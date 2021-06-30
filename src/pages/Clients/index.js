import React, { useState, useEffect } from 'react';
import Page from 'components/Templates/Page';
import api from 'services/api';
import Avatar from 'components/Avatar';
import './style.css';
import Pagination from "react-js-pagination";
import { useHistory } from "react-router-dom";

export default function Clients() {

    const [clients, setClients] = useState([])
    const [isLoading, setIsLoading] = useState(true);
    const [paginate, setPaginate] = useState({});
    const [page, setPage] = useState(1);
    const history = useHistory();


    useEffect(() => {
        const loadClients = async () => {
            try {
                const response = await api.get(`/admin/clients?page=${page.toString()}`);
                setClients(response.data);
                setIsLoading(false);
                setPaginate(response.paginate);

            } catch (error) {
                setIsLoading(false);
                // setMsg({message: 'Falha ao listar os clientes.', type: 'error'});
                console.log(error)
            }
        }
        loadClients();
    }, [page])


    const removeClient = async (_id) => {
        var response = window.confirm("Removendo o cliente, todos registros relacionados a ele serão removidos. Tem certeza?");
        if (response === true) {
            await api.delete(`/admin/users/${_id}`);
            history.goBack();
        }
    }

    return (
        <Page name="clients" loading={isLoading}>
            <h1>Clientes</h1>

            <div className="container">
                <table className="uk-table uk-table-striped uk-table-small  uk-table-middle">
                    <thead>
                        <tr>
                            <th width="40">Avatar</th>
                            <th>Nome</th>
                            <th>Email</th>
                            <th>Telefone</th>
                            <th>Status</th>
                            <th width="66">#</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            clients.map((client, index) => (
                                <tr key={index}>
                                    <td><Avatar name={client.name} image={client.avatar} size={28} /></td>
                                    <td>{client.name}</td>
                                    <td>{client.email}</td>
                                    <td>{client.phone || '-'}</td>
                                    <td>{client.status || '-'}</td>
                                    <td><div className="btnSmall" onClick={() => removeClient(client._id)}><i className='bx bx-trash'></i> Remover</div></td>
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
                pageRangeDisplayed={Number(paginate.limit)}
                hideFirstLastPages={true}
                onChange={(page) => {
                    setPage(page);
                }}
            />

        </Page>
    )
}
