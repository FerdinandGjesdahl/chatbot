from flask import Flask, request, jsonify
import openai

app = Flask(__name__)

# Sett API-nøkkelen din (husk å ikke eksponere din API-nøkkel i produksjonsmiljø)
openai.api_key = "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"

# Kontekstvariabel
context = """

"""

@app.route('/ask', methods=['POST'])
def ask():
    data = request.json
    question = data['message']
    response = ask_gpt(question)
    return jsonify({'reply': response})

def ask_gpt(question):
    response = openai.ChatCompletion.create(
        model="gpt-3.5-turbo-16k", 
        messages=[
            {"role": "system", "content": context},
            {"role": "user", "content": question}
        ],
        max_tokens=6000
    )
    return response.choices[0].message['content']

if __name__ == '__main__':
    app.run(debug=True, port=3000)