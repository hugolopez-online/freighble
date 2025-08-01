// imports
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Transition, UserDisplay } from "./_templates";

// module
const data = {
    first_name: "",
    last_name: "",
    company: "",
    email: "",
    auth: {
        password: "",
        terms: {
            version: "v1.0.0",
            accepted: false,
            date_accepted: null,
        },
    },
};

// component
const Register = ({ CONDITIONAL_RENDERING, theme }) => {
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

    return (
        <UserDisplay
            visibility="create"
            data={data}
            theme={theme}
        />
    );
};

export default Register;
