import QRCode from 'qrcode';

export interface QRConfig {
  text: string;
  color: string;
  backgroundColor: string;
  size: number;
}

export const generateQRCode = async (config: QRConfig): Promise<string> => {
  try {
    const url = await QRCode.toDataURL(config.text, {
      width: config.size,
      margin: 2,
      color: {
        dark: config.color,
        light: config.backgroundColor,
      },
    });
    return url;
  } catch (err) {
    console.error(err);
    throw err;
  }
};
