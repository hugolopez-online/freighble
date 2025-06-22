import { Outlet } from "react-router-dom";
import { Fragment } from "react";
import { Header } from "./";

const Output = () => {
    return (
        <Fragment>
            <Header />
            <Outlet />
        </Fragment>
    );
};

export default Output;
