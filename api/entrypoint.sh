#!/bin/bash
#python app.py db init
#python app.py db migrate
#python app.py db upgrade
flask db init
flask db migrate
flask db upgrade
flask run --host=0.0.0.0