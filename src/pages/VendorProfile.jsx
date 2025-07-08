// imports
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

// render
const VendorProfile = () => {
    const [isFetching, setIsFetching] = useState(false);
    const [vendor, setVendor] = useState({});
    const { id } = useParams();

    useEffect(() => {
        const findVendor = async () => {
            if (isFetching || vendor.company) {
                return;
            }
            // async func to search vendors through API
            const query_string = `/api/vendors/public/profile/${id}`;

            setIsFetching(true);

            const found_vendor_promise = await fetch(query_string);

            const found_vendor_doc = await found_vendor_promise.json();
            const found_vendor = found_vendor_doc.vendor;
            setVendor(found_vendor);
            setIsFetching(false);
        };

        findVendor();
    }, []);

    return (
        <div className="row justify-content-center pt-5">
            <div className="col-10 py-4">
                <h1 className="display-1">Vendor Profile</h1>
            </div>
            <div className="col-10">
                <div className="card text-bg-light bg-gradient rounded-4 p-4 mb-4">
                    {isFetching ? (
                        <div className="d-flex align-items-center">
                            <strong role="status">
                                Loading vendor information...
                            </strong>
                            <div
                                className="spinner-border ms-auto"
                                aria-hidden="true"
                            ></div>
                        </div>
                    ) : vendor ? (
                        <div className="card-body">
                            <h2 className="card-title">{vendor.company}</h2>
                            <hr />
                            <h4 className="card-subtitle text-secondary">
                                Company information
                            </h4>
                            <ul className="card-text">
                                <li>
                                    <strong>Domicile:</strong>{" "}
                                    {vendor.domicile?.city},{" "}
                                    {vendor.domicile?.territory},{" "}
                                    {vendor.domicile?.country}
                                </li>
                                {vendor?.type?.asset_based && (
                                    <li>Asset-based</li>
                                )}
                                {vendor?.type?.freight_broker && (
                                    <li>Freight broker</li>
                                )}
                                <li>
                                    <strong>Phone:</strong> {vendor.phone}
                                </li>
                                <li>
                                    <strong>Email:</strong> {vendor.email}
                                </li>
                                <li>
                                    <strong>Attn:</strong> {vendor.contact}
                                </li>
                            </ul>
                            <hr />
                            <h4 className="card-subtitle text-secondary">
                                Coverage information
                            </h4>
                            <p className="card-text">
                                Lorem ipsum dolor sit amet consectetur,
                                adipisicing elit. Harum voluptatum laboriosam
                                laborum voluptatem eveniet? Consequuntur vel
                                quia unde laudantium. Saepe enim perspiciatis
                                quia itaque tempora exercitationem ut maxime
                                consequuntur voluptate?
                            </p>
                        </div>
                    ) : (
                        <div className="card-body">
                            <div className="card-text">
                                <p>Could not find that vendor</p>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default VendorProfile;
