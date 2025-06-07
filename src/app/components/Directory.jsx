// imports

import { useEffect, useState } from "react";
import Vendor from "./Vendor";
import Placeholder from "./Placeholder";
import suitability_weight from "../handlers/suitability_meta";

// component

const Directory = ({ specs, routes }) => {
    // states

    const [vendorList, setVendorList] = useState([]);
    const [isFetching, setIsFetching] = useState(false);

    // module

    const base_score = suitability_weight.mandatory;
    const origin_territory_weight =
        suitability_weight.desirable.origin_territory_weight;
    const destination_territory_weight =
        suitability_weight.desirable.destination_territory_weight;
    let additional_score = suitability_weight.additional;

    // effects

    useEffect(() => {
        const min_info =
            specs.mode && specs.origin.country && specs.destination.country;
        setVendorList([]);
        const searchVendors = async () => {
            if (min_info) {
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
                const found_vendors = searched_vendors.searched_vendors.sort(
                    (a, b) => a.company.localeCompare(b.company)
                );
                const scored_vendors = found_vendors.map((vendor) => {
                    const coverage = vendor.coverage;
                    const core_lanes = vendor.core_lanes;
                    const banned_lanes = vendor.banned_lanes;

                    let adjusted_score = 0;

                    for (let country_lookup of Object.keys(coverage)) {
                        if (
                            coverage[country_lookup].country_code ==
                                specs.origin.country &&
                            coverage[country_lookup].territory.length != 0
                        ) {
                            if (
                                coverage[country_lookup].territory.includes(
                                    specs.origin.territory
                                )
                            ) {
                                adjusted_score += origin_territory_weight;
                            }
                        }

                        if (
                            coverage[country_lookup].country_code ==
                                specs.destination.country &&
                            coverage[country_lookup].territory.length != 0
                        ) {
                            if (
                                coverage[country_lookup].territory.includes(
                                    specs.destination.territory
                                )
                            ) {
                                adjusted_score += destination_territory_weight;
                            }
                        }
                    }

                    for (let route of routes) {
                        if (core_lanes.includes(route)) {
                            adjusted_score += additional_score;
                            break;
                        }
                        if (additional_score > 0) additional_score--;
                    }

                    return {
                        ...vendor,
                        score: base_score + Math.round(adjusted_score),
                    };
                });

                scored_vendors.sort((a, b) => b.score - a.score);

                if (!scored_vendors[0]) {
                    window.alert("No suitable vendors found in our database.");
                }

                setVendorList(scored_vendors);
                setIsFetching(false);
            }
        };

        searchVendors();
    }, [specs, routes]);

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
