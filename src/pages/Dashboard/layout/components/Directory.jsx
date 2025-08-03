/* IMPORTS START */
import { useEffect, useState, Fragment } from "react";
import { Vendor, Placeholder } from "./";
import { base_score, $VAST } from "../handlers/vast_system";
/* IMPORTS END */

/* COMPONENT START */
const Directory = ({
    specs,
    BLANK_SPECS,
    routes,
    vendorList,
    setVendorList,
    theme,
}) => {
    // states
    const [isFetching, setIsFetching] = useState(false);

    // module
    const MIN_DATA =
        specs.mandatory.mode &&
        specs.mandatory.origin.country &&
        specs.mandatory.destination.country;

    // effects
    useEffect(() => {
        const searchVendors = async () => {
            const QUERY = `/api/vendors/public/search?mode=${
                specs.mandatory.mode
            }&o_country=${specs.mandatory.origin.country}&d_country=${
                specs.mandatory.destination.country
            }&border=${specs.mandatory.border}&hazmat=${Number(
                specs.mandatory.hazmat
            )}&team_drivers=${Number(
                specs.mandatory.team_drivers
            )}&usa_bonded=${Number(
                specs.mandatory.usa_bonded
            )}&can_bonded=${Number(specs.mandatory.can_bonded)}&ctpat=${Number(
                specs.mandatory.ctpat
            )}&twic=${Number(specs.mandatory.twic)}&tsa=${Number(
                specs.mandatory.tsa
            )}&fast=${Number(specs.mandatory.fast)}&tanker_endorsement=${Number(
                specs.mandatory.tanker_endorsement
            )}`;

            setIsFetching(true);

            const filtered_vendors_promise = await fetch(QUERY);

            const filtered_vendors = await filtered_vendors_promise.json();
            const found_vendors = filtered_vendors.filtered_vendors.sort(
                (a, b) => a.company.localeCompare(b.company)
            );

            const scored_vendors = found_vendors.map((vendor) =>
                $VAST(vendor, specs, routes)
            );

            const filtered_scored_vendors = scored_vendors.filter(
                (vendor) => vendor.score >= base_score
            );

            filtered_scored_vendors.sort((a, b) => b.score - a.score);

            setVendorList(filtered_scored_vendors);
            setIsFetching(false);
            window.scrollTo(0, 0);
        };

        if (MIN_DATA) {
            searchVendors();
        }
    }, [specs.mandatory]);

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
                        <h1 className="display-1 text-dark-emphasis">
                            nothing to show
                        </h1>
                        <hr className="border border-secondary" />
                        <h6 className="display-6 text-secondary">
                            {MIN_DATA
                                ? "We were not able to find suitable vendors for your search, but we continuously update our database. Please try again later."
                                : "Make a load search to display suitable vendors here."}
                        </h6>
                    </div>
                ) : (
                    <div className="row g-3 mb-3">
                        {placeholders.map((placeholder) => {
                            return (
                                <Placeholder
                                    key={`placeholder-${placeholder}`}
                                    opacity_deduction={placeholder}
                                    theme={theme}
                                />
                            );
                        })}
                    </div>
                )
            ) : (
                <div className="row g-3 mb-3">
                    <h6
                        className={`display-6 text-capitalize text-${
                            theme === "light"
                                ? "secondary"
                                : "light text-opacity-75"
                        } mb-0 mt-4`}
                    >
                        suitable vendors
                    </h6>
                    {vendorList.map((vendor) => {
                        const key = String(vendor._id);
                        return (
                            <Vendor
                                key={key}
                                dispatched_key={key}
                                {...vendor}
                                specs={specs}
                                theme={theme}
                            />
                        );
                    })}
                </div>
            )}

            {/* STATUS BAR START */}
            <div
                className={`row justify-content-between fixed-bottom font-monospace text-bg-${
                    specs === BLANK_SPECS
                        ? "secondary"
                        : isFetching
                        ? "warning"
                        : vendorList.length > 0
                        ? "primary bg-gradient"
                        : "danger"
                } px-4 py-0`}
            >
                <div className="col-12 col-md-6">
                    <small>
                        <b>app status:</b>{" "}
                    </small>
                    {specs === BLANK_SPECS ? (
                        <Fragment>
                            <small>system ready</small>
                            <div
                                className={`spinner-grow spinner-grow-sm ms-2`}
                                aria-hidden="true"
                            ></div>
                        </Fragment>
                    ) : isFetching ? (
                        <Fragment>
                            <small>searching vendors</small>
                            <div
                                className={`spinner-border spinner-border-sm ms-2`}
                                aria-hidden="true"
                            ></div>
                        </Fragment>
                    ) : (
                        <Fragment>
                            <small>
                                displaying <b>{vendorList.length}</b> search
                                result
                                {vendorList.length !== 1 ? "s" : ""}
                            </small>
                            <i
                                className={`bi bi-${
                                    vendorList.length > 0
                                        ? "check"
                                        : "exclamation-triangle"
                                } ms-1`}
                            ></i>
                        </Fragment>
                    )}
                </div>
                <div className="col-6 d-none d-md-block text-end">
                    <small>
                        <b>last app status update:</b>{" "}
                        {new Date().toLocaleString()}
                    </small>
                </div>
            </div>
            {/* STATUS BAR END */}
        </Fragment>
    );
};
/* COMPONENT END */

export default Directory;
