import React from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

//Páginas
import Dashboard from './../pages/Dashboard';
import Clients from './../pages/Clients';
import Logs from './../pages/Logs';
import Termos from '../pages/Termos';
import MyAccount from './../pages/MyAccount';
import UpdatePassword from './../pages/UpdatePassword';
import Questions from './../pages/Questions/ListQuestions';
import AddQuestion from './../pages/Questions/AddQuestion';
import EditQuestion from './../pages/Questions/EditQuestion';
import Users from './../pages/Users/ListUsers';
import AddUser from './../pages/Users/AddUser';
import EditUser from './../pages/Users/EditUser';

import Categorias from './../pages/Categorias/ListCategorias';
import AddCategoria from './../pages/Categorias/AddCategoria';
import EditCategoria from './../pages/Categorias/EditCategoria';


import Etapas from './../pages/Etapas/ListEtapas';
import AddEtapa from './../pages/Etapas/AddEtapa';
import EditEtapa from './../pages/Etapas/EditEtapa';

import Diferenciais from './../pages/Diferenciais/ListDiferenciais';
import AddDiferencial from './../pages/Diferenciais/AddDiferencial';
import EditDiferencial from './../pages/Diferenciais/EditDiferencial';


import Empreendimentos from './../pages/Empreendimentos/ListEmpreendimentos';
import AddEmpreendimento from './../pages/Empreendimentos/AddEmpreendimento';
import EditEmpreendimento from './../pages/Empreendimentos/EditEmpreendimento';

import Agendamentos from './../pages/Agendamentos/ListAgendamentos';

import Unidades from './../pages/Unidades/ListUnidades';
import AddUnidade from './../pages/Unidades/AddUnidade';
import EditUnidade from './../pages/Unidades/EditUnidade';

import Adicionais from './../pages/Adicionais/ListAdicionais';
import AddAdicional from './../pages/Adicionais/AddAdicional';
import EditAdicional from './../pages/Adicionais/EditAdicional';


import Simulacoes from './../pages/Simulacoes/ListSimulacoes';
import ShowSimulacao from './../pages/Simulacoes/ShowSimulacao';

export default function Private() {
    return (
        <Router>
            <Switch>
                <Route exact path='/dashboard' component={Dashboard} />
                <Route exact path='/clients' component={Clients} />
                <Route exact path='/questions' component={Questions} />
                <Route exact path='/logs' component={Logs} />
                <Route exact path='/termos' component={Termos} />
                <Route exact path='/my-account' component={MyAccount} />
                <Route exact path='/update-password' component={UpdatePassword} />
                <Route exact path='/questions' component={Questions} />
                <Route exact path='/questions/add' component={AddQuestion} />
                <Route exact path='/questions/edit/:_id' component={EditQuestion} />
                <Route exact path='/users' component={Users} />
                <Route exact path='/users/add' component={AddUser} />
                <Route exact path='/users/edit/:_id' component={EditUser} />

                <Route exact path='/empreendimentos/categorias' component={Categorias} />
                <Route exact path='/empreendimentos/categorias/add' component={AddCategoria} />
                <Route exact path='/empreendimentos/categorias/edit/:_id' component={EditCategoria} />

                <Route exact path='/etapas' component={Etapas} />
                <Route exact path='/etapas/add' component={AddEtapa} />
                <Route exact path='/etapas/edit/:_id' component={EditEtapa} />

                <Route exact path='/empreendimentos/diferenciais' component={Diferenciais} />
                <Route exact path='/empreendimentos/diferenciais/add' component={AddDiferencial} />
                <Route exact path='/empreendimentos/diferenciais/edit/:_id' component={EditDiferencial} />

                <Route exact path='/empreendimentos' component={Empreendimentos} />
                <Route exact path='/empreendimentos/add' component={AddEmpreendimento} />
                <Route exact path='/empreendimentos/edit/:_id' component={EditEmpreendimento} />

                <Route exact path='/empreendimentos/unidades' component={Unidades} />
                <Route exact path='/empreendimentos/unidades/add' component={AddUnidade} />
                <Route exact path='/empreendimentos/unidades/edit/:_id' component={EditUnidade} />

                <Route exact path='/empreendimentos/adicionais' component={Adicionais} />
                <Route exact path='/empreendimentos/adicionais/add' component={AddAdicional} />
                <Route exact path='/empreendimentos/adicionais/edit/:_id' component={EditAdicional} />

                <Route exact path='/Agendamentos' component={Agendamentos} />

                <Route exact path='/simulations' component={Simulacoes} />
                <Route exact path='/simulations/info/:_id' component={ShowSimulacao} />




                <Route path='/*' component={Dashboard} />
            </Switch>
        </Router>
    )
}