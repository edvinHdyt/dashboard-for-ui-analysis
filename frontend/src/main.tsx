import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import "./assets/style.css"
import { createBrowserRouter, RouterProvider } from 'react-router'
import LoginLayout from './Layouts/LoginLayout'
import Login from './pages/auth/Login'
import MainLayout from "./Layouts/MainLayout"
import Dashboard from "./pages/admin/Dashboard"

const router = createBrowserRouter([
  {
   path: 'admin',
   element: <MainLayout />,
   children: [
    {
      index: true,
      element: <Dashboard />
    },
    {
      path: "dashboard",
      element: <Dashboard/>
    }
   ]
  },
  {
    path: 'auth',
    element: <LoginLayout/>,
    children: [
      {
        index: true,
        element: <Login/>
      }, 
      {
        path: 'login',
        element: <Login/>
      }
    ]
  },
 
]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router}/>
  </StrictMode>,
)
