const { Router } = require('express');
const controller = require('../controller');

const taskRoutes = require('../../task/routes');
const router = Router();

router.get('/', controller.list);
router.get('/:id', controller.get);
router.post('/', controller.post);
router.put('/:id', controller.put);
router.delete('/:id', controller.delete);
router.use('/:id/tasks', taskRoutes);

module.exports = router;
