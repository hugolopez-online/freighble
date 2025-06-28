import { Outlet } from "react-router-dom";
import { Header } from "./";

const Output = () => {
    return (
        <div className="row pb-4">
            <Header />
            <Outlet />
        </div>
    );
};

export default Output;
