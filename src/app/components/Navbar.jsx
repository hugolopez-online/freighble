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
                <div className="navbar bg-light p-2 rounded-pill border border-tertiary">
                    <div className="container-fluid ps-1">
                        {/* @hugolopez-online: make dynamic depending on search status */}
                        <div className="bg-secondary border border-2 border-secondary rounded-pill">
                            <button className="btn btn-sm btn-primary bg-gradient rounded-pill fw-bold px-3">
                                active search
                            </button>
                            <span className="text-light mx-3">directory</span>
                        </div>
                        {/* @hugolopez-online: make dynamic depending on search status and amount of vendors in db */}
                        <div className="rounded-4 border bg-body p-2 px-3 mx-3">
                            <code className="text-secondary">
                                Vendor directory: 52 vendors
                            </code>
                        </div>
                        {/* @hugolopez-online: migrate `Banner.jsx` functionality here */}
                        <div className="btn-group">
                            <button className="btn btn-sm btn-dark bg-gradient rounded-pill rounded-end px-3 fw-bold">
                                template new search
                            </button>
                            <button className="btn btn-sm btn-danger bg-gradient rounded-pill rounded-start px-3">
                                clear results
                            </button>
                        </div>
                    </div>
                </div>
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
