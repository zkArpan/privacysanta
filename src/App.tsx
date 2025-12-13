import { useState, useEffect } from 'react';

function App() {
  const [userInput, setUserInput] = useState('');
  const [stage, setStage] = useState<'greeting' | 'waiting' | 'response' | 'gift'>('greeting');
  const [showGiftBox, setShowGiftBox] = useState(false);
  const [giftBoxY, setGiftBoxY] = useState(-200);

  useEffect(() => {
    if (stage === 'gift') {
      setShowGiftBox(true);
      const interval = setInterval(() => {
        setGiftBoxY((prev) => {
          if (prev >= window.innerHeight / 2 - 100) {
            clearInterval(interval);
            return window.innerHeight / 2 - 100;
          }
          return prev + 8;
        });
      }, 20);
      return () => clearInterval(interval);
    }
  }, [stage]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (userInput.toLowerCase().includes('privacy')) {
      setStage('response');
      setTimeout(() => {
        setStage('gift');
      }, 2000);
    }
  };

  return (
    <div className="min-h-screen w-full overflow-hidden relative bg-gradient-to-b from-sky-200 to-sky-100">
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: "url('/gemini_generated_image_6fjvk66fjvk66fjv.png')",
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      />

      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center p-4">
        {stage === 'greeting' && (
          <div className="absolute top-8 right-8 max-w-sm animate-fade-in">
            <div className="bg-white rounded-3xl shadow-2xl p-6 relative">
              <div className="absolute -left-4 top-6 w-0 h-0 border-l-[0px] border-r-[20px] border-t-[20px] border-l-transparent border-r-transparent border-t-white"></div>
              <p className="text-2xl font-bold text-gray-800 text-center">
                Ho Ho Ho! 🎅
              </p>
              <p className="text-xl text-gray-700 mt-3 text-center">
                What's your Christmas wish this year?
              </p>
            </div>
          </div>
        )}

        {(stage === 'greeting' || stage === 'waiting') && (
          <div className="absolute top-48 right-8 w-full max-w-sm px-4">
            <form onSubmit={handleSubmit} className="flex flex-col gap-3">
              <input
                type="text"
                value={userInput}
                onChange={(e) => setUserInput(e.target.value)}
                placeholder="Type your wish here..."
                className="px-6 py-4 rounded-full text-lg border-4 border-blue-400 focus:border-blue-600 focus:outline-none shadow-lg bg-white/95"
                autoFocus
              />
              <button
                type="submit"
                className="px-8 py-4 bg-gradient-to-r from-blue-500 to-blue-600 text-white font-bold rounded-full text-lg shadow-lg hover:from-blue-600 hover:to-blue-700 transition-all transform hover:scale-105"
              >
                Tell Santa
              </button>
            </form>
          </div>
        )}

        {stage === 'response' && (
          <div className="absolute top-8 right-8 max-w-sm animate-fade-in">
            <div className="bg-white rounded-3xl shadow-2xl p-6 relative">
              <div className="absolute -left-4 top-6 w-0 h-0 border-l-[0px] border-r-[20px] border-t-[20px] border-l-transparent border-r-transparent border-t-white"></div>
              <p className="text-2xl font-bold text-blue-600 text-center">
                Privacy! 🎯
              </p>
              <p className="text-xl text-gray-700 mt-3 text-center">
                An excellent wish! Here's something special for you...
              </p>
            </div>
          </div>
        )}

        {showGiftBox && (
          <div
            className="absolute left-1/2 transform -translate-x-1/2 transition-all duration-100"
            style={{ top: `${giftBoxY}px` }}
          >
            <a
              href="https://ethereum.org/en/privacy/"
              target="_blank"
              rel="noopener noreferrer"
              className="block hover:scale-110 transition-transform duration-300"
            >
              <img
                src="/gemini_generated_image_rxeqhlrxeqhlrxeq__1_-removebg-preview.png"
                alt="Privacy Gift"
                className="w-48 h-48 drop-shadow-2xl animate-bounce-slow cursor-pointer"
              />
              <div className="mt-4 bg-white/95 rounded-2xl shadow-xl p-4 text-center">
                <p className="text-lg font-bold text-blue-600">Click to Learn</p>
                <p className="text-sm text-gray-600">About Web3 Privacy</p>
              </div>
            </a>
          </div>
        )}
      </div>

      <style>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(-20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes bounce-slow {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-10px);
          }
        }

        .animate-fade-in {
          animation: fade-in 0.5s ease-out;
        }

        .animate-bounce-slow {
          animation: bounce-slow 2s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}

export default App;
