const BASE_URL = 'https://29.javascript.htmlacademy.pro/kekstagram';
const STATUS_OK = 200;
const ApiRoute = {
  GET_DATA:'/data',
  SEND_DATA: '/',
};

const HttpMethod = {
  GET: 'GET',
  POST: 'POST',
};

const ErrorMessage = {
  GET_FAIL: 'Не удалось загрузить данные. Попробуйте обновить страницу',
  SEND_FAIL: 'Не удалось отправить форму. Попробуйте еще раз',
};

const load = (route, errorMessage, method = HttpMethod.GET, body = null) =>
  fetch(`${BASE_URL}${route}`, {method, body})
    .then((response) => {
      if (response.status !== STATUS_OK) {
        throw new Error();
      }
      return response.json();
    })

    .catch(() => {
      throw new Error(errorMessage);
    });

const getData = () => load(ApiRoute.GET_DATA, ErrorMessage.GET_FAIL);
const sendData = (body) => load(ApiRoute.SEND_DATA, ErrorMessage.SEND_FAIL, HttpMethod.POST, body);
export{getData, sendData};
