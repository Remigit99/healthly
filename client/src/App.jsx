import { RouterProvider } from 'react-router'
import router from './router'
import {store} from "./store/store"
import { Provider } from 'react-redux'


const App = () => {
  

  return (
    <>
      <Provider store={store}>
        <RouterProvider router={router} />
      </Provider>
    </>
  )
}

export default App
