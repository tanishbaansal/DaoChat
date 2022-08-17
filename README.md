# DaoChat

![](https://i.imgur.com/73jCix9.gif)
DaoChat Walkthrough - https://drive.google.com/file/d/1z0KN9sju4JaNkZQZJVo-qbOEYF-4KP8g/view

A Web3 Chat Dapp allowing DAO Members to Create New Proposals, Chat with Dao Members, View Proposals(Approve,
reject them), and chat on those proposals

# For running
First git clone https://github.com/tanishbaansal/DaoChat
Then for cometchat api
step 1 : require a CometChat Api which you can get from - https://app.cometchat.com/signup
STEP 2: From the dashboard, add a new app called dominionDAO.
STEP 3: Select the app you just created from the list.
STEP 4: From the Quick Start copy the APP_ID, REGION, and AUTH_KEY, to .env file.
Truffle + genache -
first do npm i in main folder
start a ganche instance by running ganache command in terminal and then copy the private key from that like this and import that private key in metamaskThen deploy contract using truffle migrate --network development
then copy the abis from build directory to frontend/src/abi directory
Frontend
then go to the frontend folder and start the server using npm run start be sure to do npm i in this folder and then the server will listen on
localhost:300 where the frontend will be shown
