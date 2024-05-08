import {createBrowserRouter} from "react-router-dom";
import {App} from "@/components/App";
import {Suspense} from "react";
import {LazyAdmin} from "@/pages/Admin/Admin.lazy";

const routes = [
    {
        path: '/admin',
        element: <App/>,
        children: [
            {
                path: '/admin/main',
                element: <Suspense fallback={"Loading..."}><LazyAdmin/></Suspense>
            }
        ]
    }
]

export const router = createBrowserRouter(routes)

export default routes
