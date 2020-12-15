import { Component } from 'react';
import PropTypes from 'prop-types';
import Modal from '../../components/Modal/Modal';
import s from './ImageGalleryItem.module.css';

class ImageGalleryItem extends Component {
  state = {
    showModal: false,
  };

  static propTypes = {
    images: PropTypes.array.isRequired,
  };

  toggleModal = () => {
    this.setState(({ showModal }) => ({
      showModal: !showModal,
    }));
  };

  render() {
    const { showModal } = this.state;
    const { images } = this.props;
    // console.log(webformatURL, largeImageURL)

    return (
      <>
        {images.map(({ id, webformatURL, largeImageURL }) => (
          <li key={id} className={s.ImageGalleryItem}>
            <img
              onClick={this.toggleModal}
              src={webformatURL}
              data-src={largeImageURL}
              alt=""
              className={s.ImageGalleryItem_image}
            />
            {showModal && (
              <Modal
                onClick={this.toggleModal}
                largeImageURL={largeImageURL}
                alt=""
              />
            )}
          </li>
        ))}
      </>
    );
  }
}

export default ImageGalleryItem;
