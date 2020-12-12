import PropTypes from 'prop-types';
import s from './ImageGalleryItem.module.css';

const ImageGalleryItem = ({ images }) => {
  return (
    <>
      {images.map(({ id, webformatURL, largeImageURL }) => (
        <li key={id} className={s.ImageGalleryItem}>
          <img
            src={webformatURL}
            data-src={largeImageURL}
            alt=""
            className={s.ImageGalleryItem_image}
          />
        </li>
      ))}
    </>
  );
};

export default ImageGalleryItem;
