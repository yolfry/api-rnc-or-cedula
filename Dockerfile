FROM node:21.5-alpine

#docker build -t apirnc .
# Establece el directorio de trabajo
WORKDIR /usr/src/app

# Copia los archivos de definición de dependencias e instala
COPY package*.json ./
RUN npm install

# Copia el resto del código de la aplicación
COPY . .

# Expone el puerto
EXPOSE 5147

# Comando de inicio de la aplicación
CMD ["node", "server.js"]
