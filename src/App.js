import {Component} from 'react'
import {Route, Switch, Redirect} from 'react-router-dom'

import LoginForm from './components/LoginForm'
import Home from './components/Home'
import Products from './components/Products'
import ProductItemDetails from './components/ProductItemDetails'
import Cart from './components/Cart'
import NotFound from './components/NotFound'
import ProtectedRoute from './components/ProtectedRoute'
import CartContext from './context/CartContext'

import './App.css'

class App extends Component {
  state = {
    cartList: [],
  }

  //   TODO: Add your code for remove all cart items, increment cart item quantity, decrement cart item quantity, remove cart item

  decrementCartItemQuantity = id => {
    const {cartList} = this.state
    let isDecrementQuantityZero = false
    const updatedCartList = cartList.map(each => {
      if (each.id === id) {
        if (each.quantity - 1 !== 0) {
          return {...each, quantity: each.quantity - 1}
        }
        isDecrementQuantityZero = true
      }
      return each
    })
    if (!isDecrementQuantityZero) {
      this.setState({cartList: updatedCartList})
    } else {
      const filteredCartList = updatedCartList.filter(each => each.id !== id)
      this.setState({cartList: filteredCartList})
    }
  }

  incrementCartItemQuantity = id => {
    const {cartList} = this.state
    const updatedCartList = cartList.map(each => {
      if (each.id === id) {
        return {...each, quantity: each.quantity + 1}
      }
      return each
    })
    this.setState({cartList: updatedCartList})
  }

  removeAllCartItems = () => {
    this.setState({cartList: []})
  }

  addCartItem = product => {
    const {cartList} = this.state
    let isExistingProduct = false

    const updatedCartList = cartList.map(each => {
      if (each.id === product.id) {
        isExistingProduct = true
        return {...each, quantity: each.quantity + product.quantity}
      }
      return each
    })
    if (isExistingProduct) {
      this.setState({cartList: updatedCartList})
    } else {
      this.setState({cartList: [...updatedCartList, product]})
    }

    //   TODO: Update the code here to implement addCartItem
  }

  removeCartItem = id => {
    const {cartList} = this.state
    const updatedCartList = cartList.filter(each => each.id !== id)
    this.setState({cartList: updatedCartList})
  }

  render() {
    const {cartList} = this.state

    return (
      <CartContext.Provider
        value={{
          cartList,
          addCartItem: this.addCartItem,
          removeCartItem: this.removeCartItem,
          removeAllCartItems: this.removeAllCartItems,
          decrementCartItemQuantity: this.decrementCartItemQuantity,
          incrementCartItemQuantity: this.incrementCartItemQuantity,
        }}
      >
        <Switch>
          <Route exact path="/login" component={LoginForm} />
          <ProtectedRoute exact path="/" component={Home} />
          <ProtectedRoute exact path="/products" component={Products} />
          <ProtectedRoute
            exact
            path="/products/:id"
            component={ProductItemDetails}
          />
          <ProtectedRoute exact path="/cart" component={Cart} />
          <Route path="/not-found" component={NotFound} />
          <Redirect to="not-found" />
        </Switch>
      </CartContext.Provider>
    )
  }
}

export default App
