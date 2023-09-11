# Use the node:18-alpine image as the base image
FROM node:18-alpine

# Set the working directory inside the container
WORKDIR /usr/src/app

# Copy your Node.js application files to the container's working directory
COPY package*.json ./
COPY index.js ./

# Install application dependencies
RUN npm install

# Expose the port your Node.js application will listen on
EXPOSE 3000

# Start your Node.js application
CMD ["node", "index.js"]
