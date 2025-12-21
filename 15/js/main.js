import { renderGallery } from './gallery.js';
import { showSuccessMessage, showErrorMessage } from './message.js';
import { hideModal, setOnFormSubmit } from './user-form.js';
import { getData, sendData } from './fetch.js';
import { showAlert, debounce } from './util.js';
import { init, getFilterPictures } from './filter.js';
import './own-photos.js';

(async () => {
  try {
    init(await getData(), debounce(renderGallery));
    renderGallery(getFilterPictures());
  } catch (err) {
    showAlert(err.message);
  }
})();

setOnFormSubmit(async (data) => {
  try {
    await sendData(data);
    hideModal();
    showSuccessMessage();
  } catch (err) {
    showErrorMessage();
  }
});
