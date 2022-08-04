FROM node:14

WORKDIR /c/Users/redma/Documents/GitHub/BeautyRoomBookings
#installs app dependencies
COPY package*.json ./
RUN npm install

#bundle app source
COPY . .

CMD ["npm", "start"]