// Write your code here
import CartContext from '../../context/CartContext'

import './index.css'

const CartSummary = () => (
  <CartContext.Consumer>
    {value => {
      const {cartList} = value
      let totalCost = 0
      cartList.forEach(each => {
        totalCost += each.price * each.quantity
      })
      const noofItems = cartList.length
      return (
        <div className="cart-summary-container">
          <h1 className="total-heading">
            Order Total: <span className="total-value">Rs {totalCost}/-</span>
          </h1>
          <p className="no-of-items-description">{noofItems} Items in cart</p>
          <button className="checkout-button" type="button">
            Checkout
          </button>
        </div>
      )
    }}
  </CartContext.Consumer>
)

export default CartSummary
