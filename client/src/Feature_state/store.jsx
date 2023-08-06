import { configureStore } from '@reduxjs/toolkit'
import AuthProvider from './ecommerce_Slice'

export const store = configureStore({
    reducer: {
        app: AuthProvider
    }
})