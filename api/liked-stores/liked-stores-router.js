const {
    UserLikeStoreControl,
    UserDislikeStoreControl,
    GetLikedStoresToUserControl,
    GetStoresBasedUserPositionControl,
    GetStoresCollectionControl
}
    = require('./liked-stores-controller')
const router = require('express').Router();
const { checkToken } = require('../../auth/UsersTokenValidation');

router.post('/', checkToken, UserLikeStoreControl);
router.put('/', checkToken, UserDislikeStoreControl);
router.get('/id/:id', checkToken, GetLikedStoresToUserControl);
router.get('/basedPosition/:id', checkToken, GetStoresBasedUserPositionControl);
router.get('/collection/:id', checkToken, GetStoresCollectionControl);
module.exports = router;
