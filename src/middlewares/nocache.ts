import { NextFunction, Request, Response } from 'express';

export function nocache(_req: Request, res: Response, next: NextFunction) {
  res.setHeader('Cache-Control', 'max-age=0, no-cache, no-store, must-revalidate');
  next();
}
