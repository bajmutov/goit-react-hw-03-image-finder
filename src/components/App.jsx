import { Component } from 'react';
import Searchbar from './Searchbar/Searchbar';
import { getPhotoBySearch } from './Api/getPhoto';
import { ImageGallery } from './ImageGallery/ImageGallery';

class App extends Component {
  state = { isLoading: false, error: '', photos: null, searchQuery: '' };

  handleSetSearchQuery = value => {
    this.setState({ searchQuery: value });
  };

  componentDidUpdate(_, prevState) {
    prevState.searchQuery !== this.state.searchQuery && this.fetchPhoto();
    // console.log('this.state.photo', this.state.photos);
  }

  fetchPhoto = async () => {
    const data = await getPhotoBySearch(this.state.searchQuery);
    this.setState({ photos: data.hits });

    try {
      this.setState({ isLoading: true, photos: null });
      const data = await getPhotoBySearch(this.state.searchQuery);
      this.setState({ photos: data.hits });
    } catch (error) {
      this.setState({ error: error.response.data });
    } finally {
      this.setState({ isLoading: false });
    }
  };

  render() {
    const { error, isLoading, photos } = this.state;
    return (
      <>
        {error && <h1>{error}</h1>}
        <Searchbar submit={this.handleSetSearchQuery} />
        {isLoading && <h1>Loading...</h1>}
        {photos &&
          (!photos.length ? (
            <h1>No data found</h1>
          ) : (
            <ImageGallery photos={photos} />
          ))}
      </>
    );
  }
}

export default App;
