const { add ,getAll} = require('../controller/hospital');

const router = require('express').Router();

router.post('/hospital/add',add)
router.get('/hospital/getAll',getAll)

module.exports = router;