import {configureStore} from '@reduxjs/toolkit'
import authReducer from './features/auth/authSlice'
// import userReducer from './slices/userSlice'
// import doctorReducer from './slices/doctorSlice'
// import appointmentReducer from './slices/appointmentSlice'

export const store = configureStore({
    reducer: {
        auth: authReducer,
        // user: userReducer,
        // doctor: doctorReducer,
        // appointment: appointmentReducer,
    },
})