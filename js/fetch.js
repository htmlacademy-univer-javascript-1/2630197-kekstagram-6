const BASE_URL = 'https://29.javascript.htmlacademy.pro/kekstagram';

const ApiRoute = {
  FETCH_DATA: '/data',
  SUBMIT_DATA: '/',
};

const HttpMethod = {
  GET: 'GET',
  POST: 'POST',
};

const ErrorMessage = {
  FETCH_FAIL: 'Не удалось загрузить данные. Попробуйте обновить страницу',
  SUBMIT_FAIL: 'Не удалось отправить форму. Попробуйте еще раз',
};

const request = (route, errorMessage, method = HttpMethod.GET, body = null) =>
  fetch(`${BASE_URL}${route}`, {method, body})
    .then((response) => {
      if (response.status !== 200) {
        throw new Error();
      }
      return response.json();
    })
    .catch(() => {
      throw new Error(errorMessage);
    });

const fetchData = () => request(ApiRoute.FETCH_DATA, ErrorMessage.FETCH_FAIL);

const submitData = (body) => request(ApiRoute.SUBMIT_DATA, ErrorMessage.SUBMIT_FAIL, HttpMethod.POST, body);

export { fetchData, submitData };
