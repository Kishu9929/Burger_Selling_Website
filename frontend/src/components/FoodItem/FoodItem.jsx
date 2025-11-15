import React, { useContext, useState } from 'react'
import './FoodItem.css'
import { assets } from '../../assets/assets'
import { StoreContext } from '../../Context/StoreContext';

const FoodItem = ({ image, name, price, desc, id, customizations }) => {
    const [itemCount, setItemCount] = useState(0);
    const [showCustomizations, setShowCustomizations] = useState(false);
    const [selectedCustomizations, setSelectedCustomizations] = useState({
        extraCheese: false,
        extraVeggies: false
    });
    const { cartItems, addToCart, removeFromCart, url, currency } = useContext(StoreContext);

    const handleAddToCart = () => {
        if (customizations && Object.values(customizations).some(opt => opt.available)) {
            setShowCustomizations(true);
        } else {
            addToCart(id);
        }
    };

    const handleConfirmCustomizations = () => {
        addToCart(id, selectedCustomizations);
        setShowCustomizations(false);
        setSelectedCustomizations({
            extraCheese: false,
            extraVeggies: false
        });
    };

    return (
        <div className='food-item'>
            <div className='food-item-img-container'>
                <img className='food-item-image' src={url + "/images/" + image} alt="" />
                {!cartItems[id]
                    ? <img className='add' onClick={handleAddToCart} src={assets.add_icon_white} alt="" />
                    : <div className="food-item-counter">
                        <img src={assets.remove_icon_red} onClick={() => removeFromCart(id)} alt="" />
                        <p>{cartItems[id]}</p>
                        <img src={assets.add_icon_green} onClick={handleAddToCart} alt="" />
                    </div>
                }
            </div>
            <div className="food-item-info">
                <div className="food-item-name-rating">
                    <p>{name}</p> <img src={assets.rating_starts} alt="" />
                </div>
                <p className="food-item-desc">{desc}</p>
                <p className="food-item-price">{currency}{price}</p>
            </div>
            {showCustomizations && (
                <div className="customization-modal">
                    <div className="customization-content">
                        <h3>Customize Your {name}</h3>
                        {customizations?.extraCheese?.available && (
                            <div className="customization-option">
                                <label>
                                    <input
                                        type="checkbox"
                                        checked={selectedCustomizations.extraCheese}
                                        onChange={(e) => setSelectedCustomizations(prev => ({
                                            ...prev,
                                            extraCheese: e.target.checked
                                        }))}
                                    />
                                    Extra Cheese (+{currency}{customizations.extraCheese.price})
                                </label>
                            </div>
                        )}
                        {customizations?.extraVeggies?.available && (
                            <div className="customization-option">
                                <label>
                                    <input
                                        type="checkbox"
                                        checked={selectedCustomizations.extraVeggies}
                                        onChange={(e) => setSelectedCustomizations(prev => ({
                                            ...prev,
                                            extraVeggies: e.target.checked
                                        }))}
                                    />
                                    Extra Veggies (+{currency}{customizations.extraVeggies.price})
                                </label>
                            </div>
                        )}
                        <div className="customization-buttons">
                            <button onClick={handleConfirmCustomizations}>Add to Cart</button>
                            <button onClick={() => setShowCustomizations(false)}>Cancel</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default FoodItem
