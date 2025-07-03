'use client';

import React, { useState, useRef } from 'react';
import { Image } from 'lucide-react';

const BottomInputBar = ({
  showInputBar,
  setShowInputBar,
  showChatButton,
  setShowChatButton,
  uploadedFile,
  setUploadedFile,
  previewUrl,
  setPreviewUrl,
  inputText,
  setInputText,
  selectedModel,
  setSelectedModel,
  selectedAspect,
  setSelectedAspect,
  selectedDuration,
  setSelectedDuration,
  fileInputRef,
  handleFileChange,
  handleDragOver,
  handleDragLeave,
  handleDrop,
  handleGenerate // <-- Add handleGenerate to props
}) => {
  const [remixHover, setRemixHover] = useState(false);

  return (
    <>
      {showInputBar && (
        <div
          style={{
            position: 'fixed',
            bottom: '64px',
            left: '50%',
            transform: 'translateX(-50%)',
            width: '800px',
            maxWidth: '95vw',
            zIndex: 20,
            borderRadius: '20px',
            background: 'linear-gradient(120deg,rgb(30, 39, 55) 0%, #1e2235 60%,rgb(7, 31, 69) 100%)',
            boxShadow: '0 8px 40px 0 rgba(0,0,0,0.45)',
            border: '1.5px solid #232b39',
            backdropFilter: 'blur(12px)',
            overflow: 'hidden',
            transition: 'background 0.4s'
          }}
        >
          {/* Close Arrow (Right Arrow) */}
          <button
            onClick={() => {
              setShowInputBar(false);
              setShowChatButton(true);
            }}
            style={{
              position: 'absolute',
              top: 8,
              right: 16,
              background: 'none',
              border: 'none',
              color: '#9ca3af',
              fontSize: '22px',
              cursor: 'pointer',
              zIndex: 2,
              transition: 'color 0.2s'
            }}
            title="Close"
            aria-label="Close"
            onMouseOver={e => e.currentTarget.style.color = '#fff'}
            onMouseOut={e => e.currentTarget.style.color = '#9ca3af'}
          >
            {/* Right Arrow SVG */}
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M9 18l6-6-6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
          <div
            style={{
              padding: '24px 28px 18px 28px',
              borderRadius: '20px',
              background: 'transparent',
              width: '100%',
              boxSizing: 'border-box',
              display: 'flex',
              flexDirection: 'column',
              gap: '14px'
            }}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
          >
            {/* Top row: Upload button */}
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: '0', gap: '10px' }}>
              <button
                type="button"
                onClick={() => fileInputRef.current && fileInputRef.current.click()}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  background: 'rgba(35,43,57,0.95)',
                  padding: '8px 28px',
                  borderRadius: '999px',
                  border: 'none',
                  color: 'white',
                  cursor: 'pointer',
                  fontSize: '14px',
                  fontWeight: '600',
                  boxShadow: '0 2px 8px 0 rgba(0,0,0,0.10)',
                  transition: 'background 0.2s'
                }}
                onMouseOver={e => e.currentTarget.style.background = '#232b39'}
                onMouseOut={e => e.currentTarget.style.background = 'rgba(35,43,57,0.95)'}
              >
                <Image size={18} />
                <span>Image</span>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*,video/*"
                  style={{ display: 'none' }}
                  onChange={handleFileChange}
                />
              </button>
              <div style={{ flex: 1 }} />
              <button
                style={{
                  background: 'none',
                  border: 'none',
                  color: '#fff',
                  fontSize: '18px',
                  cursor: 'pointer',
                  marginRight: '2px',
                  marginLeft: 'auto',
                  padding: '6px',
                  borderRadius: '50%',
                  transition: 'background 0.2s'
                }}
                title="Enhance"
                onMouseOut={e => e.currentTarget.style.background = 'none'}
              >
                <span style={{ display: 'inline-block', transform: 'rotate(45deg)', marginLeft: '-5px' }}>✦</span>
              </button>
            </div>
            {/* Middle row: Input and send */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                background: 'rgba(35,43,57,0.95)',
                borderRadius: '12px',
                padding: '0 18px',
                marginBottom: '0',
                boxShadow: '0 2px 8px 0 rgba(0,0,0,0.10)'
              }}
            >
              <input
                type="text"
                placeholder="Upload an image or just text here"
                style={{
                  flex: 1,
                  backgroundColor: 'transparent',
                  color: '#d1d5db',
                  border: 'none',
                  outline: 'none',
                  fontSize: '15px',
                  padding: '14px 0',
                  fontWeight: 500,
                  letterSpacing: '0.01em'
                }}
                value={inputText}
                onChange={e => setInputText(e.target.value)}
              />
              <button
                style={{
                  background: 'linear-gradient(135deg,rgb(26, 40, 62) 60%,rgb(29, 8, 79) 100%)',
                  border: 'none',
                  borderRadius: '50%',
                  padding: '8px',
                  marginLeft: '8px',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: '0 2px 8px 0 rgba(59,130,246,0.15)',
                  transition: 'background 0.2s'
                }}
                onMouseOver={e => e.currentTarget.style.background = '#4f46e5'}
                onMouseOut={e => e.currentTarget.style.background = 'linear-gradient(135deg,rgb(21, 29, 43) 60%,rgb(15, 6, 67) 100%)'}
                onClick={handleGenerate} // <-- Add this line to trigger generation
              >
                <svg width="22" height="22" fill="none" stroke="white" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                </svg>
              </button>
            </div>
            {/* Bottom row: Dropdowns and Remix */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '14px',
              marginTop: '2px',
              marginBottom: 0,
              width: '100%'
            }}>
              <select
                value={selectedModel}
                onChange={e => setSelectedModel(e.target.value)}
                style={{
                  background: '#10141c',
                  color: '#fff',
                  border: 'none',
                  borderRadius: '12px',
                  padding: '8px 18px',
                  fontSize: '14px',
                  fontWeight: '600',
                  boxShadow: '0 2px 8px 0 rgba(0,0,0,0.10)',
                  outline: 'none',
                  appearance: 'none',
                  minWidth: '120px',
                  transition: 'background 0.2s'
                }}
                onMouseOver={e => e.currentTarget.style.background = '#232b39'}
                onMouseOut={e => e.currentTarget.style.background = '#10141c'}
              >
                <option value="Kling Standard">🧊 Kling Standard</option>
                <option value="Kling Pro">👑 Kling Pro</option>
                <option value="Vadoo AI">🤖 Vadoo AI</option>
              </select>
              <select
                value={selectedAspect}
                onChange={e => setSelectedAspect(e.target.value)}
                style={{
                  background: '#10141c',
                  color: '#fff',
                  border: 'none',
                  borderRadius: '12px',
                  padding: '8px 18px',
                  fontSize: '14px',
                  fontWeight: '600',
                  boxShadow: '0 2px 8px 0 rgba(0,0,0,0.10)',
                  outline: 'none',
                  appearance: 'none',
                  minWidth: '80px',
                  transition: 'background 0.2s'
                }}
                onMouseOver={e => e.currentTarget.style.background = '#232b39'}
                onMouseOut={e => e.currentTarget.style.background = '#10141c'}
              >
                <option value="16:9">🖥️ 16:9</option>
                <option value="9:16">📱 9:16</option>
                <option value="1:1">🔲 1:1</option>
              </select>
              <select
                value={selectedDuration}
                onChange={e => setSelectedDuration(e.target.value)}
                style={{
                  background: '#10141c',
                  color: '#fff',
                  border: 'none',
                  borderRadius: '12px',
                  padding: '8px 18px',
                  fontSize: '14px',
                  fontWeight: '600',
                  boxShadow: '0 2px 8px 0 rgba(0,0,0,0.10)',
                  outline: 'none',
                  appearance: 'none',
                  minWidth: '70px',
                  transition: 'background 0.2s'
                }}
                onMouseOver={e => e.currentTarget.style.background = '#232b39'}
                onMouseOut={e => e.currentTarget.style.background = '#10141c'}
              >
                <option value="5s">⏱️ 5s</option>
                <option value="10s">⏱️ 10s</option>
                <option value="15s">⏱️ 15s</option>
                <option value="30s">⏱️ 30s</option>
              </select>
              <button
                style={{
                  background: remixHover
                    ? '#4f46e5'
                    : 'linear-gradient(135deg, #3b82f6 60%, #8b5cf6 100%)',
                  color: 'white',
                  border: 'none',
                  borderRadius: '12px',
                  padding: '8px 22px',
                  fontSize: '14px',
                  fontWeight: '700',
                  cursor: 'pointer',
                  marginLeft: '0',
                  boxShadow: '0 2px 8px 0 rgba(59,130,246,0.10)',
                  transition: 'background 0.2s'
                }}
                onMouseOver={() => setRemixHover(true)}
                onMouseOut={() => setRemixHover(false)}
              >
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                  {!remixHover && (
                    <svg width="16" height="16" fill="none" stroke="white" viewBox="0 0 24 24" style={{ marginRight: 2 }}>
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  )}
                  Remix
                </span>
              </button>
              <div style={{ flex: 1 }} />
              <span style={{ color: '#9ca3af', fontSize: '12px', fontWeight: 500 }}>
                This will cost <span style={{ color: 'white', fontWeight: 700 }}>40 credits</span> from your balance
              </span>
            </div>
            {/* Preview uploaded file */}
            {previewUrl && (
              <div style={{ marginTop: '12px', textAlign: 'left' }}>
                {uploadedFile && uploadedFile.type.startsWith('image') ? (
                  <img
                    src={previewUrl}
                    alt="Preview"
                    style={{ maxWidth: '160px', maxHeight: '90px', borderRadius: '8px', border: '1px solid #23232b' }}
                  />
                ) : uploadedFile && uploadedFile.type.startsWith('video') ? (
                  <video
                    src={previewUrl}
                    controls
                    style={{ maxWidth: '160px', maxHeight: '90px', borderRadius: '8px', border: '1px solid #23232b' }}
                  />
                ) : null}
              </div>
            )}
          </div>
        </div>
      )}
      {/* Small Chat Button (when input bar is closed) */}
      {showChatButton && !showInputBar && (
        <button
          onClick={() => {
            setShowInputBar(true);
            setShowChatButton(false);
          }}
          style={{
            position: 'fixed',
            bottom: '80px',
            right: '40px',
            zIndex: 30,
            background: 'linear-gradient(120deg, #232b39 0%, #3b82f6 100%)',
            color: 'white',
            border: 'none',
            borderRadius: '50%',
            width: '54px',
            height: '54px',
            boxShadow: '0 4px 24px 0 rgba(59,130,246,0.25)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            transition: 'background 0.2s'
          }}
          title="Open Chat"
          aria-label="Open Chat"
        >
          {/* Chat Bubble Icon */}
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
      )}
    </>
  );
};

export default BottomInputBar;