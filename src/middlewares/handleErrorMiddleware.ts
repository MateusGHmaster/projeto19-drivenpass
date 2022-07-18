import { Request, Response, NextFunction } from 'express';

export default function handleErrorMiddleware (error, req: Request, res: Response, next: NextFunction) {

    if (error.type === 'bad_request') {
        return res.status(400).send(error.message);
    }

    if (error.type === 'unauthorized') {
        return res.status(401).send(error.message);
    }

    if (error.type === 'not_found') {
        return res.status(404).send(error.message);
    }

    if (error.type === 'conflict') {
        return res.status(405).send(error.message);
    }

    return res.status(500).send(error);

}