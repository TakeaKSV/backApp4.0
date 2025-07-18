import { Request, Response } from "express";
import cache from "../utils/cache";
import { Menu } from "../models/menu";
import { User } from "../models/user";

/**
 * Obtiene los menús accesibles para el usuario según su rol.
 * Requiere que el token esté en caché.
 */
export const getAccessibleMenus = async (req: Request, res: Response): Promise<Response | undefined> => {
    const { userId } = req.query;

    // Validar que userId esté presente
    if (!userId || typeof userId !== 'string') {
        return res.status(400).json({ message: 'Falta userId en query' });
    }

    // Verificar si el token está en caché
    const token = cache.get(userId);
    if (!token) {
        return res.status(403).json({ message: 'Token no válido o expirado' });
    }

    // Buscar al usuario para obtener su rol
    const user = await User.findById(userId);
    if (!user) {
        return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    const userRole = user.rol;

    // Buscar menús que incluyan el rol del usuario
    const accessibleMenus = await Menu.find({ roles: userRole });

    return res.status(200).json({
        message: 'Menús accesibles obtenidos correctamente',
        count: accessibleMenus.length,
        menus: accessibleMenus
    });
};
