import { Link } from "react-router-dom";
import { useCrudContext } from "../context/crud";

const DestinationList = (props) => {
    const { state: crudState } = useCrudContext();
    const city_name = props.match.params.dest__name;

    var destination_list = crudState.destination_list.filter((city) => city.name === city_name);

    let getDetails = (city) => {
        var str = "";
        for (let c of city.details) {
            if (c === ",") str += "\n";
            else str += c;
        }
        return str;
    };

    return (
        <section className="packages" id="packages">
            <Link className="btn home-button" to="/">
                <div className="fas fa-home"></div>
            </Link>
            <h1 className="heading">
                <span>{city_name}</span>
            </h1>
            <div className="box-container">
                {crudState.isFetching ? (
                    <p className="error">Loading...Please Wait</p>
                ) : destination_list.length > 0 ? (
                    destination_list.map((city, key) => {
                        return (
                            <div className="box" key={key}>
                                <div className="image">
                                    <img src={city.img1} alt="" />
                                    <h3>
                                        <i className="fas fa-map-marker-alt"></i>
                                        {city.agent_company_name}
                                    </h3>
                                </div>
                                <div className="content">
                                    <div className="price">
                                        Rs. {city.price} <span>Rs. {city.price + 1000}</span>
                                    </div>

                                    <p style={{ whiteSpace: "pre-line" }}>{getDetails(city)}</p>
                                    <Link
                                        to={"/get-destination/" + city.name + "/" + city.id}
                                        className="btn">
                                        Book now
                                    </Link>
                                </div>
                            </div>
                        );
                    })
                ) : (
                    <>
                        <h1>
                            Do not refresh this page
                            <br />
                            Please go back and select destination again !
                        </h1>
                    </>
                )}
            </div>
        </section>
    );
};

export default DestinationList;
