import { createContext, useContext, useState } from "react";

const MenuHistorianContext = createContext(null)

export function MenuHistorianProvider({ children }) {
    
    const menuItems = [
        { title: "Sources", link: '/sources' },
        { title: "Glossaire", link: '/glossary' },
        { title: "Institutions de recherche", link: '/research-institutions' },
        { title: "Bibliographie", link: '/bibliography' },
    ];

    return (
        <MenuHistorianContext.Provider value={menuItems}>
            { children }
        </MenuHistorianContext.Provider>
    )
}

export function useMenuHistorianContext() {
    return useContext(MenuHistorianContext)
}

export default MenuHistorianContext