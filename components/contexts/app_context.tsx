import React, { useState } from "react";

export type AppDataContext = {
    // user?: User,
    // setUser: (User) => void,
    viewState: ViewState,
    setViewState: (ViewState) => void
}

export enum ViewState {
    IDLE,
    LOADING,
    SUCCESS,
    ERROR
}

const AppContext = React.createContext<AppDataContext>({
    viewState: ViewState.IDLE,
    setViewState: () => { }
})

const AppContextProvider = (props) => {
    const [viewState, setViewState] = useState(ViewState.IDLE);

    return (
        <AppContext.Provider
        value={{ viewState, setViewState }}>
        {props.children}
        </AppContext.Provider>
    )
}

export { AppContext, AppContextProvider };