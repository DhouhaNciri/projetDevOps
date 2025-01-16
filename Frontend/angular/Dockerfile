# # Étape 1: Construction de l'application Angular
# FROM node:18 AS build

# WORKDIR /home/app
# COPY package*.json /home/app/
# RUN npm install

# COPY . /home/app/
# RUN npm run build --prod

# # Étape 2: Configuration de Nginx pour servir l'application Angular
# FROM nginx:stable-alpine

# # Copie des fichiers générés par Angular dans le répertoire Nginx par défaut
# COPY --from=build /home/app/dist/gestion-platform /usr/share/nginx/html

# # Configuration personnalisée de Nginx si nécessaire
# COPY nginx.conf /etc/nginx/nginx.conf

# EXPOSE 80

# CMD ["nginx", "-g", "daemon off;"]



FROM node:18

WORKDIR /home/app
COPY package*.json /home/app/

RUN npm install

COPY . /home/app/

EXPOSE 4200

CMD ["npm", "start"]
