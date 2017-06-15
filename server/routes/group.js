import express from 'express';
import bodyParser from 'body-parser';

import GroupController from '../controllers/groupController';

const router = express.Router();

router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

router.route('/create')
  .post(GroupController.createGroup);

router.route('/:id')
  .get(GroupController.getGroup);

router.route('/:id')
  .delete(GroupController.deleteGroup)

router.route('/:id')
  .put(GroupController.updateGroup)

router.route('/')
  .get(GroupController.getAllGroups)

router.route('/:id/join')
  .post(GroupController.joinGroup)

module.exports = router;