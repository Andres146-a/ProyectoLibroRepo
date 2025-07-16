import {Request, Response, RequestHandler} from 'express';
import { facturaService } from '../services/factura.service';
export const facturaController = {
    async getAll(req: Request, res: Response) {
        const facturas = await facturaService.getFacturas();
        res.json(facturas);
    },
    async create(req: Request, res: Response) {
        const nueva = await facturaService.createFactura(req.body);
        res.status(201).json(nueva);
    }, 
    async getById(req: Request, res: Response) {
        const id = Number(req.params['id']);
        const factura = await facturaService.getFacturaById(id);
        if (factura) {
            res.json(factura);
        } else {
            res.status(404).json({ error: 'Factura not found' });
        }
    },
    async update(req: Request, res: Response) {
    const id = Number(req.params['id']);
    const updated = await facturaService.updateFactura(id, req.body);
    res.json(updated);
}

    ,
    async remove(req: Request, res: Response) {
        const id = Number(req.params['id']);
        await facturaService.deleteFactura(id);
        res.sendStatus(204);
    }

}