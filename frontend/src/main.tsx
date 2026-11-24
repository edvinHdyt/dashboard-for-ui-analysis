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
import Register from './pages/auth/Regsiter'
import { HandleLogout } from './Utils/HandleLogout'

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
      element: <Dashboard/>,
      handle:{title:"Dashboard"}
    },
    {
      path: "authors",
      element: <Authors/>,
      handle:{title:"Authors"}
    },
    {
      path:'authors/create',
      element: <AuthorCreate/>,
      handle:{title:"Authors - Create"}
    },
    {
      path:'authors/update/:id',
      element: <AuthorCreate/>,
      handle:{title:"Authors - Update"}
    },
    {
      path: 'books',
      element: <Books/>,
      handle:{title:"Books"}
    },
    {
      path: 'books/create',
      element: <BookCreate/>,
      handle:{title:"Books - Create"}
    },
    {
      path: 'book/update/:id',
      element: <BookCreate />,
      handle:{title:"Books - Update"}
    },
    {
      path: 'categories',
      element: <Category/>,
      handle:{title:"Categories"}
    },
    {
      path: 'categories/create',
      element: <CategoryCreate/>,
      handle:{title:"Category - Create"}
    },
    {
      path:'category/update/:id',
      element: <CategoryCreate/>,
      handle:{title:"Category - Update"}
    },
    {
      path: 'user-management',
      element: <UserManagement />,
      handle:{title:"User Management"}
    },
    {
      path:'user-management/create',
      element: <UserManagementCreate />,
      handle:{title:"User Management - Create"}
    },
    {
      path:'user-management/update/:id',
      element: <UserManagementCreate />,
      handle:{title:"User Management - Update"}
    }
   ]
  },
  {
    path: 'auth',
    element: <LoginLayout/>,
    children: [
      {
        index: true,
        element: <Login/>,
        handle: {title: "Login"}
      }, 
      {
        path: 'login',
        element: <Login/>,
        handle: {title: "Login"}
      },
      {
        path:'register',
        element: <Register/>,
        handle: {title: "Register"}
      }
    ]
  },
  {
    path:'auth/logout',
    element: <HandleLogout />
  }
 
]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router}/>
  </StrictMode>,
)
