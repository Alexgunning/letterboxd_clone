FROM node:10

# Create app directory
WORKDIR /app/letterboxd/

# Install app dependencies
COPY package*.json yarn.lock ./
RUN yarn -s install

COPY api tsconfig.json prisma ./

# RUN npx prisma init
# RUN npx prisma init
# RUN npx prisma generate

RUN yarn -s build

# Bundle app source
COPY . .

EXPOSE 4000

CMD [ "npx", "nexus", "dev" ]