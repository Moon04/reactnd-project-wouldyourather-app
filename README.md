# WouldYouRather App

This is the final assessment project for the Udacity React Redux course of React Nanodegree. 
It's a simple project created to practice all the concepts explained in the React Redux course.

## Instructions to use this repo:

To get started right away and check the application:

* install all project dependencies with `npm install` or `yarn add`
* start the server with `npm start` or `yarn start`

## Backend Server

I've used the backend server that React nanodegree team has provided for us to develop against. The provided file [`_DATA_.js`](src/utils/_DATA_.js) contains the methods I've used to perform all needed operations on the backend:

* [`_getUsers`](#_getUsers)
* [`_getQuestions`](#_getQuestions)
* [`_saveQuestionAnswer`](#_saveQuestionAnswer)
* [`_saveQuestion`](#_saveQuestion)

## App Details

* The main page contains 2 tabs one for unanswered question and other for answered ones.
* User can view any question, and vote for unanswered onces including his own questions.
* User can add new question with only two options.
* User can view the leader board screen to know the authors order according to their answered and created questions.
