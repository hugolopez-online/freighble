// imports
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import LoginForm from "./LoginForm";

// component
const Login = ({ CONDITIONAL_RENDERING }) => {
    const navigate = useNavigate();

    useEffect(() => {
        if (CONDITIONAL_RENDERING.session) {
            navigate("/dashboard");
        }
    }, []);

    if (CONDITIONAL_RENDERING.session) {
        return false;
    }

    return (
        <LoginForm
            role="user"
            CONDITIONAL_RENDERING={CONDITIONAL_RENDERING}
        />
    );
};

export default Login;
