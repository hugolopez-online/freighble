import { vendors, vendors2 } from "../vendors";
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
            {/* DIV BELOW MUST BE REMOVED EVENTUALLY, IT'S ONLY FOR TESTING PUSRPOSES (CREATES SPACE FOR AUTO-SCROLLING TO BE POSSIBLE) */}
            <div style={{ height: "1000px" }}></div>
        </>
    );
};

export default Directory;
