import React, { useState, useEffect } from 'react';
import { parseISO, format } from 'date-fns';
import Page from 'components/Templates/Page';
import api from 'services/api';
import Avatar from 'components/Avatar';
import FieldSelect from 'components/FieldSelect';
import Msg from 'components/Msg';

export default function Agendamentos() {
    const [agendamentos, setAgendamentos] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [msg, setMsg] = useState({ message: '', type: '' });


    useEffect(() => {
        const loadAgendamentos = async () => {
            setIsLoading(true);
            try {
                const response = await api.get(`/admin/schedules`);
                setAgendamentos(response.data);
                setIsLoading(false);
            } catch (error) {
                setIsLoading(false);
            }
        }
        loadAgendamentos();
    }, []);

    const reloadAgendamentos = async () => {
        setIsLoading(true);
        try {
            const response = await api.get(`/admin/schedules`);
            setAgendamentos(response.data);
            setIsLoading(false);
        } catch (error) {
            setIsLoading(false);
        }
    }



    const alterarAgendamento = async (agendamentoId, status) => {
        var confirm = window.confirm("Tem certeza que quer alterar o status do agendamento?");
        if (!confirm) return;
        try {
            await api.put(`admin/schedules`, { _id: agendamentoId, status });
            setMsg({ message: 'Status alterado.', type: 'success' });
            reloadAgendamentos();
        } catch (error) {
            if (error.response?.data.msg) {
                const msg = error.response.data.msg;
                setMsg({ message: msg, type: 'error' });
                return;
            }
            setMsg({ message: 'Falha de conexão.', type: 'error' });
        }
    }




    return (
        <Page name="agendamentos" loading={isLoading}>
            <h1>Agendamentos</h1>
            { msg.message ? <Msg type={msg.type} message={msg.message} /> : null}

            <div className="container">
                <table className="uk-table uk-table-striped uk-table-small  uk-table-middle">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Cliente</th>
                            <th>Telefone</th>
                            <th>Unidade</th>
                            <th>Data</th>
                            <th width="130">Criado em:</th>
                            <th>Status</th>

                        </tr>
                    </thead>
                    <tbody>
                        {
                            agendamentos.map((agendamento, index) => (
                                <tr key={index}>
                                    <td><span className={`dot ${agendamento.status}`}></span></td>
                                    <td><div className="info-user"><Avatar name={agendamento.user?.name} image={agendamento.user?.avatar} size={24} /><p>{agendamento.user.name}</p></div></td>
                                    <td>{agendamento.user.phone}</td>
                                    <td>{agendamento.unit.enterprise.name}/Unid.:{agendamento.unit.number}</td>
                                    <td><i className='bx bx-calendar'></i>{agendamento.date}</td>
                                    <td><i className='bx bx-calendar'></i>{format(parseISO(agendamento.createdAt), 'dd/M/Y')}</td>
                                    <td>
                                        <FieldSelect handleValue={agendamento.status} handleOnChange={(e) => {
                                            alterarAgendamento(agendamento._id, e.target.value)
                                        }}>
                                            <option value="open">Em Aberto</option>
                                            <option value="canceled">Cancelado</option>
                                            <option value="done">Concluído</option>
                                            <option value="confirm">Confirmado</option>
                                        </FieldSelect>
                                    </td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>

            </div>


        </Page>
    )
}
