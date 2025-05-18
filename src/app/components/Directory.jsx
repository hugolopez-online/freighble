import { useEffect, useState } from "react";
import Vendor from "./Vendor";

const Directory = (props) => {
    const [vendorList, setVendorList] = useState([]);

    useEffect(() => {
        setVendorList([]);
        const searchVendors = async () => {
            if (
                props.specs.mode &&
                props.specs.origin.country &&
                props.specs.destination.country
            ) {
                // async func to search vendors through API
                const searched_vendors_promise = await fetch(
                    `/api/vendors/${props.specs.mode}/${
                        props.specs.origin.country
                    }/${props.specs.origin.territory}/${
                        props.specs.destination.country
                    }/${props.specs.destination.territory}/${
                        props.specs.border
                    }/${Number(props.specs.hazmat)}/${Number(
                        props.specs.team_drivers
                    )}/${Number(props.specs.usa_bonded)}/${Number(
                        props.specs.can_bonded
                    )}`
                );
                const searched_vendors = await searched_vendors_promise.json();
                setVendorList(searched_vendors.searched_vendors);
            }
        };

        searchVendors();
    }, [props.specs]);

    // creates array to iterate and render the cards placeholders
    let placeholder_array = [];
    for (let i = 0; i <= 5; i++) {
        placeholder_array.push(i);
    }

    return (
        <>
            {!vendorList.length
                ? placeholder_array.map(() => {
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
                  })
                : vendorList.map((vendor, index) => {
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
            {/*THE DIV BELOW MUST BE DELETED AND FIND A NEW WAY TO DEAL WITH THE AUTO SCROLLING*/}
            <div className="text-bg-dark">
                {/* <code>{JSON.stringify(vendorList)}</code> */}
            </div>
        </>
    );
};

export default Directory;
