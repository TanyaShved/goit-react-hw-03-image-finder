import { Component } from 'react';
import { ToastContainer } from 'react-toastify';
import Searcbar from './components/Searchbar/Searchbar';
import ImageGallery from './components/ImageGallery/ImageGallery';

class App extends Component {
  state = {
    imageName: '',
  };

  handelFormSubmit = imageName => {
    this.setState({ imageName });
  };

  render() {
    const { imageName } = this.state;
    return (
      <>
        <Searcbar onSubmit={this.handelFormSubmit} />
        <ImageGallery imageName={imageName} />
        <ToastContainer position="top-center" />
      </>
    );
  }
}

export default App;
