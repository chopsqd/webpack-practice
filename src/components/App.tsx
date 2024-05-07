import React, {useState} from 'react';
import styles from './App.module.scss'
import {Link, Outlet} from "react-router-dom";

export const App = () => {
    const [count, setCount] = useState<number>(0)

    const increment = () => setCount(prev => prev + 1)
    const decrement = () => setCount(prev => prev - 1)

    return (
        <div>
            <Link to={'/about'}>About</Link>
            <Link to={'/shop'}>Shop</Link>

            <button className={styles.button} onClick={increment}>+</button>
            <h1 className={styles.value}>{count}</h1>
            <button onClick={decrement}>-</button>

            <Outlet/>
        </div>
    );
};
