"use client";
import PdfIcon from "@/app/icons/PdfIcon.svg?url";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Image from "next/image";
import { use, useEffect, useState } from "react";
import { listPhysicalLocations } from "@/api/physicalLocation.api";
import { PHYSICAL_LOCATION } from "@/types/physicalLocation.types";
import * as apiReport from "@/api/report.api";
import * as apiCategory from "@/api/category.api";
import * as apiProduct from "@/api/product.api";

function page() {
  const [dateStart, setDateStart] = useState<Date>(new Date());
  const [dateEnd, setDateEnd] = useState<Date>(new Date());
  const [saleType, setSaleType] = useState<string | null>(null);
  const [physicalPoint, setPhysicalPoint] = useState<number | null>(null);
  const [category, setCategory] = useState<number | null>(null);
  const [categories, setCategories] = useState<any[]>([]);
  const [reportData, setReportData] = useState<any[]>([]);
  const [physicalPoints, setPhysicalPoints] = useState<PHYSICAL_LOCATION[]>([]);
  const [formattedItems, setFormattedItems] = useState({});

  useEffect(() => {
    listPhysicalLocations()
      .then(setPhysicalPoints)
      .catch((error) => console.error("Error al cargar puntos físicos:", error));
  }, []);

  useEffect(() => {
    apiCategory.listCategories().then((categories) => {
      setCategories(categories);
    });
  }, []);

  useEffect(() => {
    async function fetchReport() {
      try {
        const data = await apiReport.listReportAssociation({});
        const formattedData = data.map((item) => ({
          ...item,
          items: Array.isArray(item.items) ? item.items.map(Number) : [],
          support: Number(item.support),
        }));

        const finalData = await formatReportData(formattedData);
        setReportData(finalData);
      } catch (error) {
        console.error("Error al obtener productos:", error);
      }
    }
    fetchReport();
  }, []);

  const filterHandle = async () => {
    try {
      const data = await apiReport.listReportAssociation({
        dateStart: dateStart.toISOString().split("T")[0],
        dateEnd: dateEnd.toISOString().split("T")[0],
        typeSale: saleType,
        physicalLocation: physicalPoint,
        category: category
      });

      const formattedData = data.map((item) => ({
        ...item,
        items: Array.isArray(item.items) ? item.items.map(Number) : [],
        support: Number(item.support),
      }));

      const finalData = await formatReportData(formattedData);
      setReportData(finalData);
    } catch (error) {
      console.error("Error al filtrar productos:", error);
    }
  };

  async function formatReportData(reportData: { items: number[]; support: number }[]) {
    try {
      const uniqueItemIds = [...new Set(reportData.flatMap((data) => data.items))];

      const productPromises = uniqueItemIds.map(async (itemId) => {
        try {
          const product = await apiProduct.getProductById(itemId);
          return { id: itemId, name: product.name };
        } catch (error) {
          console.error(`Error al obtener producto con ID ${itemId}:`, error);
          return { id: itemId, name: "Producto no encontrado" };
        }
      });

      const productList = await Promise.all(productPromises);
      const productMap = Object.fromEntries(productList.map((p) => [p.id, p.name]));

      return reportData.map((data) => ({
        ...data,
        items: data.items.map((itemId) => productMap[itemId] || "Producto no encontrado").join(", "),
      }));
    } catch (error) {
      console.error("Error general en formatReportData:", error);
      return reportData;
    }
  }

  return (
    <div className="container-report">
      <main className="flex-column">
        {/* Seccion Filtros */}
        <h1>Reporte de asociación</h1>
        <section className="flex-column border border-gray p-2 rounded-xl">
          <h2>Filtros de búsqueda</h2>
          <div className="flex-simple">
            <DatePicker
              selected={dateStart}
              onChange={(date: Date) => setDateStart(date)}
              dateFormat={"dd/MM/yyyy"}
              showYearDropdown={true}
              showMonthDropdown={true}
              scrollableYearDropdown={true}
              title="Fecha de inicio"
              dateFormatCalendar=" "
              customInput={
                <input
                  className="input-standard"
                  placeholder="Select Month and Year"
                />
              }
            />
            <DatePicker
              selected={dateEnd}
              onChange={(date: Date) => setDateEnd(date)}
              dateFormat={"dd/MM/yyyy"}
              showYearDropdown={true}
              showMonthDropdown={true}
              scrollableYearDropdown={true}
              title="Fecha de inicio"
              dateFormatCalendar=" "
              customInput={
                <input
                  className="input-standard"
                  placeholder="Select Month and Year"
                />
              }
            />
            <select
              name="sale-type-select"
              id=""
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
              id=""
              className="w-[550px]"
              onChange={(e) => setPhysicalPoint(e.target.value ? Number(e.target.value) : null
              )}
            >
              <option value="">Todos los puntos</option>
              {physicalPoints.map((point) => (
                <option key={point._id} value={point._id}>
                  {point.address}
                </option>
              ))}
            </select>
            <select
              name="category-select"
              id=""
              className="w-[200px]"
              onChange={(e) => setCategory(e.target.value ? Number(e.target.value) : null
              )}
            >
              <option value="">Todas las categorías</option>
              {categories.map((categ) => (
                <option key={categ.id} value={categ.id}>
                  {categ.name}
                </option>
              ))}
            </select>
          </div>
          <button id="button-standard" onClick={filterHandle}>
            Filtrar
          </button>
        </section>
        {/* Seccion tabla */}
        <section className="flex-column">
          <div className="flex-space-between">
            <h2>Tabla de reporte</h2>
            <span className="flex flex-row gap-[5px]">
              Exportar:
              <Image src={PdfIcon} alt="pdf-export" width={30} height={30} />
            </span>
          </div>
          <div><table>
            <thead>
              <tr>
                <th>Soporte</th>
                <th>Conjuntos de asociación</th>
              </tr>
            </thead>
            <tbody>
              {reportData.length > 0 ? (
                reportData.map((data, index) => (
                  <tr key={index}>
                    <td>{data.support}</td>
                    <td>{data.items}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6}>No hay datos</td>
                </tr>
              )}
            </tbody>
          </table></div>
        </section>
      </main>
    </div>
  );
}

export default page;
