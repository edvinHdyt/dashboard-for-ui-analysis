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
import Books from './pages/admin/Books'
import BookCreate from './pages/admin/BookCreate'
import Category from './pages/admin/Category'
import CategoryCreate from './pages/admin/CategoryCreate'
import UserManagement from './pages/admin/UserManagement'
import UserManagementCreate from './pages/admin/UserManagementCreate'

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
    },
    {
      path: 'books',
      element: <Books/>
    },
    {
      path: 'books/create',
      element: <BookCreate/>
    },
    {
      path: 'categories',
      element: <Category/>
    },
    {
      path: 'categories/create',
      element: <CategoryCreate/>
    },
    {
      path: 'user-management',
      element: <UserManagement />
    },
    {
      path:'user-management/create',
      element: <UserManagementCreate />
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
