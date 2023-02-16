import { RemoteConfig } from "firebase/remote-config";
import React, { useEffect, useState } from "react";
import { User } from "../../data/model/user";
import FirebaseService from "../../data/services/FirebaseService";
import StorageService from "../../data/services/StorageService"
export type AppDataContext = {
    user?: User,
    setUser: (User) => void,
    viewState: ViewState,
    setViewState: (ViewState) => void,
    showLogin: boolean,
    setShowLogin: (boolean) => void,
    remoteConfig: RemoteConfig
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
    const [remoteConfig, setRemoteConfig] = useState<RemoteConfig>(null);
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
    const [viewState, setViewState] = useState(ViewState.IDLE);
    const [showLogin, setShowLogin] = useState(false);

    useEffect(() => {
        const cachedUser = StorageService.getUser();
        setUser(cachedUser || null)
        FirebaseService.retrieveConfig().then(setRemoteConfig)
    }, [])

    useEffect(() => {
        StorageService.saveUser(user);
        setIsAuthenticated(user != null)
    }, [user])

    useEffect(() => {
        if (isAuthenticated) {
            FirebaseService.getBlogPostAdmins().then(val => {
                user.isBlogPostAdmin = val.includes(user.wallet_address.toUpperCase())
                setUser(user);
            })
        }
    }, [isAuthenticated])

    return (
        <AppContext.Provider
            value={{
                user, setUser, viewState, setViewState,
                showLogin, setShowLogin, remoteConfig
            }}>
            {props.children}
        </AppContext.Provider>
    )
}

export { AppContext, AppContextProvider };