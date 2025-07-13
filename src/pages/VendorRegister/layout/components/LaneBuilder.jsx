// imports
import { Fragment, useState } from "react";
import { geo_tree } from "data/geo_meta";

// module
const countries = Object.keys(geo_tree);

const regions_array = [
    Object.keys(geo_tree.CAN),
    Object.keys(geo_tree.USA),
    Object.keys(geo_tree.MEX),
];
const regions = regions_array.flat(Infinity);

// component
const LaneBuilder = (props) => {
    // state
    const [scope, setScope] = useState("Anywhere");
    const [location, setLocation] = useState("Anywhere");

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
            <div className="col-6">
                <label
                    htmlFor={`${props.target.label}-lane_scope`}
                    className="fw-normal text-secondary"
                    style={{ fontSize: "0.85em" }}
                >
                    {props.target.label} scope and location
                </label>
                <div className="input-group mb-2">
                    <select
                        className="form-select"
                        id={`${props.target.label}-lane_scope`}
                        name={`${props.target.label}-lane_scope`}
                        value={scope}
                        onChange={(e) => {
                            setScope(e.target.value);
                            props.setter((prev) => {
                                return {
                                    ...prev,
                                    value: "",
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

                    <select
                        className="form-select"
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
                                city: e.target.value,
                            };
                        });
                    }}
                    autoComplete="off"
                    disabled={
                        scope !== "Territory" || !Boolean(props.target.value)
                    }
                />
            </div>
        </Fragment>
    );
};

export default LaneBuilder;
