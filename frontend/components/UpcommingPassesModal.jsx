import React, { useState, useEffect } from 'react';
import { useCesium } from 'resium';
import { JulianDate } from 'cesium';
import Table from 'react-bootstrap/Table';
import Modal from 'react-bootstrap/Modal';

const DEFAULT_DATE = new Date();
const PASSES_DEFAULT = [{
  aos_utc: DEFAULT_DATE.toISOString(),
  los_utc: DEFAULT_DATE.toISOString(),
  horizon_deg: 0.0,
  max_el: 0.0,
  aos_az: 0.0,
  los_az: 0.0,
}];

function UpcommingPassesModal({ show, handleClose, restApi }) {
  const cesium = useCesium();

  const [gs, setGs] = useState('UniClOGS EB');
  const [sat, setSat] = useState('OreSat0.5');
  const [passes, setPasses] = useState(PASSES_DEFAULT);

  useEffect(() => {
    fetch(`${restApi}/passes/${gs}/${sat}`)
      .then(response => response.json())
      .then(data => {
        setPasses(data);
      });
  }, []);

  function timeDiff(date1, date2) {
    let diffTime = 0;
    if (date1 < date2) {
      diffTime = Math.abs(date2 - date1) / 1000;
    }
    const zeroPad = (num, places) => String(num).padStart(places, '0');
    const hours = zeroPad((diffTime / 3600).toFixed(0), 2);
    const minutes = zeroPad(((diffTime % 3600) / 60).toFixed(0), 2);
    const seconds = zeroPad((diffTime % 60).toFixed(0), 2);
    return `${hours}:${minutes}:${seconds}`;
  }

  function strToDate(str) {
    return new Date(str);
  }

  function utcStrToLocalDate(utcStr) {
    const date = new Date(utcStr + 'Z');
    return date;
  }

  function timeDiffStr(date1, date2) {
    return timeDiff(strToDate(date1), strToDate(date2));
  }

  function getTzStr(date) {
    return date.toString().match(/\(([A-Za-z\s].*)\)/)[1];
  }

  function makeRows() {
    const nextPassIndex = getNextPassIndex();
    const upcommingPasses = passes.slice(nextPassIndex, passes.length);
    return upcommingPasses.map((pass, index) => (
      <tr key={`pass${index}`}>
        <td>{index + 1}</td>
        <td>{utcStrToLocalDate(pass.aos_utc).toLocaleString()}</td>
        <td>{utcStrToLocalDate(pass.los_utc).toLocaleString()}</td>
        <td>{timeDiffStr(pass.aos_utc, pass.los_utc)}</td>
        <td>{pass.max_el.toFixed(1)}°</td>
        <td>{pass.aos_az.toFixed(1)}°</td>
        <td>{pass.los_az.toFixed(1)}°</td>
      </tr>
    ));
  }

  function getNextPassIndex() {
    const curDate = JulianDate.toDate(cesium.viewer.clock.currentTime);
    const curDateUtc = new Date(curDate.toUTCString().slice(0, -4));
    let newIndex = 0;
    for (let i = 0; i < passes.length; i++) {
      if (curDateUtc < strToDate(passes[i].aos_utc) || curDateUtc < strToDate(passes[i].los_utc)) {
        newIndex = i;
        break;
      }
    }
    return newIndex;
  }

  return (
    <Modal show={show} onHide={handleClose} data-bs-theme="dark" color="white" size="xl" centered scrollable>
      <Modal.Header closeButton>
        <Modal.Title style={{ color: 'white' }}>Upcomming Passes</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div style={{ width: '100%', overflow: 'auto' }}>
          <div style={{ width: '50%', display: 'inline-block', textAlign: 'center' }}>
            <label htmlFor="gs" style={{ color: 'white' }}>Ground Station:&nbsp;</label>
            <select name="gs" id="gs" onChange={e => setGs(e.target.value)}>
              <option id="UniClOGS EB">UniClOGS EB</option>
            </select>
          </div>
          <div style={{ width: '50%', display: 'inline-block', textAlign: 'center' }}>
            <label htmlFor="sat" style={{ color: 'white' }}>Satellite:&nbsp;</label>
            <select name="sat" id="sat" onChange={e => setSat(e.targe.value)}>
              <option id="OreSat0.5">OreSat0.5</option>
            </select>
          </div>
        </div>
        <br />
        <Table variant="dark" size="sm" striped bordered hover>
          <thead>
            <tr>
              <td>#</td>
              <td>AOS ({getTzStr(DEFAULT_DATE)})</td>
              <td>LOS ({getTzStr(DEFAULT_DATE)})</td>
              <td>Duration</td>
              <td>Max El</td>
              <td>AOS Az</td>
              <td>LOS Az</td>
            </tr>
          </thead>
          <tbody>
            {makeRows()}
          </tbody>
        </Table>
      </Modal.Body>
    </Modal>
  );
}

export default UpcommingPassesModal;
