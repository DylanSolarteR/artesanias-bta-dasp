"use client";
import PurchaseDataForm from "@/components/PurchaseDataForm";
import "@/app/css/Buy.css"


function comprar() {
  return (
    <div className="container">
      <main className="main-buy">
        <h1>PROCESO DE COMPRA</h1>
        <section className="section-form-buy">
          <PurchaseDataForm />
        </section>
      </main>
    </div>
  );
}

export default comprar;
