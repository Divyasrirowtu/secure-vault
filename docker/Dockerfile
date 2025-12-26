# Use Node.js base image
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Copy package.json and lock file
COPY package.json package-lock.json ./

# Install dependencies
RUN npm install

# Copy the rest of the project
COPY . .

# Make entrypoint script executable
RUN chmod +x ./docker/entrypoint.sh

# Run entrypoint on container start
CMD ["sh", "./docker/entrypoint.sh"]
