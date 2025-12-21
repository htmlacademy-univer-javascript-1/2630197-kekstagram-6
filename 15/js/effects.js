const Effect = {
  DEFAULT: 'none',
  CHROME: 'chrome',
  SEPIA: 'sepia',
  MARVIN: 'marvin',
  PHOBOS: 'phobos',
  HEAT: 'heat'
};

const effectToFilter = {
  [Effect.CHROME]: {
    style: 'grayscale',
    unit: ''
  },
  [Effect.SEPIA]: {
    style: 'sepia',
    unit: ''
  },
  [Effect.MARVIN]: {
    style: 'invert',
    unit: '%'
  },
  [Effect.PHOBOS]: {
    style: 'blur',
    unit: 'px'
  },
  [Effect.HEAT]: {
    style: 'brightness',
    unit: ''
  }
};

const effectToSliderOptions = {
  [Effect.DEFAULT]: {
    min: 0,
    max: 100,
    step: 1
  },
  [Effect.CHROME]: {
    min: 0,
    max: 1,
    step: 0.1
  },
  [Effect.SEPIA]: {
    min: 0,
    max: 1,
    step: 0.1
  },
  [Effect.MARVIN]: {
    min: 0,
    max: 100,
    step: 1
  },
  [Effect.PHOBOS]: {
    min: 0,
    max: 3,
    step: 0.1
  },
  [Effect.HEAT]: {
    min: 1,
    max: 3,
    step: 0.1
  }
};

const imageUpload = document.querySelector('.img-upload');
const imageUploadPreview = imageUpload.querySelector('.img-upload__preview img');
const sliderEffectLevel = imageUpload.querySelector('.effect-level__slider');
const imageUploadEffectLevel = imageUpload.querySelector('.img-upload__effect-level');
const effectLevelValue = imageUpload.querySelector('.effect-level__value');

let chosenEffect = Effect.DEFAULT;

const setImageStyle = () => {
  if (chosenEffect === Effect.DEFAULT) {
    imageUploadPreview.style.filter = null;
    return;
  }

  const {value} = effectLevelValue;
  const {style, unit} = effectToFilter[chosenEffect];
  imageUploadPreview.style.filter = `${style}(${value}${unit})`;
};

const onSliderUpdate = () => {
  effectLevelValue.value = sliderEffectLevel.noUiSlider.get();
  setImageStyle();
};

const createSlider = ({min, max, step}) => {
  noUiSlider.create(sliderEffectLevel, {
    range: {min, max},
    step,
    start: max,
    connect: 'lower'
  });
  sliderEffectLevel.noUiSlider.on('update', onSliderUpdate);
};

const setSlider = () => {
  if (sliderEffectLevel.noUiSlider) {
    sliderEffectLevel.noUiSlider.destroy();
  }
  setImageStyle();
  imageUploadEffectLevel.classList.add('hidden');
  if (chosenEffect !== Effect.DEFAULT) {
    createSlider(effectToSliderOptions[chosenEffect]);
    imageUploadEffectLevel.classList.remove('hidden');
  }
};

const setEffect = (effect) => {
  chosenEffect = effect;
  setSlider();
};

const reset = () => {
  setEffect(Effect.DEFAULT);
};

const onEffectsChange = (evt) => {
  setEffect(evt.target.value);
};

const init = () => {
  setSlider();
  imageUpload.querySelector('.effects').addEventListener('change', onEffectsChange);
};

export { init, reset };
