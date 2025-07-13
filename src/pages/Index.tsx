import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Youtube, Mic, MessageSquare, Sparkles, Play } from 'lucide-react';
import AIAssistant from '@/components/AIAssistant';
import YouTubeDemoPanel from '@/components/YouTubeDemoPanel';

const Index = () => {
  const [currentDemo, setCurrentDemo] = useState<string | null>(null);
  const [showAssistant, setShowAssistant] = useState(false);

  const handleDemoRequest = (feature: string) => {
    setCurrentDemo(feature);
  };

  const quickFeatures = [
    { name: 'Search', demo: 'search', icon: '🔍' },
    { name: 'Upload', demo: 'upload', icon: '📤' },
    { name: 'Recommendations', demo: 'recommendations', icon: '🎯' },
    { name: 'Subscriptions', demo: 'subscriptions', icon: '🔔' },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-primary opacity-10" />
        <div className="relative max-w-7xl mx-auto px-4 py-16">
          <div className="text-center mb-12">
            <div className="flex items-center justify-center gap-3 mb-6">
              <div className="w-16 h-16 bg-youtube-red rounded-2xl flex items-center justify-center shadow-glow">
                <Youtube className="w-8 h-8 text-white" />
              </div>
              <div className="w-16 h-16 bg-primary rounded-2xl flex items-center justify-center shadow-glow animate-pulse-glow">
                <Sparkles className="w-8 h-8 text-primary-foreground" />
              </div>
            </div>
            <h1 className="text-5xl font-bold mb-4 bg-gradient-primary bg-clip-text text-transparent">
              YouTube AI Demo Assistant
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
              Experience an interactive YouTube demo with AI-powered voice assistance. 
              Learn how YouTube works through guided demonstrations and natural conversations.
            </p>
            
            <div className="flex flex-wrap items-center justify-center gap-4 mb-8">
              <Badge className="bg-primary/10 text-primary border-primary/20 text-lg px-4 py-2">
                <Mic className="w-4 h-4 mr-2" />
                Voice Enabled
              </Badge>
              <Badge className="bg-youtube-red/10 text-youtube-red border-youtube-red/20 text-lg px-4 py-2">
                <Play className="w-4 h-4 mr-2" />
                Interactive Demos
              </Badge>
              <Badge className="bg-accent/10 text-accent border-accent/20 text-lg px-4 py-2">
                <MessageSquare className="w-4 h-4 mr-2" />
                AI Powered
              </Badge>
            </div>

            <Button 
              onClick={() => setShowAssistant(true)}
              size="lg"
              className="text-lg px-8 py-6 shadow-elegant hover:shadow-glow transition-all duration-300"
            >
              Start Demo Experience
            </Button>
          </div>

          {/* Quick Features */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
            {quickFeatures.map((feature) => (
              <Card 
                key={feature.name}
                className="p-4 text-center cursor-pointer hover:shadow-elegant transition-all duration-300 hover:scale-105"
                onClick={() => handleDemoRequest(feature.demo)}
              >
                <div className="text-2xl mb-2">{feature.icon}</div>
                <h3 className="font-medium">{feature.name}</h3>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* Main Demo Area */}
      <div className="max-w-7xl mx-auto px-4 pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* AI Assistant */}
          <div className="lg:col-span-1">
            {showAssistant ? (
              <AIAssistant onDemoRequest={handleDemoRequest} />
            ) : (
              <Card className="p-8 text-center">
                <MessageSquare className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">AI Assistant</h3>
                <p className="text-muted-foreground mb-4">
                  Click "Start Demo Experience" to begin chatting with your YouTube assistant
                </p>
                <Button 
                  onClick={() => setShowAssistant(true)}
                  variant="outline"
                >
                  Activate Assistant
                </Button>
              </Card>
            )}
          </div>

          {/* YouTube Demo Panel */}
          <div className="lg:col-span-2">
            <YouTubeDemoPanel currentDemo={currentDemo} />
          </div>
        </div>

        {/* Features Info */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
          <Card className="p-6">
            <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
              <Mic className="w-6 h-6 text-primary" />
            </div>
            <h3 className="text-xl font-semibold mb-3">Voice Interaction</h3>
            <p className="text-muted-foreground">
              Talk naturally with the AI assistant using speech recognition and text-to-speech capabilities.
            </p>
          </Card>

          <Card className="p-6">
            <div className="w-12 h-12 bg-youtube-red/10 rounded-lg flex items-center justify-center mb-4">
              <Play className="w-6 h-6 text-youtube-red" />
            </div>
            <h3 className="text-xl font-semibold mb-3">Interactive Demos</h3>
            <p className="text-muted-foreground">
              Watch live demonstrations of YouTube features with highlighted elements and step-by-step guides.
            </p>
          </Card>

          <Card className="p-6">
            <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center mb-4">
              <Sparkles className="w-6 h-6 text-accent" />
            </div>
            <h3 className="text-xl font-semibold mb-3">Smart Assistance</h3>
            <p className="text-muted-foreground">
              Get intelligent answers about YouTube's features, algorithms, and best practices for creators.
            </p>
          </Card>
        </div>

        {/* Instructions */}
        {showAssistant && (
          <Card className="mt-12 p-6 bg-primary/5 border-primary/20">
            <h3 className="text-lg font-semibold mb-3 text-primary">How to Use</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div>
                <p className="font-medium mb-2">🎤 Voice Commands:</p>
                <ul className="space-y-1 text-muted-foreground">
                  <li>• "Show me how search works"</li>
                  <li>• "How do I upload a video?"</li>
                  <li>• "Explain video recommendations"</li>
                </ul>
              </div>
              <div>
                <p className="font-medium mb-2">💬 Text Questions:</p>
                <ul className="space-y-1 text-muted-foreground">
                  <li>• Ask about YouTube algorithms</li>
                  <li>• Learn about monetization</li>
                  <li>• Understand creator tools</li>
                </ul>
              </div>
            </div>
          </Card>
        )}
      </div>
    </div>
  );
};

export default Index;
