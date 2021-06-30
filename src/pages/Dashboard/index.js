import React, { useState, useEffect } from 'react';
import Page from 'components/Templates/Page';
import api from 'services/api';
import Avatar from 'components/Avatar';
import { parseISO, format } from 'date-fns';
import TagActive from 'components/TagActive';
import BtnIcon from 'components/BtnIcon';
import { Link } from "react-router-dom";
import './style.css';
import Status from 'components/Status';

export default function Dashboard() {

    const [dashboard, setDashboard] = useState([])
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {

        const loadDasboard = async () => {
            try {
                const response = await api.get(`/admin/dashboards`);
                console.log(response)
                setDashboard(response);
                setIsLoading(false);
            } catch (error) {
                setIsLoading(false);
                // setMsg({message: 'Falha ao listar os logs.', type: 'error'});
            }
        }
        loadDasboard();

    }, []);


    return (
        <Page name="dashboard" loading={isLoading}>
            <h1>Dashboard</h1>


            <div className="areaInfo areaDashboard">
                <div className="container cardDash">
                    <h3>Clients</h3>
                    <h1>{dashboard.totalClients}<br /><small>Total Cadastrados</small></h1>
                </div>
                <div className="container cardDash">
                    <h3>Simulações</h3>
                    <h1>{dashboard.totalSimulations}<br /><small>Total Realizadas</small></h1>
                </div>
                <div className="container cardDash">
                    <h3>Agendamentos</h3>
                    <h1>{dashboard.totalSchedules}<br /><small>Total Registrados</small></h1>
                </div>
                <div className="container cardDash">
                    <h3>Logs</h3>
                    <h1>{dashboard.totalLogs}<br /><small>Total registrados</small></h1>
                </div>
            </div>

            <br />

            <div className="areaInfo">






                <div className="container cardDash">
                    <h3>Simulações Recentes</h3>
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
                                dashboard?.simulations?.map((simulacao, index) => (
                                    <tr key={index}>
                                        <td><div className="info-user"><Avatar name={simulacao.user?.name} image={simulacao.user?.avatar} size={24} /><p>{simulacao.user.name}</p></div></td>
                                        <td>{simulacao.results?.unit.enterprise.name}</td>
                                        <td>Unid.: {simulacao.results?.unit.number} / Torre: {simulacao.results?.unit.tower}</td>
                                        <td><span className="uk-label">{simulacao.step.number}-{simulacao.step.name}</span></td>
                                        <td><Status completed={simulacao.complete} canceled={simulacao.canceled} /></td>
                                        <td><i className='bx bx-calendar'></i>{format(parseISO(simulacao.createdAt), 'dd/M/Y')}</td>
                                        <td><Link className="btnSmall" to={`/simulations/info/${simulacao._id}`}>Acessar</Link></td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>
                </div>

            </div>

            <br />

            <div className="areaInfo">


                <div className="container cardDash">
                    <h3>Últimos Clientes</h3>
                    <table className="uk-table uk-table-striped uk-table-small  uk-table-middle">
                        <thead>
                            <tr>
                                <th width="20">Avatar</th>
                                <th>Nome</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                dashboard?.clients?.map((patient, index) => (
                                    <tr key={index}>
                                        <td><Avatar name={patient.name} image={patient.picture} size={28} /></td>
                                        <td><p><Link to={`/patients/${patient._id}`}>{patient.name}</Link><br /><small>{patient.email}</small> </p></td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>
                </div>


                <div className="container cardDash">
                    <h3>Últimos Agendamentos</h3>
                    <table className="uk-table uk-table-striped uk-table-small  uk-table-middle">
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Cliente</th>
                                <th>Telefone</th>
                                <th>Unidade</th>
                                <th>Data</th>
                                <th>Status</th>

                            </tr>
                        </thead>
                        <tbody>
                            {
                                dashboard?.schedules?.map((agendamento, index) => (
                                    <tr key={index}>
                                        <td><span className={`dot ${agendamento.status}`}></span></td>
                                        <td><div className="info-user"><Avatar name={agendamento.user?.name} image={agendamento.user?.avatar} size={24} /><p>{agendamento.user.name}</p></div></td>
                                        <td>{agendamento.user.phone}</td>
                                        <td>{agendamento.unit.enterprise.name}/Unid.:{agendamento.unit.number}</td>
                                        <td><i className='bx bx-calendar'></i>{agendamento.date}</td>
                                        <td>{agendamento.status}</td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>
                </div>



            </div>

            <br />

            <div className="container cardDash">
                <h3>Últimos Logs</h3>
                <table className="uk-table uk-table-striped uk-table-small  uk-table-middle">
                    <thead>
                        <tr>
                            <th width="20">#</th>
                            <th>Usuário</th>
                            <th>Descrição</th>
                            <th>Quando?</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            dashboard?.logs?.map((log, index) => {

                                return (
                                    <tr key={index}>
                                        <td><Avatar name={log?.user?.name || '?'} image={log?.user?.avatar} size={28} /></td>
                                        <td><p>{log?.user?.name || 'Usuário não identificado'}</p></td>
                                        <td><p>{log.description}</p></td>
                                        <td><p><i className='bx bx-calendar'></i>{format(parseISO(log.createdAt), 'dd/M/Y')} às {format(parseISO(log.createdAt), 'HH:mm')}hrs</p></td>

                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </table>
            </div>


        </Page>
    )
}
