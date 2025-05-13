const express = require('express');
const router = express.Router();
const carController = require('../controllers/hotController');
const Hot = require('../models/Hot');

/**
 * @swagger
 * components:
 *   schemas:
 *     Car:
 *       type: object
 *       required:
 *         - nome
 *         - modelo
 *         - ano
 *         - imagem
 *       properties:
 *         id:
 *           type: string
 *           description: ID do carro
 *         nome:
 *           type: string
 *           description: Nome do carro
 *         modelo:
 *           type: string
 *           description: Modelo do carro
 *         ano:
 *           type: integer
 *           description: Ano de fabricação do carro
 *         imagem:
 *           type: string
 *           description: URL da imagem do carro
 */

/* ==== POST ==== */

/**
 * @swagger
 * /api/hot:
 *   post:
 *     summary: Cria um novo carro
 *     tags: [Cars]
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
router.post('/', hotController.createCar);

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
router.post('/multiple', hotController.createMultipleCars);

/* ==== GET ==== */

/**
 * @swagger
 * /api/hot:
 *   get:
 *     summary: Retorna todos os HotWheels
 *     tags: [Cars]
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
router.get('/', hotController.getCars);

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
 *               $ref: '#/components/schemas/hot'
 *       404:
 *         description: HotWheels não encontrado
 */
router.get('/:id', hotController.getCarById);

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

/* ==== PUT ==== */

/**
 * @swagger
 * /api/hot/{id}:
 *   put:
 *     summary: Atualiza um HotWheels pelo ID
 *     tags: [HotHotWheels]
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
router.put('/:id', hotController.updateCar);

/* ==== DELETE ==== */

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
router.delete('/:id', hotController.deleteCar);

/**
 * @swagger
 * /api/hot/delete-all:
 *   delete:
 *     summary: Deleta todos os carros
 *     tags: [Hot]
 *     responses:
 *       200:
 *         description: Todos os HotWheels deletados com sucesso
 */
router.delete('/delete-all', hotController.deleteAllCars);

module.exports = router;
