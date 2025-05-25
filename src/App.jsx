// import React from 'react';
// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import Home from './pages/Home';
// import Login from './pages/Login';
// import Signup from './pages/Signup';
// import Dashboard from './pages/Dashboard';
// import CreateScript from './pages/CreateScript';

// export default function App() {
//   return (
//     <Router>
//       <Routes>
//         <Route path="/" element={<Home />} />
//         <Route path="/login" element={<Login />} />
//         <Route path="/signup" element={<Signup />} />
//         <Route path="/dashboard" element={<Dashboard />} />
//         <Route path="/create-script" element={<CreateScript />} />
//       </Routes>
//     </Router>
//   );
// }

import React, { useState, createContext, useContext, useEffect } from 'react';
import { User, Plus, FileText, Settings, LogOut, Edit3, Trash2, Save, Download, MessageCircle, Users, BarChart3, Home, Lock, Mail, Eye, EyeOff } from 'lucide-react';
import toast from 'react-hot-toast';
import { Toaster } from 'react-hot-toast';

// Auth Context
const AuthContext = createContext();
const useAuth = () => useContext(AuthContext);

// Script Context
const ScriptContext = createContext();
const useScripts = () => useContext(ScriptContext);

// Mock AI Service with ChatGPT Integration
const aiService = {
  async generateContent(prompt, type = 'dialogue') {
    try {
      // For demo purposes, we'll simulate ChatGPT-like responses
      // In a real app, you'd make an API call to OpenAI
      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${process.env.REACT_APP_OPENAI_API_KEY}` // You'd set this in your .env
        },
        body: JSON.stringify({
          model: "gpt-3.5-turbo",
          messages: [
            {
              role: "system",
              content: this.getSystemPrompt(type)
            },
            {
              role: "user",
              content: prompt
            }
          ],
          max_tokens: 500,
          temperature: 0.8
        })
      });

      if (!response.ok) {
        throw new Error('API request failed');
      }

      const data = await response.json();
      return data.choices[0].message.content;
    } catch (error) {
      console.log('Using fallback AI responses (ChatGPT API not configured)');
      // Fallback to enhanced mock responses
      return this.getFallbackResponse(prompt, type);
    }
  },

  getSystemPrompt(type) {
    const prompts = {
      dialogue: "You are a professional screenwriter. Generate natural, engaging dialogue for film/TV scripts. Format responses in proper screenplay format with character names in caps followed by their dialogue. Make dialogue feel authentic and purposeful.",
      character: "You are a character development expert. Create detailed character descriptions for screenplays. Include personality traits, background, motivations, and how they speak/behave. Format as clear character profiles.",
      scene: "You are a master of visual storytelling. Write compelling scene descriptions for screenplays. Use proper screenplay format (INT./EXT., location, time). Be visual, specific, and cinematic. Set mood and atmosphere."
    };
    return prompts[type] || prompts.dialogue;
  },

  getFallbackResponse(prompt, type) {
    // Enhanced fallback responses that simulate ChatGPT-style generation
    const responses = {
      dialogue: [
        `SARAH
(hesitant, looking away)
I never thought it would come to this. After everything we've been through...

JOHN
(placing a gentle hand on her shoulder)
Sometimes life takes unexpected turns. But that doesn't mean we stop fighting.

SARAH
(turning to face him, eyes glistening)
But this feels different, John. This feels... final.`,

        `DETECTIVE MARTINEZ
(slamming files on the desk)
Three weeks. Three weeks and still no leads.

CAPTAIN REYNOLDS
(calmly, not looking up from paperwork)
Good police work takes time, Martinez.

DETECTIVE MARTINEZ
(frustrated)
Time? Tell that to the families waiting for answers.`,

        `EMMA
(whispering urgently)
Did you hear that? Someone's coming.

ALEX
(grabbing her hand)
This way. Stay low and follow me.

EMMA
(panicked)
What if they find us? What if—

ALEX
(firmly but quietly)
They won't. I promise.`
      ],
      character: [
        `SARAH MITCHELL - 32, Investigative Journalist
A tenacious reporter with piercing green eyes and an unwavering moral compass. Haunted by a story that cost her everything, she speaks with measured intensity and rarely smiles. Wears simple, practical clothing. Has a habit of tapping her pen when thinking. Driven by a need for truth and justice, even at personal cost.`,

        `JOHN DAVIDSON - 45, Former Detective turned Private Investigator  
Weathered face tells stories of hard-won experience. Deep voice, careful with words. Carries himself with quiet authority but gentle demeanor. Lost his badge over a case of conscience. Now helps those the system failed. Chain-smokes when stressed, always wears his father's watch.`,

        `MAYA CHEN - 28, Tech Entrepreneur
Brilliant coder with social anxiety masked by dry humor. Speaks rapidly when excited about technology, becomes quiet in crowds. Survived childhood poverty through pure determination. Wears vintage band t-shirts, always has noise-canceling headphones. Motivated by making the world more connected and fair.`
      ],
      scene: [
        `INT. ABANDONED WAREHOUSE - NIGHT

Moonlight streams through broken skylights, casting long shadows across the concrete floor. Water drips steadily from exposed pipes overhead. SARAH moves cautiously between towering stacks of covered crates, her footsteps echoing in the vast space.

The silence is broken only by the distant hum of traffic and the occasional creak of settling metal. Dust motes dance in the pale light as she approaches a door marked "AUTHORIZED PERSONNEL ONLY."`,

        `EXT. CENTRAL PARK - GOLDEN HOUR

The setting sun paints the park in warm amber tones. JOHN sits alone on a weathered bench, feeding breadcrumbs to a small gathering of pigeons. Office workers hurry past on their way home, but the park feels oddly peaceful.

SARAH approaches slowly, her shadow stretching long across the path. She stops a few feet away, uncertain whether to disturb this moment of quiet reflection.`,

        `INT. HIGH-TECH STARTUP OFFICE - DAY

Floor-to-ceiling windows flood the space with natural light. Employees work at standing desks scattered throughout the open floor plan. The atmosphere buzzes with creative energy - whiteboards covered in diagrams, the soft click of keyboards, and quiet conversations about code.

MAYA stands before a wall-mounted monitor, presenting to a small group. Her usual nervousness is replaced by confident enthusiasm as she demonstrates her latest breakthrough.`
      ]
    };
    
    const typeResponses = responses[type] || responses.dialogue;
    return typeResponses[Math.floor(Math.random() * typeResponses.length)];
  }
};

