/* IMPORTS START */
import { Link, useNavigate } from "react-router-dom";

import logo from "../../../../assets/img/logo_206x40.webp";
import logo_light from "../../../../assets/img/logo-lighter_206x40.svg";
import icon from "../../../../assets/img/logo-icon_40x40.webp";

// component

const Navbar = ({ CONDITIONAL_RENDERING, greeting, theme, setTheme }) => {
    const navigate = useNavigate();

    return (
        <nav className="navbar p-0">
            <div className="container-fluid">
                <Link
                    className="navbar-brand d-none d-md-block"
                    to="/"
                >
                    <img
                        className="d-block"
                        height={20}
                        src={theme === "light" ? logo : logo_light}
                        alt="Freighble logo"
                    />
                </Link>
                <Link
                    className="navbar-brand d-block d-md-none"
                    to="/"
                    target="_blank"
                >
                    <img
                        className="d-block"
                        height={30}
                        src={icon}
                        alt="Freighble icon"
                    />
                </Link>
                <div className="navbar">
                    <div className="container-fluid">
                        <span
                            className={`text-${
                                theme === "light" ? "dark" : "light"
                            } fw-medium`}
                        >
                            Welcome, {greeting}!
                        </span>
                        <div className="dropdown ms-2">
                            <button
                                className="btn btn-sm btn-primary bg-gradient rounded-pill px-3 ms-1"
                                type="button"
                                data-bs-toggle="dropdown"
                                aria-expanded="false"
                            >
                                <i className="bi bi-person-fill"></i>
                            </button>
                            <ul
                                className="dropdown-menu dropdown-menu-end p-2"
                                style={{ zIndex: "1020" }}
                            >
                                <li>
                                    <Link
                                        className="dropdown-item rounded"
                                        to="/dashboard"
                                    >
                                        <i className="bi bi-display"></i>{" "}
                                        Dashboard
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        className="dropdown-item rounded"
                                        to="profile"
                                    >
                                        <i className="bi bi-person-rolodex"></i>{" "}
                                        Profile
                                    </Link>
                                </li>
                                <li>
                                    <button
                                        className="dropdown-item rounded"
                                        onClick={() => {
                                            const CURRENT_THEME =
                                                localStorage.getItem(
                                                    "freighbleTheme"
                                                );
                                            localStorage["freighbleTheme"] =
                                                CURRENT_THEME === "light"
                                                    ? "dark"
                                                    : "light";
                                            setTheme(
                                                localStorage["freighbleTheme"]
                                            );
                                            if (
                                                localStorage[
                                                    "freighbleTheme"
                                                ] === "dark"
                                            ) {
                                                document
                                                    .getElementById("body")
                                                    .classList.add("bg-black");

                                                document
                                                    .getElementById("body")
                                                    .classList.remove(
                                                        "bg-body"
                                                    );
                                            } else {
                                                document
                                                    .getElementById("body")
                                                    .classList.add("bg-body");

                                                document
                                                    .getElementById("body")
                                                    .classList.remove(
                                                        "bg-black"
                                                    );
                                            }
                                        }}
                                    >
                                        <i
                                            className={`bi bi-${
                                                theme === "light"
                                                    ? "moon-fill"
                                                    : "sun-fill"
                                            }`}
                                        ></i>{" "}
                                        {theme === "light" ? "Dark" : "Light"}{" "}
                                        Theme
                                    </button>
                                </li>
                                <li>
                                    <button
                                        className="dropdown-item rounded text-bg-danger bg-gradient fw-medium"
                                        onClick={() => {
                                            localStorage.removeItem("token");
                                            localStorage.removeItem("user");

                                            CONDITIONAL_RENDERING.setSession(
                                                JSON.parse(
                                                    localStorage.getItem("user")
                                                )
                                            );

                                            navigate("/login");
                                        }}
                                    >
                                        <i className="bi bi-box-arrow-right"></i>{" "}
                                        Log Out
                                    </button>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
