import { useState, useEffect } from 'react';
import { getRandomArticle, type Article } from './lib/articles';

function App() {
  const [userInput, setUserInput] = useState('');
  const [stage, setStage] = useState<'greeting' | 'waiting' | 'response' | 'gift'>('greeting');
  const [giftBoxY, setGiftBoxY] = useState(-200);
  const [showModal, setShowModal] = useState(false);
  const [giftLanded, setGiftLanded] = useState(false);
  const [article, setArticle] = useState<Article | null>(null);
  const [isPrivacyWish, setIsPrivacyWish] = useState(true);

  useEffect(() => {
    if (stage === 'gift') {
      setGiftBoxY(-200);
      setGiftLanded(false);
      setArticle(getRandomArticle());
      const interval = setInterval(() => {
        setGiftBoxY((prev) => {
          if (prev >= window.innerHeight / 2 - 100) {
            clearInterval(interval);
            setGiftLanded(true);
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
    if (userInput.trim()) {
      const hasPrivacy = userInput.toLowerCase().includes('privacy');
      setIsPrivacyWish(hasPrivacy);
      setStage('response');
      setTimeout(() => {
        setStage('gift');
      }, 3000);
    }
  };

  const handleGiftClick = () => {
    setShowModal(true);
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

      {stage === 'gift' && (
        <>
          {Array.from({ length: 30 }).map((_, i) => (
            <div
              key={i}
              className="fixed pointer-events-none"
              style={{
                left: `${Math.random() * 100}%`,
                top: '-10px',
                animation: `snowfall ${5 + Math.random() * 4}s linear infinite`,
                animationDelay: `${Math.random() * 2}s`,
                fontSize: `${10 + Math.random() * 10}px`,
                color: 'white',
              }}
            >
              ❄
            </div>
          ))}
        </>
      )}

      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center p-4">
        {stage === 'greeting' && (
          <div className="absolute top-8 right-8 max-w-sm animate-fade-in">
            <div className="bg-white rounded-3xl shadow-2xl p-6 relative">
              <div className="absolute -left-4 top-6 w-0 h-0 border-l-[0px] border-r-[20px] border-t-[20px] border-l-transparent border-r-transparent border-t-white"></div>
              <p className="text-2xl font-bold text-gray-800 text-center">
                Ho Ho Ho! 🎅
              </p>
              <p className="text-xl text-gray-700 mt-3 text-center">
                What's your wish for web3 ?
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
              {isPrivacyWish ? (
                <>
                  <p className="text-2xl font-bold text-blue-600 text-center">
                    Privacy! 🎯
                  </p>
                  <p className="text-xl text-gray-700 mt-3 text-center">
                    Ahhh… a privacy believer.
Few ask for this gift , even fewer understand it
                  </p>
                </>
              ) : (
                <>
                  <p className="text-2xl font-bold text-blue-600 text-center">
                    Ho ho ho…
                  </p>
                  <p className="text-lg text-gray-700 mt-3 text-center">
                    That's a lovely wish. But I've been doing this for centuries… I know what you really need.
                  </p>
                  <p className="text-xl font-bold text-blue-600 mt-4 text-center">
                    Your true wish is… PRIVACY. 🔐✨
                  </p>
                </>
              )}
            </div>
          </div>
        )}

        {stage === 'gift' && (
          <div
            className="absolute left-1/2 transform -translate-x-1/2 transition-all duration-100"
            style={{ top: `${giftBoxY}px` }}
          >
            <button
              onClick={handleGiftClick}
              className="block hover:scale-110 transition-transform duration-300 bg-transparent border-none cursor-pointer"
            >
              <img
                src="/gemini_generated_image_rxeqhlrxeqhlrxeq__1_-removebg-preview.png"
                alt="Privacy Gift"
                className="w-48 h-48 drop-shadow-2xl animate-bounce-slow"
              />
              {giftLanded && (
                <div className="mt-4 bg-white/95 rounded-2xl shadow-xl p-4 text-center animate-fade-in">
                  <p className="text-lg font-bold text-blue-600">Click to Unlock</p>
                  <p className="text-sm text-gray-600">Santa's Secret</p>
                </div>
              )}
            </button>
          </div>
        )}

        {showModal && article && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-3xl shadow-2xl p-8 max-w-md w-full animate-fade-in">
              <h2 className="text-3xl font-bold text-blue-600 mb-4 text-center">
                You unlocked Santa's Secret Scroll of Privacy!
              </h2>
              <p className="text-lg font-semibold text-gray-800 mb-4 text-center">
                {article.title}
              </p>
              <p className="text-sm text-gray-600 mb-6 text-center">
                This article will make you 1% more invisible on the blockchain
              </p>
              <div className="flex gap-3">
                <a
                  href={article.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white font-bold rounded-full text-center hover:from-blue-600 hover:to-blue-700 transition-all transform hover:scale-105"
                >
                  Read Article
                </a>
                <button
                  onClick={() => setShowModal(false)}
                  className="px-6 py-3 bg-gray-200 text-gray-800 font-bold rounded-full hover:bg-gray-300 transition-all"
                >
                  Close
                </button>
              </div>
            </div>
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

        @keyframes snowfall {
          from {
            top: -10px;
            opacity: 1;
          }
          to {
            top: 100vh;
            opacity: 0.3;
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
