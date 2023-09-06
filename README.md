# Crear la red
docker network create red-balanceador-node

# Conectar a la red mi contenedor mysql ya creada anteriormente
docker network connect red-balanceador-node mysql


# Crear los contenedores de Node.js y conectarlos a la red

docker run -it --name node-web1 --network red-balanceador-node -p 3001:3000 -v ${PWD}/node-web1:/usr/local/apache2/htdocs/ -w /usr/local/apache2/htdocs/ node:18-alpine sh

## Intalar dependencias
npm i mysql2

docker run -it --name node-web2 --network red-balanceador-node -p 3002:3000 -v ${PWD}/node-web2:/usr/local/apache2/htdocs/ -w /usr/local/apache2/htdocs/ node:18-alpine sh

## Intalar dependencias
npm i mysql2


# Crear el contenedor de  haproxy
docker run -d --name haproxy-node-container --network red-balanceador-node -p 8086:80 -v ${PWD}/config:/usr/local/etc/haproxy/haproxy.cfg haproxy:latest