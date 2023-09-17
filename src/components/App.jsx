import { Component } from 'react';
import Searchbar from './Searchbar/Searchbar';
import { PixabayAPI } from './Api/getPhoto';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Button } from './Button/Button';
import { Loader } from './Loader/Loader';
import Modal from './Modal/Modal';
import ImageGalleryItem from './ImageGalleryItem/ImageGalleryItem';

const newsApiService = new PixabayAPI();

class App extends Component {
  state = {
    isLoading: false,
    error: '',
    photos: null,
    searchQuery: '',
    totalPages: null,
    isShowButton: true,
    showModal: true,
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
      this.setState({ isLoading: true, isShowButton: true });
      newsApiService.resetPage();
      newsApiService.query = this.state.searchQuery;
      const data = await newsApiService.getPhotoBySearch(
        this.state.searchQuery
      );
      this.setState({ photos: data.hits, totalPages: data.totalHits });
    } catch (error) {
      this.setState({ error: error.response.data });
    } finally {
      this.setState({ isLoading: false });
    }
  };

  loadMore = async () => {
    try {
      this.setState({ isLoading: true });
      newsApiService.incrementPage();
      const data = await newsApiService.getPhotoBySearch(
        this.state.searchQuery
      );
      this.setState(prev => {
        return { photos: [...prev.photos, ...data.hits] };
      });
      this.checkTotalImages();
      console.log('this.state', this.state);
    } catch (error) {
      this.setState({ error: error.response.data });
    } finally {
      this.setState({ isLoading: false });
    }
  };

  checkTotalImages() {
    const numb = newsApiService.multiplyPages();
    if (this.state.totalPages <= numb) this.setState({ isShowButton: false });
  }

  toggleModal = () => {
    this.setState(({ showModal }) => ({
      showModal: !showModal,
    }));
  };

  handlePressESC = e => {
    console.log('object :>> ', Date.now());
    if (e.code === 'Escape') this.props.closeModal();
  };

  render() {
    const { error, isLoading, photos, searchQuery, isShowButton, showModal } =
      this.state;
    return (
      <>
        {error && <h1>{error}</h1>}
        <Searchbar submit={this.handleSetSearchQuery} />

        {photos &&
          (!photos.length ? (
            <h1>Images '{searchQuery}' not found</h1>
          ) : (
            <ImageGallery photos={photos} />
          ))}
        {isLoading && <Loader />}
        {photos && photos.length > 0 && !isLoading && isShowButton && (
          <Button loadmore={this.loadMore} showButton={this.state.isLoading} />
        )}
        {showModal && (
          <Modal onClose={this.toggleModal}>
            {/* <ImageGallery photos={photos} /> */}
            <h1>Modalka</h1>
          </Modal>
        )}
        <button type="button" className="IconButton" onClick={this.toggleModal}>
          модал
        </button>
      </>
    );
  }
}

export default App;
