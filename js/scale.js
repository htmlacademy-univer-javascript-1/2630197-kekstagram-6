const SCALE_STEP = 25;
const MIN_SCALE = 25;
const MAX_SCALE = 100;
const DEFAULT_SCALE = 100;
const PERCENT = 100;
const imageUpload = document.querySelector('.img-upload');
const scaleControlValue = imageUpload.querySelector('.scale__control--value');
const imageUploadPreview = imageUpload.querySelector('.img-upload__preview img');

const scaleImage = (value) => {
  imageUploadPreview.style.transform = `scale(${value / PERCENT})`;
  scaleControlValue.value = `${value}%`;
};

const onSmallerButtonClick = () => {
  scaleImage(
    Math.max(parseInt(scaleControlValue.value, 10) - SCALE_STEP, MIN_SCALE)
  );
};

const onBiggerButtonClick = () => {
  scaleImage(
    Math.min(parseInt(scaleControlValue.value, 10) + SCALE_STEP, MAX_SCALE)
  );
};

const resetScale = () => scaleImage(DEFAULT_SCALE);

const initScale = () => {
  scaleImage(DEFAULT_SCALE);
};

// Инициализируем при загрузке модуля
initScale();

imageUpload.querySelector('.scale__control--smaller').addEventListener('click', onSmallerButtonClick);
imageUpload.querySelector('.scale__control--bigger').addEventListener('click', onBiggerButtonClick);

export { resetScale };
