import { Component } from 'react';
// import PropTypes from 'prop-types';
import ImageGalleryItem from '../../components/ImageGalleryItem/ImageGalleryItem';
import Loader from 'react-loader-spinner';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';
import s from './ImageGallery.module.css';

class ImageGallery extends Component {
  state = {
    images: null,
    error: null,
    status: `idle`,
  };

  componentDidUpdate(prevProps, prevState) {
    const { images, error, status } = this.state;
    const { imageName, page } = this.props;

    const apiKey = '19013398-a980467a71ce13bd0d53bc132';
    const url = 'https://pixabay.com/api/';

    if (prevProps.imageName !== imageName) {
      console.log('cheange image name');

      this.setState({ status: `pending` });

      fetch(
        `${url}?q=${imageName}&page=${page}&key=${apiKey}&image_type=photo&orientation=horizontal&per_page=12`,
      )
        .then(response => {
          if (response.ok) {
            return response.json();
          }

          return Promise.reject(
            new Error(`Нет галлереи с таким названием ${imageName}`),
          );
        })
        // .then(console.log)
        .then(images => this.setState({ images, status: `resolved` }))
        .catch(error => this.setState({ error, status: `rejected` }));
    }
  }

  render() {
    const { images, error, status } = this.state;

    if (status === `idle`) {
      return <h1>Ввидите название</h1>;
    }

    if (status === `pending`) {
      return (
        <Loader
          type="Bars"
          color="#00BFFF"
          height={100}
          width={100}
          timeout={3000} //3 secs
        />
      );
    }

    if (status === `rejected`) {
      return <h1>{error.message}</h1>;
    }

    if (status === `resolved`) {
      return (
        <ul className={s.ImageGallery}>
          <ImageGalleryItem images={images.hits} />
        </ul>
      );
    }
  }
}

export default ImageGallery;
