# BUILD

FROM node:18-alpine as build

WORKDIR /usr/src/app
COPY package*.json ./
RUN npm ci && npm cache clean --force
COPY . .

# PRODUCTION

FROM node:18-alpine as prod

WORKDIR /usr/src/app
COPY --from=build /usr/src/app /usr/src/app
CMD ["npm", "run", "prisma"]
