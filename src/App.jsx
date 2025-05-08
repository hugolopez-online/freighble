import { useState } from "react";
import Navbar from "./app/components/Navbar";
import Search from "./app/components/Search";
import Directory from "./app/components/Directory";
import Banner from "./app/components/Banner";

const defaultSpecs = {
    mode: "",
    origin: {
        city: "",
        state: "",
        region: "",
        country: "",
    },
    destination: {
        city: "",
        state: "",
        region: "",
        country: "",
    },
    border: "N/A",
    hazmat: false,
    team: false,
    usbond: false,
    canadabond: false,
};

function App() {
    const [specs, setSpecs] = useState(defaultSpecs);
    const [template, setTemplate] = useState(null);

    const resetSpecs = () => {
        setSpecs(defaultSpecs);
    };

    const templateSpecs = (retrievedTemplate) => {
        setTemplate(retrievedTemplate);
    };

    return (
        <>
            <div
                id="navbar"
                className="row justify-content-md-center text-bg-dark shadow mb-4"
            >
                <div className="col-12 col-md-10">
                    <Navbar />
                </div>
            </div>
            <div className="row justify-content-md-center mb-3">
                <div id="searchForm" className="col-12 col-md-3 mb-3">
                    <Search
                        setSpecs={setSpecs}
                        template={template}
                        setTemplate={setTemplate}
                    />
                </div>
                <div className="col-12 col-md-7 mb-3">
                    <div
                        className="row justify-content-md-center"
                        style={{
                            position: "sticky",
                            top: "0px",
                            zIndex: 1000,
                        }}
                    >
                        <div id="informativeBanner" className="col-12">
                            <Banner
                                specs={specs}
                                defaultSpecs={defaultSpecs}
                                resetSpecs={resetSpecs}
                                setSpecs={setSpecs}
                                templateSpecs={templateSpecs}
                            />
                        </div>
                    </div>
                    <div className="row justify-content-center g-3 mb-3">
                        <Directory specs={specs} />
                    </div>
                </div>
            </div>
        </>
    );
}

export default App;
