import { createBrowserRouter } from "react-router-dom";


const router = createBrowserRouter([
    {
        path: "/",
        errorElement: <div>Error Page</div>,
        element: <div>This is home page</div>
    }
])

export default router;