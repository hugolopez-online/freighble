import Console from "./Console";
import logo from "../../assets/img/logo_206x40.webp";
import icon from "../../assets/img/logo-icon_40x40.webp";

const Navbar = ({
    specs,
    default_specs,
    resetSpecs,
    setSpecs,
    templateSpecs,
}) => {
    return (
        <nav className="navbar">
            <div className="container-fluid">
                <a
                    className="navbar-brand d-none d-md-block"
                    href="#"
                >
                    <img
                        height={30}
                        src={logo}
                        alt="Freighble"
                    />
                </a>
                <a
                    className="navbar-brand d-block d-md-none"
                    href="#"
                >
                    <img
                        height={30}
                        src={icon}
                        alt="Freighble"
                    />
                </a>
                <div className="d-none d-md-block">
                    <Console
                        specs={specs}
                        default_specs={default_specs}
                        resetSpecs={resetSpecs}
                        setSpecs={setSpecs}
                        templateSpecs={templateSpecs}
                    />
                </div>
                <div className="navbar">
                    <div className="container-fluid">
                        <button className="btn btn-light border bg-gradient text-secondary rounded-pill px-3 me-1">
                            ?
                        </button>
                        <button className="btn btn-light border bg-gradient text-secondary rounded-pill px-3 mx-1">
                            ...
                        </button>
                        <button className="btn btn-warning bg-gradient rounded-pill px-3 ms-1">
                            sign out
                        </button>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
