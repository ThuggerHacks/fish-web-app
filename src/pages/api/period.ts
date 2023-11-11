// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from '../../../connection/connection'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
    if(req.method == "POST"){
        try {
            const period = await prisma.period.create({
                data:req.body
            });

            res.status(200).json(period);
        } catch (error) {
            res.status(401).json(error)
        }
    }else if(req.method == "GET" && req.query.id){
        const id:any = req.query.id;
        try {
            const period = await prisma.period.findFirst({
                where:{
                    id:parseInt(id)
                }
            });
            res.status(200).json(period);
        } catch (error) {
            res.status(401).json(error)
        }
    }else if(req.method == "GET"){
        try {
            const period = await prisma.period.findMany({
                orderBy:{
                    id:"desc"
                }
            });
            res.status(200).json(period);
        } catch (error) {
            res.status(401).json(error)
        }
    }else if(req.method == "PUT"){
        const id:any = req.query.id;
        try {
            const period = await prisma.period.update({
                where:{
                    id:parseInt(id)
                },
                data:req.body
            });
            res.status(200).json(period);
        } catch (error) {
            res.status(401).json(error)
        }
    }else if(req.method == "DELETE"){
        const id:any = req.query.id;
        try {
            const period = await prisma.period.delete({
                where:{
                    id:parseInt(id)
                }
            });
            res.status(200).json(period);
        } catch (error) {
            res.status(401).json(error)
        }
    }
}
