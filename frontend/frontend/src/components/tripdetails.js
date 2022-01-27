import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { useCrudContext } from "../context/crud";
import { useAuthContext } from "../context/auth";
import { useGlobalContext } from "../context/global";

const initialState = {
    email: "",
    phone_number: "",
    date: null,
    address: "",
    city: "",
    state: "",
    pincode: "",
    error: null,
};

const Tripdetails = (props) => {
    const { state: crudState, check_date_booking } = useCrudContext();
    const { state: authState } = useAuthContext();
    const { setTripDetails, showMessage, setShowMessage } = useGlobalContext();
    const dest__name = props.match.params.dest__name;
    const dest__id = props.match.params.dest__id;
    const [nameData, setNameData] = useState([{ name: "", age: "" }]);
    const [input, setInput] = useState(initialState);
    let history = useHistory();

    let handleNameChange = (i, e) => {
        let newFormValues = [...nameData];
        newFormValues[i][e.target.name] = e.target.value;
        setInput({ ...input, error: null });
        setNameData(newFormValues);
    };

    let addFormFields = () => {
        setNameData([...nameData, { name: "", age: "" }]);
    };

    let removeFormFields = (i) => {
        let newFormValues = [...nameData];
        newFormValues.splice(i, 1);
        setNameData(newFormValues);
    };

    let handleDateCheckSubmit = (event) => {
        event.preventDefault();
        check_date_booking(dest__id, input.date, nameData.length);
        setShowMessage(true);
    };

    let handleInputChange = (e) => {
        setInput({
            ...input,
            error: null,
            [e.target.name]: e.target.value,
        });
    };

    let handleSubmit = () => {
        if (!authState.isAuth) {
            alert("Please Login First !!!");
        }
        if (
            nameData.name === "" ||
            input.email === "" ||
            input.phone_number === "" ||
            input.address === "" ||
            input.date === null
        ) {
            setInput({
                ...input,
                error: "name, email, phone number, address and date is mandatory",
            });
            return;
        }

        let final_details = {};
        final_details = { ...final_details, nameData: nameData };
        final_details = { ...final_details, ...input };
        setTripDetails({
            destination: dest__name,
            dest_id: dest__id,
            ...final_details,
        });
        history.push(`/get-trip-details/${dest__name}/${dest__id}/payment/`);
    };

    return (
        <div className="container">
            <div className="travellors" id="travellors">
            <Link className="btn home-button" to="/">
                <div className="fas fa-home"></div>
            </Link>
                <h1 className="heading">
                    Travellors' <span>Details</span>
                </h1>
                {input.error && <p className="error">{input.error}</p>}
                <div className="content">
                    <form action="#">
                        <div className="user-details">
                            {nameData.map((e, index) => (
                                <div className="input-box" key={index}>
                                    <span className="details">Full Name</span>
                                    <input
                                        type="text"
                                        name="name"
                                        value={nameData.name}
                                        onChange={(e) => handleNameChange(index, e)}
                                    />
                                    <span className="details">Age</span>
                                    <input
                                        type="text"
                                        name="age"
                                        value={nameData.age}
                                        onChange={(e) => handleNameChange(index, e)}
                                    />
                                    {index ? (
                                        <button
                                            type="button"
                                            className="btn remove"
                                            onClick={() => removeFormFields(index)}>
                                            Remove Person
                                        </button>
                                    ) : null}
                                </div>
                            ))}
                            <div className="input-box">
                                <button
                                    className="btn add"
                                    type="button"
                                    onClick={() => addFormFields()}>
                                    Add Person
                                </button>
                            </div>
                            <div className="input-box">
                                <span className="details">Email</span>
                                <input
                                    type="text"
                                    name="email"
                                    value={input.email}
                                    placeholder="Enter your email"
                                    required
                                    onChange={handleInputChange}
                                />
                            </div>
                            <div className="input-box">
                                <span className="details">Phone Number</span>
                                <input
                                    type="text"
                                    name="phone_number"
                                    value={input.phone_number}
                                    placeholder="Enter your number"
                                    required
                                    onChange={handleInputChange}
                                />
                            </div>
                            <div className="input-box">
                                <span className="details">Address</span>
                                <input
                                    type="text"
                                    name="address"
                                    value={input.address}
                                    placeholder="Enter your Address"
                                    required
                                    onChange={handleInputChange}
                                />
                            </div>
                            <div className="input-box">
                                <span className="details">City</span>
                                <input
                                    type="text"
                                    name="city"
                                    value={input.city}
                                    placeholder="Enter your City"
                                    required
                                    onChange={handleInputChange}
                                />
                            </div>
                            <div className="input-box">
                                <span className="details">State</span>
                                <input
                                    type="text"
                                    name="state"
                                    value={input.state}
                                    placeholder="Enter your State"
                                    required
                                    onChange={handleInputChange}
                                />
                            </div>
                            <div className="input-box">
                                <span className="details">Pincode</span>
                                <input
                                    type="text"
                                    name="pincode"
                                    value={input.pincode}
                                    placeholder="Enter your Pincode"
                                    required
                                    onChange={handleInputChange}
                                />
                            </div>
                            <div className="input-box">
                                <span className="details">Date</span>
                                <input
                                    type="date"
                                    name="date"
                                    required
                                    onChange={handleInputChange}
                                />
                            </div>
                            <div className="input-box">
                                <button
                                    type="button"
                                    className="btn"
                                    onClick={handleDateCheckSubmit}>
                                    Check this date
                                </button>
                            </div>
                            <div className="input-box">
                                {crudState.date_check_msg === "Available" ? (
                                    <p
                                        className={"error hide " + (showMessage ? "show" : "")}
                                        style={{ color: "green" }}>
                                        {crudState.date_check_msg}
                                    </p>
                                ) : (
                                    <p
                                        className={"error hide " + (showMessage ? "show" : "")}
                                        style={{ color: "red" }}>
                                        {crudState.date_check_msg}
                                    </p>
                                )}
                            </div>
                        </div>
                        <button type="button" className="btn" onClick={handleSubmit}>
                            Check Out
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Tripdetails;
