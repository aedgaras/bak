FROM node:16-alpine AS development
ENV NODE_ENV development
# Add a work directory
WORKDIR /app
# Cache and Install dependencies
COPY package*.json .
RUN npm install

# Copy app files
COPY . .
# Expose port
EXPOSE 3030
# Start the app
CMD [ "./setup.sh"]