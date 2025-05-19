require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const swaggerUi = require('swagger-ui-express'); 
const swaggerSpec = require('./docs/swagger'); 
const hotRoutes = require('./routes/hotRoutes');

const app = express();

app.use(cors());
app.use(bodyParser.json());

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use('/api/hot', hotRoutes);

const connectToDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Conectado ao MongoDB');
  } catch (err) {
    console.error('Erro na conexão com o MongoDB:', err.message);
    process.exit(1);
  }
};

const startServer = (port) => {
  app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`);
  });
};

const initializeApp = async () => {
  await connectToDatabase();
  const PORT = process.env.PORT || 3000;
  startServer(PORT);
};

initializeApp();
