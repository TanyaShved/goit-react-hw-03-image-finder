import { Component } from 'react';
import PropTypes from 'prop-types';
import imagesAPI from '../../services/image-api';
import ImageGalleryItem from '../../components/ImageGalleryItem/ImageGalleryItem';
import Button from '../../components/Button/Button';
import Loader from 'react-loader-spinner';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';
import s from './ImageGallery.module.css';

const Status = {
  IDLE: 'idle',
  PENDING: 'pending',
  RESOLVED: 'resolved',
  REJECTED: 'rejected',
};

class ImageGallery extends Component {
  state = {
    images: [],
    error: null,
    status: Status.IDLE,
    page: 1,
  };

  static propTypes = {
    imageName: PropTypes.string.isRequired,
    // page: PropTypes.number.isRequired,
  };

  componentDidUpdate(prevProps, prevState) {
    const { imageName } = this.props;
    const nextPage = this.state.page;

    if (prevProps.imageName !== imageName) {
      this.setState({ images: [], page: 1 });
      console.log(this.state.images);
      console.log(this.state.page);
    }

    if (prevProps.imageName !== imageName || prevState.page !== nextPage) {
      this.setState({ status: Status.PENDING });
      this.fetchImageGallery();
    }
  }

  fetchImageGallery = () => {
    const { imageName } = this.props;
    const nextPage = this.state.page;

    imagesAPI
      .fetchImages(imageName, nextPage)
      .then(images => {
        if (images.hits.length !== 0) {
          this.setState(prevState => ({
            images: [...prevState.images, ...images.hits],
            status: Status.RESOLVED,
          }));

          if (nextPage > 1) {
            window.scrollTo({
              top: document.documentElement.scrollHeight,
              behavior: 'smooth',
            });
          }
          return;
        }
        return Promise.reject(
          new Error(`Нет галлереи с таким названием ${imageName}`),
        );
      })
      .catch(error => this.setState({ error, status: Status.REJECTED }));
  };

  onClickLoadMore = () => {
    this.setState(prevState => ({
      page: prevState.page + 1,
    }));
  };

  render() {
    const { images, error, status } = this.state;

    if (status === Status.IDLE) {
      return <h1>Ввидите название</h1>;
    }

    if (status === Status.PENDING) {
      return (
        <Loader
          type="Bars"
          color="#00BFFF"
          height={100}
          width={100}
          timeout={3000}
        />
      );
    }

    if (status === Status.REJECTED) {
      return <h1>{error.message}</h1>;
    }

    if (status === Status.RESOLVED) {
      return (
        <>
          <ul className={s.ImageGallery}>
            {images.map(({ id, webformatURL, largeImageURL, tags }) => (
              <ImageGalleryItem
                key={id}
                webformatURL={webformatURL}
                largeImageURL={largeImageURL}
                tags={tags}
              />
            ))}
          </ul>
          <Button onClick={this.onClickLoadMore} />
        </>
      );
    }
  }
}

export default ImageGallery;
