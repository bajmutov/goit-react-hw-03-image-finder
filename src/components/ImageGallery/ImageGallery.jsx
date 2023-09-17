import ImageGalleryItem from 'components/ImageGalleryItem/ImageGalleryItem';

export const ImageGallery = ({ photos, ...otherProps }) => {
  return (
    <ul className="gallery">
      {photos.map((photo, index) => (
        <ImageGalleryItem
          key={photo.id}
          photo={photo}
          index={index}
          {...otherProps}
        />
      ))}
    </ul>
  );
};
