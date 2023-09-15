const ImageGalleryItem = ({ photo: { tags, webformatURL } }) => {
  return (
    <li className="gallery-item">
      <img src={webformatURL} alt={tags} />
    </li>
  );
};

export default ImageGalleryItem;
