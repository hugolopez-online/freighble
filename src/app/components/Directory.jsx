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
            {/* DIV BELOW MUST BE REMOVED EVENTUALLY, IT'S ONLY FOR TESTING PUSRPOSES (CREATES SPACE FOR AUTO-SCROLLING TO BE POSSIBLE) */}
            <div style={{height: "1000px"}}></div>
        </>
    );
};

export default Directory;