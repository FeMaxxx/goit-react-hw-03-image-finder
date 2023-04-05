import React, { Component } from "react";
import PropTypes from "prop-types";
import { ImageGalleryItem } from "components/ImageGalleryItem";
import { searchImages } from "api";
import { List } from "./ImageGallery.styled";
import { Loader } from "components/Loader";
import { Button } from "components/Button";
import { Modal } from "components/Modal";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";

class ImageGallery extends Component {
  state = {
    status: "idle",
    images: [],
    page: 1,
    modalOpen: false,
    bigImg: null,
    totalPages: 1,
  };

  openModal = (e) => {
    const bigImg = e.currentTarget.getAttribute("data-big-img");
    this.setState({ modalOpen: true, bigImg });
  };

  closeModal = () => {
    this.setState({ modalOpen: false });
  };

  componentDidUpdate(prevProps, prevState) {
    const { imagesSearch } = this.props;
    const { page } = this.state;

    if (prevProps.imagesSearch !== imagesSearch) {
      this.setState({ page: 1, images: [] }, () => this.getImages());
    } else if (prevState.page < page) {
      this.getImages();
    }
  }

  getImages() {
    const { imagesSearch } = this.props;
    const { page } = this.state;

    this.setState({ status: "pending" });

    searchImages(imagesSearch, page)
      .then((images) => {
        const totalPages = images.data.totalHits / 12;

        if (images.data.total === 0) {
          toast.error(`Images ${imagesSearch} Not Found`);
          this.setState({
            status: "rejected",
            totalPages,
          });
        } else {
          if (page === 1) {
            toast.success(`We found ${images.data.totalHits} pictures`);
            this.setState({
              totalPages,
            });
          }
          this.setState((prevState) => ({
            images: [...prevState.images, ...images.data.hits],
            status: "good",
          }));
        }
      })
      .catch(() => {
        toast.error(`Images ${imagesSearch} Not Found`);
        this.setState({
          status: "rejected",
        });
      });
  }

  nextPage = () => {
    this.setState((prevState) => ({
      page: prevState.page + 1,
    }));
  };

  render() {
    const { status, images, modalOpen, bigImg, totalPages, page } = this.state;

    return (
      <div>
        {images.length !== 0 && (
          <>
            <List>
              {images.map((image) => {
                return (
                  <ImageGalleryItem
                    key={image.id}
                    image={image}
                    openModal={this.openModal}
                  />
                );
              })}
            </List>
            {status !== "pending" && totalPages >= page && (
              <Button onClick={this.nextPage} />
            )}
          </>
        )}

        {status === "pending" && <Loader />}

        {modalOpen && <Modal bigImg={bigImg} closeModal={this.closeModal} />}
      </div>
    );
  }
}

export { ImageGallery };

ImageGallery.propTypes = {
  imagesSearch: PropTypes.string.isRequired,
};
