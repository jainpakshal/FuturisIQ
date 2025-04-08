
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Heart, Brain, Dumbbell, Coffee, Moon, Battery, Bell, AlertCircle, CheckCircle } from 'lucide-react';

// Define the wellness data interface
interface WellnessData {
  mentalClarity: number;
  energyLevel: number;
  sleepQuality: number;
  mood: string | null;
  stressLevel: number;
  lastCheckIn: Date | null;
}

export function Wellness() {
  // Load saved wellness data from localStorage or use default values
  const loadWellnessData = (): WellnessData => {
    const savedData = localStorage.getItem('wellnessData');
    if (savedData) {
      const parsedData = JSON.parse(savedData);
      return {
        ...parsedData,
        lastCheckIn: parsedData.lastCheckIn ? new Date(parsedData.lastCheckIn) : null
      };
    }
    return {
      mentalClarity: 85,
      energyLevel: 70,
      sleepQuality: 75,
      mood: null,
      stressLevel: 50,
      lastCheckIn: null
    };
  };

  const [wellnessData, setWellnessData] = useState<WellnessData>(loadWellnessData);
  const [mood, setMood] = useState<string | null>(wellnessData.mood);
  const [stressLevel, setStressLevel] = useState<number>(wellnessData.stressLevel);
  const [remindersEnabled, setRemindersEnabled] = useState<boolean>(Boolean(localStorage.getItem('remindersEnabled')));
  const [showRemindersModal, setShowRemindersModal] = useState<boolean>(false);
  const [reminderTime, setReminderTime] = useState<string>(localStorage.getItem('reminderTime') || "08:00");
  const [reminderInterval, setReminderInterval] = useState<string>(localStorage.getItem('reminderInterval') || "60");
  const [showSuccessMessage, setShowSuccessMessage] = useState<boolean>(false);
  const [successMessage, setSuccessMessage] = useState<string>('');
  const [lastCheckInTime, setLastCheckInTime] = useState<string | null>(null);
  const [showClearButton, setShowClearButton] = useState<boolean>(Boolean(mood));

  // Load wellness metrics from localStorage
  useEffect(() => {
    const savedMentalClarity = localStorage.getItem('mentalClarity');
    const savedEnergyLevel = localStorage.getItem('energyLevel');
    const savedSleepQuality = localStorage.getItem('sleepQuality');
    
    if (savedMentalClarity || savedEnergyLevel || savedSleepQuality) {
      setWellnessData(prev => ({
        ...prev,
        mentalClarity: savedMentalClarity ? parseInt(savedMentalClarity) : prev.mentalClarity,
        energyLevel: savedEnergyLevel ? parseInt(savedEnergyLevel) : prev.energyLevel,
        sleepQuality: savedSleepQuality ? parseInt(savedSleepQuality) : prev.sleepQuality,
      }));
    }
    
    // Format last check in time if available
    if (wellnessData.lastCheckIn) {
      const options: Intl.DateTimeFormatOptions = { 
        hour: '2-digit', 
        minute: '2-digit',
        day: '2-digit',
        month: 'short'
      };
      setLastCheckInTime(new Intl.DateTimeFormat('en-US', options).format(wellnessData.lastCheckIn));
    }
  }, [wellnessData.lastCheckIn]);

  const wellnessMetrics = [
    {
      icon: Brain,
      label: 'Mental Clarity',
      value: wellnessData.mentalClarity,
      color: 'bg-blue-500',
      key: 'mentalClarity',
      description: 'How clear and focused your mind feels'
    },
    {
      icon: Battery,
      label: 'Energy Level',
      value: wellnessData.energyLevel,
      color: 'bg-green-500',
      key: 'energyLevel',
      description: 'Your overall physical and mental energy'
    },
    {
      icon: Moon,
      label: 'Sleep Quality',
      value: wellnessData.sleepQuality,
      color: 'bg-purple-500',
      key: 'sleepQuality',
      description: 'How restful and rejuvenating your sleep is'
    },
  ];

  const wellnessTips = [
    {
      icon: Heart,
      title: 'Work-Life Balance',
      description: 'Set clear boundaries between work and personal time',
      action: 'Track Balance',
      handler: () => window.open('https://www.mindtools.com/pages/article/work-life-balance.htm', '_blank'),
    },
    {
      icon: Dumbbell,
      title: 'Stress Management',
      description: 'Practice mindfulness and relaxation techniques',
      action: 'Start Session',
      handler: () => window.open('https://www.headspace.com/meditation/stress', '_blank'),
    },
    {
      icon: Coffee,
      title: 'Break Reminders',
      description: 'Take regular breaks to maintain productivity',
      action: 'Set Reminder',
      handler: () => setShowRemindersModal(true),
    },
  ];

  const handleMoodSelect = (newMood: string) => {
    setMood(newMood);
    setShowClearButton(true);
  };

  const handleClearMood = () => {
    setMood(null);
    setShowClearButton(false);
  };

  const updateWellnessMetric = (key: keyof WellnessData, value: number) => {
    setWellnessData(prev => ({ ...prev, [key]: value }));
    localStorage.setItem(key, value.toString());
    
    showTemporarySuccessMessage(`${key.replace(/([A-Z])/g, ' $1').trim()} updated successfully!`);
  };

  const handleCheckInSubmit = () => {
    if (!mood) return;
    
    const updatedData = {
      ...wellnessData,
      mood,
      stressLevel,
      lastCheckIn: new Date()
    };
    
    // Save to localStorage
    localStorage.setItem('wellnessData', JSON.stringify(updatedData));
    setWellnessData(updatedData);
    
    // Format the current time
    const options: Intl.DateTimeFormatOptions = { 
      hour: '2-digit', 
      minute: '2-digit',
      day: '2-digit',
      month: 'short'
    };
    setLastCheckInTime(new Intl.DateTimeFormat('en-US', options).format(new Date()));
    
    // Show success message
    showTemporarySuccessMessage('Daily check-in saved successfully!');
  };

  const handleSetReminder = () => {
    localStorage.setItem('remindersEnabled', 'true');
    localStorage.setItem('reminderTime', reminderTime);
    localStorage.setItem('reminderInterval', reminderInterval);
    
    setRemindersEnabled(true);
    setShowRemindersModal(false);
    
    // In a real app, we would set up actual reminders here
    // For now, we'll just simulate it with localStorage
    
    // Show success message
    showTemporarySuccessMessage('Break reminders have been set!');
    
    // Schedule a demo notification after a few seconds
    setTimeout(() => {
      const notification = new Notification('Break Time!', {
        body: 'Time to take a short break to refresh your mind.',
        icon: '/favicon.ico'
      });
      
      notification.onclick = () => {
        window.focus();
        notification.close();
      };
    }, 10000);
  };
  
  const handleDisableReminders = () => {
    localStorage.removeItem('remindersEnabled');
    setRemindersEnabled(false);
    showTemporarySuccessMessage('Break reminders have been disabled');
  };

  // Request notification permission
  useEffect(() => {
    if ("Notification" in window && Notification.permission !== "granted" && Notification.permission !== "denied") {
      Notification.requestPermission();
    }
  }, []);

  const showTemporarySuccessMessage = (message: string) => {
    setSuccessMessage(message);
    setShowSuccessMessage(true);
    setTimeout(() => {
      setShowSuccessMessage(false);
    }, 3000);
  };

  return (
    <div className="max-w-4xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex items-center space-x-4 mb-8">
          <Heart className="h-8 w-8 text-rose-500" />
          <h1 className="text-3xl font-bold text-gray-900">Career Wellness Center</h1>
        </div>

        {showSuccessMessage && (
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-6 flex justify-between items-center"
          >
            <div className="flex items-center">
              <CheckCircle className="h-5 w-5 mr-2" />
              <span>{successMessage}</span>
            </div>
            <button onClick={() => setShowSuccessMessage(false)} className="text-green-700">
              <span className="sr-only">Close</span>
              <span aria-hidden="true">&times;</span>
            </button>
          </motion.div>
        )}

        <div className="grid md:grid-cols-3 gap-6 mb-8">
          {wellnessMetrics.map((metric) => (
            <div key={metric.label} className="bg-white rounded-xl shadow-md p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center">
                  <metric.icon className="h-6 w-6 text-gray-600 mr-2" />
                  <h3 className="text-lg font-semibold text-gray-900">{metric.label}</h3>
                </div>
                <span className="text-2xl font-bold text-gray-900">{metric.value}%</span>
              </div>
              <p className="text-gray-600 text-sm mb-2">{metric.description}</p>
              <div className="mt-2">
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={metric.value}
                  onChange={(e) => updateWellnessMetric(metric.key as keyof WellnessData, parseInt(e.target.value))}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                />
                <div className="flex justify-between mt-1 text-xs text-gray-500">
                  <span>Low</span>
                  <span>High</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-white rounded-xl shadow-md p-8 mb-8">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-semibold text-gray-900">Daily Wellness Check-in</h2>
            {lastCheckInTime && (
              <div className="text-sm text-gray-600 flex items-center">
                <Clock className="h-4 w-4 mr-1" />
                Last check-in: {lastCheckInTime}
              </div>
            )}
          </div>
          
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2 flex justify-between items-center">
                <span>How are you feeling today?</span>
                {showClearButton && (
                  <button 
                    onClick={handleClearMood} 
                    className="text-xs text-indigo-600 hover:text-indigo-800"
                  >
                    Clear selection
                  </button>
                )}
              </label>
              <div className="flex space-x-4">
                {['😔', '😐', '🙂', '😊', '🤗'].map((emoji) => (
                  <button
                    key={emoji}
                    onClick={() => handleMoodSelect(emoji)}
                    className={`w-12 h-12 flex items-center justify-center text-2xl rounded-lg transition-colors duration-200 ${
                      mood === emoji
                        ? 'bg-indigo-100 ring-2 ring-indigo-300'
                        : 'bg-gray-50 hover:bg-gray-100'
                    }`}
                  >
                    {emoji}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                What's your stress level? {stressLevel}%
              </label>
              <input
                type="range"
                min="0"
                max="100"
                value={stressLevel}
                onChange={(e) => setStressLevel(parseInt(e.target.value))}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
              />
              <div className="flex justify-between mt-1 text-xs text-gray-500">
                <span>Low Stress</span>
                <span>High Stress</span>
              </div>
            </div>
            <button 
              onClick={handleCheckInSubmit}
              disabled={!mood}
              className={`w-full py-2 rounded-lg ${
                mood
                  ? 'bg-rose-500 hover:bg-rose-600 text-white'
                  : 'bg-gray-200 text-gray-400 cursor-not-allowed'
              } transition-colors duration-200`}
            >
              Save Check-in
            </button>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {wellnessTips.map((tip) => (
            <div key={tip.title} className="bg-white rounded-xl shadow-md p-6">
              <div className="flex items-center space-x-3 mb-4">
                <div className="p-2 bg-rose-100 rounded-lg">
                  <tip.icon className="h-6 w-6 text-rose-500" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900">{tip.title}</h3>
              </div>
              <p className="text-gray-600 mb-4">{tip.description}</p>
              <button 
                onClick={tip.handler}
                className="w-full bg-gray-50 text-gray-700 py-2 rounded-lg hover:bg-gray-100 transition-colors duration-200"
              >
                {tip.action}
              </button>
            </div>
          ))}
        </div>
        
        {/* Reminders Modal */}
        {showRemindersModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 w-full max-w-md">
              <h3 className="text-lg font-semibold mb-4 flex items-center">
                <Bell className="h-5 w-5 mr-2 text-indigo-500" />
                Set Break Reminders
              </h3>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Start Time
                  </label>
                  <input 
                    type="time" 
                    value={reminderTime}
                    onChange={(e) => setReminderTime(e.target.value)}
                    className="w-full px-3 py-2 border rounded-md" 
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Reminder Interval (minutes)
                  </label>
                  <select
                    value={reminderInterval}
                    onChange={(e) => setReminderInterval(e.target.value)}
                    className="w-full px-3 py-2 border rounded-md"
                  >
                    <option value="30">Every 30 minutes</option>
                    <option value="60">Every hour</option>
                    <option value="90">Every 1.5 hours</option>
                    <option value="120">Every 2 hours</option>
                  </select>
                </div>
              </div>
              
              <div className="flex justify-end space-x-3 mt-6">
                <button 
                  onClick={() => setShowRemindersModal(false)}
                  className="px-4 py-2 border rounded-md text-gray-700 hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button 
                  onClick={handleSetReminder}
                  className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
                >
                  Set Reminder
                </button>
              </div>
            </div>
          </div>
        )}
        
        {remindersEnabled && (
          <div className="mt-8 bg-indigo-50 border border-indigo-200 rounded-lg p-4 flex justify-between items-center">
            <div className="flex items-center">
              <Bell className="h-5 w-5 mr-2 text-indigo-600" />
              <div>
                <p className="font-medium text-indigo-800">Break reminders are enabled</p>
                <p className="text-sm text-indigo-600">
                  You'll be reminded every {reminderInterval} minutes starting at {reminderTime}
                </p>
              </div>
            </div>
            <button 
              onClick={handleDisableReminders}
              className="text-xs bg-white px-2 py-1 rounded border border-indigo-200 text-indigo-700 hover:bg-indigo-100"
            >
              Disable
            </button>
          </div>
        )}
      </motion.div>
    </div>
  );
}

// Add this missing Clock component
function Clock(props: any) {
  return <span className={props.className}>🕒</span>;
}
