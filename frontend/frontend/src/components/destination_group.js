import { Link } from "react-router-dom";
import { useCrudContext } from "../context/crud";

const DestinationGroup = () => {
    const { state: crudState } = useCrudContext();

    return (
        <section className="packages" id="packages">
            <h1 className="heading">
                Our <span>Packages</span>
            </h1>

            <div className="box-container">
                {crudState.isFetching ? (
                    <p className="error">Loading...Please Wait</p>
                ) : crudState.hasError ? (
                    <p className="error">Some Error Occured...Please refresh and try again</p>
                ) : (
                    crudState.destination_group.map((state, key) => {
                        return crudState.error ? (
                            <p className="error">{crudState.error}</p>
                        ) : (
                            <div className="box" key={key}>
                                <div className="image">
                                    <img src={state.img1} alt="" />
                                    <h3>
                                        <i className="fas fa-map-marker-alt"></i> {state.state}
                                    </h3>
                                </div>
                                <div className="content">
                                    <div className="price">
                                        Starting from Rs. {state.price}
                                        <span>Rs. {state.price + 500}</span>
                                    </div>
                                    <p>{state.state_desc}</p>
                                    <Link
                                        to={"/get-destination-package/" + state.state}
                                        className="btn">
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

export default DestinationGroup;
