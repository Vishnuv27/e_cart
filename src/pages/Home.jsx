import React from 'react'
import { Col, Row } from 'react-bootstrap'
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import useFetch from '../Hooks/useFetch';
import { addToWishlist } from '../redux/slice/wishlistslice';
import { useDispatch } from 'react-redux';
import { addToCart } from '../redux/slice/cartSlice';



function Home() {

  const dispatch = useDispatch()

  const data= useFetch("https://dummyjson.com/products")
  console.log(data)
  return (
   
  <Row className='ms-5' style={{marginTop:'100px'}}>
{

      data?.length>0?data?.map((product,index)=>(

      

    <Col className='mb-5' sm={12} md={6} lg={4} xl={3}>
    <Card className='shadow rounded' style={{ width: '20rem', height:'28rem' }}>
      <Card.Img height={"200px"} variant='top' src={product?.thumbnail}   />
      <Card.Body>
        <Card.Title className='text-primary'>{product?.title}</Card.Title>
        <Card.Text>
          <p>{product?.description.slice(0,50)}</p>
        <h5 className='text-primary'>${product?.price}</h5>
        </Card.Text>
        <div className='d-flex justify-content-between'>
        <Button onClick={()=>dispatch(addToWishlist(product))} style={{color:'red'}} className='btn btn-light'><i className="fa-solid fa-heart   me-2" ></i></Button>
        <Button onClick={()=>dispatch(addToCart(product))} style={{color:'red'}} className='btn btn-light'><i className="fa-solid fa-cart-shopping  me-2"></i></Button>
        </div>
        
      </Card.Body>
    </Card>
    </Col>)):<p className='text-danger fw-bolder'>Nothing to Display</p>
  
}

  </Row>
  
  )
}

export default Home