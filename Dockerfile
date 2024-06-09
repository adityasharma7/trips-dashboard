FROM node:lts

# Setting working dir
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install packages
RUN npm install --quiet 

COPY . .

# Exposing port 1234
EXPOSE 3000

# Start app
CMD ["npm", "start"]