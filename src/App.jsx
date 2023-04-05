import React, { Component } from "react";
import { Searchbar } from "components/Searchbar";
import { ImageGallery } from "components/ImageGallery";
import { ToastContainer } from "react-toastify";

class App extends Component {
  state = {
    imagesSearch: "",
  };

  handleFormSubmit = (imagesSearch) => {
    this.setState({ imagesSearch });
  };

  render() {
    const { imagesSearch } = this.state;
    return (
      <>
        <Searchbar onSubmitForm={this.handleFormSubmit} />
        <ImageGallery imagesSearch={imagesSearch} />
        <ToastContainer autoClose={3000} />
      </>
    );
  }
}

export { App };
