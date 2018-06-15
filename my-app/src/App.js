import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { combineReducers, createStore } from 'redux'
import './App.css';

const initialState = [{
  id: 0,
  name: 'product 1',
  quantity: 0,
}, {
  id: 1,
  name: 'product 2',
  quantity: 0
}]


function products(state = initialState, action) {
  if (action.type === 'ADD TO CART') {
    state[action.index].quantity += 1
  }
  return state
}

const store = createStore(
  combineReducers({
    products,
  })
)

function Product(props) {

  return (
    <div>
      <h2>{props.name}</h2>
      <p>Quantity : {props.quantity}</p>
      <button onClick={() => store.dispatch({
        type: 'ADD TO CART',
        index: props.id
      })}>Add to cart</button>
    </div >

  )
}
class App extends Component {
  render() {
    return (
      <div className="App">
        <Header />
        {store.getState().products.map((value) => {
          return <Product
            key={value.name}
            name={value.name}
            quantity={value.quantity}
            id={value.id} />
        })}

      </div >
    );
  }
}
function Header(props) {
  return (
    <div>
      Product in cart : {store.getState().products.reduce((productA, productB) => {
        return productA.quantity + productB.quantity
      })}
    </div >
  )
}

store.subscribe(() => {
  ReactDOM.render(<App />, document.getElementById('root'));
})
export default App;
