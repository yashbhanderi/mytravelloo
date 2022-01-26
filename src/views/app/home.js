import React from "react";
import Header from "../../components/header";
import Intro from "../../components/intro";
import DestinationGroup from "../../components/destination_group";
import Services from "../../components/services";
import Reviews from "../../components/reviews";
import Contact from "../../components/contact";
import Footer from "../../components/footer";

const Home = () => {
    return (
        <>
            <Header />
            <Intro />
            <DestinationGroup />
            <Services />
            <Reviews />
            <Contact />
            <Footer />
        </>
    );
};

export default Home;
