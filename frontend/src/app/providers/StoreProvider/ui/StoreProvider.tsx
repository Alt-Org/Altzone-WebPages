import { ReactNode } from "react";
import { Provider } from "react-redux";
import { DeepPartial } from "@reduxjs/toolkit";
import {StateSchema} from "../config/StateSchema";
import {createReduxStore} from "../config/store";

interface StoreProviderProps {
    children?: ReactNode;
    // for testing purposes
    initialState?: DeepPartial<StateSchema>;
}

export const store = createReduxStore();

export const StoreProvider = (props: StoreProviderProps) => {
    const {
        children ,
        // initialState
    } = props;
    // const store = createReduxStore(initialState as StateSchema);
    return <Provider store={store}>{children}</Provider>;
};
