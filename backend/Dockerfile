# Lightweight node image
FROM node:14.3.0-alpine

# Project directory
WORKDIR /app

# Add node modules to path
ENV PATH /app/node_modules/.bin:$PATH

# Install dependencies
COPY package.json ./
COPY package-lock.json ./
RUN npm i --silent

# Copy project
COPY . ./

# Run app
CMD ["npm", "start"]
