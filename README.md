# DaoChat
<p align="center">
  <img width="786" height="640" src="https://i.imgur.com/0tilXfh.gif">
</p>

DaoChat Walkthrough - https://drive.google.com/file/d/1z0KN9sju4JaNkZQZJVo-qbOEYF-4KP8g/view

A Web3 Chat Dapp allowing DAO Members to Create New Proposals, Chat with Dao Members, View Proposals(Approve,
reject them), and chat on those proposals

# For running
step 1 : `git clone https://github.com/tanishbaansal/DaoChat`

Then for cometchat api

step 1: A CometChat Api which you can get from - https://app.cometchat.com/signup

STEP 2: From the dashboard, add a new app called DaoChat.

STEP 3: Select the app you just created from the list.

STEP 4: From the Quick Start copy the APP_ID, REGION, and AUTH_KEY, to .env file.

Truffle + genache -
=
Step 1: `npm install` in main folder then `npm install` in frontend folder

Step 2: start a ganche instance by running `ganache` command in terminal and then copy the private key from that and import that private key in metamask, Then deploy contract using `truffle migrate --network development`

Step 3:  copy the abis from build directory to frontend/src/abi directory

Step 4: go to the frontend folder and start the server using `npm start` and then the server will listen on localhost:3000 where the frontend will be shown
