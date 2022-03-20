const { Router } = require('express');
const controller = require('../controller');

const router = Router({ mergeParams: true });

router.get('/', controller.list);
router.get('/:taskId', controller.get);
router.post('/', controller.post);
router.put('/:taskId', controller.put);
router.put('/:taskId/finish', controller.finish);
router.delete('/:taskId', controller.delete);

module.exports = router;
