//imports
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Dashboard, Home, Login, Output, Register, NotFound } from "./pages";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route
                    path="/"
                    element={<Output />}
                >
                    <Route
                        index
                        element={<Home />}
                    />
                    <Route
                        path="login"
                        element={<Login />}
                    />
                    <Route
                        path="register"
                        element={<Register />}
                    />
                    <Route
                        path="*"
                        element={<NotFound />}
                    />
                </Route>
                <Route
                    path="dashboard"
                    element={<Dashboard />}
                />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
