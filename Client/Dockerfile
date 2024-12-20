# Use Node.js LTS version as base
FROM node:18

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy application source code
COPY . .

# Expose the port the React app runs on
EXPOSE 3000

# Start the application
CMD ["npm", "start"]
