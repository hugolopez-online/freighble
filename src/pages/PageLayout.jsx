// imports
import { Fragment } from "react";
import { Outlet } from "react-router-dom";
import { Header, Footer } from "./";

const PageLayout = ({
    anchor,
    setAnchor,
    CONDITIONAL_RENDERING,
    theme,
    setTheme,
}) => {
    return (
        <Fragment>
            <Header
                anchor={anchor}
                setAnchor={setAnchor}
                CONDITIONAL_RENDERING={CONDITIONAL_RENDERING}
            />
            <Outlet />
            <Footer />
            <button
                className="btn btn-lg text-warning position-fixed bottom-0 end-0"
                onClick={() => {
                    const CURRENT_THEME =
                        localStorage.getItem("freighbleTheme");
                    localStorage["freighbleTheme"] =
                        CURRENT_THEME === "light" ? "dark" : "light";
                    setTheme(localStorage["freighbleTheme"]);
                    if (localStorage["freighbleTheme"] === "dark") {
                        document
                            .getElementById("body")
                            .classList.add("bg-black");

                        document
                            .getElementById("body")
                            .classList.remove("bg-body");
                    } else {
                        document
                            .getElementById("body")
                            .classList.add("bg-body");

                        document
                            .getElementById("body")
                            .classList.remove("bg-black");
                    }
                }}
            >
                <i
                    className={`bi bi-${
                        theme === "light" ? "moon-fill" : "sun-fill"
                    }`}
                ></i>
            </button>
        </Fragment>
    );
};

export default PageLayout;
