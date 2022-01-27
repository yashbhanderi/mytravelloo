import React from "react";
import { ReactComponent as IntroImage } from "../images/intro-img.svg";

const Intro = () => {
    return (
        <section className="intro" id="home">
            <div className="image" data-aos="fade-down">
                <IntroImage className="img" />
            </div>
            <div className="content" data-aos="fade-up">
                <h3>Let's have some adventure!</h3>
                <p>
                   Life is short and the World is Big...
                   So Book the tickets and fly away...
                </p>
                <a href={"#packages"} className="btn">
                    Explore now
                </a>
            </div>
        </section>
    );
};

export default Intro;
