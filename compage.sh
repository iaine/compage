#!/bin/bash

###############
#
# Script to set up environment
# todo: check if virtualenv is running
#
#  author: Iain Emsley
#
###############

export FLASK_DEBUG=1

export FLASK_APP=app.py

python -m flask run
