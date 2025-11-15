import React, { useContext } from 'react'
import './ExploreMenu.css'
import { StoreContext } from '../../Context/StoreContext'

const ExploreMenu = ({category,setCategory}) => {

  const {menu_list} = useContext(StoreContext);
  
  return (
    <div className='explore-menu' id='explore-menu'>
      <h1>Explore our Products</h1>
      <p className='explore-menu-text'>
      Welcome to brrrgrrr — the home of bold, juicy burgers made to thrill your taste buds.From classic cheeseburgers to fiery loaded specials, we've got something for every craving.
Pair your burger with crispy sides and refreshing drinks for the ultimate combo.Crafted with fresh ingredients and big flavor, brrrgrrr is your go-to burger stop.Get ready to bite into happiness — only at brrrgrrr!
      </p>
      <div className="explore-menu-list">
        {menu_list.map((item,index)=>{
            return (
                <div onClick={()=>setCategory(prev=>prev===item.menu_name?"All":item.menu_name)} key={index} className='explore-menu-list-item'>
                    <img src={item.menu_image} className={category===item.menu_name?"active":""} alt="" />
                    <p>{item.menu_name}</p>
                </div>
            )
        })}
      </div>
      <hr />
    </div>
  )
}

export default ExploreMenu
