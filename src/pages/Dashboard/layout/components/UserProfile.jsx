// imports
import { useState, useEffect, Fragment } from "react";
import { useNavigate } from "react-router-dom";
import { Transition, UserDisplay } from "../../../_templates";

// module
const skeleton = {
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

// render
const UserProfile = ({ CONDITIONAL_RENDERING }) => {
    // state
    const [isFetching, setIsFetching] = useState(false);
    const [user, setUser] = useState(skeleton);

    // module
    const user_session = localStorage.getItem("user");
    const navigate = useNavigate();

    // effects
    useEffect(() => {
        if (user_session) {
            const { id, role } = JSON.parse(user_session);
            if (role === "vendor") {
                navigate(`vendors/vendor/${id}`);
                return;
            }

            const findUser = async () => {
                if (isFetching || user.email) {
                    return;
                }
                // async func to search vendors through API
                const query_string = `/api/users/public/profile/${id}`;

                setIsFetching(true);

                const found_user_promise = await fetch(query_string);

                const found_user_doc = await found_user_promise.json();
                const found_user = found_user_doc.user;
                setUser(found_user);
                setIsFetching(false);
            };

            findUser();
        } else {
            navigate("/login");
        }
    }, []);

    // render
    return (
        <Fragment>
            {isFetching ? (
                <Transition
                    variables={{
                        type: ["Authenticating", "Redirecting", "Loading"][2],
                        loader: ["spinner-border", "spinner-grow"][0],
                        message: "Fetching user data.",
                    }}
                />
            ) : user.first_name ? (
                <UserDisplay
                    visibility="view"
                    data={user}
                    CONDITIONAL_RENDERING={CONDITIONAL_RENDERING}
                />
            ) : (
                <div className="row justify-content-center">
                    <div
                        className="col-10"
                        style={{ minHeight: "100vh" }}
                    >
                        <h5 className="display-5">No user has been found...</h5>
                    </div>
                </div>
            )}
        </Fragment>
    );
};

export default UserProfile;
