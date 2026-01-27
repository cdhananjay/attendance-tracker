import type { NextFunction, Request, Response } from 'express';
import db from '../index.js';
import { subjectsTable } from '../db/schema.js';
import { and, eq } from 'drizzle-orm';

async function requireSubjectName(
    req: Request,
    res: Response,
    next: NextFunction
) {
    if (!req.body.subjectName)
        return res.send({ ok: false, message: 'subject name is required' });
    if (!req.userId)
        return res.send({ ok: false, message: 'user must be logged in' });
    try {
        const [subject] = await db
            .select()
            .from(subjectsTable)
            .where(
                and(
                    eq(subjectsTable.name, req.body.subjectName),
                    eq(subjectsTable.userId, req.userId)
                )
            )
            .limit(1);
        if (!subject)
            return res.send({
                ok: false,
                message: 'user does not have the requested subject',
            });
        req.subjectId = subject.id;
        next();
    } catch (e) {
        return res.send({ ok: false, message: `${e}` });
    }
}
export default requireSubjectName;
