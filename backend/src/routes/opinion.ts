import { Router } from 'express';
import { OpinionController } from '../controllers/opinionController';
import { authenticateToken } from '../middleware/auth';

const router = Router();

router.get('/', OpinionController.getAll);
router.get('/:id', OpinionController.getById);
router.post('/', authenticateToken, OpinionController.create);
router.put('/:id', authenticateToken, OpinionController.update);
router.delete('/:id', authenticateToken, OpinionController.delete);

export default router;

