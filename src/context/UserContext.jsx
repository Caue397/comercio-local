import { createContext, useState } from "react"

export const UserContext = createContext()

export function UserContextProvider({ children }) {
    const [ userData, setUserData ] = useState({
        isLogged: false,
        id: '',
        email: '',
        name: '',
        whatsapp: 0
    })

    const user = {
        userData,
        setUserData
    }

    return (
        <UserContext.Provider value={user}>
            {children}
        </UserContext.Provider>
    )
}