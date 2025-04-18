import {create} from "zustand"
import { axiosInstance } from "../lib/axios.js"
import toast from "react-hot-toast";

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

    signup: async (data) => {
        set({ isSigningUp: true });
        try {
            const res= await axiosInstance.post("/auth/signup",data);
            set({ authUser: res.data });
            toast.success("Account Created Successfully")
        } catch (error) {
            toast.error(error.response.data.message);
        } finally{
            set({ isSigningUp: false});
        }
    },

    logout: async()=> {
        try {
            await axiosInstance.post("/auth/logout");
            set({authUser:null});
            toast.success("Logged Out Successfully");

        } catch (error) {
            toast.error("error.response.data.message")
        }
    },

    login: async (data) => {
        set({ isLoggingIn: true });
        try {
            const res = await axiosInstance.post("/auth/login", data);
            set({ authUser: res.data });
            toast.success("Logged In Successfully");
        } catch (error) {
            toast.error(error.response.data.message);
        } finally{
            set({ isLoggingIn: false});
        }
    },

    updateProfile: async(data) => {
        set({ isUpdatingProfile: true });
        try {
            const res = await axiosInstance.put("/auth/update-profile", data);
            set({ authUser: res.data });
            toast.success("Profile Updated Successfully");
        } catch (error) {
            console.log("error in update profile", error);
            toast.error(error.response.data.message);
        }finally{
            set({ isUpdatingProfile: false });
        }
    }

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