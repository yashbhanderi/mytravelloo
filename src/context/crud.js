import React, { useEffect, useContext, useReducer } from "react";
import axios from "axios";
import { useAuthContext } from "./auth";

const baseURL = "https://mytravelloo-backend.herokuapp.com/api/v1/";

export const CrudContext = React.createContext();

const initialState = {
    destination_group: [],
    destination_list: [],
    destination: {},
    trips: [],
    date_check_msg: "",
    payment_check_msg: "",
    get_mail_msg: "",
    isFetching: false,
    hasError: false,
};

const CrudReducer = (state, action) => {
    switch (action.type) {
        // GET - Destination Group
        case "FETCH_DEST_GRP_REQUEST":
            return {
                ...state,
                isFetching: true,
                hasError: false,
            };
        case "FETCH_DEST_GRP_SUCCESS":
            return {
                ...state,
                isFetching: false,
                destination_group: [...state.destination_group, ...action.payload],
            };
        case "FETCH_DEST_GRP_FAILURE":
            return {
                ...state,
                hasError: true,
                isFetching: false,
            };

        // GET - Destination List
        case "FETCH_DEST_LIST_REQUEST":
            return {
                ...state,
                isFetching: true,
                hasError: false,
            };
        case "FETCH_DEST_LIST_SUCCESS":
            return {
                ...state,
                isFetching: false,
                destination_list: action.payload,
            };
        case "FETCH_DEST_LIST_FAILURE":
            return {
                ...state,
                hasError: true,
                isFetching: false,
            };

        // GET - Destination
        case "FETCH_DESTINATION_REQUEST":
            return {
                ...state,
                isFetching: true,
                hasError: false,
            };
        case "FETCH_DESTINATION_SUCCESS":
            return {
                ...state,
                isFetching: false,
                destination: action.payload,
            };
        case "FETCH_DESTINATION_FAILURE":
            return {
                ...state,
                hasError: true,
                isFetching: false,
            };

        // POST - CHECK DATE
        case "FETCH_CHECK_DATE_REQUEST":
            return {
                ...state,
                isFetching: true,
                hasError: false,
            };
        case "FETCH_CHECK_DATE_SUCCESS":
            return {
                ...state,
                isFetching: false,
                date_check_msg: action.payload,
            };
        case "FETCH_CHECK_DATE_FAILURE":
            return {
                ...state,
                hasError: true,
                isFetching: false,
            };

        // POST - CHECK PAYEMENT
        case "FETCH_PAYMENT_REQUEST":
            return {
                ...state,
                isFetching: true,
                hasError: false,
            };
        case "FETCH_PAYMENT_SUCCESS":
            return {
                ...state,
                isFetching: false,
                payment_check_msg: `${action.payload} + Thank you.\nDetails of the packages and tickets have sent to your mail \nYou will be redirect to home page.`,
            };
        case "FETCH_PAYMENT_FAILURE":
            return {
                ...state,
                payment_check_msg: action.payload,
                hasError: true,
                isFetching: false,
            };

        // GET - TRIP DETAILS
        case "FETCH_TRIPS_REQUEST":
            return {
                ...state,
                isFetching: true,
                hasError: false,
            };
        case "FETCH_TRIPS_SUCCESS":
            return {
                ...state,
                isFetching: false,
                trips: action.payload,
            };
        case "FETCH_TRIPS_FAILURE":
            return {
                ...state,
                hasError: true,
                isFetching: false,
            };

        // GET - MAIL
        case "FETCH_MAIL_REQUEST":
            return {
                ...state,
                isFetching: true,
                hasError: false,
            };
        case "FETCH_MAIL_SUCCESS":
            return {
                ...state,
                hasError: false,
                isFetching: false,
                get_mail_msg: action.payload,
            };
        case "FETCH_MAIL_FAILURE":
            return {
                ...state,
                hasError: true,
                isFetching: false,
                get_mail_msg: action.payload,
            };

        default:
            return state;
    }
};

