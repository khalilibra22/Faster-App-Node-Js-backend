const {
    CreateUserControl,
    GetUserbyIdContorl,
    SetUserInfoControl,
    SetUserPositionControl,
    GetUserPosition,
    Login,
    GetUserbyEmailControl
} = require('./users-controller');
const router = require('express').Router();
const { checkToken } = require('../../auth/UsersTokenValidation');

router.post('/', CreateUserControl);
router.get('/:id', checkToken, GetUserbyIdContorl);
router.put('/', checkToken, SetUserInfoControl);
router.put('/position', checkToken, SetUserPositionControl);
router.get('/position/:id', checkToken, GetUserPosition);
router.post('/login', Login);
router.post('/checkemail', GetUserbyEmailControl);
module.exports = router;