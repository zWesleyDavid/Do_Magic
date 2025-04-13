export function geradorDeIDs(length = 6): string {
    const caracteres = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let result = '';
  
    for (let i = 0; i < length; i++) {
      const random = Math.floor(Math.random() * caracteres.length);
      result += caracteres[random];
    }
  
    return result;
  }
  