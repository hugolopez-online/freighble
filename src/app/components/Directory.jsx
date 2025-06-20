// imports

import { useEffect, useState, Fragment } from "react";
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
                const query_string = `/api/vendors?mode=${
                    specs.mode
                }&o_country=${specs.origin.country}&d_country=${
                    specs.destination.country
                }&border=${specs.border}&hazmat=${Number(
                    specs.hazmat
                )}&team_drivers=${Number(
                    specs.team_drivers
                )}&usa_bonded=${Number(specs.usa_bonded)}&can_bonded=${Number(
                    specs.can_bonded
                )}&ctpat=${Number(specs.ctpat)}&twic=${Number(
                    specs.twic
                )}&tsa=${Number(specs.tsa)}&fast=${Number(specs.fast)}`;

                setIsFetching(true);
                const searched_vendors_promise = await fetch(query_string);

                const searched_vendors = await searched_vendors_promise.json();
                const found_vendors = searched_vendors.searched_vendors.sort(
                    (a, b) => a.company.localeCompare(b.company)
                );

                // compute suitability score

                const scored_vendors = found_vendors.map((vendor) => {
                    const coverage = vendor.coverage;
                    const core_lanes = vendor.core_lanes;
                    const banned_lanes = vendor.banned_lanes;

                    let adjusted_score = 0;
                    let matched_core_lane = "";
                    let matched_banned_lane = "";

                    if (vendor.type.asset_based && vendor.type.freight_broker) {
                        adjusted_score -= 2.5;
                    } else if (vendor.type.freight_broker) {
                        adjusted_score -= 5;
                    }

                    if (
                        !(
                            vendor.domicile.country_code ===
                                specs.origin.country ||
                            vendor.domicile.country_code ===
                                specs.destination.country
                        )
                    ) {
                        adjusted_score -= 5;
                    }

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
                            matched_core_lane = route;
                            break;
                        }
                        if (additional_score > 0) additional_score--;
                    }

                    for (let route of routes) {
                        if (banned_lanes.includes(route)) {
                            adjusted_score -= base_score;
                            matched_banned_lane = route;
                            break;
                        }
                    }

                    // reset additional_score value to handle next vendor

                    additional_score = suitability_weight.additional;

                    // assign final adjusted suitability score and matching core/banned lanes

                    return {
                        ...vendor,
                        score: base_score + Math.round(adjusted_score),
                        matched_core_lane,
                        matched_banned_lane,
                    };
                });

                // sort vendors by final suitability score

                scored_vendors.sort((a, b) => b.score - a.score);

                if (!scored_vendors[0]) {
                    window.alert("No suitable vendors found in our database.");
                }

                setVendorList(scored_vendors);
                setIsFetching(false);
                window.scrollTo(0, 0);
            }
        };

        searchVendors();
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
                            make a load search to display suitable vendors here
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
                    <h6 className="display-6 text-secondary text-center mb-0 mt-4">
                        Suitable vendors
                    </h6>
                    {vendorList.map((vendor, index) => {
                        const key = String(vendor.id) + String(index);
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
