# Lessons for Life

This is the frontend app for LessonsforLifeProject.com

## About

This frontend will make calls to a wordpress backend at [api.lessonsforlife.me](api.lessonsforlife.me)

## Requirements
You will need mongodb installed and running.
You will also need a `credentials` folder in the root of this app for aws credentials: `aws-credentials.json` and `aws-s3upload-credentials.json`

## Setup

###Frontend
The bulk of the development environment is in the /app folder.

In on terminal run `yeoman server` to monitor all frontend environment.  This will recompile all
`*.less` stylesheets to a single `app.css` file.

###Node Server

In another terminal run `node app.js` or `npm start` to launch the  server app.


