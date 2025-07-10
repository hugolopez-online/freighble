import { Fragment } from "react";

const Coverage = (props) => {
    // module
    const regions = Object.keys(props.geo_tree[props.country_code]);

    // handlers
    const singleSelection = (e, region) => {
        const region_territories = props.geo_tree[props.country_code][region];
        const territory_coverage =
            props.formData.coverage[props.countries_labels[props.country_code]]
                .territory;
        const selection = e.target.value;

        console.log(territory_coverage);

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
                                onChange={(e) => {}}
                            />
                            <label
                                className="form-check-label"
                                htmlFor={region.split(" ").join("_")}
                            >
                                {region}
                            </label>
                        </div>
                        <div className="ps-2 mb-3">
                            {territories.map((territory) => {
                                return (
                                    <Fragment key={`coverage-${territory}`}>
                                        <input
                                            type="checkbox"
                                            className="btn-check"
                                            name={`coverage-${territory}`}
                                            id={`coverage-${territory}`}
                                            value={territory}
                                            onChange={(e) =>
                                                singleSelection(e, region)
                                            }
                                            autoComplete="off"
                                        />
                                        <label
                                            htmlFor={`coverage-${territory}`}
                                            className={`btn btn-sm rounded-pill btn-outline-${
                                                props.formData.coverage[
                                                    props.countries_labels[
                                                        props.country_code
                                                    ]
                                                ].territory.includes(territory)
                                                    ? "primary"
                                                    : "secondary"
                                            } m-1`}
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

export default Coverage;
