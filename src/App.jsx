import { Component } from 'react';
import { ToastContainer } from 'react-toastify';
import Searcbar from './components/Searchbar/Searchbar';
import ImageGallery from './components/ImageGallery/ImageGallery';

class App extends Component {
  state = {
    imageName: '',
    page: 1,
  };

  hendelFormSubmit = imageName => {
    this.setState({ imageName });
  };

  render() {
    const { imageName, page } = this.state;
    return (
      <>
        <Searcbar onSubmit={this.hendelFormSubmit} />
        <ImageGallery imageName={imageName} page={page} />
        <ToastContainer position="top-center" />
      </>
    );
  }
}

export default App;
