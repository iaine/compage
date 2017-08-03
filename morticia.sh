#!/bin/bash

#script to run the JS tests

jsdoc static/*.js

mocha static/tests/*.js

git add out
git commit -m 'Adding the documentation'
git push origin master
