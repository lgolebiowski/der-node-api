import prisma from "../db";

export const getProducts = async (req, res, next) => {
  try {
    const user = await prisma.user.findUnique({
      where: {
        id: req.user.id,
      },
      include: {
        products: true,
      },
    });
    res.json({ data: user.products });
  } catch (error) {
    console.error(error);
    error.type = "product";
    next();
  }
};

export const getOneProduct = async (req, res, next) => {
  // must belong to the user
  try {
    const product = await prisma.product.findUnique({
      where: {
        id_belongsToId: {
          id: req.params.id,
          belongsToId: req.user.id,
        },
      },
    });
    res.json({ data: product });
  } catch (error) {
    console.error(error);
    error.type = "product";
    next();
  }
};

export const createProduct = async (req, res) => {
  const product = await prisma.product.create({
    data: {
      name: req.body.name,
      belongsToId: req.user.id,
    },
  });
  res.json({ data: product });
};

export const updateProductName = async (req, res, next) => {
  try {
    const updated = await prisma.product.update({
      where: {
        id_belongsToId: {
          id: req.body.id,
          belongsToId: req.user.id,
        },
      },
      data: {
        name: req.body.name,
      },
    });
    res.json({ data: updated });
  } catch (error) {
    console.error(error);
    error.type = "product";
    next();
  }
};

export const deleteProduct = async (req, res, next) => {
  try {
    const updated = await prisma.product.delete({
      where: {
        id_belongsToId: {
          id: req.body.id,
          belongsToId: req.user.id,
        },
      },
    });
    res.json({ data: updated });
  } catch (error) {
    console.error(error);
    error.type = "product";
    next();
  }
};
