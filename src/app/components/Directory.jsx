import { vendors, vendors2 } from "../vendors";
import { useState } from "react";
import Vendor from "./Vendor";

const Directory = (props) => {
    const [vendorList, setVendorList] = useState(vendors2);

    const enoughData = props.specs.mode && props.specs.origin.country && props.specs.destination.country;    
    
    return (
        <div className="col-md-9">
            <div className="row p-2">
                <div className={`col-md-8 alert alert-${enoughData ? "info" : "secondary"}`} role="alert">
                    {enoughData ? 
                        <div>
                            <p>Showing vendors for:</p>
                            <p className="fw-bold">{`${props.specs.usbond ? "U.S. bonded " : ""}${props.specs.canadabond ? "Canada bonded " : ""}${props.specs.hazmat ? "Hazmat " : ""}${props.specs.mode} from ${props.specs.origin.city ? props.specs.origin.city + ", " : ""}${props.specs.origin.state + " (" + props.specs.origin.country + ")"} to ${props.specs.destination.city ? props.specs.destination.city + ", " : ""}${props.specs.destination.state  + " (" + props.specs.destination.country + ")"}${props.specs.team ? " with Team Drivers" : ""}${props.specs.border !== "N/A" ? ", crossing through " + props.specs.border : ""}`}</p>
                            <button className="btn btn-danger" type="button" onClick={() => props.setSpecs(props.defaultSpecs)}>Clear results</button>
                            <button className="btn btn-primary ms-2" type="button" onClick={() => props.setFormData((prev) => {
                                return ({
                                    ...prev,
                                    mode: props.specs.mode,
                                    originCity: props.specs.origin.city,
                                    originState: props.specs.origin.state,
                                    destinationCity: props.specs.destination.city,
                                    destinationState: props.specs.destination.state,
                                    border: props.specs.border,
                                    hazmat: props.specs.hazmat,
                                    team: props.specs.team,
                                    usbond: props.specs.usbond,
                                    canadabond: props.specs.canadabond
                                });
                            })}>Template for new search</button>
                        </div> : "Enter details to display suitable vendors."}
                </div>
                {vendorList.map((vendor, index) => {

                    return (
                        <Vendor
                            key={vendor.vendorName.replace(/ /g, "-").concat("-", index)}
                            vendorKey={vendor.vendorName.replace(/ /g, "-").concat("-", index)}
                            {...vendor}
                            specs={props.specs}
                        />
                    );
                })}
            </div>
        </div>
    );
};

export default Directory;