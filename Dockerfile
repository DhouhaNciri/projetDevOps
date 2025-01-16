FROM nginx:alpine

# Copier le fichier de configuration Nginx dans le conteneur
COPY nginx.conf /etc/nginx/nginx.conf

# Copier d'autres fichiers nécessaires (optionnel)
# COPY static-files /usr/share/nginx/html
