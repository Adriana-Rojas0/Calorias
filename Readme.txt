1- Abrimos el Docker Desktop
2- En la powershell ejecutamos el comando "npm run build " para generar la carpeta dist
3- Elimino la carpeta node_modules 
4- En la powershell ejecutamos el comando " docker build -t calorias . " para cargar el dockerfile
5- En la powershell ejecutamos el comando " docker run -dp 8080:80 --name calculatorContainer calculator " para generar el contenedor