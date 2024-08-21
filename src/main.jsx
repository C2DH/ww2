import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { BrowserRouter } from "react-router-dom";
import '../src/assets/scss/app.scss'
import { SharedStateProvider } from './contexts/SharedStateProvider.jsx';
import i18n from '../i18n.js';

ReactDOM.createRoot(document.getElementById('root')).render(
    // <React.StrictMode>
        <SharedStateProvider>
            <BrowserRouter>
                <App/>
            </BrowserRouter>
        </SharedStateProvider>
    // </React.StrictMode>
)
