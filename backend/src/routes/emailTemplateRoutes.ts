import { Router } from 'express';
import * as emailTemplateController from '../controllers/emailTemplateController';

const router = Router();

// Get the current email template
router.get('/', emailTemplateController.getEmailTemplate);

// Save or update the email template
router.post('/', emailTemplateController.saveEmailTemplate);

// Reset to default template
router.post('/reset', emailTemplateController.resetToDefaultTemplate);

export default router;
