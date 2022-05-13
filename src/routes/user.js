const { signIn ,add,Delete ,Update,UpdateCancer,signInMobile} = require('../controller/user');

const router = require('express').Router();

router.post('/user/sign-in',signIn);
router.put('/user/update',Update)
router.put('/user/update-cancer',UpdateCancer)
router.post('/user/add',add);
router.delete('/user/delete',Delete);


// sign-in with mobile
router.post('/user/sign-in-mobile',signInMobile);


module.exports =router;