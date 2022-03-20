const { Router } = require('express');
const controllerLogin = require('../modules/login/controller');
const controllerSingup = require('../modules/singup/controller');
const projectRoutes = require('../modules/projects/routes');
const auth = require('../middleware/auth');

const router = Router();

router.post('/signup', controllerSingup);
router.post('/login', controllerLogin);

router.use(auth);
router.use('/projects', projectRoutes);

module.exports = router;
