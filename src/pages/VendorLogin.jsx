// imports
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Transition, LoginForm } from "./_templates";

// component
const VendorLogin = ({ CONDITIONAL_RENDERING, theme }) => {
    // module
    const navigate = useNavigate();

    // effects
    useEffect(() => {
        if (CONDITIONAL_RENDERING.session) {
            navigate("/dashboard");
        }
    }, []);

    if (CONDITIONAL_RENDERING.session) {
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
        <LoginForm
            role="vendor"
            CONDITIONAL_RENDERING={CONDITIONAL_RENDERING}
            theme={theme}
        />
    );
};

export default VendorLogin;
