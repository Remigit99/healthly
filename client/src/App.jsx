import { RouterProvider } from 'react-router'
import router from './router'
import {persistor, store} from "./store/store"
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'


const App = () => {
  

  return (
    <>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <RouterProvider router={router} />
        </PersistGate>
      </Provider>
    </>
  )
}

export default App
