// imports
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

const Register = () => {
    return (
        <UserDisplay
            visibility="create"
            data={data}
        />
    );
};

export default Register;
