/* eslint-disable react/jsx-no-undef */
import React ,{useState,useEffect}from 'react';
import { Modal,Button, Carousel } from 'react-bootstrap';
import { Link } from 'react-router-dom';


function Room({room,fromdate,todate}) {

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    return (
        <div className='rows bs'>
            <div className='col-md-4'>
                <img src ={room.imageUrls[0] }className="smallimg"/>
            </div>
            <div className="col-md-7 ">
                <h1>{room.name}</h1>
                <b>
                    <p>Max Count:{room.maxcount}</p>
                    <p>Phone Number: {room.phonenumber}</p>
                    <p>Type: {room.type}</p>       
                </b>
                <div style={{ float:"left" }}>
                    {(fromdate && todate) && (
                       <Link to={`/book/${room._id}/${fromdate}/${todate}`}>
                       <button className='btn btn-primary m-2' >Book Now</button>
                       </Link>

                    )}

                 
                    <button className='btn btn-primary' onClick={handleShow}>view Details</button>
                </div>
            </div>
            <Modal show={show} onHide={handleClose} size='lg'>
        <Modal.Header closeButton>
          <Modal.Title>{room.name}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <Carousel>
    
      
      <Carousel.Item>
        <img
          className="d-block w-100 bigimg"
          src={room.imageUrls[0] }
        />

        <Carousel.Caption>
          {/* <h3>Third slide label</h3>
          <p>
            Praesent commodo cursus magna, vel scelerisque nisl consectetur.
          </p> */}
        </Carousel.Caption>
        <p>{room.description}</p>
      </Carousel.Item>
    </Carousel>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
       
        </Modal.Footer>
      </Modal>


        </div>

     
    );
  }
  
  export default Room;

