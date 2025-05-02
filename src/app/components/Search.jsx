import { useEffect, useState } from "react";
import { transportationModes, canDivisions, usaDivisions, mexDivisions, borderCrossingPorts } from "../variables";
import geoLookup from "../handlers/geoMeta";

// const defaultFormData = {
//     mode: "void",
//     originCity: "",
//     originState: "void",
//     destinationCity: "",
//     destinationState: "void",
//     border: "Not Applicable",
//     hazmat: false,
//     team: false,
//     usbond: false,
//     canadabond: false
// };

const Search = (props) => {
    // const [formData, setFormData] = useState(defaultFormData);

    const handleSpecs = (e) => {
        e.preventDefault();
        const originCity = document.getElementById("originCity").value;
        const originState = document.getElementById("originState").value;
        const originRegion = geoLookup[originState].region;
        const originCountry = geoLookup[originState].country;
        const destinationCity = document.getElementById("destinationCity").value;
        const destinationState = document.getElementById("destinationState").value;
        const destinationRegion = geoLookup[destinationState].region;
        const destinationCountry = geoLookup[destinationState].country;

        props.setSpecs((prev) => {
            return ({
                ...prev,
                mode: document.getElementById("mode").value,
                origin: {
                    city: originCity,
                    state: originState,
                    region: originRegion,
                    country: originCountry
                },
                destination: {
                    city: destinationCity,
                    state: destinationState,
                    region: destinationRegion,
                    country: destinationCountry
                },
                border: document.getElementById("borderPort").value,
                hazmat: document.getElementById("hazmat").checked,
                team: document.getElementById("teamDrivers").checked,
                usbond: document.getElementById("usBonded").checked,
                canadabond: document.getElementById("canadaBonded").checked
            });
        });

        props.setFormData(props.defaultFormData);
    };

    return (
        <div className="col-md-3">
            <form className="p-2 m-3 border rounded text-bg-light" onSubmit={handleSpecs}>
                <h2>Find a carrier</h2>
                {/* Mode */}
                <div className="form-floating mb-2">
                    <select className="form-select form-select-sm" id="mode" value={props.formData.mode} onChange={(e) => props.setFormData((prev) => {return ({...prev, mode: e.target.value})})} required>
                        <option value="void" style={{display: "none"}}>
                            Select a mode
                        </option>
                        {transportationModes.map((mode, index) => {
                            return (
                                <option key={mode.concat("-mode-", index)} value={mode}>
                                    {mode}
                                </option>
                            );
                        })}
                    </select>
                    <label htmlFor="mode">Mode</label>
                </div>
                
                {/* Origin */}
                <fieldset className="mb-2">
                    <div className="row g-2">
                        <div className="form-floating col-8">
                            <input type="text" className="form-control form-control-sm" placeholder="City (optional)" id="originCity" name="originCity" value={props.formData.originCity} onChange={(e) => props.setFormData((prev) => {return ({...prev, originCity: e.target.value})})} />
                            <label htmlFor="originCity">Origin city</label>
                        </div>
                        <div className="form-floating col-4">
                            <select className="form-select form-select-sm" id="originState" name="originState" value={props.formData.originState} onChange={(e) => props.setFormData((prev) => {return ({...prev, originState: e.target.value})})} required>
                                <option value="void" style={{display: "none"}}>State</option>
                                <option disabled>Canada</option>
                                {canDivisions.map((state, index) => {
                                    return (
                                        <option key={state.concat("-originState-", index)} value={state}>{state}</option>
                                    );
                                })}
                                <option disabled></option>
                                <option disabled>United States</option>
                                {usaDivisions.map((state, index) => {
                                    return (
                                        <option key={state.concat("-originState-", index)} value={state}>{state}</option>
                                    );
                                })}
                                <option disabled></option>
                                <option disabled>Mexico</option>
                                {mexDivisions.map((state, index) => {
                                    return (
                                        <option key={state.concat("-originState-", index)} value={state}>{state}</option>
                                    );
                                })}
                            </select>
                            <label htmlFor="originState">Origin state</label>
                        </div>
                    </div>
                </fieldset>
                
                {/* Destination */}
                <fieldset className="mb-2">
                    <div className="row g-2">
                        <div className="form-floating col-8">
                            <input type="text" className="form-control form-control-sm" placeholder="City (optional)" id="destinationCity" name="destinationCity" value={props.formData.destinationCity} onChange={(e) => props.setFormData((prev) => {return ({...prev, destinationCity: e.target.value})})} />
                            <label htmlFor="destinationCity">Destination city</label>
                        </div>
                        <div className="form-floating col-4">
                            <select className="form-select form-select-sm" id="destinationState" name="destinationState" value={props.formData.destinationState} onChange={(e) => props.setFormData((prev) => {return ({...prev, destinationState: e.target.value})})} required>
                                <option value="void" style={{display: "none"}}>State</option>
                                <option disabled>Canada</option>
                                {canDivisions.map((state, index) => {
                                    return (
                                        <option key={state.concat("-destinationState-", index)} value={state}>{state}</option>
                                    );
                                })}
                                <option disabled></option>
                                <option disabled>United States</option>
                                {usaDivisions.map((state, index) => {
                                    return (
                                        <option key={state.concat("-destinationState-", index)} value={state}>{state}</option>
                                    );
                                })}
                                <option disabled></option>
                                <option disabled>Mexico</option>
                                {mexDivisions.map((state, index) => {
                                    return (
                                        <option key={state.concat("-destinationState-", index)} value={state}>{state}</option>
                                    );
                                })}
                            </select>
                            <label htmlFor="destinationState">Dest. state</label>
                        </div>
                    </div>
                </fieldset>
                
                {/* Border Crossing */}
                <fieldset className="mb-2">
                    <div className="form-floating">
                        <select className="form-select form-select-sm" name="borderPort" id="borderPort" value={props.formData.border} onChange={(e) => props.setFormData((prev) => {return ({...prev, border: e.target.value})})} required>
                            {borderCrossingPorts.map((border) => {
                                return (
                                    <option key={border.replace(/ /g, "-").replace(/,/g, "_")} value={border}>{border}</option>
                                );
                            })}
                        </select>
                        <label htmlFor="borderPort">Border crossing port</label>
                    </div>
                </fieldset>
                
                {/* Additional Requirements */}
                <fieldset className="mb-2">
                    <legend className="fs-6 fw-bold">
                        Additional Requirements
                    </legend>
                    <div className="form-check form-check-inline">
                        <input className="form-check-input" type="checkbox" id="hazmat" name="hazmat" checked={props.formData.hazmat} onChange={(e) => props.setFormData((prev) => {return ({...prev, hazmat: e.target.checked})})} />
                        <label className="form-check-label" htmlFor="hazmat">Hazmat</label>
                    </div>
                    <div className="form-check form-check-inline">
                        <input className="form-check-input" type="checkbox" id="teamDrivers" name="teamDrivers" checked={props.formData.team} onChange={(e) => props.setFormData((prev) => {return ({...prev, team: e.target.checked})})} />
                        <label className="form-check-label" htmlFor="teamDrivers">Team Drivers</label>
                    </div>
                    <div className="form-check form-check-inline">
                        <input className="form-check-input" type="checkbox" id="usBonded" name="usBonded" checked={props.formData.usbond} onChange={(e) => props.setFormData((prev) => {return ({...prev, usbond: e.target.checked})})} />
                        <label className="form-check-label" htmlFor="usBonded">U.S. Bonded</label>
                    </div>
                    <div className="form-check form-check-inline">
                        <input className="form-check-input" type="checkbox" id="canadaBonded" name="canadaBonded" checked={props.formData.canadabond} onChange={(e) => props.setFormData((prev) => {return ({...prev, canadabond: e.target.checked})})} />
                        <label className="form-check-label" htmlFor="canadaBonded">Canada Bonded</label>
                    </div>
                </fieldset>
                <button type="button" className="btn btn-sm btn-outline-danger mb-2" onClick={() => props.setFormData(props.defaultFormData)}>Reset fields</button>
                <button type="submit" className="btn btn-primary w-100 fw-bold">Search</button>
            </form>
        </div>
    );
};

export default Search;