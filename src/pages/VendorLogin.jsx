// imports
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import LoginForm from "./LoginForm";

// component
const VendorLogin = ({ CONDITIONAL_RENDERING }) => {
    // module
    const navigate = useNavigate();

    // effects
    useEffect(() => {
        if (CONDITIONAL_RENDERING.session) {
            navigate("/dashboard");
        }
    }, []);

    if (CONDITIONAL_RENDERING.session) {
        return false;
    }

    // render
    return (
        <LoginForm
            role="vendor"
            CONDITIONAL_RENDERING={CONDITIONAL_RENDERING}
        />
    );
};

export default VendorLogin;
