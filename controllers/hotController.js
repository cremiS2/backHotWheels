const Car = require('../models/Hot');

const handleError = (res, err, status = 500, message = "Erro no processo") => {
  console.error("Detalhes do erro:", err);
  return res.status(status).json({
    success: false,
    message,
    error: err.message || 'Erro desconhecido'
  });
};

const findCarById = async (id) => {
  if (!id || id.length !== 24) {
    throw new Error('ID inválido');
  }

  const car = await Car.findById(id);
  if (!car) {
    throw new Error('Carro não encontrado');
  }

  return car;
};

exports.createCar = async (req, res) => {
  try {
    const car = new Car(req.body);
    await car.save();
    return res.status(201).json({
      success: true,
      message: 'HotWheels criado com sucesso!',
      data: car
    });
  } catch (err) {
    return handleError(res, err);
  }
};

exports.createMultipleCars = async (req, res) => {
  try {
    const cars = req.body;

    if (!Array.isArray(cars) || cars.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Deve enviar um array de HotWheels para criação"
      });
    }

    const createdCars = await Car.insertMany(cars);

    return res.status(201).json({
      success: true,
      message: `${createdCars.length} HotWheels criados com sucesso!`,
      data: createdCars
    });
  } catch (err) {
    return handleError(res, err);
  }
};

exports.getCars = async (req, res) => {
  try {
    const cars = await Car.find();

    return res.status(200).json({
      success: true,
      message: cars.length
        ? 'HotWheels encontrados com sucesso!'
        : 'Nenhum carro encontrado',
      data: cars
    });
  } catch (err) {
    return handleError(res, err, 500, "Erro ao listar HotWheels");
  }
};

exports.getCarById = async (req, res) => {
  try {
    const car = await findCarById(req.params.id);
    return res.status(200).json({
      success: true,
      message: 'HotWheels encontrado com sucesso!',
      data: car
    });
  } catch (err) {
    return handleError(res, err, 404, "Erro ao buscar carro por ID");
  }
};

exports.updateCar = async (req, res) => {
  try {
    const car = await findCarById(req.params.id);
    Object.assign(car, req.body);
    await car.save();

    return res.status(200).json({
      success: true,
      message: 'HotWheels atualizado com sucesso!',
      data: car
    });
  } catch (err) {
    return handleError(res, err);
  }
};

exports.deleteCar = async (req, res) => {
  try {
    const car = await findCarById(req.params.id);
    await car.deleteOne();

    return res.status(200).json({
      success: true,
      message: 'HotWheels deletado com sucesso!'
    });
  } catch (err) {
    return handleError(res, err, 500, "Erro ao deletar carro");
  }
};

exports.deleteAllCars = async (req, res) => {
  try {
    console.warn("Operação perigosa: limpando todos os HotWheels do banco de dados.");

    const result = await Car.deleteMany({});
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
