import React from "react";

const Footer = () => {
    return (
        <section className="footer">
            <div className="box-container">
                <div className="box">
                    <h3>Our Branches</h3>
                    <a href={"/"}>
                        <i className="fas fa-map-marker-alt"></i> Ahmedabad
                    </a>
                    <a href={"/"}>
                        <i className="fas fa-map-marker-alt"></i> Banglore
                    </a>
                    <a href={"/"}>
                        <i className="fas fa-map-marker-alt"></i> Surat
                    </a>
                    <a href={"/"}>
                        <i className="fas fa-map-marker-alt"></i> Mumbai
                    </a>
                    <a href={"/"}>
                        <i className="fas fa-map-marker-alt"></i> New Delhi
                    </a>
                </div>

                <div className="box">
                    <h3>Quick Links</h3>
                    <a href={"#home"}>
                        <i className="fas fa-chevron-right"></i> Home
                    </a>
                    <a href={"#packages"}>
                        <i className="fas fa-chevron-right"></i> Packages
                    </a>
                    <a href={"#services"}>
                        <i className="fas fa-chevron-right"></i> Services
                    </a>
                    <a href={"#review"}>
                        <i className="fas fa-chevron-right"></i> Reviews
                    </a>
                    <a href={"#contact"}>
                        <i className="fas fa-chevron-right"></i> Contact Us
                    </a>
                </div>

                <div className="box">
                    <h3>Contact Info</h3>
                    <a href={"/"}>
                        <i className="fas fa-phone"></i> +123-456-7890
                    </a>
                    <a href={"/"}>
                        <i className="fas fa-phone"></i> +111-222-3333
                    </a>
                    <a href={"/"}>
                        <i className="fas fa-envelope"></i> abc@xyz.com
                    </a>
                    <a href={"/"}>
                        <i className="fas fa-map-marker-alt"></i> Surat, India.
                    </a>
                </div>

                <div className="box">
                    <h3>Follow Us</h3>
                    <a href={"/"}>
                        <i className="fab fa-facebook-f"></i> Facebook
                    </a>
                    <a href={"/"}>
                        <i className="fab fa-twitter"></i> Twitter
                    </a>
                    <a href={"/"}>
                        <i className="fab fa-instagram"></i> Instagram
                    </a>
                    <a href={"/"}>
                        <i className="fab fa-linkedin"></i> Linkedin
                    </a>
                    <a href={"/"}>
                        <i className="fab fa-pinterest"></i> Pinterest
                    </a>
                </div>
            </div>

            <div className="credit">
                Created by <span>Yash Bhanderi</span> | All rights reserved.
            </div>
        </section>
    );
};

export default Footer;
