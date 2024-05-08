import React from 'react';
import {Link, Outlet} from "react-router-dom";

export const App = () => {
    return (
        <div data-testId={"App"}>
            <h1>App</h1>
            <Link to={"/about"}>About</Link>
            <br/>
            <Link to={"/shop"}>Shop</Link>
            <Outlet/>
        </div>
    );
};
