// imports

import { useEffect, useState } from "react";
import Vendor from "./Vendor";
import Placeholder from "./Placeholder";

// component

const Directory = ({ specs }) => {
    // states

    const [vendorList, setVendorList] = useState([]);
    const [isFetching, setIsFetching] = useState(false);

    // effects

    useEffect(() => {
        setVendorList([]);
        const searchVendors = async () => {
            if (
                specs.mode &&
                specs.origin.country &&
                specs.destination.country
            ) {
                // async func to search vendors through API
                setIsFetching(true);
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
                // @hugolopez-online: testing sort by suitability. Delete block when that's done
                found_vendors.sort((a, b) =>
                    a.company.localeCompare(b.company)
                );
                setVendorList(found_vendors);
                setIsFetching(false);
            }
        };

        searchVendors();
    }, [specs]);

    // utils

    const placeholder_amount = 10;
    let placeholders = [];
    for (let i = 0; i <= placeholder_amount; i++) {
        placeholders.push(i);
    }

    // render

    return (
        <>
            {!vendorList.length ? (
                !isFetching ? (
                    <div className="col-12">
                        <h1 className="display-1 text-black-50">
                            nothing to show
                        </h1>
                        <hr className="border border-secondary" />
                        <h6 className="display-6 text-body-tertiary">
                            make a load search to display suitable vendors here
                        </h6>
                    </div>
                ) : (
                    placeholders.map((placeholder) => {
                        return (
                            <Placeholder key={`placeholder-${placeholder}`} />
                        );
                    })
                )
            ) : (
                vendorList.map((vendor, index) => {
                    const key = String(vendor.id) + String(index);
                    return (
                        <Vendor
                            key={key}
                            dispatched_key={key}
                            {...vendor}
                            specs={specs}
                        />
                    );
                })
            )}
            {/*THE DIV BELOW MUST BE DELETED AND FIND A NEW WAY TO DEAL WITH THE AUTO SCROLLING*/}
            <div className="text-bg-dark">
                {/* <code>{JSON.stringify(vendorList)}</code> */}
            </div>
        </>
    );
};

export default Directory;
