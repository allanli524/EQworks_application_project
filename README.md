# EQworks_application_project

The frontend is hosted on https://dazzling-payne-6628c6.netlify.app, however due to issues with the backend API being on HTTP, the web app is not able to make any calls approporiately.
The backend API is able to make calls to the database under HTTP but receives no response under HTTPS.
If interested, the HTTPS API (which doesn't work) is hosted on https://eq-works-api-yifei.herokuapp.com, the endpoints end up timing out due to not receiving a response from the Pool.query function.
And the HTTP API (which works) is hosted on Eqworksyifei-env.eba-58pwepb4.eu-west-1.elasticbeanstalk.com

To run a demo, cd into frontend and NPM run dev.
