import { Component } from 'react';
// import PropTypes from 'prop-types';
import ImageGalleryItem from '../../components/ImageGalleryItem/ImageGalleryItem';
import Button from '../../components/Button/Button';
import Loader from 'react-loader-spinner';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';
import s from './ImageGallery.module.css';

class ImageGallery extends Component {
  state = {
    images: [],
    error: null,
    status: `idle`,
    page: 1,
  };

  componentDidUpdate(prevProps, prevState) {
    const { imageName, page } = this.props;

    const apiKey = '19013398-a980467a71ce13bd0d53bc132';
    const url = 'https://pixabay.com/api/';

    if (prevProps.imageName !== imageName) {
      this.setState({ page: 1 });
    }

    if (prevProps.imageName !== imageName) {
      console.log('cheange image name');
      console.log(this.state.images);

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

        .then(images => this.setState({ images, status: `resolved` }))
        .catch(error => this.setState({ error, status: `rejected` }));
    }
  }

  onClickLoadMore = () => {
    this.setState(prevState => ({
      page: prevState.page + 1,
    }));
  };

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
        <>
          <ul className={s.ImageGallery}>
            <ImageGalleryItem images={images.hits} />
          </ul>
          <Button onClick={this.onClickLoadMore} />
        </>
      );
    }
  }
}

export default ImageGallery;
