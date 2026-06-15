

import './App.css'
import ChatBoat from './ChatBoat'

function App() {

  return (
    <>
    <div className=" bg-slate-950 min-h-screen flex flex-col items-center justify-center p-4">

   
    
<div className="text-center max-w-[85%] sm:max-w-[65%] mx-auto">
  <span className="inline-block px-4 py-1 mb-4 text-xs font-semibold tracking-widest uppercase rounded-full bg-indigo-500/10 text-indigo-300 border border-indigo-500/20">
    AI Developer Assistant
  </span>

  <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 mb-4">
    Gemini AI Frontend Developer Chatbot
  </h1>

  <p className="text-slate-300 text-sm sm:text-lg leading-relaxed">
    An AI-powered chatbot built with{" "}
    <span className="font-semibold text-white">React.js</span> and{" "}
    <span className="font-semibold text-white">Google Gemini 2.5 Flash</span>{" "}
    that helps developers solve frontend development challenges in real time.
  </p>

  <p className="mt-4 text-slate-400 text-sm sm:text-base leading-relaxed">
    The chatbot can answer questions related to{" "}
    <span className="font-semibold text-amber-300">
      JavaScript, TypeScript, React.js, HTML, CSS, React Hooks, State
      Management, REST APIs, and Frontend Best Practices
    </span>
    . It delivers instant AI-generated responses through an interactive and
    user-friendly chat interface.
  </p>

  <p className="mt-4 text-slate-400 text-sm sm:text-base leading-relaxed">
    This project showcases practical experience with React Hooks (
    <span className="text-indigo-300">useState</span>,{" "}
    <span className="text-indigo-300">useEffect</span>,{" "}
    <span className="text-indigo-300">useRef</span>), API integration,
    asynchronous operations, state management, and responsive UI development.
  </p>

  <div className="mt-6 flex flex-wrap justify-center gap-2">
    <span className="px-3 py-1 text-xs rounded-full bg-indigo-500/10 text-indigo-300 border border-indigo-500/20">
      React.js
    </span>
    <span className="px-3 py-1 text-xs rounded-full bg-purple-500/10 text-purple-300 border border-purple-500/20">
      Gemini AI
    </span>
    <span className="px-3 py-1 text-xs rounded-full bg-pink-500/10 text-pink-300 border border-pink-500/20">
      JavaScript
    </span>
    <span className="px-3 py-1 text-xs rounded-full bg-amber-500/10 text-amber-300 border border-amber-500/20">
      REST API
    </span>
  </div>

  <p className="mt-6 text-xs sm:text-sm text-slate-500 italic">
    Designed & Developed by Amit Biswas
  </p>
</div>
   

   

     

      </div> <ChatBoat />
    </>
  )
}

export default App
