FROM node:16-alpine AS development
ENV NODE_ENV development
# Add a work directory
WORKDIR /app
# Cache and Install dependencies
COPY package*.json .
RUN npm install
RUN npm run build

# Copy app files
COPY . .
# Expose port
EXPOSE 3030
# Start the app
CMD [ "npm", "run", "dev" ]