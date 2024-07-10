import { createBrowserRouter } from 'react-router-dom'
import Home from '../pages/Home/Home'
import Dashboard from '../pages/Dashboard/Dashboard'
import RootLayout from '../pages/RootLayout/RootLayout'
import PrivateRoute from './PrivateRoute'

const router = createBrowserRouter ([
    {
        path: "/",
        element: <RootLayout />,
        children: [{
            index: true,
            element: <Home />
        },{
            path: "dashboard",
            element: <PrivateRoute />,
            children : [{
                index: true,
                element: <Dashboard />
            }]
        }
    ]
    }
])

export default router