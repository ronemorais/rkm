import React, { useState, useEffect } from 'react';
import { useHistory } from "react-router-dom";

import Page from 'components/Templates/Page';
import Msg from 'components/Msg';
import BtnTitle from 'components/BtnTitle';
import CKEditor from 'ckeditor4-react';
import Button from 'components/Button';
import Fieldset from 'components/Fieldset';

import api from 'services/api';


import './style.css';

export default function EditPlan() {

    const history = useHistory();

    const [termsOfUse, setTermsOfUse] = useState('');
    const [privacyPolicy, setPrivacyPolicy] = useState('');
    const [aboutUs, setAboutUs] = useState('');
    const [numberWhatsApp, setnumberWhatsApp] = useState('');
    const [textWhatsApp, settextWhatsApp] = useState('');

    const [isLoading, setIsLoading] = useState(true);
    const [msg, setMsg] = useState({ message: '', type: '' });


    useEffect(() => {
        const loadSetting = async () => {
            const response = await api.get(`/admin/settings/`);
            const settings = response.data;
            setTermsOfUse(settings.termsOfUse)
            setPrivacyPolicy(settings.privacyPolicy);
            setAboutUs(settings.aboutUs);
            setnumberWhatsApp(settings.numberWhatsApp)
            settextWhatsApp(settings.textWhatsApp)
            setIsLoading(false)
        }
        loadSetting();

    }, [])


    const edit = async () => {

        setIsLoading(true);

        try {
            await api.put('/admin/settings', { termsOfUse, privacyPolicy, aboutUs, numberWhatsApp, textWhatsApp });
            setIsLoading(false);
            setMsg({ message: 'Dados alterados com sucesso.', type: 'success' });
        } catch (error) {
            setIsLoading(false);
            if (error.response?.data.msg) {
                const msg = error.response.data.msg;
                setMsg({ message: msg, type: 'error' });
                return;
            }
            setMsg({ message: 'Falha de conexão.', type: 'error' });
        }
    }

    return (
        <Page name="termos" loading={isLoading} >
            <h1>
                Textos, Políticas e Termos de Uso
                <BtnTitle label="Voltar" iconName="chevron-left" handleOnClick={() => history.goBack()} />
            </h1>


            <div className="informacoes">


                <div className="container">

                    <h3>Watsapp</h3>
                    <Fieldset label="Whatsapp" type="text" placeholder="Somente números" multiline={false} handleValue={numberWhatsApp} handleOnChange={(e) => setnumberWhatsApp(e.target.value)} />
                    <Fieldset label="Mensagem padrão whatsapp" type="text" placeholder="Informe uma mensagem padrão" multiline={true} handleValue={textWhatsApp} handleOnChange={(e) => settextWhatsApp(e.target.value)} />

                    <h3>Termos de Uso</h3>
                    <CKEditor data={termsOfUse} onChange={(e) => {
                        setTermsOfUse(e.editor.getData());
                    }} config={{
                        height: 270
                    }} />

                    <h3>Políticas de Privacidade</h3>
                    <CKEditor data={privacyPolicy} onChange={(e) => {
                        setPrivacyPolicy(e.editor.getData());
                    }} config={{
                        height: 270
                    }} />

                    <h3>Sobre a RKM</h3>
                    <CKEditor data={aboutUs} onChange={(e) => {
                        setAboutUs(e.editor.getData());
                    }} config={{
                        height: 270
                    }} />

                </div>

            </div>

            { msg.message ? <Msg type={msg.type} message={msg.message} /> : null}

            <div className="areaBtn">
                <Button label="Editar" isLoading={isLoading} handleOnClick={edit} handleType="submit" />
            </div>



        </Page>
    )
}
