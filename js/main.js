import { renderGallery } from './gallery.js';
import { showSuccessMessage, showErrorMessage } from './message.js';
import { closeModal, setOnFormSubmit } from './user-form.js';
import { getData, sendData } from './fetch.js';
import { showAlert, debounce } from './util.js';
import { init, getFilterPictures } from './filter.js';
import './own-photos.js';

getData()
  .then((data) => {
    init(data, debounce(renderGallery, 500));
    renderGallery(getFilterPictures());
  })
  .catch((err) => showAlert(err.message));

// Обработчик отправки формы
setOnFormSubmit((formData) =>
  sendData(formData)
    .then(() => {
      closeModal();
      showSuccessMessage();
    })
    .catch((err) => {
      showErrorMessage();
      throw err; //  пробрасываем ошибку дальше
    })
);

