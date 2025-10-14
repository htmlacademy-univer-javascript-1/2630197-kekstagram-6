import {getRandomInteger, getRandomArrayElement, createRandomId} from './util.js';

const NAMES = [
  'София',
  'Артём',
  'Ева',
  'Виктория',
  'Аиша',
  'Алия',
  'Анна',
  'Дарина',
  'Екатерина',
  'Марьям',
  'Милана',
  'Хадиджа',
  'Ханифа'
];

const COMMENTS = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];

const DESCRIPTION = [
  'Вся красота мира в одной картинке',
  'Моменты, которые запечатлены навсегда',
  'Счастье в каждом кадре',
  'Когда слова не нужны, достаточно фотографии',
  'История, рассказанная через объектив',
  'Остановить время в одном кадре',
  'Фотография — это способ улыбнуться в будущем',
  'Сегодня — самый лучший день',
  'Я не доверяю словам. Я доверяю фотографиям',
  'Фотографии — это свидетельство о том, что мы жили',
  'Момент, когда небо и земля сливаются воедино',
  'В объектив всегда видна правда — это как детектор лжи',
  'Сделано объективом и любовью',
  'Счастье никогда не выходит из моды',
  'Лишь тот, кто странствует, открывает новые пути',
  'Зарядитесь нашим теплом',
  'Жизнь лучше, когда ты смеешься'
];

const ALL_PHOTO_COUNT = 25;

const generatePhotoId = createRandomId(1, 25);
const generatePhotoAvatar = getRandomInteger;
const generatePhotoURL = createRandomId(1, 25);
const generatePhotoLikes = getRandomInteger;

const createPhotoComments = () => ({
  id: generatePhotoId(),
  avatar: `img/avatar-${generatePhotoAvatar(1, 6)}.svg`,
  message: getRandomArrayElement(COMMENTS),
  name: getRandomArrayElement(NAMES)
});

const createPhotoDescription = () => ({
  id: generatePhotoId(),
  url: `photos/${generatePhotoURL()}.jpg`,
  description: getRandomArrayElement(DESCRIPTION),
  likes: generatePhotoLikes(15, 200),
  comments: Array.from({length: getRandomInteger(0, 25)}, createPhotoComments),
});

const allPhoto = () => Array.from({length: ALL_PHOTO_COUNT}, createPhotoDescription);

export {allPhoto};
