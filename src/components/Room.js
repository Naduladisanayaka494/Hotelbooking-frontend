/* eslint-disable react/jsx-no-undef */
import React ,{useState}from 'react';
import { Modal,Button } from 'react-bootstrap';


function Room({room}) {

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
                    <button className='btn btn-primary'>view Details</button>
                </div>
            </div>
            <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>Woohoo, you are reading this text in a modal!</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>


        </div>

     
    );
  }
  
  export default Room;

