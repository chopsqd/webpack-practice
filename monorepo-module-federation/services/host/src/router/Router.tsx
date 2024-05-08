import {createBrowserRouter} from "react-router-dom";
import {App} from "@/components/App";
import shopRoutes from 'shop/Router'
import adminRoutes from 'admin/Router'

export const router = createBrowserRouter([
    {
        path: '/',
        element: <App/>,
        children: [
            ...shopRoutes,
            ...adminRoutes
        ]
    }
])
