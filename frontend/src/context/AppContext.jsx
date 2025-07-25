import {  createContext,useContext } from "react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { dummyProducts } from "../assets/assets";
import { useEffect } from "react";
import { toast } from "react-hot-toast";
import axios from 'axios'



axios.defaults.withCredentials=true;
axios.defaults.baseURL=import.meta.env.VITE_BACKEND_URL;


export const AppContext=createContext ({
    products: []
})


export const AppContextProvider=({children})=>{
    const currency=import.meta.env.VITE_CURRENCY;
    const navigate=useNavigate();
    const [user,setUser]=useState(null)
    const [isSeller,setIsSeller]=useState(false);
    const [showUserLogin,setShowUserLogin]=useState();
    const[products,setProducts]=useState([]);
    const [cartItems,setCartItems]=useState([]);
    const [searchQuery,setSearchQuery]=useState([]);

    // Fetch seller Status
    const fetchSeller=async()=>{
        try {
            const {data}=await axios.get('/api/seller/is-auth')
            if(data.success){
                setIsSeller(true)
            }
            else{
                setIsSeller(false);
            }
        } catch (error) {
            console.log(error)
            setIsSeller(false)
            
        }
    }
    //// featch user statues and all data 
    const fetchUser = async ()=>{
        try {
            const {data} = await axios.get(`api/user/is-auth`);
            if(data.success){
                setUser(data.user);
                setCartItems(data.user.cartItems)
                
            }
            
            
        } catch (error) {
            setUser(null);
            console.log("enable to fetch user auth data")
            console.log(error)

            
        }
    }

    const fetchProducts=async()=>{
       try {
          const {data} =await axios.get('/api/product/list')
          console.log("product ", data.product)
          if(data.success){
            setProducts(data.product)

          }else{
            toast.error(data.message)
          }
        
       } catch (error) {
            toast.error(error.message)
        
       }
    }
    const addToCart = (itemId) => {
    let cartData = structuredClone(cartItems);
    if (cartData[itemId]) {
        cartData[itemId] += 1;
    } else {
        cartData[itemId] = 1;
    }
    setCartItems(cartData);
    toast.success("Item added to cart successfully");
}
    // update   cartItems
    const updateCartItem=(itemId,quantity)=>{
        let cartData=structuredClone(cartItems);
        cartData[itemId]=quantity;
        setCartItems(cartData); 
        toast.success("Cart updated successfully");
         
    }
    // remove item from cart
    const removeFromCart=(itemId)=>{
        let cartData=structuredClone(cartItems);
        if(cartData[itemId]){
            cartData[itemId] -=1;
            if(cartData[itemId] == 0){
                delete cartData[itemId];
            }
        }
        toast.success("Item removed from cart successfully");
        setCartItems(cartData);
    }
    // Get Cart count
    const getCartCount=()=>{
        let totalCount=0;
        for(const item in cartItems){
            totalCount+=cartItems[item];
        }
        return totalCount;
    }
    // Get cart total amount
    const getCartAmount=()=>{
        let totalAmount=0;
        for(const items in cartItems){
            let itemInfo=products.find((product)=>product._id===items);
            if(cartItems[items]>0){
                totalAmount+=itemInfo.offerPrice*cartItems[items];
            }
        }
        return Math.floor(totalAmount*100)/100;

    }
   
    useEffect(()=>{
         fetchUser();
        fetchSeller()
        fetchProducts();
       
    },[])

    const value = {
        navigate,user, setUser,setIsSeller,isSeller,showUserLogin,setShowUserLogin,products,currency,addToCart,updateCartItem, removeFromCart,cartItems,searchQuery,setSearchQuery,getCartAmount,getCartCount,axios,fetchProducts
         
    }

    return <AppContext.Provider value={value}>
            {children}

        </AppContext.Provider>
}

export const useAppContext =()=>{
    return useContext(AppContext)
}

