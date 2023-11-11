// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from '../../../connection/connection'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
 
    if(req.method == "POST" && req.body.login) {
        try {
            const user = await prisma.user.findFirst({
                where:{
                    password:req.body.password,
                    email:req.body.email
                }
            });

            res.status(200).json(user);
        } catch (error) {
            res.status(401).json(error)
        }
    }else if(req.method == "POST"){
        try {
            const user = await prisma.user.create({
                data:req.body
            });

            res.status(200).json(user);
        } catch (error) {
            res.status(401).json(error)
        }
    }else if(req.method == "GET" && req.query.id){
        const id:any = req.query.id;
        try {
            const user = await prisma.user.findFirst({
                where:{
                    id:parseInt(id)
                }
            });
            res.status(200).json(user);
        } catch (error) {
            res.status(401).json(error)
        }
    }else if(req.method == "GET"){
        try {
            const user = await prisma.user.findMany();
            res.status(200).json(user);
        } catch (error) {
            res.status(401).json(error)
        }
    }else if(req.method == "PUT"){
        const id:any = req.query.id;
        try {
            const user = await prisma.user.update({
                where:{
                    id:parseInt(id)
                },
                data:req.body
            });
            res.status(200).json(user);
        } catch (error) {
            res.status(401).json(error)
        }
    }else if(req.method == "DELETE"){
        const id:any = req.query.id;
        try {
            const user = await prisma.user.delete({
                where:{
                    id:parseInt(id)
                }
            });
            res.status(200).json(user);
        } catch (error) {
            res.status(401).json(error)
        }
    }
}
