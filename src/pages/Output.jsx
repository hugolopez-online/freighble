// imports
import { Fragment } from "react";
import { Outlet } from "react-router-dom";
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
