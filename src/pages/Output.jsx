import { Outlet } from "react-router-dom";
import { Fragment } from "react";
import { Header } from "./";

const Output = () => {
    return (
        <div className="row bg-dark website-hero">
            <Header />
            <Outlet />
        </div>
    );
};

export default Output;
