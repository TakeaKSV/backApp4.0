import { Request, Response } from "express";
import { generateAccessToken } from "../utils/generateToken";
import cache from "../utils/cache";
import dayjs from "dayjs";
import { User } from "../models/user";
import bcrypt from "bcryptjs";

export const login = async (req: Request, res: Response): Promise<Response | undefined> => {
    const { username, password } = req.body;

    const user = await User.findOne({ email: username });

    if (!user) {
        return res.status(401).json({ message: 'Credenciales inválidas' });
    }

    // Permitir login con contraseña encriptada o texto plano
    let isMatch = false;
    if (user.password.startsWith('$2a$') || user.password.startsWith('$2b$') || user.password.startsWith('$2y$')) {
        // Contraseña encriptada (bcrypt)
        isMatch = await bcrypt.compare(password, user.password);
    } else {
        // Contraseña en texto plano
        isMatch = password === user.password;
    }

    if (!isMatch) {
        return res.status(401).json({ message: 'Credenciales inválidas' });
    }

    const accessToken = generateAccessToken(user.id);
    cache.set(user.id, accessToken, 60 * 30);
    return res.status(200).json({
        message: 'Inicio de sesión exitoso',
        accessToken
    });
};

export const getTimeToken = (req: Request, res: Response): Response | undefined => {
    const { userId } = req.query;

    if (!userId || typeof userId !== 'string') {
        return res.status(400).json({ message: 'Falta o formato incorrecto de userId en query' });
    }

    const ttl = cache.getTtl(userId);

    if (!ttl) {
        return res.status(404).json({ message: 'Token no existente :o' });
    }

    const now = Date.now();
    const timeleft = Math.floor((ttl - now) / 1000);

    const expTime = dayjs(ttl).format('HH:mm:ss');

    return res.status(200).json({
        message: 'Token existente',
        timeleft,
        expTime
    });
};

export const updateToken = (req: Request, res: Response): Response | undefined => {
    const {userId} = req.params;

    const ttl = cache.getTtl(userId);
    if (!ttl) {
        return res.status(404).json({message: 'Token no existente :o'});
    }

    const newTimeTtl: number = 60 * 15;
    cache.ttl(userId, newTimeTtl);

    return res.status(200).json({message: 'Token actualizado'});
};

export const getAllUsers = async (req: Request, res: Response): Promise<Response | undefined> => {
    const {username} = req.query;
    const userList = await User.find();
    const getUserByName = await User.find({ name: username });

    console.log(getUserByName);
    return res.json({ userList });
};

export const saveUser = async (req: Request, res: Response): Promise<Response | undefined> => {
    try {
        const { name, email, password, rol, phone } = req.body;

        const hashedPassword = await bcrypt.hash(password, 10);     

        const newUser = new User({
            name,
            email,
            password: hashedPassword,
            rol,
            phone,
            createDate: Date.now(),
            status: true,
        });

        const user = await newUser.save();

        return res.status(201).json({ message: 'Usuario guardado exitosamente', user });
    } catch (error) {
        console.error('Error al guardar el usuario:', error);
        return res.status(426).json({ message: 'Error al guardar el usuario' });
    }
};

export const updateUser = async (req: Request, res: Response): Promise<Response | undefined> => {
    try {
        const { id } = req.params;
        const { name, password, rol, phone } = req.body;

        const hashedPassword = await bcrypt.hash(password, 10);

        const updatedUser = await User.findByIdAndUpdate(
            id,
            {
                name,
                password: hashedPassword,
                rol,
                phone,
            },
            { new: true }
        );

        if (!updatedUser) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }

        return res.status(200).json({ message: 'Usuario actualizado', user: updatedUser });
    } catch (error) {
        console.error('Error al actualizar el usuario:', error);
        return res.status(500).json({ message: 'Error al actualizar el usuario' });
    }
};

export const deleteUser = async (req: Request, res: Response): Promise<Response | undefined> => {
    try {
        const { id } = req.params;

        const deletedUser = await User.findByIdAndUpdate(
            id,
            {
                status: false,
                deleteDate: new Date()
            },
            { new: true }
        );

        if (!deletedUser) {
            return res.status(404).json({ error: 'Usuario no encontrado' });
        }

        return res.json({ message: 'Usuario desactivado', deletedUser });

    } catch (error) {
        console.log("Error en deleteUser: ", error);
        return res.status(500).json({ error: 'Error al eliminar usuario' });
    }
};