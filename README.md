Hi there! Welcome to the service that helps you track the posts of the communities of the social network VKontakte
Thanks to this service, you can make a GET request to the VKontakte API and get all the posts of the required community

The page presents a simple interface with the necessary inputs for filling. Please note that when visiting and reloading the page, a push notification will pop up stating that you need to receive access to the current VKontakte. You can do it very simply:
1. Follow the link from your push notification
2. Follow the instructions below (the easiest way is to get access through "Admin")

After you receive an access token, you need to:
1. Enter this access token in the field "Access Token" (your token will usually start with vk1.a...)
2. Select the required VKontakte community (for example: https://vk.com/shastoon.channel -> just take the name of the community "shastoon.channel") and enter it in the "Group ID" field
3. Enter the desired number of posts that you want to receive

If the number of posts you request from the community exceeds 10, you have the option to use pagination and display 5,10 or 50 posts per page.

You also have the option to sort the displayed posts by date or views. You can easily select it from the drop down lists.
------

DEVELOPMENT THINGS:

this application has a client and a small server part of the code written with Express.js. "Axios" was used for requests to the API
Push notifications are made using the react-toastify library.

After you have forked this repository, you need to open the server (server) and client (posts-viewer) terminals and execute the commands : npm run start and npm start accordingly

Havr fun ¯\_(ツ)_/¯ 