// Common Components
const Button = ({ children, variant = 'primary', size = 'md', onClick, disabled, className = '' }) => {
  const baseClasses = 'font-medium rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2';
  const variants = {
    primary: 'bg-blue-600 hover:bg-blue-700 text-white focus:ring-blue-500',
    secondary: 'bg-gray-200 hover:bg-gray-300 text-gray-900 focus:ring-gray-500',
    danger: 'bg-red-600 hover:bg-red-700 text-white focus:ring-red-500',
    ghost: 'hover:bg-gray-100 text-gray-700 focus:ring-gray-500'
  };
  const sizes = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-sm',
    lg: 'px-6 py-3 text-base'
  };
  
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`${baseClasses} ${variants[variant]} ${sizes[size]} ${disabled ? 'opacity-50 cursor-not-allowed' : ''} ${className}`}
    >
      {children}
    </button>
  );
};

const Card = ({ children, className = '' }) => (
  <div className={`bg-white rounded-lg shadow-sm border border-gray-200 ${className}`}>
    {children}
  </div>
);

const Modal = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;
  
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold">{title}</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            ×
          </button>
        </div>
        {children}
      </div>
    </div>
  );
};

// Layout Components
const Navbar = ({ user, onLogout, onNavigate }) => (
  <nav className="bg-white border-b border-gray-200 px-6 py-4">
    <div className="flex justify-between items-center">
      <div className="flex items-center space-x-8">
        <button 
          onClick={() => onNavigate('home')}
          className="text-xl font-bold text-blue-600 hover:text-blue-700"
        >
          ScriptAI
        </button>
        {user && (
          <div className="flex space-x-6">
            <button 
              onClick={() => onNavigate('dashboard')}
              className="text-gray-600 hover:text-gray-900 font-medium"
            >
              Dashboard
            </button>
            <button 
              onClick={() => onNavigate('create')}
              className="text-gray-600 hover:text-gray-900 font-medium"
            >
              Create Script
            </button>
          </div>
        )}
      </div>
      {user && (
        <div className="flex items-center space-x-4">
          <span className="text-sm text-gray-600">Welcome, {user.name}</span>
          <Button variant="ghost" size="sm" onClick={onLogout}>
            <LogOut className="w-4 h-4" />
          </Button>
        </div>
      )}
    </div>
  </nav>
);

