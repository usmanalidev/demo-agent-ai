import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Play, 
  ThumbsUp, 
  ThumbsDown, 
  Share, 
  Download, 
  MoreVertical,
  Search,
  Upload,
  Bell,
  User,
  Settings,
  Menu,
  Home,
  TrendingUp,
  Users,
  Library
} from 'lucide-react';

interface YouTubeDemoPanelProps {
  currentDemo: string | null;
}

const YouTubeDemoPanel: React.FC<YouTubeDemoPanelProps> = ({ currentDemo }) => {
  const [highlightedElement, setHighlightedElement] = useState<string | null>(null);

  useEffect(() => {
    if (currentDemo) {
      // Simulate highlighting different elements based on the demo
      const sequence = getDemoSequence(currentDemo);
      let index = 0;
      
      const highlightInterval = setInterval(() => {
        if (index < sequence.length) {
          setHighlightedElement(sequence[index]);
          index++;
        } else {
          clearInterval(highlightInterval);
          setHighlightedElement(null);
        }
      }, 2000);

      return () => clearInterval(highlightInterval);
    }
  }, [currentDemo]);

  const getDemoSequence = (demo: string): string[] => {
    switch (demo) {
      case 'search':
        return ['search-bar', 'search-results', 'filters'];
      case 'upload':
        return ['upload-button', 'upload-form', 'settings'];
      case 'recommendations':
        return ['recommended-videos', 'homepage', 'sidebar'];
      case 'subscriptions':
        return ['subscribe-button', 'bell-icon', 'subscriptions-page'];
      default:
        return [];
    }
  };

  const isHighlighted = (element: string) => highlightedElement === element;

  return (
    <div className="bg-youtube-dark text-white rounded-lg overflow-hidden shadow-elegant">
      {/* YouTube Header */}
      <div className="bg-youtube-dark border-b border-youtube-light p-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" className="text-white hover:bg-youtube-light">
              <Menu className="w-5 h-5" />
            </Button>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-youtube-red rounded flex items-center justify-center">
                <Play className="w-4 h-4 text-white fill-white" />
              </div>
              <span className="text-xl font-bold">YouTube</span>
            </div>
          </div>
          
          <div className={`flex-1 max-w-md mx-8 ${isHighlighted('search-bar') ? 'ring-2 ring-primary animate-pulse-glow' : ''}`}>
            <div className="flex">
              <input
                type="text"
                placeholder="Search"
                className="flex-1 px-4 py-2 bg-youtube-light border border-gray-600 rounded-l-full text-white placeholder-gray-400 focus:outline-none focus:border-blue-500"
              />
              <Button className="px-6 py-2 bg-gray-700 border border-gray-600 border-l-0 rounded-r-full hover:bg-gray-600">
                <Search className="w-4 h-4" />
              </Button>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <Button 
              variant="ghost" 
              size="icon" 
              className={`text-white hover:bg-youtube-light ${isHighlighted('upload-button') ? 'ring-2 ring-primary animate-pulse-glow' : ''}`}
            >
              <Upload className="w-5 h-5" />
            </Button>
            <Button 
              variant="ghost" 
              size="icon" 
              className={`text-white hover:bg-youtube-light ${isHighlighted('bell-icon') ? 'ring-2 ring-primary animate-pulse-glow' : ''}`}
            >
              <Bell className="w-5 h-5" />
            </Button>
            <Button variant="ghost" size="icon" className="text-white hover:bg-youtube-light">
              <User className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </div>

      <div className="flex">
        {/* Sidebar */}
        <div className={`w-60 bg-youtube-dark border-r border-youtube-light p-2 ${isHighlighted('sidebar') ? 'ring-2 ring-primary animate-pulse-glow' : ''}`}>
          <div className="space-y-1">
            <Button variant="ghost" className="w-full justify-start text-white hover:bg-youtube-light">
              <Home className="w-5 h-5 mr-3" />
              Home
            </Button>
            <Button variant="ghost" className="w-full justify-start text-white hover:bg-youtube-light">
              <TrendingUp className="w-5 h-5 mr-3" />
              Trending
            </Button>
            <Button 
              variant="ghost" 
              className={`w-full justify-start text-white hover:bg-youtube-light ${isHighlighted('subscriptions-page') ? 'ring-2 ring-primary animate-pulse-glow' : ''}`}
            >
              <Users className="w-5 h-5 mr-3" />
              Subscriptions
            </Button>
            <Button variant="ghost" className="w-full justify-start text-white hover:bg-youtube-light">
              <Library className="w-5 h-5 mr-3" />
              Library
            </Button>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 p-4">
          {currentDemo === 'search' && (
            <div className={`space-y-4 ${isHighlighted('search-results') ? 'ring-2 ring-primary animate-pulse-glow' : ''}`}>
              <div className={`flex gap-2 mb-4 ${isHighlighted('filters') ? 'ring-2 ring-primary animate-pulse-glow' : ''}`}>
                <Badge variant="secondary">All</Badge>
                <Badge variant="outline">Today</Badge>
                <Badge variant="outline">This week</Badge>
                <Badge variant="outline">This month</Badge>
              </div>
              {[1, 2, 3].map(i => (
                <Card key={i} className="bg-youtube-light border-gray-600 p-3">
                  <div className="flex gap-3">
                    <div className="w-40 h-24 bg-gray-700 rounded flex items-center justify-center">
                      <Play className="w-8 h-8 text-white" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-white font-medium">Search Result Video {i}</h3>
                      <p className="text-gray-400 text-sm mt-1">Channel Name • 1M views • 2 days ago</p>
                      <p className="text-gray-300 text-sm mt-2">Video description that matches your search query...</p>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          )}

          {currentDemo === 'upload' && (
            <div className={`max-w-2xl mx-auto ${isHighlighted('upload-form') ? 'ring-2 ring-primary animate-pulse-glow' : ''}`}>
              <Card className="bg-youtube-light border-gray-600 p-6">
                <h2 className="text-xl font-bold text-white mb-4">Upload Video</h2>
                <div className="space-y-4">
                  <div className="border-2 border-dashed border-gray-600 rounded-lg p-8 text-center">
                    <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-white">Drag and drop video files to upload</p>
                    <Button className="mt-4">Select Files</Button>
                  </div>
                  <div className="space-y-3">
                    <input
                      type="text"
                      placeholder="Video title"
                      className="w-full px-3 py-2 bg-youtube-dark border border-gray-600 rounded text-white"
                    />
                    <textarea
                      placeholder="Video description"
                      rows={4}
                      className="w-full px-3 py-2 bg-youtube-dark border border-gray-600 rounded text-white"
                    />
                  </div>
                </div>
              </Card>
            </div>
          )}

          {currentDemo === 'recommendations' && (
            <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 ${isHighlighted('recommended-videos') ? 'ring-2 ring-primary animate-pulse-glow' : ''}`}>
              {[1, 2, 3, 4, 5, 6].map(i => (
                <Card key={i} className="bg-youtube-light border-gray-600 overflow-hidden">
                  <div className="aspect-video bg-gray-700 flex items-center justify-center">
                    <Play className="w-12 h-12 text-white" />
                  </div>
                  <div className="p-3">
                    <h3 className="text-white font-medium text-sm mb-1">
                      Recommended Video {i}
                    </h3>
                    <p className="text-gray-400 text-xs">Channel • 500K views • 1 day ago</p>
                  </div>
                </Card>
              ))}
            </div>
          )}

          {currentDemo === 'subscriptions' && (
            <div className="space-y-4">
              <div className={`flex items-center gap-4 p-4 bg-youtube-light rounded ${isHighlighted('subscribe-button') ? 'ring-2 ring-primary animate-pulse-glow' : ''}`}>
                <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center">
                  <User className="w-6 h-6 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="text-white font-medium">Channel Name</h3>
                  <p className="text-gray-400 text-sm">1.2M subscribers</p>
                </div>
                <Button className="bg-youtube-red hover:bg-red-600">
                  Subscribe
                </Button>
                <Button variant="ghost" size="icon" className="text-white">
                  <Bell className="w-5 h-5" />
                </Button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {[1, 2, 3, 4, 5, 6].map(i => (
                  <Card key={i} className="bg-youtube-light border-gray-600 overflow-hidden">
                    <div className="aspect-video bg-gray-700 flex items-center justify-center">
                      <Play className="w-12 h-12 text-white" />
                    </div>
                    <div className="p-3">
                      <h3 className="text-white font-medium text-sm mb-1">
                        Subscription Video {i}
                      </h3>
                      <p className="text-gray-400 text-xs">Channel • 2 hours ago</p>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {!currentDemo && (
            <div className={`text-center py-12 ${isHighlighted('homepage') ? 'ring-2 ring-primary animate-pulse-glow' : ''}`}>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {[1, 2, 3, 4, 5, 6, 7, 8].map(i => (
                  <Card key={i} className="bg-youtube-light border-gray-600 overflow-hidden">
                    <div className="aspect-video bg-gray-700 flex items-center justify-center">
                      <Play className="w-8 h-8 text-white" />
                    </div>
                    <div className="p-3">
                      <h3 className="text-white font-medium text-sm mb-1">
                        Video Title {i}
                      </h3>
                      <p className="text-gray-400 text-xs">Channel • 100K views • 3 days ago</p>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Demo Status */}
      {currentDemo && (
        <div className="bg-primary text-primary-foreground p-3 text-center">
          <p className="text-sm font-medium">
            🎬 Currently demonstrating: {currentDemo.charAt(0).toUpperCase() + currentDemo.slice(1)} Feature
          </p>
        </div>
      )}
    </div>
  );
};

export default YouTubeDemoPanel;