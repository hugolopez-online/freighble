const Navbar = () => {
    return (
        <nav className="navbar border border-tertiary rounded-pill text-bg-light shadow-sm m-2 p-2">
            <div className="container-fluid">
                <button className="btn btn-sm btn-light rounded-pill">
                    <i className="bi bi-person"></i> profile
                </button>
                <button className="btn btn-dark rounded-pill fw-bold">
                    <i className="bi bi-unity"></i> Freighble
                </button>
                <div className="btn-group rounded-pill">
                    <button className="btn btn-sm btn-light rounded-pill rounded-end ps-3">
                        settings
                    </button>
                    <button className="btn btn-sm btn-light rounded-pill rounded-start pe-3">
                        sign out
                    </button>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
