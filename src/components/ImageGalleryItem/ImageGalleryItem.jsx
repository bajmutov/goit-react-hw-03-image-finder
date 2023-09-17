// const ImageGalleryItem = ({ onClose, photo: { id, tags, webformatURL } }) => {
//   return (
//     <li className="gallery-item">
//       <img src={webformatURL} alt={tags} onClick={onClose} data-id={id} />
//     </li>
//   );
// };

import Modal from 'components/Modal/Modal';
import { Component } from 'react';

class ImageGalleryItem extends Component {
  state = {
    showModal: false,
  };

  toggleModal = () => {
    this.setState(({ showModal }) => ({
      showModal: !showModal,
    }));
  };

  render() {
    const { tags, webformatURL, largeImageURL } = this.props.photo;
    const { showModal } = this.state;
    return (
      <>
        <li className="gallery-item">
          <img src={webformatURL} alt={tags} onClick={this.toggleModal} />
          {showModal && (
            <Modal
              onClose={this.toggleModal}
              largeImageURL={largeImageURL}
              tag={tags}
            />
          )}
        </li>
      </>
    );
  }
}
export default ImageGalleryItem;
