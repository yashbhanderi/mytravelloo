import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useCrudContext } from "../context/crud";
import { useAuthContext } from "../context/auth";
import { useGlobalContext } from "../context/global";
const Trips = () => {
    const { state: crudState, get_trips, get_mail } = useCrudContext();
    const { state: authState } = useAuthContext();
    const { showMessage, setShowMessage } = useGlobalContext();

    var my_trips = crudState.trips;

    const handleClick = (id) => {
        window.scrollTo(0, 0);
        setShowMessage(true);
        get_mail(id);
    };

    useEffect(() => {
        get_trips();
    }, []);

    return (
        <>
            <Link className="btn home-button" to="/">
                <div className="fas fa-home"></div>
            </Link>
            {authState.isAuth ? (
                <div className="trips">
                    <h1 className="heading">
                        My <span>Trips</span>
                    </h1>
                    {crudState.isFetching === true ? (
                        <p className={"error hide " + (showMessage ? "show" : "")}>
                            Loading...Please Wait
                        </p>
                    ) : (
                        <p className={"error hide " + (showMessage ? "show" : "")}>
                            {crudState.get_mail_msg}
                        </p>
                    )}
                    <table>
                        <thead>
                            <tr>
                                <th>Destination</th>
                                <th>Travels Company</th>
                                <th>Booking Date</th>
                                <th>Email</th>
                                <th>Full Details</th>
                            </tr>
                        </thead>
                        <tbody>
                            {my_trips.map((item) => {
                                return (
                                    <tr key={item.id}>
                                        <td>{item.destination}</td>
                                        <td>{item.company_name}</td>
                                        <td>{item.date}</td>
                                        <td>{item.email}</td>
                                        <td>
                                            <button
                                                style={{ padding: "7px 7px", margin: "0" }}
                                                className="btn"
                                                onClick={() => handleClick(item.trip_id)}>
                                                Email Me
                                            </button>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            ) : (
                <h1
                    style={{
                        marginTop: "100px",
                        textAlign: "center",
                    }}>
                    Please Login First !
                </h1>
            )}
        </>
    );
};

export default Trips;
