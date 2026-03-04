import { Router } from 'express';
import { EditorialController } from '../controllers/editorialController';
import { authenticateToken } from '../middleware/auth';

const router = Router();

router.get('/', EditorialController.getAll);
router.get('/:id', EditorialController.getById);
router.post('/', authenticateToken, EditorialController.create);
router.put('/:id', authenticateToken, EditorialController.update);
router.delete('/:id', authenticateToken, EditorialController.delete);

export default router;

