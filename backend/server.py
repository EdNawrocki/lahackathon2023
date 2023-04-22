from flask import Flask
from flask_cors import CORS
import openai
import json
from flask import request
from firebase import firebase
firebase = firebase.FirebaseApplication('https://lahacks2023-6ebec-default-rtdb.firebaseio.com/', None)
app = Flask(__name__)
CORS(app)
#need a new APIKEY since I commited this one
API_KEY = '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'
openai.api_key = API_KEY

model_id = 'gpt-3.5-turbo'

def ChatGPT_conversation(conversation):
    response = openai.ChatCompletion.create(
        model=model_id,
        messages=conversation
    )
    # api_usage = response['usage']
    # print('Total token consumed: {0}'.format(api_usage['total_tokens']))
    # stop means complete
    # print(response['choices'][0].finish_reason)
    # print(response['choices'][0].index)
    conversation.append({'role': response.choices[0].message.role, 'content': response.choices[0].message.content})
    return conversation

@app.route("/api", methods=['POST', 'GET'])
def members():
    error = None
    count = 0
    count = str(count)
    result = {"end": count}
    if request.method == 'POST':
          return {"end": "hello"}
    conversation = []  
    prompt = "Say Hi"
    conversation.append({'role': 'user', 'content': prompt})
    #conversation = ChatGPT_conversation(conversation)
    #text = conversation[-1]['content'].strip()
    
    return result

#conversation[-1]['role'].strip().to_json(), 


@app.route("/fire", methods=['POST', 'GET'])
def home():
  if request.method == 'POST':
      firebase.post("/users", request.json)
  result = firebase.get('/users', None)
  return result


if __name__ == "__main__":
    app.run(debug=True)