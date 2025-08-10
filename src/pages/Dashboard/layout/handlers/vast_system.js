/* === Vendor Assessment Segmentation Technology (VAST) === */

import suitability_weight from "./suitability_meta";

const base_score = suitability_weight.mandatory;
const origin_territory_weight =
    suitability_weight.desirable.origin_territory_weight;
const destination_territory_weight =
    suitability_weight.desirable.destination_territory_weight;

const $VAST = (vendor, specs, routes) => {
    let additional_score = suitability_weight.additional;

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
            vendor.domicile.country_code === specs.mandatory.origin.country ||
            vendor.domicile.country_code === specs.mandatory.destination.country
        )
    ) {
        adjusted_score -= 5;
    }

    if (
        !(
            vendor.domicile.territory === specs.mandatory.origin.territory ||
            vendor.domicile.territory === specs.mandatory.destination.territory
        )
    ) {
        adjusted_score -= 2.5;
    }

    for (let country_lookup of Object.keys(coverage)) {
        if (
            coverage[country_lookup].country_code ==
                specs.mandatory.origin.country &&
            coverage[country_lookup].territory.length != 0
        ) {
            if (
                coverage[country_lookup].territory.includes(
                    specs.mandatory.origin.territory
                )
            ) {
                adjusted_score += origin_territory_weight;
            }
        }

        if (
            coverage[country_lookup].country_code ==
                specs.mandatory.destination.country &&
            coverage[country_lookup].territory.length != 0
        ) {
            if (
                coverage[country_lookup].territory.includes(
                    specs.mandatory.destination.territory
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

    return {
        ...vendor,
        score: base_score + Math.round(adjusted_score),
        matched_core_lane,
        matched_exclusive_lane,
        matched_banned_lane,
    };
};

export { base_score, $VAST };
