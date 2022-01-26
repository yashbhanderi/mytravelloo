import React from "react";
import { Switch, Route } from "react-router";
import "./css/style.css";

//Pages and Components
import Home from "./views/app/home";
import Login from "./views/auth/login";
import Signup from "./views/auth/signup";
import Error from "./views/app/error";
import DestinationList from "./components/destination_list";
import Destination from "./components/destination";
import Tripdetails from "./components/tripdetails";
import Payment from "./components/payment";
import DestinationPackage from "./components/destination_package";
import Trips from "./components/trips";

const App = () => {
    return (
        <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/signup" component={Signup} />
            <Route exact path="/get-trips" component={Trips} />
            <Route
                exact
                path="/get-destination-package/:state__name"
                component={DestinationPackage}
            />
            <Route exact path="/get-destination-list/:dest__name" component={DestinationList} />
            <Route exact path="/get-destination/:dest__name/:dest__id" component={Destination} />
            <Route exact path="/get-trip-details/:dest__name/:dest__id" component={Tripdetails} />
            <Route
                exact
                path="/get-trip-details/:dest__name/:dest__id/payment"
                component={Payment}
            />
            <Route component={Error} />
        </Switch>
    );
};

export default App;
