FROM node:lts-alpine

WORKDIR /app

COPY package*.json ./

COPY frontend/package*.json frontend/
RUN npm install --prefix frontend --omit=dev

COPY backend/package*.json backend/
RUN npm install --prefix backend

COPY frontend/ frontend/
RUN npm run build --prefix frontend

COPY backend/ backend/

USER node

CMD ["npm", "start", "--prefix", "backend"]

EXPOSE 8000

