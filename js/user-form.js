import { isEscapeKey } from './util.js';
import { resetScale } from './scale.js';
import { init, reset } from './effects.js';

const MAX_HASHTAG_COUNT = 5;
const MAX_COMMENT_LENGTH = 140;
const VALID_SYMBOLS = /^#[a-zа-яё0-9]{1,19}$/i;

const form = document.querySelector('.img-upload__form');
const overlay = document.querySelector('.img-upload__overlay');
const fileInput = document.querySelector('#upload-file');
const cancelButton = document.querySelector('#upload-cancel');
const textHashtags = document.querySelector('.text__hashtags');
const textDescription = document.querySelector('.text__description');
const submitButton = form.querySelector('.img-upload__submit');

// Инициализация Pristine
const pristine = new Pristine(form, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextClass: 'img-upload__error'
});

// Функции
function showModal() {
  document.body.classList.add('modal-open');
  overlay.classList.remove('hidden');
  resetScale();
  reset();
}

function closeModal() {
  document.body.classList.remove('modal-open');
  overlay.classList.add('hidden');
  form.reset();
  pristine.reset();
  resetScale();
  reset();
  fileInput.value = '';
}

const onDocumentKeydown = (evt) => {
  const isTextFocused = document.activeElement === textHashtags ||
                        document.activeElement === textDescription;

  // Проверяем, отображается ли сейчас сообщение об ошибке
  const isErrorMessageOpen = !!document.querySelector('.error');

  // Если нажата Esc, фокус не в полях ввода И нет окна ошибки — закрываем форму
  if (isEscapeKey(evt) && !isTextFocused && !isErrorMessageOpen) {
    evt.preventDefault();
    closeModal();
  }
};

// Обработчики событий
function onFileInputChange() {
  showModal();
  document.addEventListener('keydown', onDocumentKeydown);
}

function onCancelClick() {
  closeModal();
  document.removeEventListener('keydown', onDocumentKeydown);
}

// Функции валидации
const normalizeTags = (tagString) => tagString.trim().split(' ').filter(Boolean);

const validateHashtagsCount = (value) => normalizeTags(value).length <= MAX_HASHTAG_COUNT;
const validateHashtagsPattern = (value) => {
  const tags = normalizeTags(value);
  return tags.length === 0 || tags.every((tag) => VALID_SYMBOLS.test(tag));
};
const validateHashtagsUnique = (value) => {
  const tags = normalizeTags(value);
  const lowerTags = tags.map((tag) => tag.toLowerCase());
  return lowerTags.length === new Set(lowerTags).size;
};

// Добавляем валидаторы
pristine.addValidator(textHashtags, validateHashtagsCount, `Максимум ${MAX_HASHTAG_COUNT} хэштегов`);
pristine.addValidator(textHashtags, validateHashtagsPattern, 'Неправильный хэштег');
pristine.addValidator(textHashtags, validateHashtagsUnique, 'Хэштеги должны быть уникальными');
pristine.addValidator(textDescription, (value) => value.length <= MAX_COMMENT_LENGTH,
  `Длина комментария не может составлять больше ${MAX_COMMENT_LENGTH} символов`);

// Инициализация обработчиков
fileInput.addEventListener('change', onFileInputChange);
cancelButton.addEventListener('click', onCancelClick);

// Инициализация эффектов
init();

// ОБРАБОТЧИК ОТПРАВКИ ФОРМЫ - КЛЮЧЕВОЙ МОМЕНТ
const setOnFormSubmit = (callback) => {
  // Вешаем обработчик НА КНОПКУ, а не на форму!
  submitButton.addEventListener('click', (evt) => {
    evt.preventDefault();

    // Проверяем валидацию
    if (!pristine.validate()) {
      return;
    }

    // Блокируем кнопку
    submitButton.disabled = true;
    const originalText = submitButton.textContent;
    submitButton.textContent = 'Отправляю...';

    // Создаем FormData
    const formData = new FormData(form);

    // Вызываем callback
    callback(formData)
      .then(() => {
        // УСПЕХ
        submitButton.disabled = false;
        submitButton.textContent = originalText;
        closeModal();
      })
      .catch(() => {
        // ОШИБКА - ТОЛЬКО разблокируем кнопку
        submitButton.disabled = false;
        submitButton.textContent = originalText;
        // ФОРМА ОСТАЕТСЯ ОТКРЫТОЙ
      });
  });

  // Дополнительно блокируем стандартный submit формы
  form.addEventListener('submit', (evt) => {
    evt.preventDefault();
    return false;
  });
};

export { closeModal, setOnFormSubmit };
