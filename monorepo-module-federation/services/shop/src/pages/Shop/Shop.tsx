import React from 'react';
import {Link} from "react-router-dom";
import {shopRoutes} from '@packages/shared/src/routes/shop'

const Shop = () => {
    return (
        <h1>
            Shop
            <Link to={shopRoutes.info}>Go to Info page</Link>
        </h1>
    );
};

export default Shop;
