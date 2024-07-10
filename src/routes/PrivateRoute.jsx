import { Navigate, Outlet } from "react-router-dom"
import useUser from "../hooks/useUser"

export default function PrivateRoute () {
    const { userData } = useUser()
    return userData.isLogged ? <Outlet /> : <Navigate to="/" />
}