/* IMPORTS START */
import { Fragment } from "react";
import { Navigate } from "react-router-dom";
import { Transition, LoginForm } from "./_templates";
/* IMPORTS END */

/* COMPONENT START */
const Login = ({ CONDITIONAL_RENDERING, theme }) => {
    // module
    window.scrollTo(0, 0);

    // early return
    if (CONDITIONAL_RENDERING.session) {
        return (
            <Fragment>
                <Transition
                    variables={{
                        type: ["Authenticating", "Redirecting", "Loading"][1],
                        loader: ["spinner-border", "spinner-grow"][0],
                        message: "",
                    }}
                />
                <Navigate to="/dashboard" />
            </Fragment>
        );
    }

    // render
    return (
        <LoginForm
            role="user"
            CONDITIONAL_RENDERING={CONDITIONAL_RENDERING}
            theme={theme}
        />
    );
};
/* COMPONENT END */

export default Login;
