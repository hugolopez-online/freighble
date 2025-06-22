const Placeholder = ({ opacity_deduction }) => {
    const opacity = 1 - Number(opacity_deduction) / 10;
    return (
        <div
            className="col-12"
            style={{ opacity }}
        >
            <div className="card bg-light col shadow-sm rounded-4">
                <div className="card-body">
                    <h5 className="card-title placeholder-glow">
                        <span className="placeholder bg-secondary col-6"></span>
                        <span className="placeholder bg-secondary col-1 ms-2"></span>
                    </h5>
                </div>
            </div>
        </div>
    );
};

export default Placeholder;
