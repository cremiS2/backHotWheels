const Hot = require('../models/Hot');

const handleError = (res, err, status = 500, message = "Erro no processo") => {
  console.error("Detalhes do erro:", err);
  return res.status(status).json({
    success: false,
    message,
    error: err.message || 'Erro desconhecido'
  });
};

const findHotById = async (id) => {
  if (!id || id.length !== 24) {
    throw new Error('ID inválido');
  }

  const hot = await Hot.findById(id);
  if (!hot) {
    throw new Error('HotWheels não encontrado');
  }

  return hot;
};

exports.createHot = async (req, res) => {
  try {
    const hot = new Hot(req.body);
    await hot.save();
    return res.status(201).json({
      success: true,
      message: 'HotWheels criado com sucesso!',
      data: hot
    });
  } catch (err) {
    return handleError(res, err);
  }
};

exports.createMultipleHots = async (req, res) => {
  try {
    const hots = req.body;

    if (!Array.isArray(hots) || hots.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Deve enviar um array de HotWheels para criação"
      });
    }

    const createdHots = await Hot.insertMany(hots);

    return res.status(201).json({
      success: true,
      message: `${createdHots.length} HotWheels criados com sucesso!`,
      data: createdHots
    });
  } catch (err) {
    return handleError(res, err);
  }
};

exports.getHots = async (req, res) => {
  try {
    const hots = await Hot.find();

    return res.status(200).json({
      success: true,
      message: hots.length
        ? 'HotWheels encontrados com sucesso!'
        : 'Nenhum HotWheels encontrado',
      data: hots
    });
  } catch (err) {
    return handleError(res, err, 500, "Erro ao listar HotWheels");
  }
};

exports.getHotById = async (req, res) => {
  try {
    const hot = await findHotById(req.params.id);
    return res.status(200).json({
      success: true,
      message: 'HotWheels encontrado com sucesso!',
      data: hot
    });
  } catch (err) {
    return handleError(res, err, 404, "Erro ao buscar HotWheels por ID");
  }
};

exports.updateHot = async (req, res) => {
  try {
    const hot = await findHotById(req.params.id);
    Object.assign(hot, req.body);
    await hot.save();

    return res.status(200).json({
      success: true,
      message: 'HotWheels atualizado com sucesso!',
      data: hot
    });
  } catch (err) {
    return handleError(res, err);
  }
};

exports.deleteHot = async (req, res) => {
  try {
    const hot = await findHotById(req.params.id);
    await hot.deleteOne();

    return res.status(200).json({
      success: true,
      message: 'HotWheels deletado com sucesso!'
    });
  } catch (err) {
    return handleError(res, err, 500, "Erro ao deletar HotWheels");
  }
};

exports.deleteAllHots = async (req, res) => {
  try {
    console.warn("Operação perigosa: limpando todos os HotWheels do banco de dados.");

    const result = await Hot.deleteMany({});
    const count = result.deletedCount || 0;

    return res.status(200).json({
      success: true,
      message: `${count} HotWheels(s) deletado(s) com sucesso!`
    });
  } catch (err) {
    console.error("Erro ao deletar todos os HotWheels:", err);
    return handleError(res, err, 500, "Erro ao deletar todos os HotWheels");
  }
};
