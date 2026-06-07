import { useNavigate } from "react-router"
import "../css/emptycart.css"
export default  function EmptyCart(){
    const navigate=useNavigate();
    return(
        <div className="emptycart">
            <div className="top_emptycart">
                <h1>Shopping Cart</h1>
            </div>
            <div className="down_emptycart">
                <div className="down_emptycart_wrap">
                <div className="down_emptycart_logo">🛒</div>
                <p className="down_emptycart_text1">Your cart is empty</p>
                <p className="down_emptycart_text2">Looks like you haven't added anything yet.</p>
                <button className="start_shopping_btn" onClick={()=>{navigate("/products")}}>Start Shopping</button>
                </div>
            </div>
        </div>
    )
}