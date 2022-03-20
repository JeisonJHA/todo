const { Router } = require('express');
const controllerLogin = require('../modules/login/controller');
const controllerSingin = require('../modules/singin/controller');
const projectRoutes = require('../modules/projects/routes');
const auth = require('../middleware/auth');

const router = Router();

router.post('/singin', controllerSingin);
router.post('/login', controllerLogin);

router.use(auth);
router.use('/projects', projectRoutes);

module.exports = router;
