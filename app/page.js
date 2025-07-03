'use client';

import React, { useState, useRef } from 'react';
import { 
  Play,
  Image,
  Crown,
  Home, 
  User, 
  Calendar, 
  Bot, 
  Video, 
  FolderOpen, 
  Moon, 
  LogOut, 
  CreditCard, 
  HelpCircle, 
  Bell 
} from 'lucide-react';
import './globals.css'; // if not already imported
import BottomInputBar from '../components/BottomInputBar';
import Sidebar from '../components/Sidebar';

// Add this global style if not using Tailwind's "m-0" on <body>
if (typeof window !== "undefined") {
  document.body.style.margin = "0";
  document.body.style.padding = "0";
  document.body.style.background = "#111";
}

const HomePage = () => {
  const [activeFilter, setActiveFilter] = useState('AI Effects');
  const [showInputBar, setShowInputBar] = useState(true);
  const [showChatButton, setShowChatButton] = useState(false);

  const navItems = [
    { icon: Home, label: 'Home', active: true },
    { icon: FolderOpen, label: 'My Projects' },
    { icon: Calendar, label: 'Calendar' },
    { icon: User, label: 'Profile' },
    { icon: Bot, label: 'AI Apps' },
    { icon: Video, label: 'Video Editor' },
  ];

  const accountItems = [
    { icon: Bell, label: 'Activity' },
    { icon: HelpCircle, label: 'Support' },
    { icon: CreditCard, label: 'Subscription' },
    { icon: LogOut, label: 'Logout' },
    { icon: Moon, label: 'Dark Mode' },
  ];

  const filters = [
    { name: "AI Effects", icon: "⭐" },
    { name: "Motion Controls", icon: "🎬" },
    { name: "VFX", icon: "⭐" },
    { name: "TikTok Niches", icon: "👑" },
    { name: "Veo3 Niches", icon: "🎵" },
    { name: "Hunyuan LoRA", icon: "🧠" },
    { name: "Wan 2.1 LoRA", icon: "🧠" },
    { name: "LTX LoRA", icon: "🧠" }
  ];

  const aiEffects = [
    {
      title: "Anything, Robot",
      thumbnail: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=300&h=200&fit=crop",
    },
    {
      title: "Holy Wings",
      thumbnail: "https://images.unsplash.com/photo-1544717297-fa95b6ee9643?w=300&h=200&fit=crop",
    },
    {
      title: "Hulk",
      thumbnail: "https://images.unsplash.com/photo-1611095790444-1dfa35ce747c?w=300&h=200&fit=crop",
    },
    {
      title: "Kiss",
      thumbnail: "https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?w=300&h=200&fit=crop",
    },
    {
      title: "Kiss Me AI",
      thumbnail: "https://images.unsplash.com/photo-1583394838336-acd977736f90?w=300&h=200&fit=crop",
    },
    {
      title: "Microwave",
      thumbnail: "https://images.unsplash.com/photo-1574781330855-d0db2706b3d0?w=300&h=200&fit=crop",
    },
    {
      title: "Muscle Surge",
      thumbnail: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=300&h=200&fit=crop",
    },
    {
      title: "The Tiger Touch",
      thumbnail: "https://images.unsplash.com/photo-1605979399824-6e4b0b7a1024?w=300&h=200&fit=crop",
    },
    {
      title: "Venom",
      thumbnail: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=300&h=200&fit=crop",
    },
    {
      title: "Warmth Of Jesus",
      thumbnail: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=200&fit=crop",
    }
  ];

  const [uploadedFile, setUploadedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [dragActive, setDragActive] = useState(false);
  const [inputText, setInputText] = useState("");
  const [selectedModel, setSelectedModel] = useState("Kling Standard");
  const [selectedAspect, setSelectedAspect] = useState("16:9");
  const [selectedDuration, setSelectedDuration] = useState("5s");
  const fileInputRef = useRef(null);

  // File validation helper
  const isValidFile = (file) => {
    const validTypes = [
      'image/jpeg', 'image/png', 'image/gif', 'image/webp',
      'video/mp4', 'video/webm', 'video/ogg', 'video/quicktime'
    ];
    return validTypes.includes(file.type);
  };

  // Handle file selection
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && isValidFile(file)) {
      setUploadedFile(file);
      setPreviewUrl(URL.createObjectURL(file));
    } else {
      setUploadedFile(null);
      setPreviewUrl(null);
      if (file) alert('Please upload a valid image or video file.');
    }
  };

  // Drag & drop handlers
  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(true);
  };
  const handleDragLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
  };
  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      if (isValidFile(file)) {
        setUploadedFile(file);
        setPreviewUrl(URL.createObjectURL(file));
      } else {
        setUploadedFile(null);
        setPreviewUrl(null);
        alert('Please upload a valid image or video file.');
      }
    }
  };

  // Handle video generation
  const handleGenerate = async () => {
    try {
      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt: inputText })
      });
      const data = await response.json();
      if (data && data.videoUrl) {
        setPreviewUrl(data.videoUrl);
      } else {
        alert('Failed to generate video.');
      }
    } catch (error) {
      alert('Error generating video.');
    }
  };

  return (
    <div
      style={{
        minHeight: '100vh',
        background: '#111',
        color: 'white',
        display: 'flex',
        fontFamily: 'system-ui, -apple-system, sans-serif',
        boxSizing: 'border-box',
        overflow: 'hidden'
      }}
    >
      <Sidebar />
      {/* Main Content */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', background: '#111' }}>
        {/* Top Header */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '16px 24px',
          borderBottom: '1px solid #2d2d2d'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{
              width: '32px',
              height: '32px',
              background: 'linear-gradient(135deg, #8b5cf6 0%, #3b82f6 100%)',
              borderRadius: '4px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <span style={{ color: 'white', fontWeight: 'bold', fontSize: '14px' }}>V</span>
            </div>
            <span style={{ fontSize: '24px', fontWeight: 'bold', color: 'white' }}>vadoo AI</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              backgroundColor: '#1a1a1a',
              padding: '8px 12px',
              borderRadius: '6px',
              border: '1px solid #2d2d2d'
            }}>
              <span style={{ fontSize: '14px' }}>💰</span>
              <span style={{ fontWeight: '500', color: 'white', fontSize: '14px' }}>0 credits</span>
            </div>
            <button style={{
              background: '#f97316',
              color: 'white',
              border: 'none',
              borderRadius: '6px',
              padding: '8px 16px',
              fontWeight: '600',
              fontSize: '14px',
              cursor: 'pointer'
            }}>
              Upgrade
            </button>
          </div>
        </div>

        {/* Filter Tabs */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          padding: '16px 24px',
          borderBottom: '1px solid #2d2d2d',
          overflowX: 'auto'
        }}>
          {filters.map((filter, index) => (
            <button
              key={index}
              onClick={() => setActiveFilter(filter.name)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                padding: '8px 16px',
                borderRadius: '20px',
                border: `1px solid ${activeFilter === filter.name ? '#3b82f6' : '#2d2d2d'}`,
                backgroundColor: activeFilter === filter.name ? '#1a1a1a' : 'transparent',
                color: activeFilter === filter.name ? 'white' : '#9ca3af',
                whiteSpace: 'nowrap',
                cursor: 'pointer',
                transition: 'all 0.2s',
                fontSize: '14px',
                fontWeight: '500'
              }}
              onMouseEnter={(e) => {
                if (activeFilter !== filter.name) {
                  e.target.style.borderColor = '#3b82f6';
                  e.target.style.color = 'white';
                  e.target.style.backgroundColor = '#1a1a1a';
                }
              }}
              onMouseLeave={(e) => {
                if (activeFilter !== filter.name) {
                  e.target.style.borderColor = '#2d2d2d';
                  e.target.style.color = '#9ca3af';
                  e.target.style.backgroundColor = 'transparent';
                }
              }}
            >
              <span>{filter.icon}</span>
              <span>{filter.name}</span>
            </button>
          ))}
        </div>

        {/* AI Effects Grid */}
        <div style={{ flex: 1, padding: '24px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '24px' }}>
            <span style={{ fontSize: '18px' }}>⭐</span>
            <h2 style={{ fontSize: '20px', fontWeight: 'bold', color: 'white', margin: 0 }}>AI Effects</h2>
          </div>
          
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(5, 1fr)',
              gap: '16px',
              maxWidth: '1200px'
            }}
          >
            {aiEffects.map((effect, index) => (
              <div
                key={index}
                style={{
                  cursor: 'pointer',
                  transition: 'transform 0.2s',
                  backgroundColor: '#1a1a1a',
                  borderRadius: '12px',
                  overflow: 'hidden',
                  border: '1px solid #2d2d2d',
                  display: 'flex',
                  flexDirection: 'column',
                  minHeight: '200px'
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.transform = 'scale(1.02)';
                  e.currentTarget.style.borderColor = '#3b82f6';
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.transform = 'scale(1)';
                  e.currentTarget.style.borderColor = '#2d2d2d';
                }}
              >
                <div style={{
                  position: 'relative',
                  aspectRatio: '4/3',
                  backgroundColor: '#1a1a1a',
                  borderRadius: '12px 12px 0 0',
                  overflow: 'hidden',
                  borderBottom: '1px solid #2d2d2d',
                  flex: 1,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  <img
                    src={effect.thumbnail}
                    alt={effect.title}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover'
                    }}
                  />
                  <div style={{
                    position: 'absolute',
                    inset: 0,
                    backgroundColor: 'rgba(0, 0, 0, 0.6)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    opacity: 0,
                    transition: 'opacity 0.2s'
                  }}
                  onMouseEnter={e => {
                    e.target.style.opacity = 1;
                  }}
                  onMouseLeave={e => {
                    e.target.style.opacity = 0;
                  }}
                  >
                    <div style={{
                      width: '40px',
                      height: '40px',
                      borderRadius: '50%',
                      backgroundColor: '#3b82f6',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}>
                      <Play size={20} color="white" />
                    </div>
                  </div>
                </div>
                <p style={{
                  fontSize: '14px',
                  color: '#fff',
                  textAlign: 'center',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap',
                  margin: '12px 0',
                  padding: '0 12px',
                  fontWeight: '500'
                }}>
                  {effect.title}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Input Bar */}
        <BottomInputBar
          showInputBar={showInputBar}
          setShowInputBar={setShowInputBar}
          showChatButton={showChatButton}
          setShowChatButton={setShowChatButton}
          uploadedFile={uploadedFile}
          setUploadedFile={setUploadedFile}
          previewUrl={previewUrl}
          setPreviewUrl={setPreviewUrl}
          inputText={inputText}
          setInputText={setInputText}
          selectedModel={selectedModel}
          setSelectedModel={setSelectedModel}
          selectedAspect={selectedAspect}
          setSelectedAspect={setSelectedAspect}
          selectedDuration={selectedDuration}
          setSelectedDuration={setSelectedDuration}
          fileInputRef={fileInputRef}
          handleFileChange={handleFileChange}
          handleDragOver={handleDragOver}
          handleDragLeave={handleDragLeave}
          handleDrop={handleDrop}
          handleGenerate={handleGenerate}
        />
      </div>
    </div>
  );
};

export default HomePage;