import React from "react";
import { ReactComponent as CampImage } from "../images/camping.svg";

const Services = () => {
    return (
        <section className="services" id="services">
            <h1 className="heading">
                Our <span>Services</span>
            </h1>

            <div className="box-container">
                <div className="box">
                    <span>#1</span>
                    <i className="fas fa-hotel"></i>
                    <h3>Quality Hotels</h3>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Officia, rem.</p>
                </div>

                <div className="box">
                    <span>#2</span>
                    <i className="fas fa-plane"></i>
                    <h3>Fast Travel</h3>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Officia, rem.</p>
                </div>

                <div className="box">
                    <span>#3</span>
                    <i className="fas fa-utensils"></i>
                    <h3>Hygenic Food</h3>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Officia, rem.</p>
                </div>

                <div className="box">
                    <span>#4</span>
                    <i className="fas fa-campground"></i>
                    <h3>Camping</h3>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Officia, rem.</p>
                </div>

                <div className="box">
                    <span>#5</span>
                    <i className="fas fa-hiking"></i>
                    <h3>Thrilling Adventures</h3>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Officia, rem.</p>
                </div>

                <div className="box">
                    <span>#6</span>
                    <i className="fas fa-medkit"></i>
                    <h3>Health and Safety</h3>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Officia, rem.</p>
                </div>
            </div>
            <div className="image">
                <CampImage className="img" />
            </div>
        </section>
    );
};

export default Services;
