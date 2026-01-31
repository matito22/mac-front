//Creamos una variable de entorno que nos permite cambiar la URL del backend
//Por ejemplo, si queremos que el backend sea localhost:3000 en modo desarrollo
//y localhost:3001 en modo produccion
export const environment = {
  production: false,
  API_URL: 'http://localhost:3000'
  //API_URL: 'http://localhost:3001'
};