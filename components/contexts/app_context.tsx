import React, { useState } from "react";
import { User } from "../../data/model/user";

export type AppDataContext = {
    // user?: User,
    // setUser: (User) => void,
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
    // user: null,
    // setUser: () => {},
    viewState: ViewState.IDLE,
    setViewState: () => { },
    isMobileSidebarVisible: false,
    setIsMobileSidebarVisible: (boolean) => { }
})

const AppContextProvider = (props) => {
    const [viewState, setViewState] = useState(ViewState.IDLE);
    const [isMobileSidebarVisible, setIsMobileSidebarVisible] = useState(false);

    return (
        <AppContext.Provider
            value={{ viewState, setViewState, 
            isMobileSidebarVisible, setIsMobileSidebarVisible,
             }}>
            {props.children}
        </AppContext.Provider>
    )
}

export { AppContext, AppContextProvider };