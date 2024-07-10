import { createContext, useContext, useState } from "react";

const MenuContext = createContext(null)

export function MenuProvider({ children }) {
    const [ openMenu, setOpenMenu ] = useState(false)

    return (
        <MenuContext.Provider value={{ openMenu, setOpenMenu}}>
            { children }
        </MenuContext.Provider>
    )
}

export function useMenuContext() {
    return useContext(MenuContext)
}