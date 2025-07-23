// imports
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import UserDisplay from "./UserDisplay";

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
const Register = ({ CONDITIONAL_RENDERING }) => {
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

    return (
        <UserDisplay
            visibility="create"
            data={data}
        />
    );
};

export default Register;
