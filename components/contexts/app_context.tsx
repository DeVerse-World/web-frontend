import React, { useEffect, useState } from "react";
import { User } from "../../data/model/user";
import StorageService from "../../data/services/storage_service"
export type AppDataContext = {
    user?: User,
    setUser: (User) => void,
    viewState: ViewState,
    setViewState: (ViewState) => void,
    isMobileSidebarVisible: boolean,
    setIsMobileSidebarVisible: (boolean) => void
}

export enum ViewState {
    IDLE,
    LOADING,
    SUCCESS,
    ERROR
}

const AppContext = React.createContext<AppDataContext>({
    user: null,
    setUser: () => { },
    viewState: ViewState.IDLE,
    setViewState: () => { },
    isMobileSidebarVisible: false,
    setIsMobileSidebarVisible: (boolean) => { }
})

const AppContextProvider = (props) => {
    const [user, setUser] = useState<User>(null);
    const [viewState, setViewState] = useState(ViewState.IDLE);
    const [isMobileSidebarVisible, setIsMobileSidebarVisible] = useState(false);

    useEffect(() => {
        let user = StorageService.getUser();
        if (user != null) {
            setUser(user);
        }
    }, [])

    useEffect(() => {
        StorageService.saveUser(user);
    }, [user])

    return (
        <AppContext.Provider
            value={{
                user, setUser, viewState, setViewState,
                isMobileSidebarVisible, setIsMobileSidebarVisible,
            }}>
            {props.children}
        </AppContext.Provider>
    )
}

export { AppContext, AppContextProvider };