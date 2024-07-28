// routes/portfolio.js
import express from 'express';
import {verifyToken} from "../middleware/auth.js";
import { upsertPortfolio, getPortfolio } from '../controllers/portfolio.js';

const router = express.Router();

router.post('/',verifyToken, upsertPortfolio);
router.get('/:userID',verifyToken, getPortfolio);

export default router;
