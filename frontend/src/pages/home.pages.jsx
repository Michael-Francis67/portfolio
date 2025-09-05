import React from "react";
import HomePage from "../components/homepage/homepage.components";
import AboutSection from "../components/about/about.component";
import SkillsComponent from "../components/skills/skills.component";
import ProjectsComponent from "../components/projects/projects.component";
import ContactsComponent from "../components/contacts/contacts.component";
import FooterComponent from "../components/footer/footer.component";
import Navbar from "../components/navbar/navbar.components";

const Home = () => {
    return (
        <div className="overflow-y-scroll overflow-x-hidden w-screen">
            <Navbar />
            <HomePage />
            <AboutSection />
            <SkillsComponent />
            <ProjectsComponent />
            <ContactsComponent />
            <FooterComponent />
        </div>
    );
};

export default Home;
