const {
    GetUserByIDControl,
    CreatenewSellerControl,
    SetSellerInfoControl,
    GetSellerPasswordControl,
    GetSellerByEmailControl,
    Login,
    SetSellerPositionControl,
    SetSellerPasswordControl,
    CheckSellerCodeControl,
    ChangeCodeStatueControl
} = require('./sellers-controller');
const router = require('express').Router();
const { checkToken } = require('../../auth/SellersTokenValidation');

const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
    destination: './upload/images',
    filename: (req, file, Callback) => {
        const ProfileImg = `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`;
        req.body.SellerImgURL = process.env.DOMAIN_NAME + '/upload/images/' + ProfileImg;
        return Callback(null, ProfileImg);
    }
});
const upload = multer({
    storage: storage,
    limits: {
        fileSize: 1000000
    }
});

router.put('/info', checkToken, SetSellerInfoControl);
router.post('/add', upload.single('SellerImgURL'), CreatenewSellerControl);
router.get('/:id', checkToken, GetUserByIDControl);
router.get('/checkpassword/:id', checkToken, GetSellerPasswordControl);
router.post('/checkemail', GetSellerByEmailControl);
router.post('/login', Login);
router.put('/position', checkToken, SetSellerPositionControl);
router.post('/setpassword', SetSellerPasswordControl);
router.post('/code', CheckSellerCodeControl);
router.put('/codestatue', ChangeCodeStatueControl);


module.exports = router;