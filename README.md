pingerjs
========

Simple nodejs utility to ping a website<br/>
<br/>
Built from 2 main components :
* The pinger (pingy.js & Pinger.js) - This is a nodejs service that runs and pings a set of url's defined in the file pingy.js. Saves the status in a mongodb database.
* Website UI - index.js. Just a simple site using expressjs to show the status of the url's pinged.
