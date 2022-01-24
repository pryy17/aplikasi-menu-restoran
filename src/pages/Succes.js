import React, { Component } from "react";
import { Button, Image } from "react-bootstrap";
import { Link } from "react-router-dom";
import swal from "sweetalert";
import axios from "axios";
import {API_URL} from "../utils/constants";

export default class succes extends Component {
  componentDidMount() {
    axios
      .get(API_URL + "keranjangs")
      .then((res) => {
        const keranjangs = res.data;
        keranjangs.map(function(item) {
            return axios
            .delete(API_URL + "keranjangs/"+ item.id)
            .then((res)=>console.log(res))
            .catch((error)=>console.log(error))
        })
      })
      .catch((error) => {
        console.log(error);
      });
  }

  render() {
    return (
      <div className="mt-4 text-center">
        <Image src="assets/images/succes.png" width="500" />
        <h2>sukses memesan</h2>
        <p>terimakasih sudah memesan!</p>
        <Button
          variant="primary"
          as={Link}
          to="/"
          onClick={() =>
            swal({
              title: "terimakasih",
              text: "kamu kembali ke halaman utama",
              icon: "success",
              button: "oke",
            })
          }
        >
          kembali
        </Button>
      </div>
    );
  }
}
