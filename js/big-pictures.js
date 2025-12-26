import {isEscapeKey} from './util.js';

const COMMENTS_STEP = 5;
const bigPicture = document.querySelector('.big-picture');

const getElementWithFallback = (selectors) => {
  const selectorsArray = Array.isArray(selectors) ? selectors : [selectors];
  for (const selector of selectorsArray) {
    const element = bigPicture.querySelector(selector);
    if (element) {
      return element;
    }
  }
  return null;
};

const commentsTotalCount = getElementWithFallback([
  '.social__comment-total-count',
  '.comments-count'
]);

const commentsShownCount = getElementWithFallback([
  '.social__comment-shown-count',
  '.comments-shown-count'
]);


const socialComments = bigPicture.querySelector('.social__comments');
const commentsLoader = bigPicture.querySelector('.comments-loader');
const body = document.querySelector('body');
const cancelButtonBigPicture = bigPicture.querySelector('.big-picture__cancel');
const bigPictureImage = bigPicture.querySelector('.big-picture__img img');
const likesCount = bigPicture.querySelector('.likes-count');
const socialCaption = bigPicture.querySelector('.social__caption');
const socialFooterText = bigPicture.querySelector('.social__footer-text');

let commentsShown = COMMENTS_STEP;
let currentComments = [];

const createComment = (comment) => {
  const newComment = document.createElement('li');
  const imgComment = document.createElement('img');
  const textComment = document.createElement('p');

  newComment.classList.add('social__comment');
  imgComment.classList.add('social__picture');
  textComment.classList.add('social__text');

  imgComment.src = comment.avatar;
  imgComment.alt = comment.name;
  textComment.textContent = comment.message;

  newComment.appendChild(imgComment);
  newComment.appendChild(textComment);
  return newComment;
};

const renderComments = () => {
  if (!socialComments) {
    return;
  }

  if (commentsShown <= COMMENTS_STEP) {
    socialComments.innerHTML = '';
  }

  commentsShown = Math.min(commentsShown, currentComments.length);

  if (commentsTotalCount) {
    commentsTotalCount.textContent = currentComments.length;
  }

  if (commentsShownCount) {
    commentsShownCount.textContent = commentsShown;
  }

  if (commentsLoader) {
    const shouldHide = commentsShown >= currentComments.length;
    commentsLoader.classList.toggle('hidden', shouldHide);
  }

  const startIndex = socialComments.children.length;
  for (let i = startIndex; i < commentsShown; i++) {
    socialComments.appendChild(createComment(currentComments[i]));
  }
};

const onLoadCommentsButtonClick = () => {
  const newShownCount = commentsShown + COMMENTS_STEP;

  commentsShown = Math.min(newShownCount, currentComments.length);

  renderComments();
};

const hideBigPicture = () => {
  bigPicture.classList.add('hidden');
  body.classList.remove('modal-open');
  commentsShown = 0;
  currentComments = [];
  if (socialFooterText) {
    socialFooterText.value = '';
  }

  if (commentsLoader) {
    commentsLoader.removeEventListener('click', onLoadCommentsButtonClick);
  }
  if (cancelButtonBigPicture) {
    cancelButtonBigPicture.removeEventListener('click', onCancelButtonClick);
  }
  document.removeEventListener('keydown', onDocumentKeydown);
};

function onDocumentKeydown(evt) {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    hideBigPicture();
  }
}

function onCancelButtonClick() {
  hideBigPicture();
}

const showBigPicture = (data) => {
  if (!data || !data.url || !bigPicture) {
    return;
  }

  const {url, comments, likes, description} = data;
  bigPicture.classList.remove('hidden');
  body.classList.add('modal-open');

  if (bigPictureImage) {
    bigPictureImage.src = url;
  }
  if (likesCount) {
    likesCount.textContent = likes;
  }
  if (socialCaption) {
    socialCaption.textContent = description;
  }

  currentComments = comments.slice();

  if (currentComments.length <= COMMENTS_STEP) {
    commentsShown = currentComments.length;
  } else {
    commentsShown = COMMENTS_STEP;
  }

  renderComments();

  if (commentsLoader) {
    commentsLoader.addEventListener('click', onLoadCommentsButtonClick);
  }
  if (cancelButtonBigPicture) {
    cancelButtonBigPicture.addEventListener('click', onCancelButtonClick);
  }
  document.addEventListener('keydown', onDocumentKeydown);
};

export { showBigPicture };
