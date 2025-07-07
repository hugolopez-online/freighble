import { Fragment } from "react";
import { Outlet } from "react-router-dom";

const Vendors = () => {
    return (
        <Fragment>
            <Outlet />
        </Fragment>
    );
};

export default Vendors;
