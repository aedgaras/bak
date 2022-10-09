import { NextFunction, Request, Response } from "express"
import { sign, SignOptions, verify, VerifyOptions } from "jsonwebtoken"
import { TOKEN_SECRET } from "../configuration/Configuration";

export function generateAccessToken(username: string) {
    return sign(username, TOKEN_SECRET, { expiresIn: '1800s' });
  }

export function authenticateToken(req: Request, res: Response, next: NextFunction) {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
  
    if (token == null) return res.sendStatus(401)
  
    verify(token, process.env.TOKEN_SECRET as string, (err: any, user: any) => {
      console.log(err)
  
      if (err) return res.sendStatus(403)
  
      req.body.user = user
  
      next()
    })
  }