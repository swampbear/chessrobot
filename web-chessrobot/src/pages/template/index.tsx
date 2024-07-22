import React from "react";
import Header from '../../components/header/Header'
import { Footer } from '../../components/footer/Footer'



const template = () => {

    return (
        <div id="header-container" className="gradientBackground">
            <Header />
            
            <Footer />
        </div>
    );
}

export default template;