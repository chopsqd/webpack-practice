import React, {useState} from 'react';
import styles from './App.module.scss'
import {Link, Outlet} from "react-router-dom";

// Tree Shaking
function log(str: string) {
    console.log(str)
}

export const App = () => {
    const [count, setCount] = useState<number>(0)

    const increment = () => setCount(prev => prev + 1)
    const decrement = () => setCount(prev => prev - 1)

    return (
        <div>
            <h1>PLATFORM: {__PLATFORM__}</h1>
            <Link to={'/about'}>About</Link>
            <Link to={'/shop'}>Shop</Link>

            <button className={styles.button} onClick={increment}>+</button>
            <h1 className={styles.value}>{count}</h1>
            <button className={styles.button} onClick={decrement}>-</button>

            <Outlet/>
        </div>
    );
};
