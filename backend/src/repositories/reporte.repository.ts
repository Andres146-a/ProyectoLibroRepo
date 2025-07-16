import { prisma } from "../prisma/client";
export const reporteRepository = {
  async getLibrosMasVendidosPorCategoria() {
    const resultados = await prisma.$queryRawUnsafe(`
      SELECT 
        c.id_Categoria AS codCategoria,
        c.Nombre AS nombreCategoria,
        l.ISBN,
        l.Titulo,
        GROUP_CONCAT(DISTINCT a.Nombre SEPARATOR ', ') AS autores,
        e.Nombre AS editorial,
        l.preciov AS precio,
        l.BestSellers AS bestSeller,
        COUNT(df.id_Detalle) AS totalVentas
      FROM Libro l
      JOIN Categoria c ON c.id_Categoria = l.id_Categoria
      LEFT JOIN Libro_Autor la ON la.id_Libro = l.id_Libro
      LEFT JOIN Autor a ON a.id_Autor = la.id_Autor
      LEFT JOIN Editorial e ON e.id_Editorial = l.id_Editorial
      LEFT JOIN DetalleFactura df ON df.id_Libro = l.id_Libro
      GROUP BY c.id_Categoria, l.id_Libro
      ORDER BY c.Nombre ASC, totalVentas DESC;
    `);

    return resultados;
  },
 ventasMensuales: async () => {
  const ventas = await prisma.$queryRawUnsafe<any[]>(`
    SELECT 
      YEAR(fecha_compra) AS anio,
      MONTH(fecha_compra) AS mes,
      COUNT(*) AS total_facturas,
      SUM(total) AS total_ventas
    FROM \`Factura\`
    GROUP BY anio, mes
    ORDER BY anio DESC, mes DESC;
  `);

  // Convertimos manualmente BigInt a Number o String
  const ventasParseadas = ventas.map(v => ({
    anio: Number(v.anio),
    mes: Number(v.mes),
    total_facturas: Number(v.total_facturas),
    total_ventas: Number(v.total_ventas), // o usa .toString() si los números son muy grandes
  }));

  return ventasParseadas;
},


  async librosBajaRotacion() {
    return await prisma.libro.findMany({
      where: {
        detalles: {
          some: {} // para asegurarse de que solo considere libros con facturas
        }
      },
      include: {
        detalles: true,
        editorial: true,
        categoria: true
      }
    }).then(libros => {
      // Contar ventas totales por libro
      return libros.filter(libro => {
        const totalVentas = libro.detalles.reduce((sum, d) => sum + d.cantidad, 0);
        return totalVentas < 5; // 👉 baja rotación
      });
    });
  },
async librosBestSellers() {
  return await prisma.$queryRawUnsafe<any[]>(`
    SELECT * FROM (
      SELECT 
        l.id_Libro,
        l.ISBN,
        l.Titulo,
        l.preciov,
        e.Nombre AS nombreEditorial,
        c.Nombre AS nombreCategoria,
        COALESCE(SUM(df.cantidad), 0) AS ventas,
        GROUP_CONCAT(CONCAT(a.Nombre, ' ') SEPARATOR ', ') AS Autor
      FROM Libro l
      LEFT JOIN DetalleFactura df ON l.id_Libro = df.id_Libro
      LEFT JOIN Factura f ON f.id_Compra = df.id_Compra
      LEFT JOIN Editorial e ON e.id_Editorial = l.id_Editorial
      LEFT JOIN Categoria c ON c.id_Categoria = l.id_Categoria
      LEFT JOIN Libro_Autor la ON la.id_Libro = l.id_Libro
      LEFT JOIN Autor a ON a.id_Autor = la.id_Autor
      GROUP BY l.id_Libro
    ) AS sub
    WHERE ventas >= 1
    ORDER BY ventas DESC;
  `);
}

,
async ventasMensualesFiltradas(sucursal: string, rangoDias: number) {
  return await prisma.$queryRaw<any[]>`
    SELECT 
      YEAR(fecha_compra) AS anio,
      MONTH(fecha_compra) AS mes,
      COUNT(*) AS total_facturas,
      SUM(total) AS total_ventas
    FROM Factura
    GROUP BY anio, mes
    ORDER BY anio DESC, mes DESC;
  `;
},
ventasSemanales: async () => {
  const resultados = await prisma.$queryRawUnsafe<any[]>(`
    SELECT 
      YEAR(fecha_compra) AS anio,
      WEEK(fecha_compra, 1) AS semana,
      COUNT(*) AS total_facturas,
      SUM(total) AS total_ventas
    FROM Factura
    GROUP BY anio, semana
    ORDER BY anio, semana;
  `);

  return resultados.map((r) => ({
    anio: Number(r.anio),
    semana: Number(r.semana),
    total_facturas: Number(r.total_facturas),
    total_ventas: Number(r.total_ventas),
  }));
}

};