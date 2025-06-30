// imports
import { Fragment, useState } from "react";
import { Outlet } from "react-router-dom";
import { Header, Footer } from "./";

const Output = ({ anchor, setAnchor }) => {
    return (
        <Fragment>
            <Header
                anchor={anchor}
                setAnchor={setAnchor}
            />
            <Outlet />
            <Footer
                anchor={anchor}
                setAnchor={setAnchor}
            />
        </Fragment>
    );
};

export default Output;
