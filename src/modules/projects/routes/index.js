const { Router } = require('express');
const controller = require('../controller');

const router = Router();

router.get('/', controller.list);
router.get('/:id', controller.get);
router.post('/', controller.post);
router.put('/:id', controller.put);
router.delete('/:id', controller.delete);

module.exports = router;
