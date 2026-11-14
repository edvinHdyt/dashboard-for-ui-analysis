import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import "./assets/style.css"
import { createBrowserRouter, RouterProvider, Navigate } from 'react-router'
import LoginLayout from './Layouts/LoginLayout'
import Login from './pages/auth/Login'
import MainLayout from "./Layouts/MainLayout"
import Dashboard from "./pages/admin/Dashboard"
import Authors from './pages/admin/Authors'
import AuthorCreate from './pages/admin/AuthorCreate'

const router = createBrowserRouter([
  {
   path: 'admin',
   element: <MainLayout />,
   children: [
    {
      index: true,
      element: <Navigate to="dashboard" replace />
    },
    {
      path: "dashboard",
      element: <Dashboard/>
    },
    {
      path: "authors",
      element: <Authors />
    },
    {
      path:'authors/create',
      element: <AuthorCreate/>,
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
