import { Request, Response } from 'express';
import { Order } from '../models/ordenes';

// Crear una nueva orden
export const createOrder = async (req: Request, res: Response) => {
  try {
    const order = new Order(req.body);
    const savedOrder = await order.save();
    res.status(201).json(savedOrder);
  } catch (error) {
    res.status(400).json({ error: 'Error al crear la orden', details: error });
  }
};

// Obtener todas las órdenes activas
export const getAllOrders = async (_req: Request, res: Response) => {
  try {
    const orders = await Order.find({ status: true }).populate('user');
    res.json(orders);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener órdenes', details: error });
  }
};

// Obtener una orden por ID
export const getOrderById = async (req: Request, res: Response) => {
  try {
    const order = await Order.findById(req.params.id).populate('user');
    if (!order || !order.status) {
      return res.status(404).json({ error: 'Orden no encontrada o inactiva' });
    }
    res.json(order);
  } catch (error) {
    res.status(400).json({ error: 'ID inválido', details: error });
  }
};

// Actualizar una orden
export const updateOrder = async (req: Request, res: Response) => {
  try {
    const updatedOrder = await Order.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedOrder) {
      return res.status(404).json({ error: 'Orden no encontrada' });
    }
    res.json(updatedOrder);
  } catch (error) {
    res.status(400).json({ error: 'Error al actualizar la orden', details: error });
  }
};

// Eliminar una orden (lógicamente)
export const deleteOrder = async (req: Request, res: Response) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) {
      return res.status(404).json({ error: 'Orden no encontrada' });
    }

    order.status = false;
    await order.save();
    res.json({ message: 'Orden eliminada (lógicamente)' });
  } catch (error) {
    res.status(400).json({ error: 'Error al eliminar orden', details: error });
  }
};
