// eslint-disable-next-line @typescript-eslint/no-var-requires
const utl_crypto = require('crypto-js');

export class EncriptUtil {
  /**
   * Cifra el texto con la llave indicada
   * @param text texto a cifrar
   * @param key llave
   * @returns Texto cifrado
   */
  public static encrypt(text: string, key: string): string {
    if (text == null || text == undefined) return '';

    const encrypt_key = this.encode(key);
    // Encrypt key-text
    const token = utl_crypto.SHA256(`${encrypt_key}${text}`);
    return this.encode(token);
  }

  /** Metodo que elimina los pares de cero que tenga al inicio la trama */
  private static removeZeros(text: string) {
    return text.replace(/\b(00)+/i, '');
  }

  private static encode(text: string): string {
    const textMD5 = utl_crypto.MD5(text);
    return this.removeZeros(
      utl_crypto.enc.Hex.stringify(textMD5).toString().toUpperCase(),
    );
  }
}
