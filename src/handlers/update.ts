import prisma from "../db";

export const getUpdate = async (req, res) => {
  const update = await prisma.update.findUnique({
    where: {
      id: req.user.id,
    },
  });
  res.json({ data: update });
};

export const getUpdates = async (req, res) => {
  const products = await prisma.product.findMany({
    where: {
      belongsToId: req.user.id,
    },
    include: {
      updates: true,
    },
  });
  const updates = products.reduce((allUpdates, product) => {
    return [...allUpdates, ...product.updates];
  }, []);

  res.json({ data: updates });
};

export const createUpdate = async (req, res) => {
  const product = prisma.product.findUnique({
    where: {
      id: req.body.id,
    },
  });

  if (!product) {
    res.json({ message: "does not belong to the user" });
  }

  const update = await prisma.update.create({
    data: req.body,
  });

  res.json({ data: update });
};

export const updateUpdate = async (req, res) => {
  const product = await prisma.product.findMany({
    where: {
      belongsToId: req.user.id,
    },
    include: {
      updates: true,
    },
  });
  const match = product.find((update) => update.id === req.params.id);
  if (!match) {
    res.json({
      message: "product not found",
    });
  }
};

export const deleteUpdate = async (req, res) => {
  const product = await prisma.product.findMany({
    where: {
      belongsToId: req.user.id,
    },
    include: {
      updates: true,
    },
  });
  const match = product.find((update) => update.id === req.params.id);
  if (!match) {
    res.json({
      message: "product not found",
    });
  }

  const deleted = await prisma.update.delete({
    where: {
      id: req.params.id,
    },
  });
  res.json({ data: deleted });
};
