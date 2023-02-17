# Selecciona la imagen base
FROM node:16-alpine

# Crea la carpeta de trabajo
WORKDIR /app

# Copia el archivo de configuración de dependencias
COPY package.json yarn.lock ./

# Instala las dependencias
RUN yarn install --frozen-lockfile --production=false

# Copia el resto de los archivos de la aplicación
COPY . .

# Construye la aplicación
RUN yarn build

# Define el comando de inicio
CMD ["yarn", "start"]
