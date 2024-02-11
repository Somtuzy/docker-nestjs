FROM node:21-alpine

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Install dependencies
# RUN npm rebuild bcrypt

# Copy application source code
COPY . .

# Use NODE_ENV variable for checks
ARG NODE_ENV
RUN if [ "$NODE_ENV" = "live" ]; then npm run build; fi

# Define the network ports that this container will listen on at runtime. This will be the port your app is running on.
EXPOSE 6000

# Start the container based on the specific environment
CMD if [ "$NODE_ENV" = "dev" ]; then npm run start:dev; else npm run start:prod; fi