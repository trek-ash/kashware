FROM node:12.18.0
WORKDIR /kashware-assignment
COPY package.json /kashware-assignment
RUN npm install
COPY . /kashware-assignment
CMD node index.js
EXPOSE 8000