const { Router } = require('express');
const controllerLogin = require('../modules/login/controller');
const controllerSingin = require('../modules/singin/controller');

const router = Router();

router.post('/singin', controllerSingin);
router.post('/login', controllerLogin);

module.exports = router;
