import { useState,useEffect } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import MagType from "./MagType";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";
import { useDispatch, useSelector } from "react-redux";
import { setSettings, setEarthquakes,setIsLoading, resetFrameCount, setQuakesLoaded, setItemsPerPage } from "../../redux/userSlice";
import baseUrl from "../../endpoint";

const Example = () => {
  const dispatch = useDispatch();
  const endPointUrl = baseUrl();
  const { page, per_page, magType } = useSelector(
    (state) => state.user.settings
  );
  const {earthquakes,frameCount,Pagination:{itemsPerPage}} = useSelector((state) => state.user);
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handlePage = (e) => {
    const page = e.target.value;
    dispatch(setSettings({ page }));
  };

  const handlePerPage = (e) => {
    const per_page = e.target.value;
    dispatch(setSettings({ per_page: per_page }));
  };
  const handleItemsPerPage = (e) => {
    const itemsPerPage = e.target.value;
    dispatch(setItemsPerPage(Number(itemsPerPage)));
  };

  const handleApply = () => {
    if (page !== 1 || per_page !== 25 || magType.length > 0 || itemsPerPage !== 25) {
      fetch(
        `${endPointUrl}?page=${page}&per_page=${per_page}${magType.map(
          (mag) => `&mag_type[]=${mag}`
        )}`
      )
        .then((response) => {
          if (!response.ok) {
            throw new Error(
              `Failed to fetch earthquakes: ${response.status} ${response.statusText}`
            );
          }
          return response.json();
        })
        .then((data) => {
          dispatch(setQuakesLoaded(false));
          dispatch(setIsLoading(true));
          dispatch(resetFrameCount());
          dispatch(setEarthquakes(data));
          handleClose();
        })
        .catch((error) => {
          console.error(error);
          // Manejar el error aquí, por ejemplo, mostrar un mensaje de error al usuario
        });
    } else {
      alert("There's no changes to apply");
    }
  };

  useEffect(() => {
    /*if(earthquakes !== undefined)
    frameCount >= earthquakes.pagination.per_page ? dispatch(setIsLoading(false)) : dispatch(setIsLoading(true))*/
  if(earthquakes !== undefined)
    dispatch(setQuakesLoaded(true)) //&& dispatch(setIsLoading(false))
  } , [frameCount,earthquakes]);

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
            onChange={(e) => handlePage(e)}
          >
            <Form.Control type="number" placeholder="1" value={page} step="any" />
          </FloatingLabel>
          {/* Input para Per_Page*/}
          <FloatingLabel
            controlId="floatingInput"
            label="Items per page"
            className="mb-3"
            onChange={(e) => handlePerPage(e)}
          >
            <Form.Control type="number" placeholder="25" value={per_page} step="any" />
          </FloatingLabel>
          <FloatingLabel
            controlId="floatingInput"
            label="Items to show per page : 25 recommended"
            className="mb-3"
            onChange={(e) => handleItemsPerPage(e)}
          >
            <Form.Control type="number" placeholder="25" value={itemsPerPage} step="any" />
          </FloatingLabel>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button onClick={handleApply} variant="primary">Apply settings</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}


export default Example;
