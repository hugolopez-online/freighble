import { Link } from "react-router-dom";
import { Fragment } from "react";

const Home = ({ anchor, setAnchor }) => {
    return (
        <Fragment>
            <section
                id="website_hero"
                className="row website-hero justify-content-center pt-5"
            >
                <div style={{ minHeight: "10rem" }}></div>
                <div className="col-10 text-light text-center py-4">
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
                <div style={{ minHeight: "10rem" }}></div>
            </section>
            <div
                id="about"
                className="row justify-content-center pt-5"
            >
                <div
                    className="col-10 py-4"
                    style={{ minHeight: "100vh" }}
                >
                    <h1 className="display-1">About</h1>
                </div>
            </div>
            <div
                id="contact"
                className="row justify-content-center pt-5"
            >
                <div
                    className="col-10 py-4"
                    style={{ minHeight: "100vh" }}
                >
                    <h1 className="display-1">Contact</h1>
                </div>
            </div>
        </Fragment>
    );
};

export default Home;
