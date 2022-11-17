import React, { useEffect, useState } from "react";
import { User } from "../../data/model/user";
import FirebaseService from "../../data/services/FirebaseService";
import StorageService from "../../data/services/StorageService"
export type AppDataContext = {
    user?: User,
    setUser: (User) => void,
    viewState: ViewState,
    setViewState: (ViewState) => void,
    isMobileSidebarVisible: boolean,
    setIsMobileSidebarVisible: (boolean) => void,
    showLogin: boolean,
    setShowLogin: (boolean) => void,
}

export enum ViewState {
    IDLE,
    LOADING,
    SUCCESS,
    ERROR
}

const AppContext = React.createContext<AppDataContext>({
})

const AppContextProvider = (props) => {
    const [user, setUser] = useState<User>(null);
    const [viewState, setViewState] = useState(ViewState.IDLE);
    const [showLogin, setShowLogin] = useState(false);
    const [isMobileSidebarVisible, setIsMobileSidebarVisible] = useState(false);

    useEffect(() => {
        const cachedUser = StorageService.getUser();
        if (cachedUser != null) {
            FirebaseService.getBlogPostAdmins().then(val => {
                cachedUser.isBlogPostAdmin = val.includes(cachedUser.wallet_address.toUpperCase())
                setUser(cachedUser || null);
            })
        } else {
            setUser(null);
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
                showLogin, setShowLogin
            }}>
            {props.children}
        </AppContext.Provider>
    )
}

export { AppContext, AppContextProvider };