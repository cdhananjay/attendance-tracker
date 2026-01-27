import type { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';

function requireAuth(req: Request, res: Response, next: NextFunction) {
    if (!req.cookies.token)
        return res.send({ ok: false, message: 'user must be logged in' });
    try {
        const decoded = jwt.verify(req.cookies.token, process.env.JWT_SECRET!);
        if (typeof decoded === 'string' || typeof decoded.data !== 'string') {
            return res.send({ ok: false, message: 'invalid token' });
        }
        req.userId = decoded.data;
        next();
    } catch (e) {
        res.send({ ok: false, message: 'failed to verify auth' });
    }
}
export default requireAuth;
