/* IMPORTS START */
import { Fragment } from "react";
import { Navigate } from "react-router-dom";

import { Navbar, DashboardMain } from "./layout/components";
import Transition from "../_templates/Transition";
/* IMPORTS END */

/* COMPONENT START */
const Dashboard = ({ CONDITIONAL_RENDERING, theme, setTheme }) => {
    // module
    const GREETING = CONDITIONAL_RENDERING?.USER_NAME;

    // early return
    if (
        !CONDITIONAL_RENDERING.session ||
        CONDITIONAL_RENDERING.USER_ROLE === "vendor"
    ) {
        if (CONDITIONAL_RENDERING.USER_ROLE === "vendor") {
            return (
                <Fragment>
                    <Transition
                        variables={{
                            type: [
                                "Authenticating",
                                "Redirecting",
                                "Loading",
                            ][1],
                            loader: ["spinner-border", "spinner-grow"][0],
                            message: "",
                        }}
                    />
                    <Navigate
                        to={`/vendors/vendor/${CONDITIONAL_RENDERING.USER_ID}`}
                    />
                </Fragment>
            );
        } else {
            return (
                <Fragment>
                    <Transition
                        variables={{
                            type: [
                                "Authenticating",
                                "Redirecting",
                                "Loading",
                            ][1],
                            loader: ["spinner-border", "spinner-grow"][0],
                            message: "",
                        }}
                    />
                    <Navigate to="/login" />
                </Fragment>
            );
        }
    }

    // render
    return (
        <Fragment>
            <div
                id={theme === "light" ? "navbar" : "navbar-dark"}
                className="row justify-content-center sticky-top mb-3"
            >
                <Navbar
                    GREETING={GREETING}
                    CONDITIONAL_RENDERING={CONDITIONAL_RENDERING}
                    theme={theme}
                    setTheme={setTheme}
                />
            </div>
            <DashboardMain
                CONDITIONAL_RENDERING={CONDITIONAL_RENDERING}
                theme={theme}
            />
        </Fragment>
    );
};
/* COMPONENT END */

export default Dashboard;
