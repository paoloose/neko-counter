import { NextFunction, Request, Response } from 'express';

export function cors(_req: Request, res: Response, next: NextFunction) {
  // Print request information
  console.log({
    method: _req.method,
    url: _req.url,
    headers: _req.headers,
    ip: _req.ip
  });

  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST');
  next();
}
