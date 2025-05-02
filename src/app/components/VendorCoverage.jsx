const VendorCoverage = ({ vendorCoverageKey, origin, destination, coverageCountry, coverageCountryAlias, coverageContent }) => {
    
    return (
        <li key={vendorCoverageKey} className="list-group-item bg-light">
            <h6 className={`text-${origin.country == coverageCountryAlias || destination.country == coverageCountryAlias ? "bg-success badge d-block" : "secondary fw-normal"}`}>{coverageCountry}</h6>
            {coverageContent.map((state, index) => {
                return (
                    <span key={vendorCoverageKey.concat("-state-", index)} className={`badge rounded-pill bg-${state == origin.state || state == destination.state ? "success border-success text-light" : "secondary border-secondary text-secondary bg-opacity-10"} border m-1`}>
                        {state}
                    </span>);
            })}
        </li>
    );
};

export default VendorCoverage;