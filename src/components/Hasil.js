import React, { Component } from "react";
import { Col, Row, ListGroup, Badge, Modal } from "react-bootstrap";
import { numberWithCommas } from "../utils/utils";
import TotalBayar from "./TotalBayar";
import ModalKeranjang from "./ModalKeranjang";

class Hasil extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showModal: false,
      keranjangDetail: false,
      jumlah: 0,
      keterangan: "",
    };
  }

  handleShow = (keranjang) => {
    this.setState({
      showModal: true,
      keranjangDetail: keranjang,
      jumlah: keranjang.jumlah,
      keterangan: keranjang.keterangan,
    });
  };

  handleClose = () => {
    this.setState({
      showModal: false,
    });
  };

  tambah = () => {
    this.setState({
      jumlah: this.state.jumlah + 1,
    });
  };

  kurang = () => {
    if (this.state.jumlah !== 1) {
      this.setState({
        jumlah: this.state.jumlah - 1,
      });
    }
  };

  changeHandler = (event) => {
    this.setState({
      keterangan: event.target.value,
      
    })
    console.log(event);
  }

  handleSubmit = (event) => {
    event.preventDefault();

    console.log("hai");

  }

  render() {
    const { keranjangs} = this.props;

    return (
      <Col md={3} mt="2">
        <h4>
          <strong>Hasil</strong>
        </h4>
        <hr />
        <ListGroup variant="flush">
          <ListGroup.Item>
            <Row>
              <Col>
                <strong>Jumlah</strong>
              </Col>
              <Col>
                <strong>pesanan</strong>
              </Col>
              <Col>
                <strong>Total Harga</strong>
              </Col>
            </Row>
          </ListGroup.Item>
          <ListGroup.Item>
            <Row></Row>
          </ListGroup.Item>
        </ListGroup>
        <ListGroup variant="flush">
          {keranjangs &&
            keranjangs.map((keranjang) => (
              <ListGroup.Item
                key={keranjang.id}
                onClick={() => this.handleShow(keranjang)}
              >
                <Row>
                  <Col>
                    <h4>
                      <Badge pill bg="success">
                        {keranjang.jumlah}
                      </Badge>
                    </h4>
                  </Col>
                  <Col>
                    <p>{keranjang.product.nama}</p>
                    <p>Rp. {numberWithCommas(keranjang.product.harga)}</p>
                  </Col>
                  <Col>
                    <strong>
                      Rp. {numberWithCommas(keranjang.total_harga)}
                    </strong>
                  </Col>
                </Row>
              </ListGroup.Item>
            ))}
        </ListGroup>

        <ModalKeranjang
          handleClose={this.handleClose}
          {...this.state}
          tambah={this.tambah}
          kurang={this.kurang}
          changeHandler={this.changeHandler}
          handleSubmit={this.handleSubmit}
        />
        <TotalBayar keranjangs={keranjangs} {...this.props} />
      </Col>
    );
  }
}

export default Hasil;
