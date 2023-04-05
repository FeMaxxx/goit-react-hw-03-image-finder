import React from "react";
import PropTypes from "prop-types";
import { Item, Img } from "./ImageGalleryItem.styled";

export const ImageGalleryItem = ({ image, openModal }) => {
  const { webformatURL, largeImageURL } = image;

  return (
    <Item onClick={openModal} data-big-img={largeImageURL}>
      <Img src={webformatURL} alt="Image" />
    </Item>
  );
};

ImageGalleryItem.propTypes = {
  image: PropTypes.object.isRequired,
  openModal: PropTypes.func.isRequired,
};
