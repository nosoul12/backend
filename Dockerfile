# Use an official Node.js image as the base
FROM node:18-alpine

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json before running npm install
COPY package*.json ./

# Install dependencies
RUN npm install --production

# Copy the entire project files into the container
COPY . .

# Generate Prisma client inside the container
RUN npx prisma generate

# Expose the port the app runs on
EXPOSE 3000

# Define environment variables
ENV PORT=3000

# Start the application
CMD ["node", "server.js"]
