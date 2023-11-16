# Use an official Node.js runtime as a parent image
FROM node:20-slim

# Copy the package.json and package-lock.json files to the container
COPY ./ /app

# Set the working directory to /app
WORKDIR /app

# Install dependencies
RUN yarn install && yarn build

# Nginx
FROM nginx
RUN mkdir /app
COPY --from=0 /app/dist /app
COPY nginx.conf /etc/nginx/nginx.conf
