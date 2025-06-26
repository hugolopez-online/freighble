// imports

import { useEffect, useState, Fragment } from "react";
import { Vendor, Placeholder } from "./";
import suitability_weight from "../handlers/suitability_meta";

// component

const Directory = ({ specs, routes }) => {
    // states

    const [vendorList, setVendorList] = useState([]);
    const [isFetching, setIsFetching] = useState(false);

    // module

    const min_info =
        specs.mode && specs.origin.country && specs.destination.country;

    const base_score = suitability_weight.mandatory;
    const origin_territory_weight =
        suitability_weight.desirable.origin_territory_weight;
    const destination_territory_weight =
        suitability_weight.desirable.destination_territory_weight;
    let additional_score = suitability_weight.additional;

    // effects

    useEffect(() => {
        setVendorList([]);

        const searchVendors = async () => {
            // async func to search vendors through API
            const query_string = `/api/vendors?mode=${specs.mode}&o_country=${
                specs.origin.country
            }&d_country=${specs.destination.country}&border=${
                specs.border
            }&hazmat=${Number(specs.hazmat)}&team_drivers=${Number(
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
                const exclusive_lanes = vendor.exclusive_lanes;
                const banned_lanes = vendor.banned_lanes;

                let adjusted_score = 0;
                let matched_core_lane = "";
                let matched_exclusive_lane = "";
                let matched_banned_lane = "";

                if (vendor.type.asset_based && vendor.type.freight_broker) {
                    adjusted_score -= 2.5;
                } else if (vendor.type.freight_broker) {
                    adjusted_score -= 5;
                }

                if (
                    !(
                        vendor.domicile.country_code === specs.origin.country ||
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

                if (exclusive_lanes[0]) {
                    let route_track = 0;
                    for (let route of routes) {
                        if (exclusive_lanes.includes(route)) {
                            matched_exclusive_lane = route;
                            break;
                        } else {
                            if (route_track >= routes.length - 1) {
                                adjusted_score -= base_score;
                            }
                            route_track++;
                        }
                    }
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
                    matched_exclusive_lane,
                    matched_banned_lane,
                };
            });

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
