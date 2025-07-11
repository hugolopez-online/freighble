import { Fragment } from "react";

const GeoCoverage = (props) => {
    // module
    const regions = Object.keys(props.geo_tree[props.country_code]);
    const territory_coverage =
        props.formData.coverage[props.countries_labels[props.country_code]]
            .territory;

    const regionIncluded = (territory_coverage, region_territories) => {
        return region_territories.every((territory) =>
            territory_coverage.includes(territory)
        );
    };

    // handlers
    const territorySelection = (e) => {
        const selection = e.target.value;

        if (territory_coverage.includes(selection)) {
            props.setFormData((prev) => {
                return {
                    ...prev,
                    coverage: {
                        ...prev.coverage,
                        [props.countries_labels[props.country_code]]: {
                            ...prev.coverage[
                                props.countries_labels[props.country_code]
                            ],
                            territory: territory_coverage.filter(
                                (territory) => territory !== selection
                            ),
                        },
                    },
                };
            });
        } else {
            let update_territories = territory_coverage.map(
                (territory) => territory
            );

            update_territories.push(selection);

            props.setFormData((prev) => {
                return {
                    ...prev,
                    coverage: {
                        ...prev.coverage,
                        [props.countries_labels[props.country_code]]: {
                            ...prev.coverage[
                                props.countries_labels[props.country_code]
                            ],
                            territory: update_territories,
                        },
                    },
                };
            });
        }
    };

    const regionSelection = (territories) => {
        if (regionIncluded(territory_coverage, territories)) {
            const remove_territories = territory_coverage.filter(
                (territory) => {
                    return !territories.includes(territory);
                }
            );

            props.setFormData((prev) => {
                return {
                    ...prev,
                    coverage: {
                        ...prev.coverage,
                        [props.countries_labels[props.country_code]]: {
                            ...prev.coverage[
                                props.countries_labels[props.country_code]
                            ],
                            territory: remove_territories,
                        },
                    },
                };
            });
        } else {
            props.setFormData((prev) => {
                return {
                    ...prev,
                    coverage: {
                        ...prev.coverage,
                        [props.countries_labels[props.country_code]]: {
                            ...prev.coverage[
                                props.countries_labels[props.country_code]
                            ],
                            territory: [
                                ...new Set(
                                    [
                                        ...prev.coverage[
                                            props.countries_labels[
                                                props.country_code
                                            ]
                                        ].territory,
                                        territories,
                                    ].flat(Infinity)
                                ),
                            ],
                        },
                    },
                };
            });
        }
    };

    // render
    return (
        <div className="col-4">
            <h6 className="text-secondary">
                {props.countries_labels[props.country_code]}
            </h6>
            {regions.map((region, index) => {
                const territories = props.geo_tree[props.country_code][region];

                return (
                    <div
                        key={region.split(" ").join("_").concat("-", index)}
                        className="col-12"
                    >
                        <div className="form-check">
                            <input
                                className="form-check-input"
                                type="checkbox"
                                id={region.split(" ").join("_")}
                                name={region.split(" ").join("_")}
                                value={region}
                                checked={regionIncluded(
                                    territory_coverage,
                                    territories
                                )}
                                onChange={() => {
                                    regionSelection(territories);
                                }}
                            />
                            <label
                                className={`form-check-label text-${
                                    regionIncluded(
                                        territory_coverage,
                                        territories
                                    )
                                        ? "primary fw-bold"
                                        : "secondary"
                                }`}
                                htmlFor={region.split(" ").join("_")}
                            >
                                {regionIncluded(territory_coverage, territories)
                                    ? `all ${region}`
                                    : region}
                            </label>
                        </div>
                        <div className="mb-3">
                            {territories.map((territory) => {
                                return (
                                    <Fragment key={`coverage-${territory}`}>
                                        <input
                                            type="checkbox"
                                            className="btn-check"
                                            name={`coverage-${territory}`}
                                            id={`coverage-${territory}`}
                                            value={territory}
                                            checked={props.formData.coverage[
                                                props.countries_labels[
                                                    props.country_code
                                                ]
                                            ].territory.includes(territory)}
                                            onChange={(e) =>
                                                territorySelection(e, region)
                                            }
                                            autoComplete="off"
                                        />
                                        <label
                                            htmlFor={`coverage-${territory}`}
                                            className={`btn rounded-pill btn-outline-${
                                                props.formData.coverage[
                                                    props.countries_labels[
                                                        props.country_code
                                                    ]
                                                ].territory.includes(territory)
                                                    ? "primary fw-bold"
                                                    : "secondary"
                                            } m-1 py-1 px-2`}
                                            style={{ fontSize: "0.75rem" }}
                                        >
                                            {territory}
                                        </label>
                                    </Fragment>
                                );
                            })}
                        </div>
                    </div>
                );
            })}
        </div>
    );
};

export default GeoCoverage;
