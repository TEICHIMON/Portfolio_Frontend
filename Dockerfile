
FROM node:20-alpine AS builder

# Set the working directory to /app
WORKDIR /app

# Copy the package.json and package-lock.json files to the container
COPY package*.json ./

# Install app dependencies
RUN yarn install

# Copy the rest of the application code to the container
COPY . .

# Build the Next.js application
RUN yarn build

# Use a lighter base image for the production stage
FROM node:20-alpine

# Set the working directory to /app
WORKDIR /app

# Copy the necessary files from the builder stage
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public

# Install only production dependencies
RUN yarn install --production

# Expose the desired port (e.g., 8080)
EXPOSE 8080

# Run the command to start the Next.js application
CMD ["yarn", "start"]
