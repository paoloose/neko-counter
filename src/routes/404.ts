import { Request, Response } from "express";


export default function notFoundRoute(_req: Request, res: Response) {
  res.status(404).json({
    status: 404,
    error: 'Oh my, oh my! It seems you\'ve encountered a wittle 404 not found. But no need to be down, my precious fwiend! Pwease take a moment to wead the cutie docsies, hewe: https://github.com/paoloose/neko-counter'
  });
}
