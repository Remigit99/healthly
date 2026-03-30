import { createBrowserRouter } from 'react-router'
import { RouterProvider } from 'react-router-dom'
import { RootLayout } from './Layouts/RootLayout';
import Home from './pages/Home';
import ParentLayout from './Layouts/ParentLayout';
import Login from './pages/Login';
import Register from './pages/Register';


const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    children: [
      // {
      //   path: '/',
      //   element: <Home />
      // },


      //USER ROUTES
      {
        path: '/',
        element: <ParentLayout />,
        children: [
          {
            path: '/',
            element: <Home />
          },
          {
            path:'/login',
            element: <Login />
          },
          {
            path:'/register',
            element: <Register />
          }
        ]
      }





    ]

  }
]);


const App = () => {
  

  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}

export default App
