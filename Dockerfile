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

# Ensure Prisma has access to schema.prisma
RUN ls -la prisma/schema.prisma || echo "schema.prisma not found!"

# Generate Prisma client inside the container
RUN npx prisma generate

# Expose the port the app runs on
EXPOSE 4000



# Start the application
CMD ["node", "server.js"]
