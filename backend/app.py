from flask import Flask, jsonify, request
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy

app = Flask('__name__')
CORS(app)

app.config ['SQLALCHEMY_DATABASE_URI'] = 'postgresql://postgres:123@localhost:6100/devzery_db'
db = SQLAlchemy(app)

# Define TestCase model
class TestCase(db.Model):
    __tablename__ = 'testcases'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    description = db.Column(db.Text)
    status = db.Column(db.String(20))

@app.route('/')
def intial():
    return 'Backend is Running'

@app.route('/api/testcases', methods=['GET'])
def get_testcases():
    testcases = TestCase.query.all()
    return jsonify([{
        'id': t.id,
        'name': t.name,
        'description': t.description,
        'status': t.status
    } for t in testcases])

@app.route('/api/testcases/<int:id>', methods=['PUT'])
def update_testcase(id):
    testcase = TestCase.query.get_or_404(id)
    data = request.json
    testcase.name = data.get('name', testcase.name)
    testcase.description = data.get('description', testcase.description)
    testcase.status = data.get('status', testcase.status)
    db.session.commit()
    return jsonify({'message': 'Test case updated successfully'})


if __name__ == '__main__':
    app.run()