from flask import Flask, request, jsonify
from mistralai import Mistral
from flask_cors import CORS

api_key = "BL1KNezsuC7Fk3HMUoJXv89Nw2pwkFGk"
model = "mistral-large-latest"
client = Mistral(api_key=api_key)

app = Flask(__name__)
CORS(app)

# Function to interact with the chatbot
@app.route('/api/chat', methods=['POST'])
def chat_with_bot():
    user_input = request.json.get('input')

    # Query the Mistral API
    chat_response = client.chat.complete(
        model=model,
        messages=[
            {
                "role": "system",
                "content": "You are an AI chatbot. Provide concise and helpful responses to user queries."
            },
            {
                "role": "user",
                "content": user_input,
            }
        ],
        temperature=0.7  # Control randomness
    )

    # Return the chatbot's response
    return jsonify({"response": chat_response.choices[0].message.content})

if __name__ == "__main__":
    app.run(host='0.0.0.0', port=5000)  # Run Flask on port 5000
