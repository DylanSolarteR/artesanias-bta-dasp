"use client";
import PdfIcon from "@/app/icons/PdfIcon.svg?url";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Image from "next/image";
import { use, useState } from "react";
import { listPhysicalLocations } from "@/api/physicalLocation.api";
import { PHYSICAL_LOCATION } from "@/types/physicalLocation.types";

const physicalLocations = listPhysicalLocations();

function page() {
  const [dateStart, setDateStart] = useState<Date>(new Date());
  const [dateEnd, setDateEnd] = useState<Date>(new Date());
  const [saleType, setSaleType] = useState<string>("");
  const [physicalPoint, setPhysicalPoint] = useState<string>("");
  const [order, setOrder] = useState<string>("");

  const physicalPoints: PHYSICAL_LOCATION[] = use(physicalLocations);
  return (
    <div>
      <main>
        {/* Seccion Filtros */}
        <h1>Reporte de asociación</h1>
        <section>
          <div>
            <h2>Filtros de búsqueda</h2>
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
              onSelect={(e: React.ChangeEvent<HTMLSelectElement>) => {
                setSaleType(e.target.value);
              }}
            >
              <option value="">Todo</option>
              <option value="">Online</option>
              <option value="">Físico</option>
            </select>
            <select
              name="physical-point-select"
              id=""
              onSelect={(e: React.ChangeEvent<HTMLSelectElement>) => {
                setPhysicalPoint(e.target.value);
              }}
            >
              {physicalPoints.map((point) => (
                <option key={point._id} value={point._id}>
                  {point.address}
                </option>
              ))}
            </select>
            <select
              name="order-select"
              id=""
              onSelect={(e: React.ChangeEvent<HTMLSelectElement>) => {
                setOrder(e.target.value);
              }}
            >
              <option value="">Más vendido</option>
              <option value="">Menos vendido</option>
              <option value="">Categoria</option>
            </select>
          </div>
          <button>Filtrar</button>
        </section>
        {/* Seccion tabla */}
        <section>
          <div>
            <h2>Tabla de reporte</h2>
            <span>
              Exportar
              <Image src={PdfIcon} alt="pdf-export" width={100} height={100} />
            </span>
          </div>
          <div>{/* <TablaReporteAsociacion/> */}</div>
        </section>
      </main>
    </div>
  );
}

export default page;
