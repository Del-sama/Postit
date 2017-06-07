import express from 'express';
import bodyParser from 'body-parser';

import UsersController from '../controllers/userController';

const router = express.Router();

router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

router.route('/signup')
  .post(UsersController.createUsers);

router.route('/signin')
  .post(UsersController.signin);

module.exports = router;