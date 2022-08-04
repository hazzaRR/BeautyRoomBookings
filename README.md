# BeautyRoomBookings

# Tasks

To setup the webapp ensure you have both docker engine and docker compose installed on your system and is running. Then run the following docker commands:

docker compose up --build -d
docker exec beautyroombookings-server-1 node ./Database/databaseSetup.js

running the first command will create docker containers for both the node js server and the postgres database and the second command will create the tables for the postgres database and a default admin login.

To stop and remove the containers you can use the following docker command 

docker-compose down
