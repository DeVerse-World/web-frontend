import { RemoteConfig } from "firebase/remote-config";
import React, { useEffect, useState } from "react";
import { User } from "../../data/model/user";
import FirebaseService from "../../data/services/FirebaseService";
import StorageService from "../../data/services/StorageService"
export type AppDataContext = {
    user?: User,
    setUser: (arg: User) => void,
    viewState: ViewState,
    setViewState: (arg: ViewState) => void,
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

    useEffect(() => {
        const cachedUser = StorageService.getUser();
        if (!user && cachedUser) {
            setUser(cachedUser);
            setIsAuthenticated(cachedUser != null);
        }
        FirebaseService.retrieveConfig().then(setRemoteConfig)
    }, [])

    // When the user changes, we update the local storage accordingly.
    useEffect(() => {
        if (!user) return;

        const cachedUser = StorageService.getUser();
        if (
            (!cachedUser) ||
            (cachedUser && cachedUser.id !== user.id)
        ){
            StorageService.saveUser(user);
            setIsAuthenticated(user != null);
        }
    }, [user])

    useEffect(() => {
        if (isAuthenticated) {
            FirebaseService.getBlogPostAdmins().then(val => {
                user.isBlogPostAdmin = val.includes(user.wallet_address.toUpperCase())
                setUser(user);
            })
        }
    }, [isAuthenticated])

    const logOutUser = () => {
        StorageService.saveUser(null);
        setUser(null);
        setIsAuthenticated(false);
    }

    return (
        <AppContext.Provider
            value={{
                user, setUser, logOutUser, viewState, setViewState, remoteConfig
            }}>
            {props.children}
        </AppContext.Provider>
    )
}

export { AppContext, AppContextProvider };