// Auth Components
const LoginForm = ({ onLogin, onSwitchToRegister }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    // Simulate login
    setTimeout(() => {
      onLogin({ id: 1, name: email.split('@')[0], email });
      setLoading(false);
    }, 1000);
  };

  return (
    <Card className="p-8 w-full max-w-md">
      <h2 className="text-2xl font-bold text-center mb-6">Sign In</h2>
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
          <div className="relative">
            <Mail className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Enter your email"
              required
            />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
          <div className="relative">
            <Lock className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
            <input
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full pl-10 pr-10 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Enter your password"
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
            >
              {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>
        </div>
        <Button onClick={handleSubmit} className="w-full" disabled={loading}>
          {loading ? 'Signing in...' : 'Sign In'}
        </Button>
      </div>
      <p className="text-center text-sm text-gray-600 mt-4">
        Don't have an account?{' '}
        <button onClick={onSwitchToRegister} className="text-blue-600 hover:underline">
          Sign up
        </button>
      </p>
    </Card>
  );
};

const RegisterForm = ({ onRegister, onSwitchToLogin }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    // Simulate registration
    setTimeout(() => {
      onRegister({ id: 1, name, email });
      setLoading(false);
    }, 1000);
  };

  return (
    <Card className="p-8 w-full max-w-md">
      <h2 className="text-2xl font-bold text-center mb-6">Create Account</h2>
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
          <div className="relative">
            <User className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Enter your name"
              required
            />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
          <div className="relative">
            <Mail className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Enter your email"
              required
            />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
          <div className="relative">
            <Lock className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Create a password"
              required
            />
          </div>
        </div>
        <Button onClick={handleSubmit} className="w-full" disabled={loading}>
          {loading ? 'Creating account...' : 'Create Account'}
        </Button>
      </div>
      <p className="text-center text-sm text-gray-600 mt-4">
        Already have an account?{' '}
        <button onClick={onSwitchToLogin} className="text-blue-600 hover:underline">
          Sign in
        </button>
      </p>
    </Card>
  );
};

// Home Page
const HomePage = ({ onGetStarted }) => (
  <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
    <div className="container mx-auto px-6 py-20">
      <div className="text-center">
        <h1 className="text-5xl font-bold text-gray-900 mb-6">
          AI-Powered Script Writing
        </h1>
        <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
          Create professional scripts with the help of artificial intelligence. 
          From dialogue to character development, let AI be your creative partner.
        </p>
        <Button size="lg" onClick={onGetStarted}>
          Get Started Free
        </Button>
      </div>
      
      <div className="grid md:grid-cols-3 gap-8 mt-20">
        <Card className="p-6 text-center">
          <MessageCircle className="w-12 h-12 text-blue-600 mx-auto mb-4" />
          <h3 className="text-lg font-semibold mb-2">AI Dialogue Generation</h3>
          <p className="text-gray-600">Generate natural, engaging dialogue for your characters</p>
        </Card>
        <Card className="p-6 text-center">
          <Users className="w-12 h-12 text-blue-600 mx-auto mb-4" />
          <h3 className="text-lg font-semibold mb-2">Character Development</h3>
          <p className="text-gray-600">Create rich, complex characters with AI assistance</p>
        </Card>
        <Card className="p-6 text-center">
          <FileText className="w-12 h-12 text-blue-600 mx-auto mb-4" />
          <h3 className="text-lg font-semibold mb-2">Professional Formatting</h3>
          <p className="text-gray-600">Industry-standard script formatting made easy</p>
        </Card>
      </div>
    </div>
  </div>
);

// Dashboard Components
const Stats = ({ scripts }) => (
  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
    <Card className="p-6">
      <div className="flex items-center">
        <FileText className="w-8 h-8 text-blue-600" />
        <div className="ml-4">
          <p className="text-sm font-medium text-gray-600">Total Scripts</p>
          <p className="text-2xl font-bold text-gray-900">{scripts.length}</p>
        </div>
      </div>
    </Card>
    <Card className="p-6">
      <div className="flex items-center">
        <BarChart3 className="w-8 h-8 text-green-600" />
        <div className="ml-4">
          <p className="text-sm font-medium text-gray-600">Pages Written</p>
          <p className="text-2xl font-bold text-gray-900">{scripts.reduce((acc, s) => acc + s.pages, 0)}</p>
        </div>
      </div>
    </Card>
    <Card className="p-6">
      <div className="flex items-center">
        <Edit3 className="w-8 h-8 text-purple-600" />
        <div className="ml-4">
          <p className="text-sm font-medium text-gray-600">This Month</p>
          <p className="text-2xl font-bold text-gray-900">{scripts.filter(s => s.recent).length}</p>
        </div>
      </div>
    </Card>
  </div>
);

