// imports
import { Fragment, useState } from "react";
import { GEO_TREE } from "data/geo_meta";

// module
const countries = Object.keys(GEO_TREE);

const regions_array = [
    Object.keys(GEO_TREE.CAN),
    Object.keys(GEO_TREE.USA),
    Object.keys(GEO_TREE.MEX),
];
const regions = regions_array.flat(Infinity);

// component
const LaneBuilder = (props) => {
    // state
    const [scope, setScope] = useState("Anywhere");

    // module
    const can_territories = props.coverage["Canada"].territory;
    const usa_territories = props.coverage["United States"].territory;
    const mex_territories = props.coverage["Mexico"].territory;

    const territories_array = [
        can_territories,
        usa_territories,
        mex_territories,
    ];

    const territories = territories_array.flat(Infinity);

    const scopes = {
        Anywhere: ["Anywhere"],
        Country: countries,
        Region: regions,
        Territory: territories,
    };

    const scopes_values = Object.keys(scopes);

    return (
        <Fragment>
            <div className="col-12 d-flex flex-wrap col-md-6">
                <div className="col-6">
                    <label
                        htmlFor={`${props.target.label}-lane_scope`}
                        className="fw-medium text-dark-emphasis"
                    >
                        {props.target.label} scope
                    </label>
                    <select
                        className="form-select rounded-end-0"
                        id={`${props.target.label}-lane_scope`}
                        name={`${props.target.label}-lane_scope`}
                        value={scope}
                        onChange={(e) => {
                            setScope(e.target.value);
                            props.setter((prev) => {
                                return {
                                    ...prev,
                                    value:
                                        e.target.value === "Anywhere"
                                            ? "Anywhere"
                                            : "",
                                    city: "",
                                };
                            });
                        }}
                    >
                        {scopes_values.map((scope) => {
                            return (
                                <option
                                    key={`select-${scope}`}
                                    value={scope}
                                >
                                    {scope}
                                </option>
                            );
                        })}
                    </select>
                </div>
                <div className="col-6">
                    <label
                        htmlFor={`${props.target.label}-lane_location`}
                        className="fw-medium text-dark-emphasis"
                    >
                        {props.target.label} location
                    </label>
                    <select
                        className="form-select border-start-0 rounded-start-0"
                        id={`${props.target.label}-lane_location`}
                        name={`${props.target.label}-lane_location`}
                        value={props.target.value}
                        onChange={(e) => {
                            props.setter((prev) => {
                                return {
                                    ...prev,
                                    value: e.target.value,
                                };
                            });
                        }}
                        disabled={scope === "Anywhere"}
                    >
                        <option value="">Make a selection</option>
                        {scopes[scope].map((location) => {
                            return (
                                <option
                                    key={`select-${location}`}
                                    value={location}
                                >
                                    {location}
                                    {scope === "Region"
                                        ? ` (${
                                              regions_array[0].includes(
                                                  location
                                              )
                                                  ? "CAN"
                                                  : regions_array[1].includes(
                                                        location
                                                    )
                                                  ? "USA"
                                                  : "MEX"
                                          })`
                                        : ""}
                                </option>
                            );
                        })}
                    </select>
                </div>
                <div
                    className={`col-12 my-2${
                        scope !== "Territory" || !Boolean(props.target.value)
                            ? " d-none"
                            : ""
                    }`}
                >
                    <input
                        type="text"
                        className="form-control"
                        placeholder="City (optional)"
                        id={`${props.target.label}-lane_city`}
                        name={`${props.target.label}-lane_city`}
                        value={props.target.city}
                        onChange={(e) => {
                            props.setter((prev) => {
                                return {
                                    ...prev,
                                    city: props.toTitleCase(e.target.value),
                                };
                            });
                        }}
                        autoComplete="off"
                        disabled={
                            scope !== "Territory" ||
                            !Boolean(props.target.value)
                        }
                    />
                </div>
            </div>
        </Fragment>
    );
};

export default LaneBuilder;
