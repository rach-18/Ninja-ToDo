from flask import Flask, request, jsonify
from flask_cors import CORS
from anthropic import Anthropic
from dotenv import load_dotenv
import requests
import os

load_dotenv()

app = Flask(__name__)

cors = CORS(app,
            origins=["*"],
            supports_credentials=True,
            methods=["GET", "POST", "PUT", "DELETE", "OPTIONS"],
            allow_headers=["Content-Type"]
)

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

REPHRASE_PROMPT = """You are a task clarification expert. Your job is to rewrite vague tasks into SMART goals:
- Specific: Clearly state what needs to be done
- Measurable: Include quantifiable metrics
- Actionable: Start with a clear action verb
- Relevant: Include key components and context
- Time-bound: Include a specific deadline

Example:
Input: "Write report"
Output: "Write 5-page quarterly sales report including executive summary, market analysis, and recommendations by Friday 5 PM"

Keep the response concise and direct. Only return the clarified task, no explanations."""

PRIORITY_PROMPT = """You are a priority management expert. Suggest a priority level based on the task description. The priorities will be as follows: 
- Important & Urgent
- Important & Not Urgent
- Not Important & urgent
- Not Important & Not Urgent
Respond only with the priority level."""

TIME_PROMPT = """You are a time management expert. Suggest a realistic time estimate for tasks in minutes. The time will range from 5 min to 120 min and will always be a multiple of 5 Respond only with the number."""

# REPHRASE_PROMPT = "The user will give a task as an input. You will have to rephrase it and make it more clean and better. It does not have to be too long. Don't exceed more than 100 characters"

@app.route('/api/rephrase', methods=['POST'])
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
                        "content" : f"Rewrite this task as a SMART goal: {task}"
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
    
@app.route('/api/priority', methods=['POST'])
def suggest_priority():
    try :
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
                system=PRIORITY_PROMPT,
                messages=[
                    {
                        "role": "user",
                        "content" : f"Based on the information provided to you, suggest a priority for the given task: {task}"
                    }
                ]
            )

            raw_response = message.content[0].text;
            print('Raw response:', raw_response);
        
            return jsonify({"priority":raw_response});

        except Exception as api_error:
            print(f"\nAnthropic API Error details: {str(api_error)}")
            return jsonify({"error": f"API Error: {str(api_error)}"}), 500

    except Exception as e:
        return jsonify({"error": str(e)}), 500
    
@app.route('/api/time', methods=['POST'])
def suggest_time():
    try :
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
                system=TIME_PROMPT,
                messages=[
                    {
                        "role": "user",
                        "content" : f"Based on the information provided to you, suggest a duration for the given task: {task}"
                    }
                ]
            )

            raw_response = message.content[0].text;
            print('Raw response:', raw_response);
        
            return jsonify({"time":raw_response});

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
