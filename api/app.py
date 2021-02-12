import flask
from flask import request, jsonify

app = flask.Flask(__name__)
app.config["DEBUG"] = True

items = ["Dummy Item 1"]


@app.route('/items/list', methods=['GET'])
def list_items():
    print(items, flush=True)
    return jsonify(items)

@app.route('/items/save', methods=['POST'])
def save_items():
    json = request.json
    print (json["items"], flush=True)
    items = json["items"]
    print(items, flush=True)
    return "Success"

app.run()