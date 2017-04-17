echo off
title Start MongoDB and server.js
:: Starts mongod
start cmd /k node server
echo Starting mongod
mongod