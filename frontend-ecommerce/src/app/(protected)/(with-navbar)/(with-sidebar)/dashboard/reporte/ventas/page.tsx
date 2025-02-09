"use client";

import PdfIcon from "@/app/icons/PdfIcon.svg?url";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Image from "next/image";
import { useState, useEffect } from "react";
import { listPhysicalLocations } from "@/api/physicalLocation.api";
import { PHYSICAL_LOCATION } from "@/types/physicalLocation.types";
import * as apiReport from "@/api/report.api";

function Page() {
  const [dateStart, setDateStart] = useState<Date>(new Date());
  const [dateEnd, setDateEnd] = useState<Date>(new Date());
  const [saleType, setSaleType] = useState<string | null>(null);
  const [physicalPoint, setPhysicalPoint] = useState<number | null>(null);
  const [order, setOrder] = useState<string>("quantitysold DESC");
  const [reportData, setReportData] = useState<any[]>([]);
  const [physicalPoints, setPhysicalPoints] = useState<PHYSICAL_LOCATION[]>([]);

  useEffect(() => {
    listPhysicalLocations()
      .then(setPhysicalPoints)
      .catch((error) => console.error("Error al cargar puntos físicos:", error));
  }, []);


  useEffect(() => {
    apiReport
      .listReportSales({ orderBy: ["quantitysold", "DESC"] })
      .then(setReportData)
      .catch((error) => console.error("Error al obtener reporte de ventas:", error));
  }, []);

  const filterHandle = () => {
    apiReport
      .listReportSales({
        orderBy: (() => {
          const [name, type] = order.split(" ");
          return [name, type] as [string, string];
        })(),
        dateStart: dateStart.toISOString().split("T")[0],
        dateEnd: dateEnd.toISOString().split("T")[0], 
        typeSale: saleType,
        physicalLocation: physicalPoint
      })
      .then(setReportData)
      .catch((error) => console.error("Error al filtrar ventas:", error));
  };

  return (
    <div className="container-report">
      <main className="flex-column">
        {/* Sección Filtros */}
        <h1>Reporte de ventas</h1>
        <section className="flex-column border border-gray p-2 rounded-xl">
          <h2>Filtros de búsqueda</h2>
          <div className="flex-simple">
            <DatePicker
              selected={dateStart}
              onChange={(date: Date) => setDateStart(date)}
              dateFormat="dd/MM/yyyy"
              showYearDropdown
              showMonthDropdown
              scrollableYearDropdown
              title="Fecha de inicio"
              customInput={<input className="input-standard" placeholder="Fecha inicio" />}
            />
            <DatePicker
              selected={dateEnd}
              onChange={(date: Date) => setDateEnd(date)}
              dateFormat="dd/MM/yyyy"
              showYearDropdown
              showMonthDropdown
              scrollableYearDropdown
              title="Fecha de fin"
              customInput={<input className="input-standard" placeholder="Fecha fin" />}
            />
            <select
              name="sale-type-select"
              className="w-[90px]"
              onChange={(e) => {
                const value = e.target.value;
                setSaleType(value === "true" ? "true" : value === "false" ? "false" : null);
              }}
            >
              <option value="null">Todo</option>
              <option value="false">Online</option>
              <option value="true">Físico</option>
            </select>
            <select
              name="physical-point-select"
              className="w-[670px]"
              onChange={(e) => setPhysicalPoint(e.target.value ? Number(e.target.value) : null)}
            >
              <option value="">Todos los puntos</option>
              {physicalPoints.map((point) => (
                <option key={point._id} value={point._id}>
                  {point.address}
                </option>
              ))}
            </select>
            <select
              name="order-select"
              className="w-[150px]"
              onChange={(e) => setOrder(e.target.value)}
            >
              <option value="quantitysold DESC">Más vendido</option>
              <option value="quantitysold ASC">Menos vendido</option>
              <option value="totalsales DESC">Mayor ganancia</option>
              <option value="totalsales ASC">Menor ganancia</option>
            </select>
          </div>
          <button id="button-standard" onClick={filterHandle}>
            Filtrar
          </button>
        </section>

        {/* Sección Tabla */}
        <section className="flex-column">
          <div className="flex-space-between">
            <h2>Tabla de reporte</h2>
            <span className="flex flex-row gap-[5px]">
              Exportar:
              <Image src={PdfIcon} alt="pdf-export" width={30} height={30} />
            </span>
          </div>
          <div>
            <table>
              <thead>
                <tr>
                  <th>Nombre producto</th>
                  <th>Categoría</th>
                  <th>Cantidad vendida</th>
                  <th>Total ventas</th>
                  <th>Tipo de venta</th>
                  <th>Punto físico</th>
                </tr>
              </thead>
              <tbody>
                {reportData.length > 0 ? (
                  reportData.map((data, index) => (
                    <tr key={index}>
                      <td>{data.product}</td>
                      <td>{data.category}</td>
                      <td>{data.quantitySold}</td>
                      <td>{data.totalSales}</td>
                      <td>{data.typeSale}</td>
                      <td>{data.physicalLocation}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={6}>No hay datos</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </section>
      </main>
    </div>
  );
}

export default Page;
