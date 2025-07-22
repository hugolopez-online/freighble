// imports
import { useEffect, useState, Fragment } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { Navbar } from "./layout/components";

// component
const Dashboard = () => {
    // states
    const [greeting, setGreeting] = useState("");

    // module
    const user_session = localStorage.getItem("user");
    const navigate = useNavigate();

    // effects
    useEffect(() => {
        if (user_session) {
            const { id, role } = JSON.parse(user_session);
            if (role === "vendor") {
                navigate(`/vendors/vendor/${id}`);
                return;
            }
            setGreeting(JSON.parse(user_session).name);
        } else {
            navigate("/login");
            return;
        }
    }, []);

    // early return if no session
    if (!user_session || JSON.parse(user_session).role === "vendor") {
        return false;
    }

    // render
    return (
        <Fragment>
            <div
                id="navbar"
                className="row justify-content-center sticky-top mb-3"
            >
                <Navbar greeting={greeting} />
            </div>
            <Outlet />
        </Fragment>
    );
};

export default Dashboard;
