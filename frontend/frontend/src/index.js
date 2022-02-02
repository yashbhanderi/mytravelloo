import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter as Router } from "react-router-dom";
import Auth from "./context/auth";
import CRUD from "./context/crud";
import Global from "./context/global";

ReactDOM.render(
    <React.StrictMode>
        <Global>
            <Auth>
                <CRUD>
                    <Router>
                        <App />
                    </Router>
                </CRUD>
            </Auth>
        </Global>
    </React.StrictMode>,
    document.getElementById("root")
);

reportWebVitals();
