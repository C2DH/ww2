import { createContext, useContext, useState } from "react";

const MenuContext = createContext(null)
const MenuSoundContext = createContext(null)

export function MenuProvider({ children }) {
    const [ openMenu, setOpenMenu ] = useState(false)
    const [ isMenuSoundPlay, setIsMenuSoundPlay] = useState(false)

    return (
        
        <MenuContext.Provider value={{ openMenu, setOpenMenu}}>
            <MenuSoundContext.Provider value={{ isMenuSoundPlay, setIsMenuSoundPlay}}>
                { children }
            </MenuSoundContext.Provider>
        </MenuContext.Provider>
    )
}

export function useMenuContext() {
    return useContext(MenuContext)
}

export function useMenuSoundContext() {
    return useContext(MenuSoundContext)
}