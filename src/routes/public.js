import React from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

//Páginas
import Login from './../pages/Login';
import LembrarSenha from './../pages/LembrarSenha';

export default function Public(){
    return (
        <Router>
            <Switch>
                <Route exact path='/' component={Login} />
                <Route exact path='/lembrar_senha' component={LembrarSenha} />
                <Route path='/*' component={Login} />
            </Switch>
        </Router>
    )
}