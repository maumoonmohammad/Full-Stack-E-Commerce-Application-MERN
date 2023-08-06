import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-hot-toast";


const AuthProvider = createSlice({
    name: 'authorization',
    initialState: {
        user: null,
        token: "",
        results: [],
        categories: [],
        usercart: [],

    },
    reducers: {
        userInfo: (state, action) => {


            state.user = action?.payload?.user
            state.token = action?.payload?.token
        },
        deleteuser: (state) => {
            state.user = null
            state.token = ""
        },
        setresults: (state, action) => {

            state.results = action.payload

        },
        SliceCategories: (state, action) => {
            state.categories = action.payload
        },
        addcart: (state, action) => {

            state.usercart.push(action.payload)

            toast.success('added to cart successfully')

        },
        deletecartitem: (state, action) => {
            state.usercart = state.usercart.filter((item) => item._id !== action.payload)
            localStorage.setItem('cart', JSON.stringify(state.usercart))
            localStorage.setItem('cartlength', JSON.stringify(state.usercart.length))


        },
        addfromlocal: (state, action) => {
            if (state.usercart.length === 0) {
                state.usercart = action.payload
            }
        },
        updatedUser: (state, action) => {

            state.user = action?.payload
        },
        deletecart: (state, action) => {
            console.log(action.payload)
            state.usercart = action.payload

            localStorage.setItem('cartlength', JSON.stringify(state.usercart.length))

            localStorage.setItem('cart', JSON.stringify([]))
        }

    }
})
export const { userInfo, deleteuser, setresults, SliceCategories, addcart, deletecartitem, addfromlocal, updatedUser, deletecart } = AuthProvider.actions
export default AuthProvider.reducer