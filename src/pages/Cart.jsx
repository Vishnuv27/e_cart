import React, { useState, useEffect } from 'react'
import { Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { emptyCart, removeFromCart } from '../redux/slice/cartSlice'



function Cart() {
  const cartArray = useSelector(state=>state.cartReducer)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const  [total,setTotal]=useState(0)

  const getCartTotal=()=>{
    if(cartArray.length>0){
      setTotal(cartArray.map(item=>item.price).reduce((p1,p2)=>p1+p2))
    }
    else{
      setTotal(0)
    }
  }

  useEffect(()=>{
    getCartTotal()
  },[cartArray])


  const handleCart=()=>{
    dispatch(emptyCart())
    alert("Your order placed successfully....Thankyou for purchasing")
    navigate('/')
  }



  return (
    <div  style={{marginTop:'100px'}}>
        {
          cartArray.length>0?
<div className="row">
  <div className="col-lg-8">
  <table className='table shadow rounded'>
        <thead>
          <tr>
            <th style={{color:'black'}}>#</th>
            <th style={{color:'black'}}>product</th>
            <th style={{color:'black'}}>product image</th>
            <th style={{color:'black'}}>price</th>
            <th style={{color:'black'}}>action</th>
          </tr>
        </thead>
        <tbody>
          {
            cartArray.map((product,index)=>(
              <tr key={index}>
                <td style={{color:'black'}}>{index+1}</td>
                <td style={{color:'black'}}>{product.title}</td>
                <td><img width={'110px'} height={'100px'} src={product.thumbnail} alt="" /></td>
                <td style={{color:'black'}}>$ {product.price}</td>
                <td><Button onClick={()=>dispatch(removeFromCart(product.id))} className='btn btn-light'><i className="fa-solid fa-trash text-danger  me-2" ></i></Button></td>
              </tr>
            ))
          }
        </tbody>
      </table>
  </div>

          <div className="col-lg-3">
          <div className="border mt-3 rounded shadow p-2 w-100">
          <h1 className='text-primary p-2'>Cart Summary</h1>
          <h4>Total Products: <span>{cartArray.length}</span></h4>
          <h4>Total: <span className='text-danger fw-bolder fs-2'>${total}</span></h4>
          <div className="d-grid">
            <button onClick={handleCart} className='btn btn-success mt-5 rounded'>Check Out</button>
          </div>

          </div>
          </div>


</div>
:<div className="w-100 d-flex flex-column justify-content-center align-items-center">
            <img src="https://bakestudio.in/assets/images/cart/empty-cart.gif" alt="" />
            <h3 className='text-center text-danger'>Wishlist is Empty</h3>
            <Link style={{textDecoration:'none'}} className='btn btn-warning rounded' to={'/'}>Back to Home</Link>
          </div>
        }
      
    </div>
  )
}

export default Cart