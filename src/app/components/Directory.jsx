import { vendors, vendors2 } from "../vendors";
import { useEffect, useState } from "react";
import Vendor from "./Vendor";

const Directory = (props) => {
    const [vendorList, setVendorList] = useState(vendors2);
    const [filteredVendorList, setFilteredVendorList] = useState([]);

    // TEST LOG; delete when done testing
    console.log(filteredVendorList);

    useEffect(() => {
        setFilteredVendorList(
            vendorList.filter((vendor) => {
                return (
                    vendor.vendorModes.includes(props.specs.mode) &&
                    ((vendor.vendorCoverage[0].coverageContent[0] &&
                        vendor.vendorCoverage[0].coverageCountryAlias ==
                            props.specs.origin.country) ||
                        (vendor.vendorCoverage[1].coverageContent[0] &&
                            vendor.vendorCoverage[1].coverageCountryAlias ==
                                props.specs.origin.country) ||
                        (vendor.vendorCoverage[2].coverageContent[0] &&
                            vendor.vendorCoverage[2].coverageCountryAlias ==
                                props.specs.origin.country)) &&
                    ((vendor.vendorCoverage[0].coverageContent[0] &&
                        vendor.vendorCoverage[0].coverageCountryAlias ==
                            props.specs.destination.country) ||
                        (vendor.vendorCoverage[1].coverageContent[0] &&
                            vendor.vendorCoverage[1].coverageCountryAlias ==
                                props.specs.destination.country) ||
                        (vendor.vendorCoverage[2].coverageContent[0] &&
                            vendor.vendorCoverage[2].coverageCountryAlias ==
                                props.specs.destination.country)) &&
                    (!props.specs.hazmat
                        ? true
                        : vendor.vendorHazmat == props.specs.hazmat) &&
                    (!props.specs.team
                        ? true
                        : vendor.vendorTeamDrivers == props.specs.team) &&
                    (!props.specs.usbond
                        ? true
                        : vendor.vendorUSBonded == props.specs.usbond) &&
                    (!props.specs.canadabond
                        ? true
                        : vendor.vendorCanadaBonded == props.specs.canadabond)
                );
            })
        );
    }, [props.specs]);

    return (
        <>
            {filteredVendorList.map((vendor, index) => {
                return (
                    <Vendor
                        key={vendor.vendorName
                            .replace(/ /g, "-")
                            .concat("-", index)}
                        vendorKey={vendor.vendorName
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
