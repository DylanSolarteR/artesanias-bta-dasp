"use client";
import PdfIcon from "@/app/icons/PdfIcon.svg?url";

import Image from "next/image";

function page() {
  return (
    <div>
      <main>
        {/* Seccion Filtros */}
        <h1>Reporte de ventas</h1>
        <section>
          <div>
            <h2>Filtros de búsqueda</h2>
            <input
              type="text"
              className="input max-w-sm"
              placeholder="YYYY-MM-DD"
              id="flatpickr-date-start"
            />
            <input
              type="text"
              className="input max-w-sm"
              placeholder="YYYY-MM-DD"
              id="flatpickr-date-end"
            />
            <select name="" id="">
              <option value=""></option>
            </select>
            <select name="" id="">
              <option value=""></option>
            </select>
            <select name="" id="">
              <option value=""></option>
            </select>
          </div>
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
          <div>
            <table>
              <thead>
                <tr>
                  <th>Identificador</th>
                  <th>Nombre producto</th>
                  <th>Categoría</th>
                  <th>Punto Físico</th>
                  <th>Categoría</th>
                  <th>Punto Físico</th>
                </tr>
              </thead>
              <tbody></tbody>
            </table>
          </div>
        </section>
      </main>
    </div>
  );
}

export default page;
