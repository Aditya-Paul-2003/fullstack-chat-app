import {create} from "zustand"
import { axiosInstance } from "../lib/axios";


export const useAuthStore= create((set) => ({
   authUser: null,
   isSigningUp: false,
   isLoggingIn: false,
   isUpdatingProfile: false,
   isCheckingAuth: true,

    checkAuth: async() => {
        try {
            const res = await axiosInstance.get("/auth/check");
            
            set({authUser:res.data})
        
        } catch (error) {

            console.log("Error in checkAuth", error);
            set({authUser: null})
            
        }finally{
            set({isCheckingAuth:false})
        }
    },

    signup: async (data) =>{},
}));


















// authUser:null,
// //used to store the user data

// isSigningUp:false,

// isLoggingIn: false,
// //used to track the state of the login and signup process

// isUpdatingProfile: false,
// //used to track the state of the profile update process

// isCheckingAuth: true,
// //isCheckingAuth is used to check if the user is Authenticate or not