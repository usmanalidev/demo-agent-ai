import React, { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Mic, MicOff, Send, Play, Pause, Volume2 } from 'lucide-react';
import { toast } from 'sonner';

interface Message {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
}

interface AIAssistantProps {
  onDemoRequest: (feature: string) => void;
}

const AIAssistant: React.FC<AIAssistantProps> = ({ onDemoRequest }) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: "Hi! I'm your YouTube demo assistant. I can show you how YouTube works and answer any questions you have about the platform. Try asking me about features like 'Show me how video recommendations work' or 'How do I upload a video?'",
      isUser: false,
      timestamp: new Date()
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [elevenLabsApiKey, setElevenLabsApiKey] = useState('');
  const [showApiKeyInput, setShowApiKeyInput] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const youtubeFeatures = {
    'video recommendations': 'recommendations',
    'upload': 'upload',
    'search': 'search',
    'comments': 'comments',
    'subscriptions': 'subscriptions',
    'playlist': 'playlist',
    'live streaming': 'live',
    'monetization': 'monetization',
    'analytics': 'analytics',
    'shorts': 'shorts'
  };

  const generateResponse = (userMessage: string): string => {
    const lowerMessage = userMessage.toLowerCase();
    
    // Check for demo requests
    for (const [keyword, feature] of Object.entries(youtubeFeatures)) {
      if (lowerMessage.includes(keyword)) {
        setTimeout(() => onDemoRequest(feature), 1000);
        return `Great! Let me show you how ${keyword} work on YouTube. I'll start the demo for you right now.`;
      }
    }

    // General responses about YouTube
    if (lowerMessage.includes('how') && lowerMessage.includes('youtube')) {
      return "YouTube is a video sharing platform where users can upload, watch, and interact with video content. It uses advanced algorithms to recommend videos based on your viewing history, likes, and preferences. Would you like me to demonstrate any specific feature?";
    }

    if (lowerMessage.includes('algorithm')) {
      return "YouTube's recommendation algorithm analyzes your viewing history, engagement patterns, search queries, and user behavior to suggest relevant videos. It considers factors like watch time, likes, comments, and shares to personalize your experience.";
    }

    if (lowerMessage.includes('creator') || lowerMessage.includes('channel')) {
      return "YouTube creators can build their channels by consistently uploading quality content, engaging with their audience, and using YouTube's Creator Studio tools. The platform offers monetization through ads, memberships, and Super Chat.";
    }

    if (lowerMessage.includes('subscribe') || lowerMessage.includes('notification')) {
      return "Subscribing to a channel keeps you updated with new content. You can turn on notifications to get alerts when your favorite creators upload. The bell icon lets you customize notification preferences.";
    }

    // Default responses
    const responses = [
      "That's an interesting question about YouTube! The platform has many features designed to enhance user experience. Would you like me to demonstrate any specific functionality?",
      "YouTube continuously evolves to serve both viewers and creators better. Which aspect of the platform would you like to explore?",
      "Great question! YouTube's ecosystem includes features for discovery, creation, and community building. What would you like to learn more about?"
    ];

    return responses[Math.floor(Math.random() * responses.length)];
  };

  const speakText = async (text: string) => {
    if (!elevenLabsApiKey) {
      setShowApiKeyInput(true);
      toast.error("Please provide your ElevenLabs API key to enable voice features");
      return;
    }

    try {
      setIsSpeaking(true);
      const response = await fetch('https://api.elevenlabs.io/v1/text-to-speech/9BWtsMINqrJLrRacOk9x', {
        method: 'POST',
        headers: {
          'Accept': 'audio/mpeg',
          'Content-Type': 'application/json',
          'xi-api-key': elevenLabsApiKey
        },
        body: JSON.stringify({
          text: text,
          model_id: "eleven_multilingual_v2",
          voice_settings: {
            stability: 0.5,
            similarity_boost: 0.75
          }
        })
      });

      if (!response.ok) {
        throw new Error('Failed to generate speech');
      }

      const audioBlob = await response.blob();
      const audioUrl = URL.createObjectURL(audioBlob);
      const audio = new Audio(audioUrl);
      
      audio.onended = () => {
        setIsSpeaking(false);
        URL.revokeObjectURL(audioUrl);
      };
      
      await audio.play();
    } catch (error) {
      console.error('Speech synthesis error:', error);
      setIsSpeaking(false);
      toast.error("Failed to play audio. Please check your API key.");
    }
  };

  const handleSendMessage = async () => {
    if (!inputText.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputText,
      isUser: true,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputText('');
    setIsLoading(true);

    // Simulate AI thinking time
    setTimeout(() => {
      const responseText = generateResponse(inputText);
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: responseText,
        isUser: false,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, aiMessage]);
      setIsLoading(false);

      // Auto-speak AI response if API key is available
      if (elevenLabsApiKey) {
        speakText(responseText);
      }
    }, 1500);
  };

  const startListening = () => {
    if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
      toast.error("Speech recognition not supported in this browser");
      return;
    }

    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    
    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.lang = 'en-US';

    recognition.onstart = () => {
      setIsListening(true);
    };

    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      setInputText(transcript);
      setIsListening(false);
    };

    recognition.onerror = () => {
      setIsListening(false);
      toast.error("Speech recognition error");
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    recognition.start();
  };

  return (
    <div className="flex flex-col h-[600px] bg-card rounded-lg border shadow-elegant">
      {/* Header */}
      <div className="p-4 border-b bg-gradient-primary rounded-t-lg">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold text-primary-foreground">YouTube AI Assistant</h2>
          <div className="flex items-center gap-2">
            <Volume2 className="w-5 h-5 text-primary-foreground" />
            {isSpeaking && <div className="w-2 h-2 bg-primary-foreground rounded-full animate-pulse-glow" />}
          </div>
        </div>
        
        {showApiKeyInput && (
          <div className="mt-3 flex gap-2">
            <Input
              type="password"
              placeholder="Enter ElevenLabs API Key"
              value={elevenLabsApiKey}
              onChange={(e) => setElevenLabsApiKey(e.target.value)}
              className="flex-1 bg-white/20 border-white/30 text-primary-foreground placeholder:text-primary-foreground/70"
            />
            <Button 
              onClick={() => setShowApiKeyInput(false)}
              variant="secondary"
              size="sm"
            >
              Save
            </Button>
          </div>
        )}
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}
          >
            <Card className={`max-w-[80%] p-3 ${
              message.isUser 
                ? 'bg-primary text-primary-foreground' 
                : 'bg-muted'
            }`}>
              <p className="text-sm">{message.text}</p>
              {!message.isUser && elevenLabsApiKey && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => speakText(message.text)}
                  className="mt-2 p-1 h-auto"
                  disabled={isSpeaking}
                >
                  {isSpeaking ? <Pause className="w-3 h-3" /> : <Play className="w-3 h-3" />}
                </Button>
              )}
            </Card>
          </div>
        ))}
        
        {isLoading && (
          <div className="flex justify-start">
            <Card className="bg-muted p-3">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-primary rounded-full animate-bounce" />
                <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0.1s' }} />
                <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
              </div>
            </Card>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="p-4 border-t">
        <div className="flex gap-2">
          <Input
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="Ask me about YouTube features..."
            className="flex-1"
            onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
          />
          <Button
            onClick={startListening}
            variant="outline"
            size="icon"
            disabled={isListening}
            className={isListening ? 'animate-pulse-glow' : ''}
          >
            {isListening ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
          </Button>
          <Button onClick={handleSendMessage} disabled={!inputText.trim() || isLoading}>
            <Send className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AIAssistant;