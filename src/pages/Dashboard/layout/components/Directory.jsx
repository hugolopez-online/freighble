// imports

import { useEffect, useState, Fragment } from "react";
import { Vendor, Placeholder } from "./";
import { base_score, $VAST } from "../handlers/vast_system";

// component

const Directory = ({ specs, routes }) => {
    // states

    const [vendorList, setVendorList] = useState([]);
    const [isFetching, setIsFetching] = useState(false);

    // module

    const min_info =
        specs.mode && specs.origin.country && specs.destination.country;

    // effects

    useEffect(() => {
        setVendorList([]);

        const searchVendors = async () => {
            // async func to search vendors through API
            const query_string = `/api/vendors/public/search?mode=${
                specs.mode
            }&o_country=${specs.origin.country}&d_country=${
                specs.destination.country
            }&border=${specs.border}&hazmat=${Number(
                specs.hazmat
            )}&team_drivers=${Number(specs.team_drivers)}&usa_bonded=${Number(
                specs.usa_bonded
            )}&can_bonded=${Number(specs.can_bonded)}&ctpat=${Number(
                specs.ctpat
            )}&twic=${Number(specs.twic)}&tsa=${Number(
                specs.tsa
            )}&fast=${Number(specs.fast)}&tanker_endorsement=${Number(
                specs.tanker_endorsement
            )}`;

            setIsFetching(true);

            const filtered_vendors_promise = await fetch(query_string);

            const filtered_vendors = await filtered_vendors_promise.json();
            const found_vendors = filtered_vendors.filtered_vendors.sort(
                (a, b) => a.company.localeCompare(b.company)
            );

            // compute suitability score

            const scored_vendors = found_vendors.map((vendor) =>
                $VAST(vendor, specs, routes)
            );

            // re-filter and sort vendors by final suitability score

            const filtered_scored_vendors = scored_vendors.filter(
                (vendor) => vendor.score >= base_score
            );

            filtered_scored_vendors.sort((a, b) => b.score - a.score);

            setVendorList(filtered_scored_vendors);
            setIsFetching(false);
            window.scrollTo(0, 0);
        };

        if (min_info) {
            searchVendors();
        }
    }, [
        specs.mode,
        specs.origin,
        specs.destination,
        specs.border,
        specs.hazmat,
        specs.team_drivers,
        specs.usa_bonded,
        specs.can_bonded,
        specs.ctpat,
        specs.twic,
        specs.tsa,
        specs.fast,
        specs.tanker_endorsement,
        routes,
    ]);

    // utils

    const placeholder_amount = 10;
    let placeholders = [];
    for (let i = 0; i <= placeholder_amount; i++) {
        placeholders.push(i);
    }

    // render

    return (
        <Fragment>
            {!vendorList.length ? (
                !isFetching ? (
                    <div className="col-12">
                        <h1 className="display-1 text-black-50">
                            nothing to show
                        </h1>
                        <hr className="border border-secondary" />
                        <h6 className="display-6 text-body-tertiary">
                            {min_info
                                ? "We were not able to find suitable vendors for your search, but we continuously update our our database. Please try again later."
                                : "make a load search to display suitable vendors here"}
                        </h6>
                    </div>
                ) : (
                    <div className="row g-3 mb-3">
                        {placeholders.map((placeholder) => {
                            return (
                                <Placeholder
                                    key={`placeholder-${placeholder}`}
                                    opacity_deduction={placeholder}
                                />
                            );
                        })}
                    </div>
                )
            ) : (
                <div className="row g-3 mb-3">
                    <h6 className="display-6 text-secondary mb-0 mt-4">
                        Suitable vendors
                    </h6>
                    {vendorList.map((vendor) => {
                        const key = String(vendor._id);
                        return (
                            <Vendor
                                key={key}
                                dispatched_key={key}
                                {...vendor}
                                specs={specs}
                            />
                        );
                    })}
                </div>
            )}
        </Fragment>
    );
};

export default Directory;
