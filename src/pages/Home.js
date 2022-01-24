import { Col, Row } from "react-bootstrap";
import ListCategory from "../components/ListCategory";
import Hasil from "../components/Hasil";
import { API_URL } from "../utils/constants";
import Menus from "../components/Menus";
import axios from "axios";
import swal from "sweetalert";
import React, { Component } from "react";


export default class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      menus: [],
      categoriYangDipilih: "Makanan",
      keranjangs: [],
    };
  }

  componentDidMount() {
    axios
      .get(API_URL + "products?category.nama=" + this.state.categoriYangDipilih)
      .then((res) => {
        const menus = res.data;
        this.setState({ menus });
      })
      .catch((error) => {
        console.log(error);
      });

      axios
      .get(API_URL + "keranjangs")
      .then((res) => {
        const keranjangs = res.data;
        this.setState({ keranjangs });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  componentDidUpdate(prevState) {

    if(this.state.keranjangs !== prevState.keranjangs) {
      axios
      .get(API_URL + "keranjangs")
      .then((res) => {
        const keranjangs = res.data;
        this.setState({ keranjangs });
      })
      .catch((error) => {
        console.log(error);
      });
    }

  }
  changeCategory = (value) => {
    this.setState({
      categoriYangDipilih: value,
      menus: [],
    });
    axios
      .get(API_URL + "products?category.nama=" + value)
      .then((res) => {
        const menus = res.data;
        this.setState({ menus });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  masukKeranjang = (value) => {
    axios
      .get(API_URL + "keranjangs?product.id=" + value.id)
      .then((res) => {
        if (res.data.length === 0) {
          const keranjang = {
            jumlah: 1,
            total_harga: value.harga,
            product: value,
          };

          axios
            .post(API_URL + "keranjangs", keranjang)
            .then((res) => {
              swal({
                title: "berhasil",
                text: keranjang.product.nama + " berhasil masuk keranjang",
                icon: "success",
                button: false,
                timer:2000,
              });
            })
            .catch((error) => {
              console.log(error);
            });
        } else {

          const keranjang = {
            jumlah: res.data[0].jumlah+1,
            total_harga: res.data[0].total_harga + value.harga,
            product: value,
          };

          axios
            .put(API_URL + "keranjangs/"+res.data[0].id, keranjang)
            .then((res) => {
              swal({
                title: "berhasil",
                text: keranjang.product.nama + " berhasil masuk keranjang",
                icon: "success",
                button: false,
                timer: 2000,
              });
            })
            .catch((error) => {
              console.log(error);
            });

        }
      })
      .catch((error) => {
        console.log(error);
      });

  };

  render() {
    const { menus, categoriYangDipilih, keranjangs } = this.state;
    return (
        <div className="mt-3 ">
          <Row>
            <ListCategory
              changeCategory={this.changeCategory}
              categoriYangDipilih={categoriYangDipilih}
            />
            <Col>
              <h4>
                <strong> Daftar Produk </strong>
              </h4>
              <hr />
              <Row>
                {menus &&
                  menus.map((menu) => (
                    <Menus
                      key={menu.id}
                      menu={menu}
                      masukKeranjang={this.masukKeranjang}
                    />
                  ))}
              </Row>
            </Col>
            <Hasil keranjangs={keranjangs} menu={menus} {...this.props}/>
          </Row>
        </div>
    );
  }
}
