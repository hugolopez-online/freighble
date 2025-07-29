/* IMPORTS START */
import { useEffect, useState, Fragment } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { Navbar } from "./layout/components";
import Transition from "../_templates/Transition";
/* IMPORTS END */

// component
const Dashboard = ({ CONDITIONAL_RENDERING, theme, setTheme }) => {
    // states
    const [greeting, setGreeting] = useState("");

    // module
    const navigate = useNavigate();

    // effects
    useEffect(() => {
        if (CONDITIONAL_RENDERING.session) {
            if (CONDITIONAL_RENDERING.USER_ROLE === "vendor") {
                navigate(`/vendors/vendor/${CONDITIONAL_RENDERING.USER_ID}`);
            }

            setGreeting(CONDITIONAL_RENDERING.USER_NAME);
        } else {
            navigate("/login");
            return;
        }
    }, []);

    // early return if no session
    if (
        !CONDITIONAL_RENDERING.session ||
        CONDITIONAL_RENDERING.USER_ROLE === "vendor"
    ) {
        return (
            <Transition
                variables={{
                    type: ["Authenticating", "Redirecting", "Loading"][1],
                    loader: ["spinner-border", "spinner-grow"][0],
                    message: "",
                }}
            />
        );
    }

    // render
    return (
        <Fragment>
            <div
                id={theme === "light" ? "navbar" : "navbar-dark"}
                className="row justify-content-center sticky-top mb-3"
            >
                <Navbar
                    greeting={greeting}
                    CONDITIONAL_RENDERING={CONDITIONAL_RENDERING}
                    theme={theme}
                    setTheme={setTheme}
                />
            </div>
            <Outlet />
        </Fragment>
    );
};

export default Dashboard;
