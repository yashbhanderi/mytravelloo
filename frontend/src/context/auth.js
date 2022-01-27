import React, { useContext } from "react";
import axios from "axios";

export const AppContext = React.createContext();
const baseURL = "https://mytravelloo-backend.herokuapp.com/api/v1/";

const initialState = {
    isAuth: false,
    token: null,
    user_id: 0,
    isAgent: false,
    username: "",
    exp_date: null,
};

const authReducer = (state, action) => {
    switch (action.type) {
        case "LOGGEDIN":
            return {
                ...state,
                isAuth: true,
                token: action.payload.token,
                user_id: action.payload.user.id,
                username: action.payload.user.username,
                isAgent: action.payload.user.isAgent,
                exp_date: action.payload.user.exp,
            };
        case "SIGNUP":
            localStorage.setItem("token", JSON.stringify(action.payload));
            return {
                ...state,
                isAuth: true,
                token: action.payload.token,
                user_id: action.payload.id,
                username: action.payload.username,
                isAgent: action.payload.isAgent,
                exp_date: action.payload.exp,
            };
        case "LOGIN":
            localStorage.setItem("token", JSON.stringify(action.payload));
            return {
                ...state,
                isAuth: true,
                token: action.payload,
                user_id: action.payload.id,
                username: action.payload.username,
                isAgent: action.payload.isAgent,
                exp_date: action.payload.exp,
            };
        case "LOGOUT":
            localStorage.clear();
            return {
                ...state,
                isAuth: false,
                token: null,
                user_id: 0,
                isAgent: false,
                username: "",
                exp_date: null,
            };
        default:
            return state;
    }
};

export const Auth = ({ children }) => {
    const [state, dispatch] = React.useReducer(authReducer, initialState);

    window.addEventListener("load", () => {
        const token = JSON.parse(localStorage.getItem("token") || null);

        if (token) {
            axios
                .post(baseURL + "check-token/", {
                    token: token,
                })
                .then((res) => {
                    dispatch({
                        type: "LOGGEDIN",
                        payload: {
                            token: token,
                            user: res.data.user,
                        },
                    });
                })
                .catch((err) => {
                    dispatch({
                        type: "LOGOUT",
                    });
                });
        }
    });

    return (
        <>
            <AppContext.Provider
                value={{
                    state,
                    dispatch,
                }}>
                {children}
            </AppContext.Provider>
        </>
    );
};

export const useAuthContext = () => {
    return useContext(AppContext);
};

export default Auth;
