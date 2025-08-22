import { Link } from "react-router-dom";
import { Fragment } from "react";

import searching_graphic from "../assets/img/pictures/searching_graphic.svg";
import mailbox_graphic from "../assets/img/pictures/mailbox_graphic.svg";
import compose_email from "../assets/img/pictures/compose_email.svg";

const Home = ({ setAnchor, theme }) => {
    return (
        <Fragment>
            {/* Hero */}
            <section
                id="website_hero"
                className="row website-hero justify-content-center pt-5 mb-2"
            >
                <div
                    className="col-10 text-light text-center"
                    style={{ minHeight: "100vh", paddingTop: "10em" }}
                >
                    <h1 className="display-1 mb-4">
                        <span className="fw-semibold">Freigh</span>t made relia
                        <span className="fw-semibold">ble</span>
                    </h1>
                    <p className="fst-italic fs-2 mb-5">
                        Smart carrier search. No clutter, just matches.
                    </p>
                    <Link
                        to="/register"
                        className="brand-font btn btn-lg btn-primary bg-gradient fw-medium rounded-3 me-2"
                    >
                        GET STARTED
                    </Link>
                    <Link
                        to="/"
                        className="brand-font btn btn-lg btn-light fw-light rounded-3"
                        onClick={() => {
                            setAnchor("about");
                        }}
                    >
                        HOW IT WORKS
                    </Link>
                </div>
            </section>

            {/* About */}
            <section
                id="about"
                className="row justify-content-center pt-5 mb-2"
            >
                <div
                    className="col-10 col-md-9 mt-5 py-4"
                    style={{ minHeight: "100vh" }}
                >
                    <h1
                        className={`display-1 fw-semibold text-center text-${
                            theme === "light" ? "dark" : "light"
                        }`}
                    >
                        About Freighble
                    </h1>
                    <div className="mt-5">
                        <p className="fs-4 mb-4 opacity-75 fw-light">
                            Picture this: you've got a load ready to move —
                            origin, destination, equipment type, special
                            conditions, the works. You drop the details into
                            Freighble, and you get a curated list of well suited
                            vendors for your load.
                        </p>

                        {/* graphic: map-flow */}
                        <div className="my-5">
                            <div className="placeholder-graphic">
                                <img
                                    src={searching_graphic}
                                    width={400}
                                    className="img-fluid mx-auto d-block"
                                    alt="searching graphic"
                                />
                            </div>
                        </div>

                        <p className="fs-5">
                            Using a custom-built matching engine that weighs
                            over a dozen variables — from transport mode to
                            geographic coverage and even route preferences — we
                            surface the most suitable vendors for your shipment.
                        </p>

                        <p className="fs-5">
                            But here's the twist: you remain in control. No
                            hidden brokers, no forced funnels. Pick a vendor and
                            you'll get an
                            <strong> instant way to reach out via email</strong>
                            .
                        </p>

                        {/* graphic: vendor-card */}
                        <div className="my-5">
                            <div className="placeholder-graphic">
                                <img
                                    src={compose_email}
                                    width={400}
                                    className="img-fluid mx-auto d-block"
                                    alt="workflow graphic"
                                />
                            </div>
                        </div>

                        <p className="fs-5">
                            Whether you're moving cross-border freight from
                            Toronto to Texas or a local dry van load within
                            California, Freighble does the matchmaking so you
                            don't have to dig through spreadsheets or outdated
                            rolodexes.
                        </p>

                        <p className="fs-5 mb-0">
                            No commitments, no middlemen — just transparency,
                            speed, and the right carrier for the job.
                        </p>
                    </div>
                </div>
            </section>

            {/* Contact */}
            <section
                id="contact"
                className="row justify-content-center pt-5"
            >
                <div
                    className="col-10 col-md-9 mt-5 py-4"
                    style={{ minHeight: "100vh" }}
                >
                    <h1
                        className={`display-1 fw-semibold text-center text-${
                            theme === "light" ? "dark" : "light"
                        }`}
                    >
                        Contact Us
                    </h1>
                    <div className="mt-5">
                        <p className="fs-4 mb-4 opacity-75 fw-light">
                            Send us a message anytime — whether you're a broker
                            looking to enhance your workflow, a carrier wanting
                            to be listed, or just someone who likes freight tech
                            a bit too much.
                        </p>

                        {/* graphic: email-icon */}
                        <div className="my-5">
                            <div className="placeholder-graphic">
                                <img
                                    src={mailbox_graphic}
                                    width={200}
                                    className="img-fluid mx-auto d-block"
                                    alt="workflow graphic"
                                />
                            </div>
                        </div>

                        <p className="fs-5">
                            You can reach us directly at{" "}
                            <a
                                href="mailto:contact@freighble.com"
                                target="_blank"
                            >
                                contact@freighble.com
                            </a>
                            , or use the contact form below (we promise it won't
                            go into the void).
                        </p>

                        {/* Placeholder for contact form */}
                        <div className="my-5 text-center">
                            <form className="row g-3 justify-content-center">
                                <div className="col-md-6">
                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="Name"
                                    />
                                </div>
                                <div className="col-md-6">
                                    <input
                                        type="email"
                                        className="form-control"
                                        placeholder="Email"
                                    />
                                </div>
                                <div className="col-12">
                                    <textarea
                                        className="form-control"
                                        rows="5"
                                        placeholder="Message"
                                    ></textarea>
                                </div>
                                <div className="col-12 text-center">
                                    <button
                                        className="btn btn-primary bg-gradient fw-semibold rounded-3 px-5 w-100"
                                        type="submit"
                                    >
                                        Send
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
        </Fragment>
    );
};

export default Home;
