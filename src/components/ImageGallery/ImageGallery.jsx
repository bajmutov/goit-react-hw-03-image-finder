import ImageGalleryItem from 'components/ImageGalleryItem/ImageGalleryItem';

export const ImageGallery = ({ photos }) => {
  return (
    <ul className="gallery">
      {photos.map(photo => (
        <ImageGalleryItem key={photo.id} photo={photo} />
      ))}
    </ul>
  );
};
