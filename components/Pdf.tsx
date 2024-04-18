import React from "react";
import {
  Document,
  Page,
  StyleSheet,
  Text,
  View,
  Image,
} from "@react-pdf/renderer";

interface Casa {
  id: string;
  userId: string;
  ciudad: string;
  precio?: number | null;
  habitaciones?: number | null;
  imageUrl?: string | null;
  color?: string | null;
  createAt: Date;
  updateAt: Date;
}

interface PDFProps<TData extends Casa> {
  casaData: TData[];
}

const styles = StyleSheet.create({
  page: {
    flexDirection: "column",
    padding: 10,
  },
  section: {
    marginBottom: 10,
  },
  image: {
    width: "100%",
    marginBottom: 10,
  },
  title: {
    fontSize: 18,
    marginBottom: 10,
    textDecoration: "underline",
  },
  text: {
    fontSize: 12,
    marginBottom: 5,
  },
});

const PDF: React.FC<PDFProps<Casa>> = ({ casaData }) => {
  return (
    <Document>
      <Page style={styles.page}>
        <View style={styles.section}>
          <Image style={styles.image} src="/hero-img.png" />
          <Text style={styles.title}>Datos de la Casa</Text>
          {casaData.map((casa) => (
            <View key={casa.id} style={styles.section}>
              {casa.imageUrl && (
                <Image style={styles.image} src={casa.imageUrl} />
              )}
              <Text style={styles.text}>
                <strong>ID:</strong> {casa.id}
              </Text>
              <Text style={styles.text}>
                <strong>Usuario:</strong> {casa.userId}
              </Text>
              <Text style={styles.text}>
                <strong>Ciudad:</strong> {casa.ciudad}
              </Text>
              <Text style={styles.text}>
                <strong>Precio:</strong> {casa.precio}
              </Text>
              <Text style={styles.text}>
                <strong>Habitaciones:</strong> {casa.habitaciones}
              </Text>
            </View>
          ))}
        </View>
      </Page>
    </Document>
  );
};

export default PDF;
