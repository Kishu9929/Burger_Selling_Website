import { createContext, useEffect, useState } from "react";
import { food_list, menu_list } from "../assets/assets";
import axios from "axios";
export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {

    const url = "http://localhost:4000"
    const [food_list, setFoodList] = useState([]);
    const [cartItems, setCartItems] = useState({});
    const [cartCustomizations, setCartCustomizations] = useState({});
    const [token, setToken] = useState("")
    const currency = "₹";
    const deliveryCharge = 50;

    const addToCart = async (itemId, customizations = {}) => {
        if (!cartItems[itemId]) {
            setCartItems((prev) => ({ ...prev, [itemId]: 1 }));
            setCartCustomizations((prev) => ({ ...prev, [itemId]: customizations }));
        }
        else {
            setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }));
            setCartCustomizations((prev) => ({ ...prev, [itemId]: customizations }));
        }
        if (token) {
            try {
                await axios.post(url + "/api/cart/add", { itemId, customizations }, { headers: { token } });
            } catch (error) {
                console.log("Error adding to cart:", error);
            }
        }
    }

    const removeFromCart = async (itemId) => {
        setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }))
        if (cartItems[itemId] === 1) {
            setCartCustomizations((prev) => {
                const newCustomizations = { ...prev };
                delete newCustomizations[itemId];
                return newCustomizations;
            });
        }
        if (token) {
            try {
                await axios.post(url + "/api/cart/remove", { itemId }, { headers: { token } });
            } catch (error) {
                console.log("Error removing from cart:", error);
            }
        }
    }

    const getTotalCartAmount = () => {
        let totalAmount = 0;
        for (const item in cartItems) {
            try {
                if (cartItems[item] > 0) {
                    let itemInfo = food_list.find((product) => product._id === item);
                    let itemTotal = itemInfo.price * cartItems[item];
                    
                    // Add customization costs
                    if (cartCustomizations[item]) {
                        if (cartCustomizations[item].extraCheese) {
                            itemTotal += itemInfo.customizations.extraCheese.price * cartItems[item];
                        }
                        if (cartCustomizations[item].extraVeggies) {
                            itemTotal += itemInfo.customizations.extraVeggies.price * cartItems[item];
                        }
                    }
                    
                    totalAmount += itemTotal;
                }
            } catch (error) {
                console.error(error);
            }
        }
        return totalAmount;
    }

    const fetchFoodList = async () => {
        const response = await axios.get(url + "/api/food/list");
        setFoodList(response.data.data)
    }

    const loadCartData = async (token) => {
        try {
            const response = await axios.post(url + "/api/cart/get", {}, { headers: { token } });
            if (response.data.success) {
                setCartItems(response.data.cartData);
            } else {
                console.log("Failed to load cart data:", response.data.message);
                setCartItems({});
            }
        } catch (error) {
            console.log("Error loading cart data:", error);
            setCartItems({});
        }
    }

    useEffect(() => {
        async function loadData() {
            await fetchFoodList();
            if (localStorage.getItem("token")) {
                setToken(localStorage.getItem("token"))
                await loadCartData({ token: localStorage.getItem("token") })
            }
        }
        loadData()
    }, [])

    const contextValue = {
        url,
        food_list,
        menu_list,
        cartItems,
        cartCustomizations,
        addToCart,
        removeFromCart,
        getTotalCartAmount,
        token,
        setToken,
        loadCartData,
        setCartItems,
        currency,
        deliveryCharge
    };

    return (
        <StoreContext.Provider value={contextValue}>
            {props.children}
        </StoreContext.Provider>
    )

}

export default StoreContextProvider;