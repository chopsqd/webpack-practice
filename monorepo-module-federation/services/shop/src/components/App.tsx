import React from 'react';
import {Outlet} from "react-router-dom";

export const App = () => {
    return (
        <div>
            <h1>SHOP MODULE</h1>
            <Outlet/>
        </div>
    );
};
