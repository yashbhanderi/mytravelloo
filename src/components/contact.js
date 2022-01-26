import React from "react";
import { ReactComponent as ContactImage } from "../images/contact.svg";

const Contact = () => {
    return (
        <section className="contact" id="contact">
            <h1 className="heading">
                <span>Contact</span> Us
            </h1>

            <form action="" data-aos="zoom">
                <div className="inputBox">
                    <input type="text" placeholder="Name" />
                    <input type="email" placeholder="Email" />
                </div>

                <div className="inputBox">
                    <input type="text" placeholder="Phone number" />
                    <input type="text" placeholder="Subject" />
                </div>

                <textarea name="" placeholder="Your message" cols="30" rows="10"></textarea>

                <input
                    type="submit"
                    value="send message"
                    className="btn"
                    onClick={() => {
                        alert("Message Sent. Thank You!");
                    }}
                />
            </form>
            <div className="image">
                <ContactImage className="img" />
            </div>
        </section>
    );
};

export default Contact;
