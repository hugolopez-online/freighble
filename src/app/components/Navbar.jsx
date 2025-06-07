import Console from "./Console";

const Navbar = () => {
    return (
        <nav className="navbar">
            <div className="container-fluid">
                <a
                    className="navbar-brand"
                    href="#"
                >
                    <img
                        height={30}
                        src="src/assets/img/logo_206x40.webp"
                        alt="Freighble"
                    />
                </a>
                <Console />
                <div className="navbar">
                    <div className="container-fluid">
                        <button className="btn btn-secondary bg-gradient rounded-pill px-3 mx-1">
                            ?
                        </button>
                        <button className="btn btn-secondary bg-gradient rounded-pill px-3 mx-1">
                            ...
                        </button>
                        <button className="btn btn-warning bg-gradient rounded-pill px-3 mx-1">
                            sign out
                        </button>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
