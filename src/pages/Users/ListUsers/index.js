import React, {useState, useEffect} from 'react';
import { parseISO, format } from 'date-fns';
import Page from 'components/Templates/Page';
import api from 'services/api';
import Avatar from 'components/Avatar';
import './style.css';
import Pagination from "react-js-pagination";
import { useHistory, Link } from "react-router-dom";
import BtnTitle from 'components/BtnTitle';

export default function ListUsers() {
    const history = useHistory();
    const [users, setUsers] = useState([])
    const [isLoading, setIsLoading] = useState(true);
    const [paginate, setPaginate] = useState({});
    const [page, setPage] = useState(1);

    useEffect(() => {
        const loadUsers = async () => {
            try{
                const response = await api.get(`/admin/users?page=${page.toString()}`);
                setUsers(response.data);
                setIsLoading(false);
                setPaginate(response.paginate);
                
            }catch(error){
                setIsLoading(false);
                // setMsg({message: 'Falha ao listar os useres.', type: 'error'});
                console.log(error)
            }
        }
        loadUsers();
    }, [page])


    return (
        <Page name="users" loading={isLoading}>
            <h1>Usuários
                <BtnTitle label="Adicionar" iconName="plus-circle" handleOnClick={()=> history.push('/users/add') } />
            </h1>

            <div className="container">
                <table className="uk-table uk-table-striped uk-table-small  uk-table-middle">
                <thead>
                    <tr>
                        <th width="40">Avatar</th>
                        <th>Nome</th>
                        <th>Email</th>
                        <th width="130">Adicionado em:</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        users.map((user, index) => (
                            <tr key={index}>
                                <td><Avatar name={user.name} image={user.avatar} size={28} /></td>
                                <td><Link to={`/users/edit/${user._id}`}>{user.name}</Link></td>
                                <td>{user.email}</td>
                                <td><i className='bx bx-calendar'></i>{format(parseISO(user.createdAt), 'dd/M/Y')}</td>
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
