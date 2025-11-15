import userModel from "../models/userModel.js"

// add to user cart  
const addToCart = async (req, res) => {
   try {
      console.log("Adding to cart for user:", req.body.userId);
      let userData = await userModel.findOne({_id:req.body.userId});
      if (!userData) {
         console.log("User not found:", req.body.userId);
         return res.json({ success: false, message: "User not found" });
      }
      let cartData = await userData.cartData;
      if (!cartData[req.body.itemId]) {
         cartData[req.body.itemId] = 1;
      }
      else {
         cartData[req.body.itemId] += 1;
      }
      await userModel.findByIdAndUpdate(req.body.userId, {cartData});
      res.json({ success: true, message: "Added To Cart" });
   } catch (error) {
      console.log("Error in addToCart:", error);
      res.json({ success: false, message: "Error" })
   }
}

// remove food from user cart
const removeFromCart = async (req, res) => {
   try {
      console.log("Removing from cart for user:", req.body.userId);
      let userData = await userModel.findById(req.body.userId);
      if (!userData) {
         console.log("User not found:", req.body.userId);
         return res.json({ success: false, message: "User not found" });
      }
      let cartData = await userData.cartData;
      if (cartData[req.body.itemId] > 0) {
         cartData[req.body.itemId] -= 1;
      }
      await userModel.findByIdAndUpdate(req.body.userId, {cartData});
      res.json({ success: true, message: "Removed From Cart" });
   } catch (error) {
      console.log("Error in removeFromCart:", error);
      res.json({ success: false, message: "Error" })
   }

}

// get user cart
const getCart = async (req, res) => {
   try {
      console.log("Getting cart for user:", req.body.userId);
      let userData = await userModel.findById(req.body.userId);
      if (!userData) {
         console.log("User not found:", req.body.userId);
         return res.json({ success: false, message: "User not found" });
      }
      let cartData = await userData.cartData;
      console.log("Cart data retrieved:", cartData);
      res.json({ success: true, cartData:cartData });
   } catch (error) {
      console.log("Error in getCart:", error);
      res.json({ success: false, message: "Error" })
   }
}


export { addToCart, removeFromCart, getCart }