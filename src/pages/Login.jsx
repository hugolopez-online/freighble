// imports
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Transition, LoginForm } from "./_templates";

// component
const Login = ({ CONDITIONAL_RENDERING, theme }) => {
    const navigate = useNavigate();

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
        <LoginForm
            role="user"
            CONDITIONAL_RENDERING={CONDITIONAL_RENDERING}
            theme={theme}
        />
    );
};

export default Login;
