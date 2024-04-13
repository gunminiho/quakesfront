import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import MagType from "./MagType";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";
import { useDispatch } from "react-redux";
import { setSettings } from "../../redux/userSlice";

function Example() {

  const dispatch = useDispatch();
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        Settings
      </Button>

      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Settings</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {/* Seleccion para Mag_Type */}
          <MagType />
          {/* Input para Page */}
          <FloatingLabel
            controlId="floatingInput"
            label="Page Number"
            className="mb-3"
            //onChange={(e) => {dispatch(setSettings({page:e.target.innerText}))}}
          >
            <Form.Control type="number" placeholder="1" />
          </FloatingLabel>
          {/* Input para Per_Page*/}
          <FloatingLabel
            controlId="floatingInput"
            label="Items per page"
            className="mb-3"
          >
            <Form.Control type="number" placeholder="25" />
          </FloatingLabel>

        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary">Apply settings</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default Example;
