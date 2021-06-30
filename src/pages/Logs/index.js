import React, {useState, useEffect} from 'react';
import { parseISO, format } from 'date-fns';
import Page from 'components/Templates/Page';
import api from 'services/api';
import Avatar from 'components/Avatar';
import Pagination from "react-js-pagination";
import './style.css';

export default function Logs() {

    const [logs, setLogs] = useState([])
    const [isLoading, setIsLoading] = useState(true);
    const [paginate, setPaginate] = useState({});
    const [page, setPage] = useState(1);


    useEffect(() => {
        const loadLogs = async () => {
            setIsLoading(true);
            try{
                const response = await api.get(`/admin/logs?page=${page.toString()}`);
                setLogs(response.data);
                setIsLoading(false);
                setPaginate(response.paginate);
            }catch(error){
                setIsLoading(false);
                // setMsg({message: 'Falha ao listar os logs.', type: 'error'});
            }
        }
        loadLogs();
    }, [page])

    return (
        <Page name="logs" loading={isLoading}>
            <h1>Logs</h1>

            <div className="container">
                <table className="uk-table uk-table-striped uk-table-small  uk-table-middle">
                <thead>
                    <tr>
                        <th width="40">Avatar</th>
                        <th>Usuário</th>
                        <th>Ação</th>
                        <th width="130">Data</th>
                        <th width="120">Hora</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        logs.map((log, index) => (
                            <tr key={index}>
                                <td><Avatar name={log.user?.name} image={log.user?.avatar} size={28} /></td>
                                <td>{log?.user?.name}</td>
                                <td>{log?.description}</td>
                                <td><i className='bx bx-calendar'></i>{format(parseISO(log.createdAt), 'dd/M/Y')}</td>
                                <td><i className='bx bx-time'></i>{format(parseISO(log.createdAt), 'HH:mm')}hrs</td>
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
