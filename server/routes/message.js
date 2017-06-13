import express from 'express';
import bodyParser from 'body-parser';

import messageController from '../controllers/messageController';

const router = express.Router();

router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

router.route('groups/:id/message')
  .post(messageController.createMessage);