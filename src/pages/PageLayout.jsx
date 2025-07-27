// imports
import { Fragment } from "react";
import { Outlet } from "react-router-dom";
import { Header, Footer } from "./";

const PageLayout = ({ anchor, setAnchor, CONDITIONAL_RENDERING }) => {
    return (
        <Fragment>
            <Header
                anchor={anchor}
                setAnchor={setAnchor}
                CONDITIONAL_RENDERING={CONDITIONAL_RENDERING}
            />
            <Outlet />
            <Footer
                anchor={anchor}
                setAnchor={setAnchor}
            />
        </Fragment>
    );
};

export default PageLayout;
