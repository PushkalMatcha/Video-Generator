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
  selectedAspect,
  setSelectedAspect,
  selectedDuration,
  setSelectedDuration,
  fileInputRef,
  handleFileChange,
  handleDragOver,
  handleDragLeave,
  handleDrop,
  handleGenerate,
  selectedEffect, // <-- add selectedEffect prop
  selectedResolution,
  setSelectedResolution,
  selectedQuality,
  setSelectedQuality
}) => {
  const [remixHover, setRemixHover] = useState(false);
  const [showApiKeyModal, setShowApiKeyModal] = useState(false);
  const [apiKeyInput, setApiKeyInput] = useState('');
  const [pendingGenerate, setPendingGenerate] = useState(false);

  // Wrap the generate handler to show modal first, but only if all required fields are present
  function handleGenerateWithApiKey(e) {
    e.preventDefault && e.preventDefault();
    // Validation: require effect selection AND (image or text)
    const hasImage = (uploadedFile && previewUrl) || (inputText && (inputText.startsWith('http://') || inputText.startsWith('https://')));
    const hasText = inputText && inputText.trim().length > 0;
    if (!selectedEffect) {
      alert('Please select an effect before generating.');
      return;
    }
    if (!(hasImage || hasText)) {
      alert('Please provide an image or a text prompt before generating.');
      return;
    }
    setShowApiKeyModal(true);
    setPendingGenerate(true);
  }

  function handleApiKeyContinue() {
    setShowApiKeyModal(false);
    setPendingGenerate(false);
    setApiKeyInput('');
    // Call the real generate handler, passing the API key if needed
    if (typeof handleGenerate === 'function') {
      handleGenerate(apiKeyInput);
    }
  }

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
                placeholder="Upload an image, enter image URL, or just text here"
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
                onClick={handleGenerateWithApiKey}
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
              </select>
              <select
                value={selectedResolution}
                onChange={e => setSelectedResolution(e.target.value)}
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
                  transition: 'background 0.2s',
                  marginLeft: '0'
                }}
                onMouseOver={e => e.currentTarget.style.background = '#232b39'}
                onMouseOut={e => e.currentTarget.style.background = '#10141c'}
              >
                <option value="480p">480p</option>
                <option value="720p">720p</option>
              </select>
              <select
                value={selectedQuality}
                onChange={e => setSelectedQuality(e.target.value)}
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
                  minWidth: '90px',
                  transition: 'background 0.2s',
                  marginLeft: '0'
                }}
                onMouseOver={e => e.currentTarget.style.background = '#232b39'}
                onMouseOut={e => e.currentTarget.style.background = '#10141c'}
              >
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>
              <div style={{ flex: 1 }} />
            </div>
            {/* Show selected effect if any */}
            {selectedEffect && (
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                background: '#232b39',
                borderRadius: '10px',
                padding: '6px 14px',
                marginBottom: '8px',
                marginTop: '2px',
                color: '#fff',
                fontWeight: 500,
                fontSize: '15px',
                boxShadow: '0 1px 4px 0 rgba(0,0,0,0.10)'
              }}>
                {selectedEffect.effect || selectedEffect.url ? (
                  <img
                    src={selectedEffect.effect || selectedEffect.url}
                    alt={selectedEffect.name || 'Effect'}
                    style={{ width: 36, height: 36, borderRadius: 8, objectFit: 'cover', border: '1px solid #23232b' }}
                  />
                ) : null}
                <span>{selectedEffect.name || 'Selected Effect'}</span>
                <button
                  onClick={() => setSelectedEffect(null)}
                  style={{
                    marginLeft: 8,
                    background: 'none',
                    border: 'none',
                    color: '#9ca3af',
                    fontSize: 18,
                    cursor: 'pointer',
                    borderRadius: '50%',
                    width: 28,
                    height: 28,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    transition: 'background 0.2s'
                  }}
                  title="Remove selected effect"
                  aria-label="Remove selected effect"
                  onMouseOver={e => e.currentTarget.style.background = '#2d2d2d'}
                  onMouseOut={e => e.currentTarget.style.background = 'none'}
                >
                  ×
                </button>
              </div>
            )}
            {/* Preview uploaded file or image URL */}
            {((uploadedFile && previewUrl) || (inputText && (inputText.startsWith('http://') || inputText.startsWith('https://')))) && (
              <div style={{
                marginTop: '12px',
                textAlign: 'left',
                maxWidth: '180px',
                minHeight: '90px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'flex-start',
                position: 'relative'
              }}>
                {/* Clear/Cross button */}
                <button
                  onClick={() => {
                    setUploadedFile && setUploadedFile(null);
                    setPreviewUrl && setPreviewUrl('');
                    setInputText && setInputText('');
                  }}
                  style={{
                    position: 'absolute',
                    top: '-8px',
                    right: '-8px',
                    background: '#232b39',
                    color: '#fff',
                    border: 'none',
                    borderRadius: '50%',
                    width: 22,
                    height: 22,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: 16,
                    cursor: 'pointer',
                    zIndex: 2,
                    boxShadow: '0 1px 4px 0 rgba(0,0,0,0.10)',
                    transition: 'background 0.2s'
                  }}
                  title="Remove preview"
                  aria-label="Remove preview"
                  onMouseOver={e => e.currentTarget.style.background = '#2d2d2d'}
                  onMouseOut={e => e.currentTarget.style.background = '#232b39'}
                >
                  ×
                </button>
                {uploadedFile && previewUrl && uploadedFile.type.startsWith('image') ? (
                  <img
                    src={previewUrl}
                    alt="Preview"
                    style={{
                      maxWidth: '160px',
                      maxHeight: '90px',
                      borderRadius: '8px',
                      border: '1px solid #23232b',
                      background: '#18181b'
                    }}
                  />
                ) : uploadedFile && previewUrl && uploadedFile.type.startsWith('video') ? (
                  <video
                    src={previewUrl}
                    controls
                    style={{
                      maxWidth: '160px',
                      maxHeight: '90px',
                      borderRadius: '8px',
                      border: '1px solid #23232b',
                      background: '#18181b'
                    }}
                  />
                ) : ((inputText && (inputText.startsWith('http://') || inputText.startsWith('https://'))) ? (
                  <img
                    src={inputText}
                    alt="Image URL Preview"
                    style={{
                      maxWidth: '160px',
                      maxHeight: '90px',
                      borderRadius: '8px',
                      border: '1px solid #23232b',
                      background: '#18181b'
                    }}
                    onError={e => { e.target.onerror = null; e.target.src = ''; e.target.alt = 'Invalid image URL'; }}
                  />
                ) : null)}
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
      {/* API Key Modal */}
      {showApiKeyModal && (
        <div style={{
          position: 'fixed', left: 0, top: 0, width: '100vw', height: '100vh', background: 'rgba(0,0,0,0.45)', zIndex: 1000,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          <div style={{ background: '#232b39', padding: 32, borderRadius: 16, minWidth: 320, boxShadow: '0 4px 32px 0 #0008', color: '#fff', display: 'flex', flexDirection: 'column', gap: 16 }}>
            <div style={{ fontWeight: 600, fontSize: 18, marginBottom: 8 }}>Enter your MuApi API Key</div>
            <input
              type="password"
              value={apiKeyInput}
              onChange={e => setApiKeyInput(e.target.value)}
              placeholder="API Key"
              style={{ padding: 10, borderRadius: 8, border: '1px solid #333', fontSize: 16, background: '#18181b', color: '#fff' }}
              autoFocus
            />
            <div style={{ display: 'flex', gap: 12, marginTop: 8 }}>
              <button
                onClick={() => {
                  setShowApiKeyModal(false);
                  setApiKeyInput('');
                  setPendingGenerate(false);
                }}
                style={{ padding: '8px 18px', borderRadius: 8, background: '#232b39', color: '#fff', border: '1px solid #444', fontWeight: 500, fontSize: 15, cursor: 'pointer' }}
              >Cancel</button>
              <button
                type="button"
                onClick={handleApiKeyContinue}
                style={{ padding: '8px 18px', borderRadius: 8, background: '#3b82f6', color: '#fff', border: 'none', fontWeight: 600, fontSize: 15, cursor: 'pointer' }}
                disabled={!apiKeyInput.trim()}
              >Continue</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default BottomInputBar;