import React, { useState, useContext, useEffect } from "react";

export const globalContext = React.createContext();

const Global = ({ children }) => {
    const [themeActive, setThemeActive] = useState(false);
    const [menuActive, setMenuActive] = useState(false);
    const [scrollLoad, setScrollLoad] = useState(false);
    const [tripDetails, setTripDetails] = useState({});
    const [showMessage, setShowMessage] = useState(false);

    useEffect(() => {
        showMessage && setTimeout(() => setShowMessage(false), 7000);
    }, [showMessage]);

    return (
        <globalContext.Provider
            value={{
                themeActive,
                setThemeActive,
                menuActive,
                setMenuActive,
                scrollLoad,
                setScrollLoad,
                tripDetails,
                setTripDetails,
                showMessage,
                setShowMessage,
            }}>
            {children}
        </globalContext.Provider>
    );
};

export const useGlobalContext = () => {
    return useContext(globalContext);
};

export default Global;
