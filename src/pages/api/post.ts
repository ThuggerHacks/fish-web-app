// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from '../../../connection/connection'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
    if(req.method == "POST"){
        try {
            const post = await prisma.post.create({
                data:req.body
            });

            res.status(200).json(post);
        } catch (error) {
            res.status(401).json(error)
        }
    }else if(req.method == "GET" && req.query.id){
        const id:any = req.query.id;
        try {
            const post = await prisma.post.findFirst({
                where:{
                    id:parseInt(id)
                }
            });
            res.status(200).json(post);
        } catch (error) {
            res.status(401).json(error)
        }
    }else if(req.method == "GET"){
        try {
            const post = await prisma.post.findMany({
                orderBy:{
                    id:"desc"
                }
            });
            res.status(200).json(post);
        } catch (error) {
            res.status(401).json(error)
        }
    }else if(req.method == "PUT"){
        const id:any = req.query.id;
        try {
            const post = await prisma.post.update({
                where:{
                    id:parseInt(id)
                },
                data:req.body
            });
            res.status(200).json(post);
        } catch (error) {
            res.status(401).json(error)
        }
    }else if(req.method == "DELETE"){
        const id:any = req.query.id;
        try {
            const post = await prisma.post.delete({
                where:{
                    id:parseInt(id)
                }
            });
            res.status(200).json(post);
        } catch (error) {
            res.status(401).json(error)
        }
    }
}
