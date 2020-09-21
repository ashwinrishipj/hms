import React, { useState, useCallback } from "react";
import Gallery from "react-photo-gallery";
import Carousel, { Modal, ModalGateway } from "react-images";

export const ImageGrid = (props) => {
  const [currentImage, setCurrentImage] = useState(0);
  const [viewerIsOpen, setViewerIsOpen] = useState(false);

  const openLightbox = useCallback((event, { photo, index }) => {
    setCurrentImage(index);
    setViewerIsOpen(true);
  }, []);

  const closeLightbox = () => {
    setCurrentImage(0);
    setViewerIsOpen(false);
  };

  return (
    <>
      <Gallery photos={props.images} onClick={openLightbox} className="image" />
      <ModalGateway>
        {viewerIsOpen ? (
          <Modal className="modelbutton" onClose={closeLightbox}>
            <Carousel
              currentIndex={currentImage}
              views={props.images.map((x) => ({
                srcset: x.srcSet,
                caption: x.title,
                ...x,
              }))}
            ></Carousel>
          </Modal>
        ) : null}
      </ModalGateway>
    </>
  );
};
