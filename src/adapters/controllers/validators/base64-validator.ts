export const isBase64 = (value: string): boolean => {
  try {
    const buffer = Buffer.from(value, 'base64');
    return buffer.toString('base64') === value;
  } catch (error) {
    return false;
  }
}