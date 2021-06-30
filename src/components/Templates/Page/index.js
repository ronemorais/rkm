import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import logo from 'assets/images/logo_black.jpg';
import { getAuthUser, Logout } from 'services/auth';
import Avatar from 'components/Avatar';
import { useDispatch, useSelector } from 'react-redux';
import Loading from 'components/Loading';

import './style.css';


export default function Page(props) {

    const { name, loading } = props;

    const [showMenu, setShowMenu] = useState(false)
    const [userLogged, setUserLogged] = useState({});
    const [subEmpreendimentos, setSubEmpreendimentos] = useState(false);
    const [subSettings, setSubSettings] = useState(false);

    const logged = useSelector(state => state.loginState.userLogged);
    const dispatch = useDispatch();


    const logout = () => {
        dispatch({ type: 'SET_LOGGED', isLogged: false })
        Logout();
    }

    useEffect(() => {
        const getUserLogged = async () => {
            const user = await getAuthUser()
            setUserLogged(user);
        }
        getUserLogged()
    }, [logged])

    return (
        <>
            <div className="header">
                <img src={logo} alt="Phast" />

                <div className="areaSubMenu">
                    <div className="areaProfile">
                        <div className="infoProfile">
                            <p>{userLogged?.name} <br /> <small>{userLogged?.email}</small></p>
                        </div>
                        <Avatar image={userLogged?.avatar} name={userLogged?.name} size={40} />
                    </div>

                    <div className="submenu animated fadeIn">
                        <Link to="/my-account"><li className={name === 'my-account' ? 'active' : ''}><span>Minha Conta</span><i className='bx bxs-user-detail'></i></li></Link>
                        <Link to="/update-password"><li className={name === 'update-password' ? 'active' : ''}><span>Alterar Senha</span><i className='bx bx-lock-open-alt'></i></li></Link>
                        <a href="/" onClick={logout}><li className={name === 'logout' ? 'active' : ''}><span>Logout</span><i className='bx bx-log-out' ></i></li></a>
                    </div>

                </div>

                <div className="btnMenu animated fadeIn" onClick={() => setShowMenu(!showMenu)}>
                    <i className='bx bx-menu'></i>
                </div>
            </div>

            {
                showMenu &&
                <div className="menuMobi animated fadeIn">
                    <div className="contentAside">
                        <ul>
                            <Link to="/dashboard"><li className={name === 'dashboard' ? 'active' : ''}><i className='bx bxs-dashboard'></i> <span>Dashboard</span></li></Link>
                            <Link to="/simulations"><li className={name === 'simulacoes' ? 'active' : ''}><i className='bx bx-calculator'></i> <span>Simulações</span></li></Link>
                            <Link to="/clients"><li className={name === 'clients' ? 'active' : ''}><i className='bx bx-user'></i> <span>Clientes</span></li></Link>
                            <Link to="/empreendimentos"><li className={name === 'empreendimentos' ? 'active' : ''}><i className='bx bx-buildings'></i><span>Empreendimentos</span></li></Link>
                            <Link to="/empreendimentos/unidades"><li className={name === 'unidades' ? 'active' : ''}><i className='bx bx-home-alt'></i> <span>Unidades</span></li></Link>
                            <Link to="/empreendimentos/categorias"><li className={name === 'categorias' ? 'active' : ''}><i className='bx bx-purchase-tag-alt'></i><span>Categorias</span></li></Link>
                            <Link to="/empreendimentos/diferenciais"><li className={name === 'diferenciais' ? 'active' : ''}><i className='bx bx-star'></i><span>Diferenciais</span></li></Link>
                            <Link to="/empreendimentos/adicionais"><li className={name === 'adicionais' ? 'active' : ''}><i className='bx bx-box'></i><span>Adicionais</span></li></Link>
                            <Link to="/agendamentos"><li className={name === 'agendamentos' ? 'active' : ''}><i className='bx bx-calendar-check'></i><span>Agendamentos</span></li></Link>
                            <Link to="/questions"><li className={name === 'questions' ? 'active' : ''}><i className='bx bx-help-circle' ></i> <span>FAQ</span></li></Link>
                            <Link to="/users"><li className={name === 'users' ? 'active' : ''}><i className='bx bx-group'></i> <span>Usuários</span></li></Link>
                            <Link to="/logs"><li className={name === 'logs' ? 'active' : ''}><i className='bx bx-task' ></i> <span>Logs</span></li></Link>
                            <Link to="/settings"><li className={name === 'settings' ? 'active' : ''}><i className='bx bx-cog'></i> <span>Configurações</span></li></Link>
                            <Link to="/etapas"><li className={name === 'etapas' ? 'active' : ''}><i className='bx bx-cog'></i> <span>Etapas</span></li></Link>
                            <Link to="/profile"><li className={name === 'profile' ? 'active' : ''}><i className='bx bxs-user-detail'></i> <span>Meus Dados</span></li></Link>
                            <Link to="/logout"><li className={name === 'profile' ? 'active' : ''}><i className='bx bx-log-out'></i> <span>Logout</span></li></Link>
                        </ul>
                    </div>
                </div>
            }

            <div className="pagina">
                <div className="aside">
                    <div className="contentAside">
                        <ul>
                            <Link to="/dashboard"><li className={name === 'dashboard' ? 'active' : ''}><i className='bx bxs-dashboard'></i> <span>Dashboard</span></li></Link>
                            <Link to="/simulations"><li className={name === 'simulacoes' ? 'active' : ''}><i className='bx bx-calculator' ></i> <span>Simulações</span></li></Link>
                            <Link to="/clients"><li className={name === 'clients' ? 'active' : ''}><i className='bx bx-user'></i> <span>Clientes</span></li></Link>

                            <li className={subEmpreendimentos || name === 'empreendimentos' ? 'active' : ''} onClick={() => setSubEmpreendimentos(!subEmpreendimentos)}><i className='bx bx-building-house' ></i><span>Empreendimentos</span></li>
                            {subEmpreendimentos &&
                                <ul className="dropMenu animated fadeIn">
                                    <Link to="/empreendimentos"><li className={name === 'empreendimentos' ? 'active' : ''}><i className='bx bx-buildings'></i><span>Empreendimentos</span></li></Link>
                                    <Link to="/empreendimentos/unidades"><li className={name === 'unidades' ? 'active' : ''}><i className='bx bx-home-alt'></i> <span>Unidades</span></li></Link>
                                    <Link to="/empreendimentos/categorias"><li className={name === 'categorias' ? 'active' : ''}><i className='bx bx-purchase-tag-alt'></i><span>Categorias</span></li></Link>
                                    <Link to="/empreendimentos/diferenciais"><li className={name === 'diferenciais' ? 'active' : ''}><i className='bx bx-star'></i><span>Diferenciais</span></li></Link>
                                    <Link to="/empreendimentos/adicionais"><li className={name === 'adicionais' ? 'active' : ''}><i className='bx bx-box'></i><span>Adicionais</span></li></Link>
                                </ul>
                            }

                            <Link to="/agendamentos"><li className={name === 'agendamentos' ? 'active' : ''}><i className='bx bx-calendar-check' ></i> <span>Agendamentos</span></li></Link>
                            <Link to="/questions"><li className={name === 'questions' ? 'active' : ''}><i className='bx bx-help-circle' ></i> <span>FAQ</span></li></Link>
                            <Link to="/users"><li className={name === 'users' ? 'active' : ''}><i className='bx bx-group'></i> <span>Usuários</span></li></Link>
                            <Link to="/logs"><li className={name === 'logs' ? 'active' : ''}><i className='bx bx-task' ></i> <span>Logs</span></li></Link>

                            {/* <Link to="/settings"><li className={name === 'settings' ? 'active' : ''}><i className='bx bx-cog'></i> <span>Configurações</span></li></Link> */}


                            <li className={subSettings || name === 'settings' ? 'active' : ''} onClick={() => setSubSettings(!subSettings)}><i className='bx bx-cog' ></i><span>Configurações</span></li>
                            {subSettings &&
                                <ul className="dropMenu animated fadeIn">
                                    <Link to="/etapas"><li className={name === 'etapas' ? 'active' : ''}><i className='bx bx-stats'></i> <span>Etapas</span></li></Link>
                                    <Link to="/termos"><li className={name === 'termos' ? 'active' : ''}><i className='bx bx-file'></i> <span>Textos, Termos e Políticas</span></li></Link>
                                </ul>
                            }
                        </ul>
                    </div>
                </div>


                <div className="content animated fadeIn">
                    {loading ? <Loading /> : props.children}
                </div>
            </div>
        </>
    );
}