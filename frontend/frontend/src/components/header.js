import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useGlobalContext } from "../context/global";
import { useAuthContext } from "../context/auth";

const Header = () => {
    const { themeActive, setThemeActive, menuActive, setMenuActive } = useGlobalContext();
    const { state: authState, dispatch } = useAuthContext();

    useEffect(() => {
        document.body.classList.toggle("active", themeActive);
        return () => {
            document.body.classList.remove("active");
        };
    }, [themeActive]);

    useEffect(() => {
        window.addEventListener("scroll", loadMore);
        return () => {
            window.removeEventListener("scroll", loadMore);
        };
    }, [menuActive]);

    const loadMore = () => {
        menuActive && setMenuActive(false);
    };

    const toggleThemeClass = () => {
        setThemeActive(!themeActive);
    };

    const toggleMenuClass = () => {
        setMenuActive(!menuActive);
    };

    return (
        <header className="header">
            <a href={"/"} className="logo">
                <i className="fas fa-umbrella-beach"></i> MyTravelloo.
            </a>

            <div className="menu">
                <nav
                    className={
                        "navbar " +
                        (themeActive ? "active " : "") +
                        (menuActive ? "nav-toggle" : "")
                    }>
                    <ul>
                        <li>
                            <a href="#home">Home</a>
                        </li>
                        <li>
                            <a href="#packages">Packages</a>
                        </li>
                        <li>
                            <Link to="/get-trips">My Trips</Link>
                        </li>
                        <li>
                            <a href="#services">Services</a>
                        </li>
                        <li>
                            <a href="#review">Reviews</a>
                        </li>
                        <li>
                            <a href="#contact">Contact</a>
                        </li>
                        <li>
                            {authState.isAuth ? (
                                <button
                                    className="btn"
                                    type="button"
                                    style={{ marginTop: "0" }}
                                    onClick={() =>
                                        dispatch({
                                            type: "LOGOUT",
                                        })
                                    }>
                                    Log Out
                                </button>
                            ) : (
                                <Link
                                    to="/login"
                                    className="btn"
                                    style={{ color: "white", marginTop: "0" }}>
                                    Log In / Register
                                </Link>
                            )}
                        </li>
                    </ul>
                </nav>

                <div className="icons">
                    <div
                        className={"fas " + (themeActive ? "fa-sun" : "fa-moon")}
                        id="theme-btn"
                        onClick={toggleThemeClass}></div>
                    <div
                        className={"fas " + (menuActive ? "fa-times" : "fa-bars")}
                        id="menu-btn"
                        onClick={toggleMenuClass}></div>
                </div>
            </div>
        </header>
    );
};

export default Header;
