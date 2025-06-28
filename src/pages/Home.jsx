import { Link } from "react-router-dom";

const Home = () => {
    return (
        <section className="row website-hero justify-content-center pe-0 pt-5">
            <div className="col-10 text-light p-5 text-center">
                <h2 className="display-2 fst-italic">
                    <span className="fw-normal">Freigh</span>t made relia
                    <span className="fw-normal">ble</span>
                </h2>
                <hr />
                <p className="fw-light">
                    With Freighble, find qualified carriers effortlessly. Fast
                    and efficient — so you can get back to what really matters.
                </p>
                <Link
                    to="register"
                    className="brand-font btn btn-lg btn-light bg-gradient-soft fw-medium rounded-pill me-2"
                >
                    GET STARTED
                </Link>
                <Link
                    to="register"
                    className="brand-font btn btn-lg btn-outline-light fw-light rounded-pill"
                >
                    HOW IT WORKS
                </Link>
            </div>
            <div
                className="col-10"
                style={{ minHeight: "100vh" }}
            ></div>
        </section>
    );
};

export default Home;
