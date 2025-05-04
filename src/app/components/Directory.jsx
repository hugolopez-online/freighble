import { vendors, vendors2 } from "../vendors";
import { useState } from "react";
import Vendor from "./Vendor";

const Directory = (props) => {
    const [vendorList, setVendorList] = useState(vendors2);
    
    return (
        <>
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
        </>
    );
};

export default Directory;