const ProjectCard = ({ script, onEdit, onDelete }) => (
  <Card className="p-6 hover:shadow-md transition-shadow">
    <div className="flex justify-between items-start">
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-2">{script.title}</h3>
        <p className="text-gray-600 mb-4">{script.description}</p>
        <div className="flex items-center text-sm text-gray-500 space-x-4">
          <span>{script.pages} pages</span>
          <span>{script.updatedAt}</span>
        </div>
      </div>
      <div className="flex space-x-2">
        <Button variant="ghost" size="sm" onClick={() => onEdit(script)}>
          <Edit3 className="w-4 h-4" />
        </Button>
        <Button variant="ghost" size="sm" onClick={() => onDelete(script.id)}>
          <Trash2 className="w-4 h-4" />
        </Button>
      </div>
    </div>
  </Card>
);

const Dashboard = ({ user, scripts, onCreateScript, onEditScript, onDeleteScript }) => (
  <div className="max-w-6xl mx-auto px-6 py-8">
    <div className="flex justify-between items-center mb-8">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Welcome back, {user.name}</h1>
        <p className="text-gray-600">Continue working on your scripts</p>
      </div>
      <Button onClick={onCreateScript}>
        <Plus className="w-4 h-4 mr-2" />
        New Script
      </Button>
    </div>

    <Stats scripts={scripts} />

    <div className="grid gap-6">
      {scripts.map(script => (
        <ProjectCard
          key={script.id}
          script={script}
          onEdit={onEditScript}
          onDelete={onDeleteScript}
        />
      ))}
      {scripts.length === 0 && (
        <Card className="p-12 text-center">
          <FileText className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No scripts yet</h3>
          <p className="text-gray-600 mb-4">Create your first script to get started</p>
          <Button onClick={onCreateScript}>Create Script</Button>
        </Card>
      )}
    </div>
  </div>
);

