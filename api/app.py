from flask import request, jsonify, Flask
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate

db_string = "postgres://postgres:example@db:5432/postgres"

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = db_string
db = SQLAlchemy(app)
migrate = Migrate(app, db)


class ListModel(db.Model):
    __tablename__ = 'list'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String())

    def __init__(self, name):
        self.name = name

    def __repr__(self):
        return f"<List {self.name}>"

@app.route('/items/list', methods=['GET'])
def list_items():
    items = ListModel.query.order_by(ListModel.id).all()
    results = [
        {
            "id": item.id,
            "name": item.name,
        } for item in items]
    print(results, flush=True)
    return jsonify(results)

@app.route('/items/create', methods=['POST'])
def create_item():
    new_item = ListModel(name="")
    db.session.add(new_item)
    db.session.commit()
    return {"message": f"Item has been created successfully."}
@app.route('/items/update', methods=["POST"])
def update_item():
    if request.is_json:
        data = request.get_json()
        print(data, flush=True)
        item = ListModel.query.get_or_404(data["id"])
        item.name = data["name"]
        db.session.add(item)
        db.session.commit()
        return {"message": f"Item {item.name} has been updated successfully."}
    else:
        return {"error": "The request payload is not in JSON format"}

@app.route("/items/delete", methods=["DELETE"])
def delete_item():
    if request.is_json:
        data = request.get_json()
        item = ListModel.query.get_or_404(data["id"])
        db.session.delete(item)
        db.session.commit()
        return {"message": f"Item {item.name} has been deleted successfully."}
    else:
        return {"error": "The request payload is not in JSON format"}
        
if __name__ == "__main__":
    app.run()