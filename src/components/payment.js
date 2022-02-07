import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useCrudContext } from "../context/crud";
import { useGlobalContext } from "../context/global";

const initialState = {
    name: "",
    card_no: "",
    cvv_no: "",
    expiry_date: "",
};

const Payment = () => {
    const { state: crudState, check_payment } = useCrudContext();
    const { tripDetails } = useGlobalContext();
    const [data, setData] = useState(initialState);

    let handleInputChange = (e) => {
        setData({
            ...data,
            [e.target.name]: e.target.value,
        });
    };

    let handleSubmit = (e) => {
        e.preventDefault();

        if (
            data.name === "" ||
            data.card_no === "" ||
            data.cvv_no === "" ||
            data.expiry_date === ""
        ) {
            setData({
                ...data,
                error: "All fields are Mandatory !",
            });
            return;
        }

        check_payment(data, tripDetails);

        !crudState.isFetching &&
            setInterval(() => {
                window.location.href = "/";
            }, 12000);
    };

    return (
        <div className="container">
            <Link className="btn home-button" to="/">
                <div className="fas fa-home"></div>
            </Link>
            <div className="payment">
                <h1 className="heading">
                    <span> Payment</span>
                </h1>
                <center>
                    {crudState.isFetching === true ? (
                        <p className="error" style={{ fontSize: "2.2rem" }}>
                            Loading...Please Wait
                        </p>
                    ) : (
                        crudState.payment_check_msg !== "" && (
                            <p className="error" style={{ fontSize: "2.2rem" }}>
                                {crudState.payment_check_msg}
                            </p>
                        )
                    )}
                </center>
                <div className="content">
                    <form action="#">
                        <div className="card-details">
                            <div className="input-box">
                                <span className="details">Card No.</span>
                                <input
                                    type="text"
                                    name="card_no"
                                    value={data.card_no}
                                    placeholder="123456789123"
                                    required
                                    onChange={handleInputChange}
                                />
                            </div>
                            <div className="input-box">
                                <span className="details">Expiry Date</span>
                                <input
                                    type="date"
                                    name="expiry_date"
                                    value={data.expiry_date}
                                    placeholder="01/02/2023"
                                    required
                                    onChange={handleInputChange}
                                />
                            </div>
                            <div className="input-box">
                                <span className="details">CVV No.</span>
                                <input
                                    type="text"
                                    name="cvv_no"
                                    value={data.cvv_no}
                                    placeholder="123"
                                    required
                                    onChange={handleInputChange}
                                />
                            </div>
                            <div className="input-box">
                                <span className="details">Name</span>
                                <input
                                    type="text"
                                    name="name"
                                    value={data.name}
                                    placeholder="Rahul"
                                    required
                                    onChange={handleInputChange}
                                />
                            </div>
                        </div>
                        <input
                            type="button"
                            className="btn"
                            style={{ width: "100%" }}
                            value="Check Out"
                            onClick={handleSubmit}
                        />
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Payment;
