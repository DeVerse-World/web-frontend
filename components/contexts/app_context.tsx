import React, { useState } from "react";
import { User } from "../../data/model/user";

export type AppDataContext = {
    user?: User,
    setUser: (User) => void,
}

const AppContext = React.createContext<AppDataContext>({
    user: null,
    setUser: null,
})

const AppContextProvider = (props) => {
    const [user, setUser] = useState(null);

    return (
        <AppContext.Provider
            value={{
                user: user,
                setUser: setUser
            }}>
            {props.children}
        </AppContext.Provider>
    )
}

export { AppContext, AppContextProvider };