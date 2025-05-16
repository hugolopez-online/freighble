import { vendors } from "../vendors";
import { useEffect, useState } from "react";
import Vendor from "./Vendor";

const Directory = (props) => {
    const [vendorList, setVendorList] = useState(vendors);
    const [filteredVendorList, setFilteredVendorList] = useState([]);

    useEffect(() => {
        setFilteredVendorList(
            vendorList.filter((vendor) => {
                return (
                    vendor.modes.includes(props.specs.mode) &&
                    ((vendor.coverage["Canada"].territory[0] &&
                        vendor.coverage["Canada"].country_code ==
                            props.specs.origin.country) ||
                        (vendor.coverage["United States"].territory[0] &&
                            vendor.coverage["United States"].country_code ==
                                props.specs.origin.country) ||
                        (vendor.coverage["Mexico"].territory[0] &&
                            vendor.coverage["Mexico"].country_code ==
                                props.specs.origin.country)) &&
                    ((vendor.coverage["Canada"].territory[0] &&
                        vendor.coverage["Canada"].country_code ==
                            props.specs.destination.country) ||
                        (vendor.coverage["United States"].territory[0] &&
                            vendor.coverage["United States"].country_code ==
                                props.specs.destination.country) ||
                        (vendor.coverage["Mexico"].territory[0] &&
                            vendor.coverage["Mexico"].country_code ==
                                props.specs.destination.country)) &&
                    vendor.borders.includes(props.specs.border) &&
                    (!props.specs.hazmat
                        ? true
                        : vendor.hazmat == props.specs.hazmat) &&
                    (!props.specs.team
                        ? true
                        : vendor.team_drivers == props.specs.team_drivers) &&
                    (!props.specs.usa_bonded
                        ? true
                        : vendor.usa_bonded == props.specs.usa_bonded) &&
                    (!props.specs.can_bonded
                        ? true
                        : vendor.can_bonded == props.specs.can_bonded)
                );
            })
        );
    }, [props.specs]);

    // creates array to iterate and render the cards placeholders
    let placeholder_array = [];
    for (let i = 0; i <= 15; i++) {
        placeholder_array.push(i);
    }

    return (
        <>
            {filteredVendorList.map((vendor, index) => {
                return (
                    <Vendor
                        key={vendor.company
                            .replace(/ /g, "-")
                            .concat("-", index)}
                        vendorKey={vendor.company
                            .replace(/ /g, "-")
                            .concat("-", index)}
                        {...vendor}
                        specs={props.specs}
                    />
                );
            })}
            {!props.specs.mode &&
                !props.specs.origin.country &&
                !props.specs.destination.country &&
                placeholder_array.map(() => {
                    return (
                        <div className="col-11 col-md-10">
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
                })}
            {/*THE DIV BELOW MUST BE DELETED AND FIND A NEW WAY TO DEAL WITH THE AUTO SCROLLING*/}
            <div className="text-bg-dark">
                {/* <code>{JSON.stringify(vendorList)}</code> */}
            </div>
        </>
    );
};

export default Directory;
