import { useState } from "react";
import Navbar from "./app/components/Navbar";
import Search from "./app/components/Search";
import Directory from "./app/components/Directory";
import Banner from "./app/components/Banner";

const default_specs = {
    mode: "",
    origin: {
        city: "",
        territory: "",
        region: "",
        country: "",
    },
    destination: {
        city: "",
        territory: "",
        region: "",
        country: "",
    },
    border: "None",
    hazmat: false,
    team_drivers: false,
    usa_bonded: false,
    can_bonded: false,
    ctpat: false,
    twic: false,
    tsa: false,
    fast: false,
};

function App() {
    const [specs, setSpecs] = useState(default_specs);
    const [template, setTemplate] = useState(null);

    const resetSpecs = () => {
        setSpecs(default_specs);
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
                <div
                    id="searchForm"
                    className="col-12 col-md-3 mb-3"
                >
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
                        <div
                            id="informativeBanner"
                            className="col-12"
                        >
                            <Banner
                                specs={specs}
                                default_specs={default_specs}
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
