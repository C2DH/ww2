import { createContext, useContext, useState } from "react";

const SourceContext = createContext(null)

export function SourceProvider({ children }) {
    
    const [ isOpenSource, setIsOpenSource ] = useState(false)

    return (
        <SourceContext.Provider value={{ isOpenSource, setIsOpenSource }}>
            { children }
        </SourceContext.Provider>
    )
}

export function useSourceContext() {
    return useContext(SourceContext)
}

export default SourceContext