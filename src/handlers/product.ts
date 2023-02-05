import prisma from "../db";

export const getProducts = async (req, res) => {
  const product = await prisma.product.findUnique({
    where: {
      id: req.user.id,
    },
    include: {
      updates: true,
    },
  });
  res.json({ data: product });
};

export const getOneProduct = async (req, res) => {
  const product = prisma.product.findFirst({
    where: {
      id: req.params.id,
      belongsTo: req.user.id,
    },
  });
  res.json({ data: product });
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

export const updateProductName = async (req, res) => {
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
};

export const deleteProduct = async (req, res) => {
  const updated = await prisma.product.delete({
    where: {
      id_belongsToId: {
        id: req.body.id,
        belongsToId: req.user.id,
      },
    },
  });
  res.json({ data: updated });
};
