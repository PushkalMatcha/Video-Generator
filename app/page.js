'use client';

import React, { useState, useRef, useEffect } from 'react';
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
    { name: "VFX", icon: "⭐" }
  ];

  const [uploadedFile, setUploadedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [dragActive, setDragActive] = useState(false);
  const [inputText, setInputText] = useState("");
  const [selectedModel, setSelectedModel] = useState("Kling Standard");
  const [selectedAspect, setSelectedAspect] = useState("16:9");
  const [selectedDuration, setSelectedDuration] = useState("5s");
  const fileInputRef = useRef(null);

  // Add refs for each section
  const aiEffectsRef = useRef(null);
  const motionControlsRef = useRef(null);
  const vfxControlsRef = useRef(null);

  // Scroll to section when filter is selected
  useEffect(() => {
    if (activeFilter === 'AI Effects' && aiEffectsRef.current) {
      aiEffectsRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    } else if (activeFilter === 'Motion Controls' && motionControlsRef.current) {
      motionControlsRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    } else if (activeFilter === 'VFX' && vfxControlsRef.current) {
      vfxControlsRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, [activeFilter]);

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

  // Pixverse Effects
  const pixverseEffects = [
    
    { effect: 'https://d3adwkbyhxyrtq.cloudfront.net/webassets/ai_effects/Kiss_Me_AI.webp', name: 'Kiss Me AI' },
    { effect: 'https://d3adwkbyhxyrtq.cloudfront.net/webassets/ai_effects/Kiss.webp', name: 'Kiss' },
    { effect: 'https://d3adwkbyhxyrtq.cloudfront.net/webassets/ai_effects/Venom.webp', name: 'Venom' },
    { effect: 'https://d3adwkbyhxyrtq.cloudfront.net/webassets/ai_effects/Hulk_.webp', name: 'Hulk' },
    { effect: 'https://d3adwkbyhxyrtq.cloudfront.net/webassets/ai_effects/Muscle_Surge.webp', name: 'Muscle Surge' },
    { effect: 'https://d3adwkbyhxyrtq.cloudfront.net/webassets/ai_effects/The_Tiger_Touch.webp', name: 'The Tiger Touch' },
    { effect: 'https://d3adwkbyhxyrtq.cloudfront.net/webassets/ai_effects/Anything_Robot.webp', name: 'Anything, Robot' },
    { effect: 'https://d3adwkbyhxyrtq.cloudfront.net/webassets/ai_effects/Warmth_of_Jesus.webp', name: 'Warmth of Jesus' },
    { effect: 'https://d3adwkbyhxyrtq.cloudfront.net/webassets/ai_effects/Holy_Wings.webp', name: 'Holy Wings' },
    { effect: 'https://d3adwkbyhxyrtq.cloudfront.net/webassets/ai_effects/Microwave.webp', name: 'Microwave' },
  ];

  // Motion Controls (from utility.js)
  const motionControls = [
    { 
      url: 'https://d3adwkbyhxyrtq.cloudfront.net/motioncontrols/360+Orbit.webp', 
      name: '360 Orbit',
      path: "https://d3adwkbyhxyrtq.cloudfront.net/loratensors/aaa3e820-5d94-4612-9488-0c9a1b2f5843/adapter_model.safetensors",
      trigger_word: "0rb4it 360 degree orbit",
      input_type: "i2v",
    },
    { 
      url: 'https://d3adwkbyhxyrtq.cloudfront.net/motioncontrols/Action+Run.webp', 
      name: 'Hero Run',
      path: "https://d3adwkbyhxyrtq.cloudfront.net/loratensors/36b9edf7-31d7-47d3-ad3b-e166fb3a9842/adapter_model.safetensors",
      trigger_word: "4ct3ion Action Run",
      input_type: "i2v",
    },
    { 
      url: 'https://d3adwkbyhxyrtq.cloudfront.net/motioncontrols/Arc.webp', 
      name: 'Arc Shot',
      path: "https://d3adwkbyhxyrtq.cloudfront.net/loratensors/a5949ee3-61ea-4a18-bd4d-54c855f5401c/adapter_model.safetensors",
      trigger_word: "34Ar2c arc the camera moves in a smooth curve around",
      input_type: "i2v",
    },
    { 
      url: 'https://d3adwkbyhxyrtq.cloudfront.net/motioncontrols/Bullet+Time.webp', 
      name: 'Matrix Shot',
      path: "https://d3adwkbyhxyrtq.cloudfront.net/loratensors/219ad5ad-8f23-48dc-b098-b8e6d9fbe6c0/adapter_model.safetensors",
      trigger_word: "b4ll3t t1m3 bullet time shot",
      input_type: "i2v",
    },
    { 
      url: 'https://d3adwkbyhxyrtq.cloudfront.net/motioncontrols/Car+Chasing.webp', 
      name: 'Car Chase',
      path: "https://d3adwkbyhxyrtq.cloudfront.net/loratensors/8b36b7fe-0a0b-4849-b0ed-d9a51ff0cc85/adapter_model.safetensors",
      trigger_word: "c4r ch4s3 car chase",
      input_type: "i2v",
    },
    { 
      url: 'https://d3adwkbyhxyrtq.cloudfront.net/motioncontrols/Crane+Down.webp', 
      name: 'Crane Down',
      path: "https://d3adwkbyhxyrtq.cloudfront.net/loratensors/f26db0b7-1c26-4587-b2b5-1cfd0c51c5b3/adapter_model.safetensors",
      trigger_word: "cr4n3 crane down camera motion",
      input_type: "i2v",
    },
    { 
      url: 'https://d3adwkbyhxyrtq.cloudfront.net/motioncontrols/Crane+Over+The+Head.webp', 
      name: 'Crane Overhead',
      path: "https://d3adwkbyhxyrtq.cloudfront.net/loratensors/9393f8f4-abe6-4aa7-ba01-0b62e1507feb/adapter_model.safetensors",
      trigger_word: "cr4n3 crane over the head movement",
      input_type: "i2v",
    },
    { 
      url: 'https://d3adwkbyhxyrtq.cloudfront.net/motioncontrols/Crane+Up.webp', 
      name: 'Crane Up',
      path: "https://d3adwkbyhxyrtq.cloudfront.net/loratensors/07c5e22b-7028-437c-9479-6eb9a50cf993/adapter_model.safetensors",
      trigger_word: "cr4n3 crane up effect",
      input_type: "i2v",
    },
    { 
      url: 'https://d3adwkbyhxyrtq.cloudfront.net/motioncontrols/Crash+Zoom+In.webp', 
      name: 'Crash Zoom In',
      path: "https://d3adwkbyhxyrtq.cloudfront.net/loratensors/34a80641-4702-4c1c-91bf-c436a59c79cb/adapter_model.safetensors",
      trigger_word: "cr34sh crash zoom in effect",
      input_type: "i2v",
    },
    { 
      url: 'https://d3adwkbyhxyrtq.cloudfront.net/motioncontrols/Crash+Zoom+Out.webp', 
      name: 'Crash Zoom Out',
      path: "https://d3adwkbyhxyrtq.cloudfront.net/loratensors/44c05ca1-422d-4cd4-8508-acadb6d0248c/adapter_model.safetensors",
      trigger_word: "cr34sh crash zoom out effect",
      input_type: "i2v",
    },
  ];

  // VFX Controls (from utility.json)
  const vfxControls = [
    { 
      url: 'https://d3adwkbyhxyrtq.cloudfront.net/motioncontrols/Levitation.webp', 
      name: 'Levitate',
      path: "https://d3adwkbyhxyrtq.cloudfront.net/loratensors/29068e70-dc05-4cfa-9b68-305d45645b00/adapter_model.safetensors",
      trigger_word: "lev1tate2_it0 levitate effect",
      input_type: "i2v",
    },
    { 
      url: 'https://d3adwkbyhxyrtq.cloudfront.net/motioncontrols/Disintegration.webp', 
      name: 'Disintegration',
      path: "https://d3adwkbyhxyrtq.cloudfront.net/loratensors/971ea00a-f708-44ce-83cf-e54006ea1f76/adapter_model.safetensors",
      trigger_word: "d1s1nt34gration disintegration effect",
      input_type: "i2v",
    },
    { 
      url: 'https://d3adwkbyhxyrtq.cloudfront.net/motioncontrols/Flying.webp', 
      name: 'Flying',
      path: "https://d3adwkbyhxyrtq.cloudfront.net/loratensors/5dc604ed-1e2f-44d5-9437-7f56aa6205ac/adapter_model.safetensors",
      trigger_word: "f1y1ng smooth gliding flight",
      input_type: "i2v",
    },
    { 
      url: 'https://d3adwkbyhxyrtq.cloudfront.net/motioncontrols/Car+Explosion.webp', 
      name: 'Car Explosion',
      path: "https://d3adwkbyhxyrtq.cloudfront.net/loratensors/efea3aa4-32e8-4523-af44-7e59d731d453/adapter_model.safetensors",
      trigger_word: "c3r exp356l0sion the car explodes bursting into flames and debris",
      input_type: "i2v",
    },
    { 
      url: 'https://d3adwkbyhxyrtq.cloudfront.net/motioncontrols/Tornado.webp', 
      name: 'Tornado',
      path: "https://d3adwkbyhxyrtq.cloudfront.net/loratensors/1907141a-c058-47d4-837e-078983a6f710/adapter_model.safetensors",
      trigger_word: "t0r54d0 realistic tornado",
      input_type: "i2v",
    },
    { 
      url: 'https://d3adwkbyhxyrtq.cloudfront.net/motioncontrols/Electricity.webp', 
      name: 'Electricity',
      path: "https://d3adwkbyhxyrtq.cloudfront.net/loratensors/9aad6061-a858-43df-8202-b44f036e04c2/adapter_model.safetensors",
      trigger_word: "e13c7r1c electricity effect",
      input_type: "i2v",
    },
    { 
      url: 'https://d3adwkbyhxyrtq.cloudfront.net/motioncontrols/Huge+Explosion.webp', 
      name: 'Huge Explosion',
      path: "https://d3adwkbyhxyrtq.cloudfront.net/loratensors/dcdb7020-02b4-42cb-b623-16902db65e90/adapter_model.safetensors",
      trigger_word: "3xp105ion huge explosion",
      input_type: "i2v",
    },
    { 
      url: 'https://d3adwkbyhxyrtq.cloudfront.net/motioncontrols/Decay+Time-Lapse.webp', 
      name: 'Decay Time-Lapse',
      path: "https://d3adwkbyhxyrtq.cloudfront.net/loratensors/6b6f64dc-ac14-44b2-b91c-a510cb7f7f32/adapter_model.safetensors",
      trigger_word: "d3c4y decay time-lapse begins",
      input_type: "i2v",
    },
    { 
      url: 'https://d3adwkbyhxyrtq.cloudfront.net/motioncontrols/Tsunami.webp', 
      name: 'Tsunami',
      path: "https://d3adwkbyhxyrtq.cloudfront.net/loratensors/64e58850-45cb-43e0-864b-3a3bc259afa7/adapter_model.safetensors",
      trigger_word: "t5un@m1 realistic tsunami",
      input_type: "t2v",
    },
    { 
      url: 'https://d3adwkbyhxyrtq.cloudfront.net/motioncontrols/Fire.webp', 
      name: 'Fire',
      path: "https://d3adwkbyhxyrtq.cloudfront.net/loratensors/c45274ad-bc5d-41f2-acac-64b8cb8c3bf1/adapter_model.safetensors",
      trigger_word: "[r3al_f1re]",
      input_type: "t2v",
    },
    { 
      url: 'https://d3adwkbyhxyrtq.cloudfront.net/motioncontrols/Robotic+Face+Reveal.webp', 
      name: 'Robotic Face Reveal',
      path: "https://d3adwkbyhxyrtq.cloudfront.net/loratensors/5e4b881d-6a1e-4cc7-b827-20b382248d41/adapter_model.safetensors",
      trigger_word: "r8b8t1c robotic face reveal",
      input_type: "i2v",
    },
    { 
      url: 'https://d3adwkbyhxyrtq.cloudfront.net/motioncontrols/Building+Explosion.webp', 
      name: 'Building Explosion',
      path: "https://d3adwkbyhxyrtq.cloudfront.net/loratensors/77a2daa2-c255-4ea8-9581-594853a6d96e/adapter_model.safetensors",
      trigger_word: "b32ldi4ng exp39lsion the building explodes in a massive blast",
      input_type: "i2v",
    },
  ];

  return (
    <div
      style={{
        minHeight: '100vh',
        background: '#111',
        color: 'white',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: 'system-ui, -apple-system, sans-serif',
        boxSizing: 'border-box',
        overflow: 'hidden'
      }}
    >
      {/* Main Content */}
      <div style={{ width: '100%', maxWidth: '1200px', display: 'flex', flexDirection: 'column', alignItems: 'center', background: '#111' }}>
        {/* Top Header */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '16px 24px',
          borderBottom: '1px solid #2d2d2d',
          width: '100%'
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
        </div>

        {/* Filter Tabs */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          padding: '16px 24px',
          borderBottom: '1px solid #2d2d2d',
          overflowX: 'auto',
          width: '100%'
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
            >
              <span>{filter.icon}</span>
              <span>{filter.name}</span>
            </button>
          ))}
        </div>

        {/* AI Effects Grid */}
        <div ref={aiEffectsRef} style={{ flex: 1, padding: '24px', width: '100%' }}>
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
            {pixverseEffects.map((effect, index) => (
              <div
                key={index}
                style={{
                  cursor: 'pointer',
                  backgroundColor: '#1a1a1a',
                  borderRadius: '12px',
                  overflow: 'hidden',
                  border: '1px solid #2d2d2d',
                  display: 'flex',
                  flexDirection: 'column',
                  minHeight: '200px'
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
                    src={effect.effect}
                    alt={effect.name || 'Effect'}
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
                  }}>
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
                  {effect.name || 'No Name'}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Motion Controls Grid */}
        <div ref={motionControlsRef} style={{ flex: 1, padding: '24px', width: '100%' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '24px' }}>
            <span style={{ fontSize: '18px' }}>🎬</span>
            <h2 style={{ fontSize: '20px', fontWeight: 'bold', color: 'white', margin: 0 }}>Motion Controls</h2>
          </div>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(5, 1fr)',
              gap: '16px',
              maxWidth: '1200px'
            }}
          >
            {motionControls.map((control, index) => (
              <div
                key={index}
                style={{
                  cursor: 'pointer',
                  backgroundColor: '#1a1a1a',
                  borderRadius: '12px',
                  overflow: 'hidden',
                  border: '1px solid #2d2d2d',
                  display: 'flex',
                  flexDirection: 'column',
                  minHeight: '200px'
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
                    src={control.url}
                    alt={control.name || 'Motion Control'}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover'
                    }}
                  />
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
                  {control.name || 'No Name'}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* VFX Controls Grid */}
        <div ref={vfxControlsRef} style={{ flex: 1, padding: '24px', width: '100%' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '24px' }}>
            <span style={{ fontSize: '18px' }}>⭐</span>
            <h2 style={{ fontSize: '20px', fontWeight: 'bold', color: 'white', margin: 0 }}>VFX Controls</h2>
          </div>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(5, 1fr)',
              gap: '16px',
              maxWidth: '1200px'
            }}
          >
            {vfxControls.map((vfx, index) => (
              <div
                key={index}
                style={{
                  cursor: 'pointer',
                  backgroundColor: '#1a1a1a',
                  borderRadius: '12px',
                  overflow: 'hidden',
                  border: '1px solid #2d2d2d',
                  display: 'flex',
                  flexDirection: 'column',
                  minHeight: '200px'
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
                    src={vfx.url}
                    alt={vfx.name || 'VFX Control'}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover'
                    }}
                  />
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
                  {vfx.name || 'No Name'}
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