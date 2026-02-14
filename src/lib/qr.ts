import QRCode from "qrcode";

export async function generateQRDataURL(url: string): Promise<string> {
  return QRCode.toDataURL(url, {
    width: 300,
    margin: 2,
    color: {
      dark: "#E11D48",
      light: "#FFFFFF",
    },
    errorCorrectionLevel: "M",
  });
}
