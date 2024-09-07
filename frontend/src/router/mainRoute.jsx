import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import Login from '../page/login'
import UserManage from '../page/userManage'
import AdminManage from '../page/adminManage'
import GWM from '../page/GWM'
import Register from '../page/register'

const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />
  },
  {
    path: "/userManage",
    element: <UserManage />
  },
  {
    path: "/adminManage",
    element: <AdminManage />
  },
  {
    path: "/GWM",
    element: <GWM />
  },
  {
    path: "/register",
    element: <register />
  },
])
export default function MainRoute() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}

