# Use uma imagem oficial do Node.js 18 com suporte para TypeScript
FROM node:18

# Diretório de trabalho dentro do container
WORKDIR /usr/app

# Copie os arquivos de configuração para dentro do container
COPY package.json ./
COPY package-lock.json ./
COPY tsconfig.json ./

# Copie o código-fonte do projeto para dentro do container
COPY . .

# Instale as dependências do projeto
RUN npm install

EXPOSE 3000

# Comando para iniciar o aplicativo (sem compilar para JavaScript)
CMD ["npx", "ts-node", "src/main.ts"]
