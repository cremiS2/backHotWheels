const express = require('express');
const router = express.Router();
const hotController = require('../controllers/hotController');
const Hot = require('../models/Hot');

/**
 * @swagger
 * components:
 *   schemas:
 *     Hot:
 *       type: object
 *       required:
 *         - nome
 *         - modelo
 *         - ano
 *         - imagem
 *       properties:
 *         id:
 *           type: string
 *           description: ID do HotWheels
 *         nome:
 *           type: string
 *           description: Nome do HotWheels
 *         modelo:
 *           type: string
 *           description: Modelo do HotWheels
 *         ano:
 *           type: integer
 *           description: Ano de fabricação do HotWheels
 *         imagem:
 *           type: string
 *           description: URL da imagem do HotWheels
 */

/**
 * @swagger
 * /api/hot:
 *   post:
 *     summary: Cria um novo HotWheels
 *     tags: [Hot]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Hot'
 *     responses:
 *       201:
 *         description: HotWheels criado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Hot'
 */
router.post('/', hotController.createHot);

/**
 * @swagger
 * /api/hot/multiple:
 *   post:
 *     summary: Cria múltiplos HotWheels
 *     tags: [Hot]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: array
 *             items:
 *               $ref: '#/components/schemas/Hot'
 *     responses:
 *       201:
 *         description: HotWheels criados com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Hot'
 */
router.post('/multiple', hotController.createMultipleHots);

/**
 * @swagger
 * /api/hot:
 *   get:
 *     summary: Retorna todos os HotWheels
 *     tags: [Hot]
 *     responses:
 *       200:
 *         description: Lista de HotWheels
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Hot'
 */
router.get('/', hotController.getHots);

/**
 * @swagger
 * /api/hot/{id}:
 *   get:
 *     summary: Retorna um HotWheels pelo ID
 *     tags: [Hot]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID do HotWheels
 *     responses:
 *       200:
 *         description: HotWheels encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Hot'
 *       404:
 *         description: HotWheels não encontrado
 */
router.get('/:id', hotController.getHotById);

/**
 * @swagger
 * /api/hot/welcome:
 *   get:
 *     summary: Endpoint de boas-vindas
 *     tags: [Misc]
 *     responses:
 *       200:
 *         description: Retorna uma mensagem simples
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Bem-vindo à API de HotWheels!"
 */
router.get('/welcome', (req, res) => {
  res.status(200).json({ message: "Bem-vindo à API de HotWheels!" });
});

/**
 * @swagger
 * /api/hot/{id}:
 *   put:
 *     summary: Atualiza um HotWheels pelo ID
 *     tags: [Hot]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID do HotWheels
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Hot'
 *     responses:
 *       200:
 *         description: HotWheels atualizado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Hot'
 */
router.put('/:id', hotController.updateHot);

/**
 * @swagger
 * /api/hot/{id}:
 *   delete:
 *     summary: Deleta um HotWheels pelo ID
 *     tags: [Hot]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID do HotWheels
 *     responses:
 *       200:
 *         description: HotWheels deletado com sucesso
 */
router.delete('/:id', hotController.deleteHot);

/**
 * @swagger
 * /api/hot/delete-all:
 *   delete:
 *     summary: Deleta todos os HotWheels
 *     tags: [Hot]
 *     responses:
 *       200:
 *         description: Todos os HotWheels deletados com sucesso
 */
router.delete('/delete-all', hotController.deleteAllHots);

module.exports = router;
