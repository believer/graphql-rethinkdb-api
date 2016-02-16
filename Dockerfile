FROM node:5
ADD package.json /app/
WORKDIR /app
RUN npm install
ADD ./lib /app/lib
EXPOSE 4000
CMD npm start
