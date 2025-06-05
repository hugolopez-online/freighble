const Placeholder = () => {
    return (
        <div className="col-12">
            <div className="input-group shadow-sm rounded-3">
                <div className="card bg-light-subtle col shadow-sm">
                    <div className="card-body">
                        <h5 className="card-title placeholder-glow">
                            <span className="placeholder bg-secondary col-6"></span>
                            <span className="placeholder bg-secondary col-1 ms-2"></span>
                        </h5>
                    </div>
                </div>
                <button className="btn btn-primary rounded-end-3 disabled placeholder px-4"></button>
            </div>
        </div>
    );
};

export default Placeholder;
