from flask import Flask
from flask_cors import CORS
import openai
import json
from flask import request
from firebase import firebase
import firebase_admin
from firebase_admin import credentials
from firebase_admin import firestore
import firebase
import os
from dotenv import load_dotenv

app = Flask(__name__)
CORS(app)
API_KEY = os.getenv('API_KEY')
openai.api_key = API_KEY

cred = credentials.Certificate("../lahacks2023-6ebec-f815f989884b.json")
firebase_admin.initialize_app(cred)
db = firestore.client()

model_id = 'gpt-3.5-turbo'

def ChatGPT_conversation(conversation, context):
    # Note: Use of CollectionRef stream() is prefered to get()
    """
    docs = db.collection(u'cities').where(u'capital', u'==', True).stream()

    for doc in docs:
        print(f'{doc.id} => {doc.to_dict()}')
    """
    query = [
        {"role": "system", "content": context},
        {"role": "user", "content": conversation},
    ]
    response = openai.ChatCompletion.create(
        model=model_id,
        messages=query
    )
    # api_usage = response['usage']
    # print('Total token consumed: {0}'.format(api_usage['total_tokens']))
    # stop means complete
    # print(response['choices'][0].finish_reason)
    # print(response['choices'][0].index)
    conversation = response["choices"][0]["message"]
    return conversation

@app.route("/api", methods=['POST', 'GET'])
def members():
    if request.method == 'POST':
        data = request.json
        prompt = data['question']
        context = data['context']
        text = ChatGPT_conversation(prompt, context)
        text = str(text)
        text = text.strip('{\n  "content": "')
        text = text.strip('",\n  "role": "assistant"\n}')
        #firebase.post("/users", request.json)
        #result = firebase.get('/users', None)
        return {"result" : text}
    return {"GET": "REQUEST"}

#conversation[-1]['role'].strip().to_json(), 

"""
@app.route("/fire", methods=['POST', 'GET'])
def home():
  if request.method == 'POST':
      firebase.post("/users", request.json)
  result = firebase.get('/users', None)
  return result
"""

if __name__ == "__main__":
    app.run(debug=True)