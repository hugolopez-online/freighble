/* IMPORTS START */
import { useState, useEffect, Fragment } from "react";

import { Transition, UserDisplay } from "../../../_templates";
/* IMPORTS END */

/* MODULE START */
const BLANK_USER = {
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
/* MODULE END */

/* COMPONENT START */
const UserProfile = ({ CONDITIONAL_RENDERING, theme }) => {
    // state
    const [isFetching, setIsFetching] = useState(false);
    const [user, setUser] = useState(BLANK_USER);

    // effects
    useEffect(() => {
        const findUser = async () => {
            if (isFetching || user.email) {
                return;
            }

            const query_string = `/api/users/public/profile/${CONDITIONAL_RENDERING.USER_ID}`;

            setIsFetching(true);

            const found_user_promise = await fetch(query_string);

            const found_user_doc = await found_user_promise.json();
            const found_user = found_user_doc.user;
            setUser(found_user);
            setIsFetching(false);
        };

        findUser();
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
                    theme={theme}
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
/* COMPONENT END */

export default UserProfile;
