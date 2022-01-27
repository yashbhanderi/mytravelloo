import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useCrudContext } from "../context/crud";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Pagination } from "swiper";
import "swiper/swiper-bundle.min.css";
import "swiper/swiper.min.css";

SwiperCore.use([Pagination]);

const Destination = (props) => {
    const { state: crudState, get_destination } = useCrudContext();
    const dest_name = props.match.params.dest__name;
    const dest_id = props.match.params.dest__id;
    var str = "";

    if (crudState.destination.details) {
        for (let c of crudState.destination.details) {
            if (c === ",") str += "\n";
            else str += c;
        }
    }

    let img_list = [];
    for (var key in crudState.destination) {
        if (key.startsWith("img")) {
            img_list.push(crudState.destination[key]);
        }
    }

    useEffect(() => {
        get_destination(dest_id);
    }, []);

    return (
        <section className="destination" id="destination">
            <Link className="btn home-button" to="/">
                <div className="fas fa-home"></div>
            </Link>
            <h1 className="heading">
                <span>{dest_name}</span>
            </h1>
            <Swiper
                slidesPerView={1}
                spaceBetween={20}
                grabCursor={true}
                pagination={{
                    clickable: true,
                }}
                className="slider">
                {img_list.map((item, key) => {
                    return (
                        <SwiperSlide className="slide" key={key}>
                            <img src={item} alt="img" />
                        </SwiperSlide>
                    );
                })}
            </Swiper>
            <div className="details">
                <div className="description">
                    <h3 className="heading" style={{ fontSize: "3rem" }}>
                        Description
                    </h3>
                    <h3 className="heading" style={{ fontSize: "2.5rem" }}>
                        Price : Rs. <span>{crudState.destination.price}</span> / person
                    </h3>
                    <p style={{ whiteSpace: "pre-line" }}>{str}</p>
                    <Link
                        to={
                            "/get-trip-details/" +
                            crudState.destination.name +
                            "/" +
                            crudState.destination.id
                        }>
                        <button className="btn">Book Now</button>
                    </Link>
                </div>
                <div className="about">
                    <h3 className="heading" style={{ fontSize: "3rem" }}>
                        About
                    </h3>
                    <p>
                        <b> Name: </b> {crudState.destination.name}
                    </p>
                    <p>
                        <b> State: </b> {crudState.destination.state}
                    </p>
                    <p>
                        <b> Company Name: </b> {crudState.destination.agent_company_name}
                    </p>
                    <p>
                        <b> Company Desciption: </b> {crudState.destination.agent_company_desc}
                    </p>
                </div>
            </div>
        </section>
    );
};

export default Destination;
