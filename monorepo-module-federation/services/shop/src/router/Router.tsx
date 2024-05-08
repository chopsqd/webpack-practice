import {createBrowserRouter} from "react-router-dom";
import {App} from "@/components/App";
import {Suspense} from "react";
import {LazyShop} from "@/pages/Shop/Shop.lazy";

const routes = [
    {
        path: '/shop',
        element: <App/>,
        children: [
            {
                path: '/shop/main',
                element: <Suspense fallback={"Loading..."}>
                    <LazyShop/>
                </Suspense>
            },
            {
                path: '/shop/info',
                element: <Suspense fallback={"Loading..."}>
                    <div>Shop Info</div>
                </Suspense>
            }
        ]
    }
]

export const router = createBrowserRouter(routes)

export default routes
