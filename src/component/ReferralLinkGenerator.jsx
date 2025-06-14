import React, { useState, useEffect } from 'react';
import { FaWhatsapp, FaCopy, FaCheck, FaUser, FaPhone, FaShareAlt, FaChartLine, FaLightbulb, FaSpinner } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';

const ReferralGenerator = () => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [referralLink, setReferralLink] = useState('');
  const [copied, setCopied] = useState(false);
  const [isGenerated, setIsGenerated] = useState(false);
  const [step, setStep] = useState(1);
  const [referralCount, setReferralCount] = useState(128);
  const [conversionRate, setConversionRate] = useState(68);
  const [phoneError, setPhoneError] = useState('');
  const [nameError, setNameError] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);

  // Simulate referral count increase
  useEffect(() => {
    const interval = setInterval(() => {
      setReferralCount(prev => prev + 1);
    }, 10000);
    
    return () => clearInterval(interval);
  }, []);

  // Validate phone number format
  const validatePhone = (number) => {
    const digits = number.replace(/\D/g, '');
    return digits.length >= 10;
  };

  // Validate name
  const validateName = (name) => {
    return name.trim().length >= 2;
  };

  const generateLink = () => {
    // Reset errors
    setNameError('');
    setPhoneError('');
    
    // Validate inputs
    let isValid = true;
    
    if (!validateName(name)) {
      setNameError('Name must be at least 2 characters');
      isValid = false;
    }
    
    if (!validatePhone(phone)) {
      setPhoneError('Please enter a valid phone number');
      isValid = false;
    }
    
    if (!isValid) {
      setStep(1);
      return;
    }
    
    setIsGenerating(true);
    
    // Simulate API call delay
    setTimeout(() => {
      const cleanPhone = phone.replace(/\D/g, '');
      const message = `Hello Codivora! I was referred by ${name.trim()} (${cleanPhone}). I'm interested in learning more about your services.`;
      const encodedMessage = encodeURIComponent(message);
      const whatsappUrl = `https://wa.me/+2349059456585?text=${encodedMessage}`;
      
      setReferralLink(whatsappUrl);
      setIsGenerated(true);
      setIsGenerating(false);
      setStep(3);
    }, 800);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(referralLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const resetForm = () => {
    setName('');
    setPhone('');
    setReferralLink('');
    setIsGenerated(false);
    setStep(1);
    setNameError('');
    setPhoneError('');
  };

  const handlePhoneChange = (e) => {
    const value = e.target.value;
    setPhone(value);
    
    // Only validate when user stops typing
    clearTimeout(phoneValidationTimeout);
    phoneValidationTimeout = setTimeout(() => {
      if (value && !validatePhone(value)) {
        setPhoneError('Please enter a valid phone number');
      } else {
        setPhoneError('');
      }
    }, 500);
  };

  const handleNameChange = (e) => {
    const value = e.target.value;
    setName(value);
    
    // Only validate when user stops typing
    clearTimeout(nameValidationTimeout);
    nameValidationTimeout = setTimeout(() => {
      if (value && !validateName(value)) {
        setNameError('Name must be at least 2 characters');
      } else {
        setNameError('');
      }
    }, 500);
  };

  // Timeout references for validation
  let phoneValidationTimeout;
  let nameValidationTimeout;

  // Cleanup timeouts on unmount
  useEffect(() => {
    return () => {
      clearTimeout(phoneValidationTimeout);
      clearTimeout(nameValidationTimeout);
    };
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 text-gray-900 font-sans">
      {/* Header */}
      <header className="pt-12 pb-8 px-4 text-center">
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex flex-col items-center"
        >
          <div className="bg-black p-4 rounded-full mb-4 shadow-xl">
            <FaWhatsapp className="text-3xl text-white" />
          </div>
          <h1 className="text-4xl font-bold tracking-tight">
            <span className="bg-gradient-to-r from-gray-800 to-black bg-clip-text text-transparent">
              Codivora
            </span>{' '}
            <span className="font-light">Referral</span>
          </h1>
          <p className="mt-3 text-gray-600 max-w-md">
            Get your referral links that shows Us the referral was from you.
          </p>
        </motion.div>
      </header>

      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Panel - Form */}
          <div className="lg:col-span-2">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden"
            >
              {/* Progress Steps */}
              <div className="flex justify-between p-6 border-b border-gray-200">
                {[1, 2, 3].map((num) => (
                  <div key={num} className="flex flex-col items-center relative">
                    {num > 1 && (
                      <div className="absolute h-0.5 bg-gray-200 top-4 -left-1/2 -right-1/2 -z-10"></div>
                    )}
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold border-2 ${
                      step >= num 
                        ? 'bg-black text-white border-black' 
                        : 'bg-white text-gray-400 border-gray-300'
                    }`}>
                      {num}
                    </div>
                    <div className="mt-2 text-xs text-gray-600">
                      {num === 1 && 'Details'}
                      {num === 2 && 'Generate'}
                      {num === 3 && 'Share'}
                    </div>
                  </div>
                ))}
              </div>
              
              {/* Form Content */}
              <div className="p-6">
                <AnimatePresence mode="wait">
                  {step === 1 && (
                    <motion.div
                      key="step1"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 20 }}
                      transition={{ duration: 0.3 }}
                      className="space-y-6"
                    >
                      <h2 className="text-xl font-semibold text-gray-800">Your Information</h2>
                      <p className="text-gray-600">
                        Provide your details to get a referral link
                      </p>
                      
                      <div className="space-y-5">
                        <div>
                          <label className="block text-gray-700 mb-2 flex items-center">
                            <FaUser className="mr-2 text-gray-500" /> Your Name
                          </label>
                          <input
                            type="text"
                            value={name}
                            onChange={handleNameChange}
                            placeholder=""
                            className={`w-full bg-gray-50 border ${nameError ? 'border-red-400' : 'border-gray-300'} rounded-xl px-4 py-3 focus:outline-none focus:ring-1 focus:ring-black focus:border-transparent`}
                          />
                          {nameError && (
                            <motion.p 
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: 'auto' }}
                              className="text-red-500 text-sm mt-1"
                            >
                              {nameError}
                            </motion.p>
                          )}
                        </div>
                        
                        <div>
                          <label className="block text-gray-700 mb-2 flex items-center">
                            <FaPhone className="mr-2 text-gray-500" /> WhatsApp Number
                          </label>
                          <input
                            type="tel"
                            value={phone}
                            onChange={handlePhoneChange}
                            placeholder=""
                            className={`w-full bg-gray-50 border ${phoneError ? 'border-red-400' : 'border-gray-300'} rounded-xl px-4 py-3 focus:outline-none focus:ring-1 focus:ring-black focus:border-transparent`}
                          />
                          <div className="flex justify-between">
                            <p className="text-xs text-gray-500 mt-2">
                              Include country code (e.g. +234 for Nigeria) optional
                            </p>
                            <div className="flex items-center">
                              {phone && validatePhone(phone) && (
                                <motion.span 
                                  initial={{ opacity: 0 }}
                                  animate={{ opacity: 1 }}
                                  className="text-green-500 text-sm flex items-center"
                                >
                                  <FaCheck className="mr-1" /> Valid
                                </motion.span>
                              )}
                            </div>
                          </div>
                          {phoneError && (
                            <motion.p 
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: 'auto' }}
                              className="text-red-500 text-sm mt-1"
                            >
                              {phoneError}
                            </motion.p>
                          )}
                        </div>
                        
                        <button
                          onClick={() => {
                            const nameValid = validateName(name);
                            const phoneValid = validatePhone(phone);
                            
                            if (!nameValid) {
                              setNameError('Name must be at least 2 characters');
                            }
                            
                            if (!phoneValid) {
                              setPhoneError('Please enter a valid phone number');
                            }
                            
                            if (nameValid && phoneValid) {
                              setStep(2);
                            }
                          }}
                          className="w-full py-3 bg-black text-white rounded-xl font-medium hover:bg-gray-800 transition-colors flex items-center justify-center"
                        >
                          Continue to Review
                        </button>
                      </div>
                    </motion.div>
                  )}
                  
                  {step === 2 && (
                    <motion.div
                      key="step2"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 20 }}
                      transition={{ duration: 0.3 }}
                      className="space-y-6"
                    >
                      <h2 className="text-xl font-semibold text-gray-800">Get Referral Link</h2>
                      <p className="text-gray-600">
                        Review your information and create your unique link
                      </p>
                      
                      <div className="bg-gray-50 p-4 rounded-xl border border-gray-200">
                        <div className="flex justify-between items-center mb-3">
                          <span className="text-gray-600">Name:</span>
                          <span className="font-medium">{name}</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-gray-600">Phone:</span>
                          <span className="font-medium">{phone}</span>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4">
                        <button
                          onClick={() => setStep(1)}
                          className="py-3 bg-white border border-gray-300 rounded-xl font-medium text-gray-800 hover:bg-gray-50 transition-colors"
                        >
                          Edit Details
                        </button>
                        <button
                          onClick={generateLink}
                          disabled={isGenerating}
                          className={`py-3 bg-black text-white rounded-xl font-medium hover:bg-gray-800 transition-colors flex items-center justify-center ${
                            isGenerating ? 'opacity-80 cursor-not-allowed' : ''
                          }`}
                        >
                          {isGenerating ? (
                            <>
                              <FaSpinner className="animate-spin mr-2" /> Creating...
                            </>
                          ) : (
                            <>
                              <FaShareAlt className="mr-2" /> Get Link
                            </>
                          )}
                        </button>
                      </div>
                    </motion.div>
                  )}
                  
                  {step === 3 && (
                    <motion.div
                      key="step3"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 20 }}
                      transition={{ duration: 0.3 }}
                      className="space-y-6"
                    >
                      <h2 className="text-xl font-semibold text-gray-800">Your Referral Link</h2>
                      <p className="text-gray-600">
                        Share this link to connect referrals directly to our WhatsApp
                      </p>
                      
                      <div className="bg-gray-50 rounded-xl border border-gray-200 overflow-hidden">
                        <div className="p-4 flex items-center justify-between">
                          <div className="overflow-x-auto">
                            <span className="text-black font-mono text-sm break-all">
                              {referralLink}
                            </span>
                          </div>
                          <button
                            onClick={copyToClipboard}
                            className="ml-4 flex-shrink-0 bg-black hover:bg-gray-800 p-2 rounded-lg text-white"
                          >
                            {copied ? <FaCheck /> : <FaCopy />}
                          </button>
                        </div>
                        {/* <div className="bg-gray-800 p-4 text-center">
                          <a
                            href={referralLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center justify-center bg-green-600 hover:bg-green-700 text-white py-2 px-6 rounded-lg font-medium transition-colors"
                          >
                            <FaWhatsapp className="mr-2" /> Test WhatsApp Link
                          </a>
                        </div> */}
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4">
                        <button
                          onClick={resetForm}
                          className="py-3 bg-white border border-gray-300 rounded-xl font-medium text-gray-800 hover:bg-gray-50 transition-colors"
                        >
                          Create New Link
                        </button>
                        <button className="py-3 bg-black text-white rounded-xl font-medium hover:bg-gray-800 transition-colors">
                          Share via Email
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          </div>
          
          {/* Right Panel - Stats and Info */}
          <div className="space-y-6">
            {/* Stats Card */}
            {/* <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.5 }}
              className="bg-white rounded-2xl shadow-xl p-6 border border-gray-200"
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-gray-800">Referral Performance</h3>
                <div className="bg-gray-100 p-2 rounded-full">
                  <FaChartLine className="text-gray-600" />
                </div>
              </div>
              
              <div className="space-y-5">
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-gray-600">Total Referrals</span>
                    <span className="font-bold text-black">{referralCount}</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <motion.div 
                      className="bg-black h-2 rounded-full"
                      initial={{ width: 0 }}
                      animate={{ width: '75%' }}
                      transition={{ duration: 1 }}
                    ></motion.div>
                  </div>
                </div>
                
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-gray-600">Conversion Rate</span>
                    <span className="font-bold text-black">{conversionRate}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <motion.div 
                      className="bg-gray-700 h-2 rounded-full"
                      initial={{ width: 0 }}
                      animate={{ width: `${conversionRate}%` }}
                      transition={{ duration: 1 }}
                    ></motion.div>
                  </div>
                </div>
                
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-gray-600">Estimated Earnings</span>
                    <span className="font-bold text-black">$2,840</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <motion.div 
                      className="bg-gray-600 h-2 rounded-full"
                      initial={{ width: 0 }}
                      animate={{ width: '45%' }}
                      transition={{ duration: 1 }}
                    ></motion.div>
                  </div>
                </div>
              </div>
            </motion.div> */}
            
            {/* How It Works */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.5 }}
              className="bg-white rounded-2xl shadow-xl p-6 border border-gray-200"
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-gray-800">How It Works</h3>
                <div className="bg-gray-100 p-2 rounded-full">
                  <FaLightbulb className="text-gray-600" />
                </div>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="bg-black text-white rounded-lg p-2 mt-1 mr-3">
                    <span className="text-sm font-bold">1</span>
                  </div>
                  <p className="text-gray-700">
                    Get your personalized referral link with your contact information
                  </p>
                </div>
                
                <div className="flex items-start">
                  <div className="bg-black text-white rounded-lg p-2 mt-1 mr-3">
                    <span className="text-sm font-bold">2</span>
                  </div>
                  <p className="text-gray-700">
                    Share the link with your network via social media, email, or messaging apps
                  </p>
                </div>
                
                <div className="flex items-start">
                  <div className="bg-black text-white rounded-lg p-2 mt-1 mr-3">
                    <span className="text-sm font-bold">3</span>
                  </div>
                  <p className="text-gray-700">
                    When clicked, it sends us a message containing your details
                  </p>
                </div>
                
                <div className="flex items-start">
                  <div className="bg-black text-white rounded-lg p-2 mt-1 mr-3">
                    <span className="text-sm font-bold">4</span>
                  </div>
                  <p className="text-gray-700">
                    Earn rewards for every successful referral that converts to a Codivora client
                  </p>
                </div>
              </div>
            </motion.div>
            
            {/* Benefits */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.5 }}
              className="bg-black text-white rounded-2xl shadow-xl p-6"
            >
              <h3 className="text-lg font-semibold mb-4">Referral Benefits</h3>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <div className="w-2 h-2 bg-white rounded-full mt-2 mr-3"></div>
                  <span>₦10000 naira for each successful referral & more</span>
                </li>
                <li className="flex items-start">
                  <div className="w-2 h-2 bg-white rounded-full mt-2 mr-3"></div>
                  <span>NOTE: referral bouns may vary depending on the service rendered from the referred clients</span>
                </li>
                
              </ul>
            </motion.div>
          </div>
        </div>
      </div>
      
      {/* Floating WhatsApp Button */}
      <motion.div
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1, duration: 0.5 }}
        className="fixed bottom-8 right-8"
      >
        <a 
          href="https://wa.me/+2349059456585" 
          target="_blank" 
          rel="noopener noreferrer"
          className="bg-green-600 hover:bg-green-700 text-white p-4 rounded-full shadow-lg flex items-center justify-center transition-colors"
        >
          <FaWhatsapp className="text-2xl" />
        </a>
      </motion.div>
      
      <footer className="py-8 text-center text-gray-600 text-sm mt-8">
        <p>© 2025 Codivora. All rights reserved. Empowering connections through technology.</p>
      </footer>
    </div>
  );
};

export default ReferralGenerator;