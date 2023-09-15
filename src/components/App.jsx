import { Component } from 'react';
import Searchbar from './Searchbar/Searchbar';
import { getPhotoBySearch } from './Api/getPhoto';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Button } from './Button/Button';
import { Loader } from './Loader/Loader';

class App extends Component {
  state = {
    isLoading: false,
    error: '',
    photos: null,
    searchQuery: '',
  };

  handleSetSearchQuery = value => {
    this.setState({ searchQuery: value });
  };

  componentDidUpdate(_, prevState) {
    prevState.searchQuery !== this.state.searchQuery && this.fetchPhoto();
    console.log('this.state.photo', this.state);
  }

  fetchPhoto = async () => {
    try {
      this.setState({ isLoading: true });
      const data = await getPhotoBySearch(this.state.searchQuery);
      this.setState({ photos: data.hits });
    } catch (error) {
      this.setState({ error: error.response.data });
    } finally {
      this.setState({ isLoading: false });
    }
  };

  render() {
    const { error, isLoading, photos, searchQuery } = this.state;
    return (
      <>
        {error && <h1>{error}</h1>}
        <Searchbar submit={this.handleSetSearchQuery} />
        {isLoading && <Loader />}
        {photos &&
          (!photos.length ? (
            <h1>Images '{searchQuery}' not found</h1>
          ) : (
            <ImageGallery photos={photos} />
          ))}
        {photos && photos.length > 0 && <Button loadmore={this.fetchPhoto} />}
      </>
    );
  }
}

export default App;
