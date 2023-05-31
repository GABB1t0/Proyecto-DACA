export const loadDatos_user = () => {
    return localStorage.getItem('datos_user_cliente');
}

export const extraer_data_local_storage = () => {

  const datos = loadDatos_user();

  let arrayDatos;

  try {
  arrayDatos = JSON.parse(datos);  
  } catch (error) {
      arrayDatos = [];
  }

  return arrayDatos;
}

export function parseToDoubleWithTwoDecimals(number) {
    const parsedNumber = parseFloat(number);
    
    // Verificar si el número es un valor numérico válido
    if (isNaN(parsedNumber)) {
      return null;
    }
    
    // Verificar si el número es un entero
    if (Number.isInteger(parsedNumber)) {
      return parsedNumber.toFixed(2);
    }
    
    // Redondear el número a dos decimales
    return parsedNumber.toFixed(2);
}