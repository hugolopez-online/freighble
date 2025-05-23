import { useEffect, useState } from "react";
import Vendor from "./Vendor";

const Directory = ({ specs }) => {
    const [vendorList, setVendorList] = useState([]);

    useEffect(() => {
        setVendorList([]);
        const searchVendors = async () => {
            if (
                specs.mode &&
                specs.origin.country &&
                specs.destination.country
            ) {
                // async func to search vendors through API
                const searched_vendors_promise = await fetch(
                    `/api/vendors?mode=${specs.mode}&o_country=${
                        specs.origin.country
                    }&d_country=${specs.destination.country}&border=${
                        specs.border
                    }&hazmat=${Number(specs.hazmat)}&team_drivers=${Number(
                        specs.team_drivers
                    )}&usa_bonded=${Number(
                        specs.usa_bonded
                    )}&can_bonded=${Number(specs.can_bonded)}&ctpat=${Number(
                        specs.ctpat
                    )}&twic=${Number(specs.twic)}&tsa=${Number(
                        specs.tsa
                    )}&fast=${Number(specs.fast)}`
                );
                const searched_vendors = await searched_vendors_promise.json();
                const found_vendors = searched_vendors.searched_vendors;
                found_vendors.sort((a, b) =>
                    a.company.localeCompare(b.company)
                );
                setVendorList(found_vendors);
            }
        };

        searchVendors();
    }, [specs]);

    // creates array to iterate and render the cards placeholders
    let placeholders = [];
    for (let i = 0; i <= 5; i++) {
        placeholders.push(i);
    }

    return (
        <>
            {!vendorList.length
                ? placeholders.map((placeholder, index) => {
                      return (
                          <div
                              key={"placeholder-" + String(index)}
                              className="col-11 col-md-10"
                          >
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
                              key={String(vendor.id) + String(index)}
                              dispatched_key={String(vendor.id) + String(index)}
                              {...vendor}
                              specs={specs}
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
