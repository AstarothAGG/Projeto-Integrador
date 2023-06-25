import express from 'express';
import * as userController from '../controllers/userController';
import * as postController from '../controllers/postController';
import * as likeController from '../controllers/likeController';
import * as commentController from '../controllers/commentController';
import * as uploadController from '../controllers/uploadController';

const router = express.Router();

// Rotas de Usuários
router.post('/users', userController.createUser);
router.get('/users/:id', userController.getUserById);
router.put('/users/:id', userController.editUser);
router.delete('/users/:id', userController.deleteUser);

// Rotas de Postagens
router.post('/posts', postController.createPost);
router.put('/posts/:id', postController.editPost);
router.delete('/posts/:id', postController.deletePost);

// Rota para adicionar curtida a uma postagem
router.post('/posts/:id/like', likeController.addLike);

// Rota para remover curtida de uma postagem
router.delete('/posts/:id/like', likeController.removeLike);

// Rota para adicionar comentário a uma postagem
router.post('/posts/:id/comments', commentController.addComment);

// Rota para excluir comentário
router.delete('/comments/:id', commentController.deleteComment);

// Rota para upload de fotos
router.post('/photos', uploadController.upload, uploadController.handlePhotoUpload);

export default router;
