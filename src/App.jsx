import { RouterProvider } from "react-router-dom"
import router from './routes/router.jsx'
import './styles/main.scss'
import 'bootstrap/dist/css/bootstrap.min.css';
import { UserContextProvider } from "./context/UserContext.jsx";

function App() {
  return (
    <UserContextProvider>
      <RouterProvider router={router} />
    </UserContextProvider>
  )
}

export default App
