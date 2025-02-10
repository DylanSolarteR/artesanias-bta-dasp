import React from "react";
import PdfIcon from "@/app/icons/PdfIcon.svg?url";
import { Page, Text, View, Document, StyleSheet, PDFDownloadLink, Font } from "@react-pdf/renderer";

const styles = StyleSheet.create({
    page: { padding: 30, paddingBottom: 50, fontSize: 11, backgroundColor: "#fdfdfd" },
    header: { textAlign: "center", fontSize: 18, fontWeight: "bold", marginBottom: 10, backgroundColor: "#eb9c6b", color: "#fff", padding: 10, borderRadius: 5 },
    footer: { position: "absolute", bottom: 10, textAlign: "center", fontSize: 10, marginTop: 20, padding: 10, color: "#8c7f77", borderTopWidth: 1, borderTopColor: "#8c7f77", width: "90%" },
    pageNumber: { position: "absolute", bottom: 10, right: 30, fontSize: 10 },
    subheader: { fontSize: 14, marginBottom: 5, fontWeight: "bold", color: "#333" },
    section: { marginBottom: 20},
    sectionFilter: { marginBottom: 20, lineHeight: 1.5},
    table: { width: "100%", borderCollapse: "collapse", marginTop: 10, borderRadius: 5, overflow: "hidden" },
    row: { flexDirection: "row", borderBottomWidth: 1, borderBottomColor: "#ddd", padding: 4, backgroundColor: "#fff" },
    cellHeader: { fontWeight: "bold", width: "20%", backgroundColor: "#e47b3a", color: "#fff", padding: 5, textAlign: "center" },
    cellHeader2: { fontWeight: "bold", width: "80%", backgroundColor: "#e47b3a", color: "#fff", padding: 5, textAlign: "center" },
    cell: { width: "20%", padding: 5, textAlign: "center", color: "#333" },
    cell2: { width: "80%", padding: 5, textAlign: "center", color: "#333" },
    container: { borderWidth: 1, borderColor: "#ccc", padding: 10, borderLeftWidth: 10, borderLeftColor: "#e47b3a" },
    tableContainer: { flexGrow: 1, marginBottom: "10px" },
    rowHeader: { flexDirection: "row" },
    containerBetweenFilter: {
        flexDirection: "row",
        justifyContent: "space-between",
        paddingRight: "20%",
        width: "100%",
    },
    containerBetween: {
        flexDirection: "row",
        justifyContent: "space-between",
        width: "100%",
    },
    subtitle: { borderBottomWidth: 1, borderBottomColor: "#ccc", fontWeight: "bold", width: "100%", fontSize: 14 },
    title: { fontSize: "24px", alignItems: "center", fontWeight: "bold", color: "#e47b3a", paddingTop: "20px" },
    encabezadoDatos: { color: "#8c7f77" }
});

const MyDocument = ({ issueDate, createdBy, startDate, endDate, saleType, physicalLocation, order, sales }) => (
    <Document>
        <Page size="A4" style={styles.page}>
            
            <View style={styles.section}>
                <View style={styles.containerBetween}>
                    <Text style={{fontSize: 14, color: "#8c7f77"}}>Artesanías </Text>
                    <Text style={styles.encabezadoDatos}>Fecha de expedición: {issueDate}</Text>
                </View>
                <View style={styles.containerBetween}>
                    <Text style={{fontSize: 14, color: "#8c7f77"}}>Bogotá Ldta.</Text>
                    <Text style={styles.encabezadoDatos}>Realizado por: {createdBy}</Text>
                </View>
            </View>
            <View style={styles.section}>
                <View style={styles.title}>
                    <Text>REPORTE DE ASOCIACIÓN</Text>
                </View>
            </View>


            <View style={styles.sectionFilter}>
                <View style={styles.container}>
                    <View style={styles.containerBetweenFilter}>
                        <Text>Fecha inicial: {startDate}</Text>
                        <Text>Fecha final: {endDate}</Text>
                    </View>
                    <Text>Tipo de venta: {saleType}</Text>
                    <Text>Punto físico: {physicalLocation}</Text>
                    <Text>Categoría: {order}</Text>
                </View>
            </View>

            <View style={styles.subtitle}>
                <Text>Tabla de reporte</Text>
            </View>

            <View style={styles.table}>
                <View style={styles.tableContainer}>
                    <View style={styles.rowHeader}>
                        <Text style={styles.cellHeader}>Soporte</Text>
                        <Text style={styles.cellHeader2}>Items</Text>
                    </View>
                    {sales.map((sale, index) => (
                        <View style={[styles.row, index % 2 ? { backgroundColor: "#f1f1f1" } : {}]} key={index}>
                            <Text style={styles.cell}>{sale.support}</Text>
                            <Text style={styles.cell2}>{sale.items}</Text>
                        </View>
                    ))}
                </View>
            </View>

            <View style={styles.footer} fixed>
                <Text>Dirección: Cr 37 B 38 # 43 Sur | Correo: artesanias@gmail.com | Teléfono: 31064785746</Text>
                <Text style={styles.pageNumber} render={({ pageNumber, totalPages }) => `${pageNumber} / ${totalPages}`} />
            </View>

        </Page>
    </Document>
);


const DownloadPDFButton = ({ issueDate, createdBy, startDate, endDate, saleType, physicalLocation, order, sales }) => (
    <div>
        <PDFDownloadLink
            document={
                <MyDocument
                    issueDate={issueDate}
                    createdBy={createdBy}
                    startDate={startDate}
                    endDate={endDate}
                    saleType={saleType}
                    physicalLocation={physicalLocation}
                    order={order}
                    sales={sales}
                />
            }
            fileName="reporte.pdf"
        >
            {({ loading }) => (

                <button>
                    {loading ? "Generando PDF..." : <img src={PdfIcon.src} alt="pdf-export" width={35} height={35} />}
                </button>
            )}
        </PDFDownloadLink>
    </div>
);

export default DownloadPDFButton;