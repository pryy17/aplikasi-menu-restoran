import { faMinus, faPlus, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { Modal, Button, Form, Card } from "react-bootstrap";
import numberWithCommas from "../utils/utils";

export const ModalKeranjang = ({
  showModal,
  handleClose,
  keranjangDetail,
  jumlah,
  keterangan,
  tambah,
  kurang,
  changeHandler,
  handleSubmit,
}) => {
  if (keranjangDetail) {
    return (
      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>
            {keranjangDetail.product.nama} (Rp.
            {numberWithCommas(keranjangDetail.product.harga)})
          </Modal.Title>
        </Modal.Header>

        <Card className="shadow">
          <Card.Img
            variant="top"
            src={
              "assets/images/" +
              keranjangDetail.product.category.nama.toLowerCase() +
              "/" +
              keranjangDetail.product.gambar
            }
          />
        </Card>

        <Form className="ms-2" onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Total Harga :</Form.Label>
            <p>{numberWithCommas(keranjangDetail.total_harga)}</p>
          </Form.Group>

          <Form.Group>
            <Form.Label>jumlah pesanan : </Form.Label>
            <br />
            <Button
              variant="info"
              size="sm"
              className="me-2"
              onClick={() => tambah()}
            >
              <FontAwesomeIcon icon={faPlus} />
            </Button>
            <strong>{jumlah}</strong>
            <Button
              variant="primary"
              size="sm"
              className="ms-2"
              onClick={() => kurang()}
            >
              <FontAwesomeIcon icon={faMinus} />
            </Button>
          </Form.Group>

          <Form.Group className="mb-3" controlId="textArea1">
            <Form.Label>keterangan</Form.Label>
            <Form.Control
              type="textarea"
              rows="3"
              placeholder="contoh : nasi pedes sedeng"
              value={keterangan}
              onChange={(event) => changeHandler(event)}
            />
          </Form.Group>

          <Button variant="primary" type="submit">
            simpan
          </Button>
        </Form>

        <Modal.Footer>
          <Button variant="danger" onClick={handleClose}>
            <FontAwesomeIcon icon={faTrash} /> hapus pesanan
          </Button>
        </Modal.Footer>
      </Modal>
    );
  } else {
    return (
      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title></Modal.Title>
        </Modal.Header>
        <Modal.Body></Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }
};

export default ModalKeranjang;
