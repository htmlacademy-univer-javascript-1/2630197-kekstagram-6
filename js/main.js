
import { renderGallery } from './gallery.js';
import { showSuccessMessage, showErrorMessage } from './message.js';
import { hideModal, setOnFormSubmit } from './user-form.js';
import { fetchData, submitData } from './fetch.js';
import { showAlert } from './util.js';
import './user-form.js';

try {
  renderGallery(await fetchData());
} catch (err) {
  showAlert(err.message);
}

setOnFormSubmit(async (data) => {
  try {
    await submitData(data);
    hideModal();
    showSuccessMessage();
  } catch {
    showErrorMessage();
  }
});
