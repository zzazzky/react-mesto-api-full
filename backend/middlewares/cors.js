const allowdedCors = [
  'https://frontend.mesto.gerasimova.nomoredomainsclub.ru',
  'http://frontend.mesto.gerasimova.nomoredomainsclub.ru',
  'http://localhost:3000',
];

function cors(req, res, next) {
  const { origin } = req.headers;
  const { method } = req;
  const DEFAULT_ALLOWED_METHODS = 'GET,HEAD,PUT,PATCH,POST,DELETE';
  const requestHeaders = req.headers['access-control-request-headers'];

  if (allowdedCors.includes(origin)) {
    res.setHeader('Access-Control-Allow-Origin', origin);
  }

  if (method === 'OPTIONS') {
    res.setHeader('Access-Control-Allow-Methods', DEFAULT_ALLOWED_METHODS);
    res.setHeader('Access-Control-Allow-Headers', requestHeaders);
  }
  next();
}

module.exports = { cors };
