import React from "react";
import { Link } from "react-router-dom";

const Error = () => {
    return (
        <div>
            <h1>Error 404 - Page Not Found !</h1> <hr />
            &nbsp;
            <Link exact to="/">
                <button className="btn btn-primary sm">Home</button>
            </Link>
        </div>
    );
};

export default Error;
