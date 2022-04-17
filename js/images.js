const FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];

const avatarFileChooser = document.querySelector('#avatar');
const avatarPreview = document.querySelector('.ad-form-header__preview img');
const photoFileChooser = document.querySelector('#images');
const photoPreview = document.querySelector('.ad-form__photo');

const chooseFile = (chooser, preview) => {
  const file = chooser.files[0];
  const fileName = file.name.toLowerCase();

  const matches = FILE_TYPES.some((it) => fileName.endsWith(it));

  if (matches) {
    preview.src = URL.createObjectURL(file);
  }
};

avatarFileChooser.addEventListener('change', () => {
  chooseFile(avatarFileChooser, avatarPreview);
});

const getPhotoImage = () => {
  let photo = photoPreview.querySelector('img');
  if (photo === null) {
    photo = document.createElement('img');
    photo.width = 70;
    photo.height = 70;
    photoPreview.append(photo);
  }
  return photo;
};

const resetImages = () => {
  avatarFileChooser.value = '';
  avatarPreview.src = 'img/muffin-grey.svg';
  photoFileChooser.value = '';
  getPhotoImage().remove();
};

photoFileChooser.addEventListener('change', () => {
  chooseFile(photoFileChooser, getPhotoImage());
});

export { resetImages };
