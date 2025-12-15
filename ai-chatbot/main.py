from fastapi import FastAPI, Request
from fastapi.responses import HTMLResponse
from fastapi.templating import Jinja2Templates
from pydantic import BaseModel
import os
from groq import Groq
import uvicorn

app = FastAPI()

# 1. SETUP TEMPLATES
# directory="." means look for index.html in the SAME folder as this script
templates = Jinja2Templates(directory=".")

# 2. SETUP GROQ CLIENT
# REPLACE WITH YOUR ACTUAL API KEY
client = Groq(api_key="")

class ChatRequest(BaseModel):
    message: str
    tone: str

TONE_PROMPTS = {
    "alien": "you are from space as a space agent and answer everyone in an alien traveller tone",
    "professional": "You are a formal, polite, and concise corporate assistant.",
    "friendly": "You are a cheerful and helpful friend. Use emojis.",
    "sarcastic": "You are a cynical assistant. Be helpful but use dry wit and sarcasm.",
    "pirate": "You are a pirate. Speak in nautical slang."

}

# 3. THIS IS THE PART YOU WERE MISSING (The Homepage Route)
@app.get("/", response_class=HTMLResponse)
async def read_root(request: Request):
    # This tells the server: When user goes to "/", show them "index.html"
    return templates.TemplateResponse("index.html", {"request": request})

@app.post("/chat")
async def chat(chat_request: ChatRequest):
    user_message = chat_request.message
    selected_tone = chat_request.tone.lower()
    system_instruction = TONE_PROMPTS.get(selected_tone, TONE_PROMPTS["friendly"])

    try:
        chat_completion = client.chat.completions.create(
            messages=[
                {"role": "system", "content": system_instruction},
                {"role": "user", "content": user_message}
            ],
            model="llama-3.3-70b-versatile",
        )
        return {"response": chat_completion.choices[0].message.content}

    except Exception as e:
        print(f"ERROR: {e}") # This prints errors to your terminal
        return {"response": f"Error: {str(e)}"}

if __name__ == "__main__":
    uvicorn.run(app, host="127.0.0.1", port=8000)