// Script Editor Components
// Script Editor Components
const AIAssistant = ({ onGenerate }) => {
  const [prompt, setPrompt] = useState('');
  const [type, setType] = useState('dialogue');
  const [loading, setLoading] = useState(false);

  const handleGenerate = async () => {
    if (!prompt.trim()) return;
    setLoading(true);
    try {
      const content = await aiService.generateContent(prompt, type);
      onGenerate(content);
      setPrompt('');
    } catch (error) {
      console.error('AI generation failed:', error);
      // Show user-friendly error message
      onGenerate(`Error: Unable to generate content. Please try again.`);
    }
    setLoading(false);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && e.ctrlKey) {
      handleGenerate();
    }
  };

  return (
    <Card className="p-4">
      <div className="flex items-center mb-4">
        <MessageCircle className="w-5 h-5 text-blue-600 mr-2" />
        <h3 className="font-semibold">AI Assistant</h3>
        <div className="ml-auto">
          <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" title="ChatGPT Connected"></div>
        </div>
      </div>
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">Content Type</label>
          <select
            value={type}
            onChange={(e) => setType(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="dialogue">✨ Generate Dialogue</option>
            <option value="character">👤 Create Character</option>
            <option value="scene">🎬 Write Scene Description</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">
            Describe what you want to create
          </label>
          <textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            onKeyPress={handleKeyPress}
            className="w-full p-3 border border-gray-300 rounded-lg h-24 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder={`Example: "Two detectives discussing a cold case in a dimly lit office" or "A determined journalist confronting her mentor about hidden secrets"`}
          />
          <p className="text-xs text-gray-500 mt-1">
            💡 Tip: Press Ctrl+Enter to generate quickly
          </p>
        </div>
        <Button 
          onClick={handleGenerate} 
          disabled={loading || !prompt.trim()} 
          className="w-full"
        >
          {loading ? (
            <>
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
              Generating with ChatGPT...
            </>
          ) : (
            <>
              <MessageCircle className="w-4 h-4 mr-2" />
              Generate Content
            </>
          )}
        </Button>
        <div className="text-xs text-gray-500 bg-gray-50 p-2 rounded">
          <strong>Powered by ChatGPT</strong> - Professional screenplay content generation
        </div>
      </div>
    </Card>
  );
};

const ScriptEditor = ({ script, onSave, onAIGenerate }) => {
  const [content, setContent] = useState(script?.content || '');
  const [title, setTitle] = useState(script?.title || 'Untitled Script');

  const handleSave = () => {
    onSave({ ...script, title, content, pages: Math.ceil(content.length / 250) });
    toast.success("Saved successfully!");
  };

  const handleInsertAI = (aiContent) => {
    setContent(prev => prev + '\n\n' + aiContent);
  };

  return (
    <div className="max-w-6xl mx-auto px-6 py-8">
      <div className="flex justify-between items-center mb-6">
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="text-2xl font-bold bg-transparent border-none focus:outline-none"
        />
        <div className="flex space-x-2">
          <Button variant="secondary" onClick={handleSave}>
            <Save className="w-4 h-4 mr-2" />
            Save
          </Button>
          <Button variant="secondary">
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="lg:col-span-3">
          <Card className="p-6">
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="w-full h-96 p-4 border border-gray-300 rounded-lg font-mono text-sm resize-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Start writing your script here..."
            />
          </Card>
        </div>
        <div className="space-y-6">
          <AIAssistant onGenerate={handleInsertAI} />
        </div>
      </div>
    </div>
  );
};

// Main App Component
const App = () => {
  const [user, setUser] = useState(null);
  const [currentPage, setCurrentPage] = useState('home');
  const [showLogin, setShowLogin] = useState(true);
  const [scripts, setScripts] = useState([
    {
      id: 1,
      title: 'The Detective Story',
      description: 'A noir thriller about a detective investigating a mysterious case',
      content: 'FADE IN:\n\nINT. DETECTIVE OFFICE - NIGHT\n\nRAIN patters against the window...',
      pages: 12,
      updatedAt: '2 days ago',
      recent: true
    },
    {
      id: 2,
      title: 'Space Adventure',
      description: 'An epic journey through the cosmos',
      content: 'FADE IN:\n\nEXT. SPACE STATION - DAY\n\nThe vast emptiness of space...',
      pages: 8,
      updatedAt: '1 week ago',
      recent: false
    }
  ]);
  const [currentScript, setCurrentScript] = useState(null);

  const handleLogin = (userData) => {
    setUser(userData);
    setCurrentPage('dashboard');
  };

  const handleLogout = () => {
    setUser(null);
    setCurrentPage('home');
  };

  const handleNavigate = (page) => {
    if (page === 'create') {
      handleCreateScript();
    } else {
      setCurrentPage(page);
    }
  };

  const handleCreateScript = () => {
    const newScript = {
      id: Date.now(),
      title: 'Untitled Script',
      description: 'New script',
      content: '',
      pages: 0,
      updatedAt: 'Just now',
      recent: true
    };
    setCurrentScript(newScript);
    setCurrentPage('editor');
  };

  const handleEditScript = (script) => {
    setCurrentScript(script);
    setCurrentPage('editor');
  };

  const handleSaveScript = (updatedScript) => {
    if (scripts.find(s => s.id === updatedScript.id)) {
      setScripts(scripts.map(s => s.id === updatedScript.id ? updatedScript : s));
    } else {
      setScripts([...scripts, updatedScript]);
    }
  };

  const handleDeleteScript = (scriptId) => {
    setScripts(scripts.filter(s => s.id !== scriptId));
  };

  return (
    <AuthContext.Provider value={{ user, login: handleLogin, logout: handleLogout }}>
      <ScriptContext.Provider value={{ scripts, saveScript: handleSaveScript }}>
        <div className="min-h-screen bg-gray-50">
          <Navbar user={user} onLogout={handleLogout} onNavigate={handleNavigate} />
          
          {currentPage === 'home' && (
            <HomePage onGetStarted={() => setCurrentPage('auth')} />
          )}
          
          {currentPage === 'auth' && (
            <div className="min-h-screen flex items-center justify-center px-6">
              {showLogin ? (
                <LoginForm
                  onLogin={handleLogin}
                  onSwitchToRegister={() => setShowLogin(false)}
                />
              ) : (
                <RegisterForm
                  onRegister={handleLogin}
                  onSwitchToLogin={() => setShowLogin(true)}
                />
              )}
            </div>
          )}
          
          {currentPage === 'dashboard' && user && (
            <Dashboard
              user={user}
              scripts={scripts}
              onCreateScript={handleCreateScript}
              onEditScript={handleEditScript}
              onDeleteScript={handleDeleteScript}
            />
          )}
          
          {currentPage === 'editor' && user && currentScript && (
            <ScriptEditor
              script={currentScript}
              onSave={handleSaveScript}
            />
          )}
        </div>
         <Toaster
        position="top-right"
        toastOptions={{
          duration: 3000,
          style: {
            background: '#363636',
            color: '#fff',
          },
          success: {
            duration: 3000,
            style: {
              background: '#10B981',
            },
          },
          error: {
            duration: 4000,
            style: {
              background: '#EF4444',
            },
          },
        }}
      />
      </ScriptContext.Provider>
    </AuthContext.Provider>
    
  );
};

export default App;