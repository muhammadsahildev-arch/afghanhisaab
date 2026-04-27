import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Download, X } from 'lucide-react';

const PWAPrompt = () => {
  const [showPrompt, setShowPrompt] = useState(false);
  const [deferredPrompt, setDeferredPrompt] = useState(null);

  useEffect(() => {
    const hasPrompted = localStorage.getItem('pwaPromptShown');
    
    if (!hasPrompted) {
      const handleBeforeInstallPrompt = (e) => {
        e.preventDefault();
        setDeferredPrompt(e);
        
        setTimeout(() => {
          setShowPrompt(true);
        }, 5000);
      };

      window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

      window.addEventListener('appinstalled', () => {
        setShowPrompt(false);
        localStorage.setItem('pwaPromptShown', 'true');
        console.log('PWA installed successfully');
      });

      return () => {
        window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
      };
    }
  }, []);

  const handleInstall = async () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      
      if (outcome === 'accepted') {
        console.log('User accepted the install prompt');
        localStorage.setItem('pwaPromptShown', 'true');
      }
      
      setDeferredPrompt(null);
    }
    setShowPrompt(false);
  };

  const handleDismiss = () => {
    setShowPrompt(false);
    localStorage.setItem('pwaPromptShown', 'true');
  };

  return (
    <AnimatePresence>
      {showPrompt && (
        <motion.div
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 100 }}
          className="fixed bottom-4 left-4 right-4 md:left-auto md:right-4 md:bottom-4 md:max-w-md z-50"
        >
          <div className="bg-black rounded-2xl border border-gray-800 shadow-2xl overflow-hidden">
            <div className="p-4">
              <div className="flex items-start justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-red-500 rounded-xl flex items-center justify-center text-white font-bold text-xl">
                    W
                  </div>
                  <div>
                    <h3 className="text-white font-semibold">Install WatanHiSaab</h3>
                    <p className="text-gray-400 text-sm">
                      Install app for better experience
                    </p>
                  </div>
                </div>
                <button
                  onClick={handleDismiss}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  <X size={20} />
                </button>
              </div>

              <div className="mt-4 space-y-2">
                <ul className="text-gray-400 text-sm space-y-1">
                  <li className="flex items-center space-x-2">
                    <span className="w-1.5 h-1.5 bg-green-500 rounded-full"></span>
                    <span>Fast access from home screen</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <span className="w-1.5 h-1.5 bg-red-500 rounded-full"></span>
                    <span>Works offline</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <span className="w-1.5 h-1.5 bg-green-500 rounded-full"></span>
                    <span>Get notifications</span>
                  </li>
                </ul>
              </div>

              <div className="flex gap-3 mt-4">
                <button
                  onClick={handleInstall}
                  className="flex-1 bg-gradient-to-r from-green-500 to-green-600 text-white py-2 rounded-xl font-medium hover:from-green-600 hover:to-green-700 transition-all duration-300 flex items-center justify-center space-x-2"
                >
                  <Download size={18} />
                  <span>Install Now</span>
                </button>
                <button
                  onClick={handleDismiss}
                  className="flex-1 bg-gray-900 text-gray-400 py-2 rounded-xl font-medium hover:bg-gray-800 transition-all duration-300"
                >
                  Maybe Later
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default PWAPrompt;