export const CRUD = ({ children }) => {
    const { state: authState } = useAuthContext();
    const [state, dispatch] = useReducer(CrudReducer, initialState);

    useEffect(() => {
        dispatch({
            type: "FETCH_DEST_GRP_REQUEST",
        });
        axios
            .get(baseURL + "get-destination-group/")
            .then((res) => {
                dispatch({
                    type: "FETCH_DEST_GRP_SUCCESS",
                    payload: res.data.data,
                });
            })
            .catch((err) => {
                dispatch({
                    type: "FETCH_DEST_GRP_FAILURE",
                    payload: "Some Error Occured. Please Refresh the page.",
                });
            });
    }, []);

    const get_destination_list = (state_name) => {
        dispatch({
            type: "FETCH_DEST_LIST_REQUEST",
        });
        axios
            .post(baseURL + "get-destination-list/", { state: state_name })
            .then((res) => {
                dispatch({
                    type: "FETCH_DEST_LIST_SUCCESS",
                    payload: res.data.state,
                });
            })
            .catch((err) => {
                dispatch({
                    type: "FETCH_DEST_LIST_FAILURE",
                });
            });
    };

    const get_destination = (dest_id) => {
        axios
            .get(baseURL + "get-destination/" + dest_id + "/")
            .then((res) => {
                dispatch({
                    type: "FETCH_DESTINATION_SUCCESS",
                    payload: res.data.destination,
                });
            })
            .catch((err) => {
                dispatch({
                    type: "FETCH_DESTINATION_FAILURE",
                    payload: "Some error occured. Please refresh and try again !",
                });
            });
    };

    const check_date_booking = (dest_id, date, required) => {
        dispatch({
            type: "FETCH_CHECK_DATE_REQUEST",
        });
        axios
            .post(baseURL + "check-date/", {
                dest_id: dest_id,
                date: date,
                required: required,
            })
            .then((res) => {
                dispatch({
                    type: "FETCH_CHECK_DATE_SUCCESS",
                    payload: res.data.msg,
                });
            })
            .catch((err) => {
                dispatch({
                    type: "FETCH_CHECK_DATE_FAILURE",
                    payload: "Some error occured. Please refresh and try again !",
                });
            });
    };

    const check_payment = (data, tripData) => {
        dispatch({
            type: "FETCH_PAYMENT_REQUEST",
        });
        axios
            .post(baseURL + "payment/", {
                card_no: data.card_no,
                cvv_no: data.cvv_no,
                expiry_date: data.expiry_date,
                name: data.name,
                tripData: tripData,
                customer_id: authState.user_id,
            })
            .then((res) => {
                dispatch({
                    type: "FETCH_PAYMENT_SUCCESS",
                    payload: res.data.msg,
                });
            })
            .catch((err) => {
                dispatch({
                    type: "FETCH_PAYMENT_FAILURE",
                    payload:
                        "Payment Failed or Incorrect Information or Server Error\n You will be redirect to the home page",
                });
            });
    };

    const get_trips = () => {
        dispatch({
            type: "FETCH_TRIPS_REQUEST",
        });

        let user_id = authState.isAuth ? JSON.parse(localStorage.getItem("token"))["id"] : null;

        user_id &&
            axios
                .post(baseURL + "get-trips/", {
                    customer_id: user_id,
                })
                .then((res) => {
                    dispatch({
                        type: "FETCH_TRIPS_SUCCESS",
                        payload: res.data.trips,
                    });
                })
                .catch((err) => {
                    dispatch({
                        type: "FETCH_TRIPS_FAILURE",
                        payload: "Some error occured, Please try after some time!",
                    });
                });
    };

    const get_mail = (trip_id) => {
        dispatch({
            type: "FETCH_MAIL_REQUEST",
        });
        axios
            .post(baseURL + "get-mail/", {
                trip_id: trip_id,
            })
            .then((res) => {
                dispatch({
                    type: "FETCH_MAIL_SUCCESS",
                    payload: res.data.msg,
                });
            })
            .catch((err) => {
                dispatch({
                    type: "FETCH_MAIL_FAILURE",
                    payload: "Some error occured, Please try again!",
                });
            });
    };

    return (
        <>
            <CrudContext.Provider
                value={{
                    state,
                    dispatch,
                    get_destination_list,
                    get_destination,
                    check_date_booking,
                    check_payment,
                    get_trips,
                    get_mail,
                }}>
                {children}
            </CrudContext.Provider>
        </>
    );
};

export const useCrudContext = () => {
    return useContext(CrudContext);
};

export default CRUD;
