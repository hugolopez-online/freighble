const Console = () => {
    return (
        <div className="navbar bg-light p-2 rounded-pill border border-tertiary">
            <div className="container-fluid ps-1">
                {/* @hugolopez-online: make dynamic depending on search status */}
                <div className="bg-secondary bg-gradient-deep tight-pocket rounded-pill">
                    <button className="btn btn-sm btn-primary bg-gradient rounded-pill fw-bold px-3">
                        active search
                    </button>
                    <span className="text-light fw-light mx-3">directory</span>
                </div>
                {/* @hugolopez-online: make dynamic depending on search status and amount of vendors in db */}
                <div
                    id="console-display"
                    className="rounded-4 border bg-light bg-gradient p-2 px-3 mx-3"
                >
                    <span className="font-monospace text-secondary">
                        Vendor directory: 52 vendors
                    </span>
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
    );
};

export default Console;
