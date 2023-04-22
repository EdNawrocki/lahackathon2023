from flask import Flask
from flask_cors import CORS
app = Flask(__name__)
CORS(app)

@app.route("/api")
def members():
    return {"members": ["MemberTest", "Member2", "Member3"]}

if __name__ == "__main__":
    app.run(debug=True)