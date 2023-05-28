import { Modal, Button, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import * as actions from "../../redux/actions/index";
import { useState } from "react";
import Modal_0 from "./0-createTeam";
import Modal_2 from "./2-editTeam";
import Modal_3 from "./3-editCurrentlyPlaying";

function CreateModal(props) {
  const dispatch = useDispatch();

  //for modal***
  const show = useSelector((state) => state.showModal);
  const handleClose = (num) => {
    dispatch(actions.closeModal(num));
    console.log('close!')
  };


  return (
    <Modal
      show={show[props.number].status}
      onHide={() => handleClose(props.number)}
    >
      {props.number === 0 ? <Modal_0 handleClose={handleClose} /> : null}
      {props.number === 2 ? <Modal_2 handleClose={handleClose} /> : null}
      {props.number === 3 ? <Modal_3 handleClose={handleClose} /> : null}
    </Modal>
  );
}

export default CreateModal;
