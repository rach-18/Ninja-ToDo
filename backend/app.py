from flask import Flask, request, jsonify
from flask_cors import CORS
from anthropic import Anthropic
from dotenv import load_dotenv
import requests
import os

load_dotenv()

app = Flask(__name__)

cors = CORS(app, resources={r"/*":{"origins": "*"}})

# Validate API key
api_key = os.getenv("ANTHROPIC_API_KEY")
if not api_key:
    raise ValueError("ANTHROPIC_API_KEY not found in environment variables!")
elif not api_key.startswith('sk-ant-'):
    raise ValueError(f"API key appears to be invalid format: {api_key[:10]}...")
else:
    print("API key loaded successfully:", api_key[:10] + "...")

# Create Anthropic client
client = Anthropic(api_key=api_key.strip())

# PROMPT = """You will be given a task as an input. You have to analyze it and make it more precise. You do not have to make it long. Do not exceed more than 100 characters. 
#             You also have to analyze it and suggest a priority for the task. The following are the task priority you have to choose from:
#             1) Important & Urgent
#             2) Important & Not Urgent
#             3) Not Important & Urgent
#             4) Not Important & Not Urgent
#             You also have to suggest a specific time that will be required to complete the task. You have to suggest a time between the range of 5min to 120min but with a multiple of 5.
#         """

REPHRASE_PROMPT = "The user will give a task as an input. You will have to rephrase it and make it more clean and better. It does not have to be too long. Don't exceed more than 100 characters"

@app.route('/general-task', methods=['POST'])
def rephrase_task():
    try:
        data = request.json
        print(data);
        task = data.get('task')

        if not task:
            return jsonify({"error": "No Task Provided"}), 400
        
        try:
            message = client.messages.create(
                model="claude-3-5-sonnet-20241022",
                max_tokens=4000,
                temperature=0,
                system=REPHRASE_PROMPT,
                messages=[
                    {
                        "role": "user",
                        "content" : f"Only rephrase the task here: {task}"
                    }
                ]
            )

            raw_response = message.content[0].text;
            print('Raw response:', raw_response);
        
            return jsonify({"response":raw_response});

        except Exception as api_error:
            print(f"\nAnthropic API Error details: {str(api_error)}")
            return jsonify({"error": f"API Error: {str(api_error)}"}), 500

    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/')
def home():
    return "Hello, Flask!"

if __name__ == '__main__':
    app.run(debug=True)
