import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Home from './Pages/Home.jsx'
import Login from './Pages/Login.jsx'
import Signup from './Pages/Signup.jsx'
import Dashboard from './Pages/Dashboard.jsx'
import Profile from './Pages/Profile.jsx'
import SingleUser from './Pages/SingleUser.jsx'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '',
        element: <Home />,
      },
      {
        path: 'login',
        element: <Login />,
      },
      {
        path: 'signup',
        element: <Signup />,
      },
      {
        path: 'dashboard',
        element: <Dashboard />,
      },
      {
        path: 'profile',
        element: <Profile />,
      },
      {
        path: '/user/:id',
        element: <SingleUser />,
      },
    ]
  }
])

createRoot(document.getElementById('root')).render(
  <RouterProvider router={router}/>
)
