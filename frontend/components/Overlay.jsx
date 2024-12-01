import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import UpcommingPassesModal from './UpcommingPassesModal';
import styles from './Overlay.module.css';

function Overlay({ restApi }) {
  const [show, setShow] = useState(false);
  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);

  return (
    <>
      <Button id={styles.passesbutton} variant="dark" size="sm" onClick={handleShow}>
        Upcomming Passes
      </Button>
      <UpcommingPassesModal show={show} handleClose={handleClose} restApi={restApi} />
    </>
  );
}

export default Overlay;
