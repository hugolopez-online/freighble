/* IMPORTS START */
import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import {
    Dashboard,
    Home,
    Login,
    PageLayout,
    Register,
    VendorLogin,
    VendorProfile,
    VendorRegister,
    Vendors,
    VendorsPortal,
    NotFound,
} from "./pages";
/* IMPORTS END */

/* COMPONENT START */
function App() {
    // state
    const [anchor, setAnchor] = useState("");
    const [session, setSession] = useState(
        JSON.parse(localStorage.getItem("user"))
    );
    const [theme, setTheme] = useState(
        localStorage.getItem("freighbleTheme") || "light"
    );

    // module
    const USER_ID = session?.id;
    const USER_ROLE = session?.role;
    const USER_NAME = session?.role === "user" && session?.name;

    const CONDITIONAL_RENDERING = {
        session,
        setSession,
        USER_ID,
        USER_ROLE,
        USER_NAME,
    };

    if (!localStorage.getItem("freighbleTheme")) {
        localStorage.setItem("freighbleTheme", "light");
    }

    if (theme === "light") {
        document.getElementById("body").classList.add("bg-body");
        document
            .getElementById("body")
            .classList.remove("bg-black", "text-light");
    } else {
        document.getElementById("body").classList.add("bg-black", "text-light");
        document.getElementById("body").classList.remove("bg-body");
    }

    // render
    return (
        <BrowserRouter>
            <Routes>
                <Route
                    path="/"
                    element={
                        <PageLayout
                            anchor={anchor}
                            setAnchor={setAnchor}
                            CONDITIONAL_RENDERING={CONDITIONAL_RENDERING}
                            theme={theme}
                            setTheme={setTheme}
                        />
                    }
                >
                    <Route
                        index
                        element={
                            <Home
                                setAnchor={setAnchor}
                                theme={theme}
                            />
                        }
                    />
                    <Route
                        path="login"
                        element={
                            <Login
                                CONDITIONAL_RENDERING={CONDITIONAL_RENDERING}
                                theme={theme}
                            />
                        }
                    />
                    <Route
                        path="register"
                        element={
                            <Register
                                CONDITIONAL_RENDERING={CONDITIONAL_RENDERING}
                                theme={theme}
                            />
                        }
                    />
                    <Route
                        path="vendors"
                        element={<Vendors />}
                    >
                        <Route
                            index
                            element={<VendorsPortal />}
                        />
                        <Route
                            path="vendor"
                            element={
                                <VendorRegister
                                    CONDITIONAL_RENDERING={
                                        CONDITIONAL_RENDERING
                                    }
                                    theme={theme}
                                />
                            }
                        />
                        <Route
                            path="vendor/:id"
                            element={
                                <VendorProfile
                                    CONDITIONAL_RENDERING={
                                        CONDITIONAL_RENDERING
                                    }
                                    theme={theme}
                                />
                            }
                        />
                        <Route
                            path="login"
                            element={
                                <VendorLogin
                                    CONDITIONAL_RENDERING={
                                        CONDITIONAL_RENDERING
                                    }
                                    theme={theme}
                                />
                            }
                        />
                    </Route>
                    <Route
                        path="*"
                        element={<NotFound />}
                    />
                </Route>
                <Route
                    path="dashboard"
                    element={
                        <Dashboard
                            CONDITIONAL_RENDERING={CONDITIONAL_RENDERING}
                            theme={theme}
                            setTheme={setTheme}
                        />
                    }
                />
            </Routes>
        </BrowserRouter>
    );
}
/* COMPONENT END */

export default App;
