LazyRead-AI 🧠
Don't read everything. Understand what matters.

This is a submission for the Hacktoberfest Open-Source AI Challenge Week 3: Slow and Steady

LazyRead-AI is a privacy-first browser extension that helps you understand what matters on a webpage without reading every single word.

Powered by Qwen2.5:1.5B, running locally through Ollama, LazyRead-AI transforms long webpages into short, meaningful pointers so you can spend less time reading and more time understanding.

What I Built

The internet is full of useful information, but finding the important parts can take time and effort.

LazyRead-AI is a lightweight Chrome extension that reads the text of your current webpage and uses local AI to identify the information worth your attention.

Instead of another long summary, it gives you:

The Big Picture: Understand the main idea in one concise sentence.
Key Pointers: Get three to five important facts, insights, or decisions.
Remember This: A takeaway worth remembering after you close the tab.
Reading-Time Estimate: Get a rough indication of the time you might save.
Copy Summary: Copy the generated pointers for later reference.

LazyRead-AI is built for students, developers, researchers, busy professionals, and anyone who wants to learn efficiently without feeling overwhelmed by information.

The goal isn't to read faster just to consume more. It's to understand more with less effort.

Demo

Live demo: Coming soon.

Screenshots or video: Add a screenshot or screen recording of LazyRead-AI summarizing a real webpage here.

To try the project locally, follow the installation instructions below.

Code

GitHub repository: https://github.com/Bharatefb/LazyRead-AI

Technology stack
Technology	Purpose
Python	Backend development
FastAPI	Local API for summarization
Ollama	Local model runtime
Qwen2.5:1.5B	AI summarization and key-point extraction
HTML	Extension interface
CSS	Popup styling
JavaScript	Webpage extraction and backend communication
Chrome Manifest V3	Browser extension architecture

Project structure
LazyRead-AI/
├── app.py
├── requirements.txt
├── .gitignore
├── README.md
└── extension/
    ├── manifest.json
    ├── popup.html
    ├── style.css
    └── popup.js

How I Built It

I built LazyRead-AI using Python, FastAPI, Ollama, Qwen2.5:1.5B, and standard browser-extension technologies.

1. Local AI with Ollama

I chose Qwen2.5:1.5B as the language model and Ollama as the local inference runtime.

The model is downloaded once and then runs on my own machine. There is no need for a paid cloud AI API to generate summaries.

2. FastAPI backend

The Python backend exposes two endpoints:

GET /health — checks whether the backend is running.
POST /summarize — sends webpage text to Ollama and returns a structured summary.

FastAPI validates the incoming data and returns the result as JSON.

3. Chrome extension

The extension uses Chrome Manifest V3 and the activeTab and scripting permissions to extract readable text from the active webpage after the user invokes it.

The extracted text is sent to the local FastAPI server, which passes it to Qwen through Ollama.

The resulting summary is displayed in a compact popup with the main idea, key pointers, takeaway, and a copy-summary option.

4. Prompt engineering

I designed the prompt to prioritize useful facts, insights, risks, and decisions while ignoring navigation, advertisements, and filler.

The model is instructed to return structured JSON, making it easier for the extension to display each part of the summary consistently.

5. Local-first workflow

After installing the software and downloading the model, the summarization workflow can run without an internet connection, as long as Ollama and the FastAPI backend are running.

Why Does Open Innovation Matter?

Open innovation is central to LazyRead-AI because the project depends on a locally runnable, open-weight language model rather than a proprietary cloud AI API.

Privacy and control

Webpages can contain private notes, work documents, personal information, or sensitive research.

With LazyRead-AI, webpage text is processed by a model running locally on my computer. The application does not need to send that text to a third-party AI inference service.

Freedom to experiment

Using Ollama makes it possible to experiment with other supported models, compare their summaries, adjust prompts, and customize the behavior of the application without redesigning the entire extension.

Accessibility and cost

There is no per-request cloud AI API fee. After the model is downloaded, local inference does not require a paid AI API subscription, although the computer still consumes electricity and hardware resources.

Learning by building

Open tools let me understand the entire pipeline, from webpage extraction to API validation, model inference, and summary rendering.

I can inspect and change how the system works instead of treating AI as a black box behind a hosted API.

Open innovation made it possible to build a useful, customizable reading assistant that prioritizes privacy, local control, and freedom to experiment.

My Agent Session

Optional.

Add your DevRelay agent session here if you save one during development.

<!-- Replace this comment with your DevRelay session link or the challenge's required agent_session embed. -->

The Lazy Payoff

LazyRead-AI is designed to reduce the effort required to understand long webpages by presenting the main idea and a handful of important pointers first.

Instead of scanning an entire article to discover its central message, users can start with a concise overview and decide whether they need to read further.

I haven't included a measured time-saving claim because actual results depend on the webpage, the reader, and model inference speed.

A useful next step is to test the extension on several articles and compare the time needed to identify their main ideas with and without LazyRead-AI.

The philosophy is simple:

Less scrolling. Less cognitive overload. More understanding.

Prize Categories

Select the applicable partner categories from the official challenge page before submitting. Remove this section if the challenge does not require it.

Future Improvements
Add a floating side panel for a more natural reading experience.
Support selectable summary modes, such as quick overview, key facts, and risks or decisions.
Improve extraction for long articles and supported document formats.
Add configurable models and summarization settings.
Evaluate summary quality and measure time saved across real-world webpages.
Add tests and improve error handling.
Getting Started
Prerequisites
Windows 10 or Windows 11
Python installed
Ollama installed
Google Chrome or a compatible Chromium-based browser
1. Download the model
ollama pull qwen2.5:1.5b

2. Clone the repository

Replace the placeholder URL with your actual GitHub repository URL.

git clone https://github.com/Bharatefb/LazyRead-AI.git
cd LazyRead-AI

3. Create and activate a virtual environment
python -m venv .venv
.\.venv\Scripts\Activate.ps1

4. Install dependencies
pip install -r requirements.txt

5. Start the FastAPI backend
python app.py


The API will run at http://127.0.0.1:5000.

API documentation is available at http://127.0.0.1:5000/docs.

6. Load the extension
Open chrome://extensions/ in Chrome.
Enable Developer mode.
Click Load unpacked.
Select the repository's extension folder.
Open a normal webpage and click the LazyRead-AI extension icon.
Click Find what matters.
Privacy Notes
Webpage text is sent to the local FastAPI service and processed using the local Ollama model.
The application does not require a third-party cloud AI API.
The initial model download requires internet access.
The backend is intended to bind to 127.0.0.1, not expose itself to the local network.
Avoid sending sensitive webpage content to a backend you do not control.
AI-generated summaries may omit important context or contain errors. Verify critical information against the original source.
License

Choose a license before publishing the repository. For example, you can use the MIT License if you want others to reuse, modify, and distribute your project under its terms.

Built with curiosity, open AI, and the belief that your attention is valuable.

LazyRead-AI — Don't read everything. Understand what matters.