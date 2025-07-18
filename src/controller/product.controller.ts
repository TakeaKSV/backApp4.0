import { Request, Response } from 'express';
import { Product } from '../models/producto';
import { Types } from 'mongoose';

// Crear un nuevo producto
export const createProduct = async (req: Request, res: Response) => {
  try {
    const product = new Product(req.body);
    const savedProduct = await product.save();
    res.status(201).json(savedProduct);
  } catch (error) {
    res.status(400).json({ error: 'Error al crear el producto', details: error });
  }
};

// Obtener todos los productos
export const getAllProducts = async (_req: Request, res: Response) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener productos', details: error });
  }
};

// Obtener un producto por ID
export const getProductById = async (req: Request, res: Response) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ error: 'Producto no encontrado' });
    res.json(product);
  } catch (error) {
    res.status(400).json({ error: 'ID inválido', details: error });
  }
};

// Actualizar un producto
export const updateProduct = async (req: Request, res: Response) => {
  try {
    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedProduct) return res.status(404).json({ error: 'Producto no encontrado' });
    res.json(updatedProduct);
  } catch (error) {
    res.status(400).json({ error: 'Error al actualizar producto', details: error });
  }
};


// Eliminar un producto (eliminación lógica)
export const deleteProduct = async (req: Request, res: Response) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ error: 'Producto no encontrado' });

    product.status = false;
    await product.save();

    res.json({ message: 'Producto marcado como inactivo' });
  } catch (error) {
    res.status(400).json({ error: 'Error al eliminar producto', details: error });
  }
};

