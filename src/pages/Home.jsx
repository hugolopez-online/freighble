import { Link } from "react-router-dom";
import { Fragment } from "react";

const Home = ({ setAnchor }) => {
    return (
        <Fragment>
            <section
                id="website_hero"
                className="row website-hero justify-content-center pt-5"
            >
                <div
                    className="col-10 text-light text-center"
                    style={{ minHeight: "100vh", paddingTop: "10em" }}
                >
                    <h2 className="display-2 fst-italic">
                        <span className="fw-normal">Freigh</span>t made relia
                        <span className="fw-normal">ble</span>
                    </h2>
                    <p className="fw-light mb-5">
                        With Freighble, find qualified carriers effortlessly.
                        Fast and efficient — so you can get back to what really
                        matters.
                    </p>
                    <Link
                        to="/register"
                        className="brand-font btn btn-lg btn-light bg-gradient-soft fw-medium rounded-pill me-2"
                    >
                        GET STARTED
                    </Link>
                    <Link
                        to="/"
                        className="brand-font btn btn-lg btn-outline-light fw-light rounded-pill"
                        onClick={() => {
                            setAnchor("about");
                        }}
                    >
                        HOW IT WORKS
                    </Link>
                </div>
            </section>
            <div
                id="about"
                className="row justify-content-center pt-5 bg-primary bg-opacity-10"
            >
                <div
                    className="col-10 py-4"
                    style={{ minHeight: "100vh" }}
                >
                    <h1 className="display-1">About</h1>
                    <section className="container my-5">
                        <h2 className="text-center mb-4">How It Works</h2>
                        <div className="row text-center">
                            <div className="col-md-4 mb-4">
                                <div className="p-3 border rounded shadow-sm h-100 bg-light">
                                    <div className="mb-3">
                                        <i className="bi bi-ui-checks-grid fs-1 text-primary"></i>
                                    </div>
                                    <h5>Step 1</h5>
                                    <p>
                                        Tell us what you need — your shipping
                                        lane and preferences.
                                    </p>
                                </div>
                            </div>
                            <div className="col-md-4 mb-4">
                                <div className="p-3 border rounded shadow-sm h-100 bg-light">
                                    <div className="mb-3">
                                        <i className="bi bi-lightning-charge fs-1 text-warning"></i>
                                    </div>
                                    <h5>Step 2</h5>
                                    <p>
                                        We instantly match you with qualified
                                        vendors using smart scoring.
                                    </p>
                                </div>
                            </div>
                            <div className="col-md-4 mb-4">
                                <div className="p-3 border rounded shadow-sm h-100 bg-light">
                                    <div className="mb-3">
                                        <i className="bi bi-truck fs-1 text-success"></i>
                                    </div>
                                    <h5>Step 3</h5>
                                    <p>
                                        You choose your preferred match — no
                                        chasing or guesswork.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </section>
                </div>
            </div>
            <div
                id="contact"
                className="row justify-content-center pt-5 bg-primary bg-opacity-25"
            >
                <div
                    className="col-10 py-4"
                    style={{ minHeight: "100vh" }}
                >
                    <h1 className="display-1">Contact</h1>
                    <section className="container my-5">
                        <h2 className="text-center mb-4">Contact Us</h2>
                        <div className="row justify-content-center">
                            <div className="col-md-6 text-center">
                                <p className="lead">
                                    Got a question? Let's talk. We're happy to
                                    help.
                                </p>
                                <ul className="list-unstyled mb-4">
                                    <li>
                                        <strong>Email:</strong>{" "}
                                        support@freighble.com
                                    </li>
                                    <li>
                                        <strong>Phone:</strong> (778) 350-9048
                                    </li>
                                    <li>
                                        <strong>Hours:</strong> Mon to Fri, 8:00
                                        AM to 4:00 PM (PDT)
                                    </li>
                                </ul>
                                <button className="btn btn-primary">
                                    Send a Message
                                </button>
                            </div>
                        </div>
                    </section>
                </div>
            </div>
        </Fragment>
    );
};

export default Home;
