//imports
import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import {
    Dashboard,
    Home,
    Login,
    PageLayout,
    Register,
    UserProfile,
    VendorLogin,
    VendorProfile,
    VendorRegister,
    Vendors,
    VendorsPortal,
    NotFound,
} from "./pages";

import DashboardMain from "./pages/Dashboard/layout/components/DashboardMain";

function App() {
    const [anchor, setAnchor] = useState("");

    return (
        <BrowserRouter>
            <Routes>
                <Route
                    path="/"
                    element={
                        <PageLayout
                            anchor={anchor}
                            setAnchor={setAnchor}
                        />
                    }
                >
                    <Route
                        index
                        element={
                            <Home
                                anchor={anchor}
                                setAnchor={setAnchor}
                            />
                        }
                    />
                    <Route
                        path="login"
                        element={
                            <Login
                                anchor={anchor}
                                setAnchor={setAnchor}
                            />
                        }
                    />
                    <Route
                        path="register"
                        element={
                            <Register
                                anchor={anchor}
                                setAnchor={setAnchor}
                            />
                        }
                    />
                    <Route
                        path="vendors"
                        element={
                            <Vendors
                                anchor={anchor}
                                setAnchor={setAnchor}
                            />
                        }
                    >
                        <Route
                            index
                            element={
                                <VendorsPortal
                                    anchor={anchor}
                                    setAnchor={setAnchor}
                                />
                            }
                        />
                        <Route
                            path="vendor"
                            element={
                                <VendorRegister
                                    anchor={anchor}
                                    setAnchor={setAnchor}
                                />
                            }
                        />
                        <Route
                            path="vendor/:id"
                            element={
                                <VendorProfile
                                    anchor={anchor}
                                    setAnchor={setAnchor}
                                />
                            }
                        />
                        <Route
                            path="login"
                            element={
                                <VendorLogin
                                    anchor={anchor}
                                    setAnchor={setAnchor}
                                />
                            }
                        />
                    </Route>
                    <Route
                        path="*"
                        element={
                            <NotFound
                                anchor={anchor}
                                setAnchor={setAnchor}
                            />
                        }
                    />
                </Route>
                <Route
                    path="dashboard"
                    element={<Dashboard />}
                >
                    <Route
                        index
                        element={<DashboardMain />}
                    />
                    <Route
                        path="profile"
                        element={<UserProfile />}
                    />
                </Route>
            </Routes>
        </BrowserRouter>
    );
}

export default App;
