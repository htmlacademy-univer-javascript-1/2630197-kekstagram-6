const FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];
const uploadFile = document.querySelector('#upload-file');

const onUploadImageChange = () => {
  const file = uploadFile.files[0];

  if (!file) {
    return;
  }

  const fileName = file.name.toLowerCase();
  const matches = FILE_TYPES.some((it) => fileName.endsWith(it));

  if (!matches) {
    return;
  }

  const blobUrl = URL.createObjectURL(file);

  const previewImage = document.querySelector('.img-upload__preview img');
  previewImage.src = blobUrl;

  const effectsPreviews = document.querySelectorAll('.effects__preview');
  effectsPreviews.forEach((preview) => {
    preview.style.backgroundImage = `url(${blobUrl})`;
  });
};

uploadFile.addEventListener('change', onUploadImageChange);
