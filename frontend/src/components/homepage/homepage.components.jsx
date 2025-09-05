import React from "react";
import heroImage from "../../assets/hero-image.jpg";
import Hero from "../hero/hero.component";
import {Element} from "react-scroll";

const HomePage = () => {
    return (
        <div className="hero min-h-screen bg-base-200">
            <Element name="home" className="w-full">
                <div className="hero-content flex-col lg:flex-row-reverse">
                    <img
                        src={heroImage}
                        className="max-w-sm max-lg:max-w-full max-lg:mt-5 rounded-full mt-20 size-100 shadow-2xl"
                    />

                    <Hero />
                </div>
            </Element>
        </div>
    );
};

export default HomePage;
