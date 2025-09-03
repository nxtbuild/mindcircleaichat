# 💬 MindCircle AI Chat, A Persona-Based Messaging

A sleek and responsive chat interface built with **React**, featuring:

- User, system, and AI message bubbles
- Markdown rendering via `react-markdown`
- Avatar support for personas
- Timestamp formatting
- Tailwind CSS styling

---

## Features

- **User & AI Messages**: Differentiated styling and alignment
- **System Messages**: Centered status updates or notifications
- **Avatars**: Dynamic avatar rendering based on sender persona
- **Markdown Support**: Bold, italic, lists, links, and more with `Message Renderer` for readability
- **Timestamps**: Formatted for readability
- **Animations**: Entry transitions for message bubbles

---

## Tech Stack

| Technology     | Purpose            |
| -------------- | ------------------ |
| React          | UI framework       |
| TypeScript     | Type safety        |
| Tailwind CSS   | Styling            |
| react-markdown | Markdown rendering |

---

## Folder Structure

```bash
src/
├── components/
│ ├── ChatHeader.tsx # Renders header of Message Box
│ ├── MessageBubble.tsx # Renders individual messages
│ ├── PersonaCard.tsx # Render All Persona Like Hitesh, Piyush etc.
│ └── pages/
│ └── Index.tsx # Main page where display all the things
├── data/
│ └── personas.ts # Persona definitions all data about perosona with tone
├── utils/
│ └── aiClients.ts # Configure the client apikey like OpenAI, Gemini
  └── aiResponse.ts # API Logic and define Personality Tone
```

---

## Setup & Installation

**Clone the repo**

```bash
git clone https://github.com/nxtbuild/Persona-ai
cd Persona-ai

npm install

**Define VITE_OPENAI_API_KEY in .env file and paste your OpenAI Key**

npm run dev
```

## Customization

Add new personas in data in personas.ts

## How it Works

- Choose your Preferred persona
- According to selection it's send message
- Than your can send message by typing


