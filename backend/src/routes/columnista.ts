import { Router } from 'express';
import { ColumnistaController } from '../controllers/columnistaController';
import { authenticateToken } from '../middleware/auth';

const router = Router();

router.get('/', ColumnistaController.getAll);
router.get('/:id', ColumnistaController.getById);
router.post('/', authenticateToken, ColumnistaController.create);
router.put('/:id', authenticateToken, ColumnistaController.update);
router.delete('/:id', authenticateToken, ColumnistaController.delete);

export default router;

