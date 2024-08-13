import { createContext, useContext, useState } from "react";
import { useTranslation } from "react-i18next";

const LanguageContext = createContext(null)

export function LanguageProvider({ children }) {
    
    const { i18n, t } = useTranslation();
    const [ language, setLanguage ] = useState('fr_FR')

    const changeLanguage = (e) => {
        i18n.changeLanguage(e)
        if (localStorage.getItem('i18nextLng')) {
            setLanguage(e)
        }
    }

    return (
        <LanguageContext.Provider value={{ language, changeLanguage }}>
            { children }
        </LanguageContext.Provider>
    )
}

export function useLanguageContext() {
    return useContext(LanguageContext)
}