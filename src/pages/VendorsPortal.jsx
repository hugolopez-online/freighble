import { Link } from "react-router-dom";

import steps_graphic from "../assets/img/pictures/steps_graphic.svg";

const VendorsPortal = ({ theme }) => {
    window.scrollTo(0, 0);

    return (
        <section
            id="vendors"
            className="row justify-content-center pt-5 mb-2"
        >
            <div
                className="col-10 col-md-9 mt-5 py-4"
                style={{ minHeight: "100vh" }}
            >
                <h1
                    className={`display-1 fw-semibold text-${
                        theme === "light" ? "dark" : "light"
                    }`}
                >
                    Vendors Portal
                </h1>

                <div className="mt-5">
                    <p className="fs-4 mb-4">
                        Whether you're an asset-based carrier or a
                        freight-forwarding operation, Freighble connects you
                        with shippers and brokers who need exactly what you
                        offer — no cold calls, no games.
                    </p>

                    <div className="d-flex flex-column flex-md-row justify-content-center gap-3 mt-5">
                        <Link
                            to="/vendors/vendor"
                            className={`btn btn-${
                                theme === "light"
                                    ? "dark bg-gradient"
                                    : "light bg-gradient-soft"
                            } fw-semibold rounded-3`}
                        >
                            Vendor Registration
                        </Link>
                        <Link
                            to="/vendors/login"
                            className="btn btn-primary fw-semibold bg-gradient rounded-3"
                        >
                            Vendor Login
                        </Link>
                    </div>

                    {/* graphic: carrier-network */}
                    <div className="my-5">
                        <div className="placeholder-graphic">
                            <img
                                src={steps_graphic}
                                width={200}
                                className="img-fluid mx-auto d-block"
                                alt="workflow graphic"
                            />
                        </div>
                    </div>

                    <p className="fs-5">
                        Once you're registered, your company becomes
                        discoverable via our intelligent load-matching engine —
                        factoring in your modes, coverage, preferred lanes, and
                        specialties.
                    </p>

                    <p className="fs-5">
                        When a shipper finds your profile a good fit for a load,
                        <strong> they reach out directly via email</strong>. No
                        intermediary, no platform fees, no forced acceptance.
                    </p>

                    <p className="fs-5">
                        You'll receive genuine inquiries for freight you're
                        likely to want — based on actual compatibility, not just
                        coverage maps.
                    </p>

                    <p className="fs-5 mb-4">
                        Stay visible to the right people, reduce the noise, and
                        fill your trucks with less friction.
                    </p>
                </div>
            </div>
        </section>
    );
};

export default VendorsPortal;
