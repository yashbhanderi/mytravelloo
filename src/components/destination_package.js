import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useCrudContext } from "../context/crud";

const DestinationPackage = (props) => {
    const { state: crudState, get_destination_list } = useCrudContext();
    const state_name = props.match.params.state__name;

    var distinct_list = [
        ...new Map(crudState.destination_list.map((item) => [item["name"], item])).values(),
    ];

    useEffect(() => {
        get_destination_list(state_name);
    }, []);

    return (
        <section className="packages" id="packages">
            <Link className="btn home-button" to="/">
                <div className="fas fa-home"></div>
            </Link>
            <h1 className="heading">
                <span>{state_name}</span>
            </h1>
            <div className="box-container">
                {crudState.isFetching ? (
                    <p className="error">Loading...Please Wait</p>
                ) : crudState.hasError ? (
                    <p className="error">Some Error Occured...Please refresh and try again</p>
                ) : (
                    distinct_list.map((city, key) => {
                        return (
                            <div className="box" key={key}>
                                <div className="image">
                                    <img src={city.img1} alt="" />
                                    <h3>
                                        <i className="fas fa-map-marker-alt"></i> {city.name}
                                    </h3>
                                </div>
                                <div className="content">
                                    <div className="price">
                                        Starting from Rs. {city.price}{" "}
                                        <span>Rs. {city.price + 1000}</span>
                                    </div>
                                    <p>{city.state_desc}</p>
                                    <Link to={"/get-destination-list/" + city.name} className="btn">
                                        Book now
                                    </Link>
                                </div>
                            </div>
                        );
                    })
                )}
            </div>
        </section>
    );
};

export default DestinationPackage;
