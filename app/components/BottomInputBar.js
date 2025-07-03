// ...existing imports...
import { useState } from 'react';
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
  handleDrop
}) => {
  const [remixHover, setRemixHover] = useState(false);
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [status, setStatus] = useState('');
  const [videoUrl, setVideoUrl] = useState('');

  // Simulate progress for demo purposes
  const simulateProgress = async () => {
    setProgress(0);
    setStatus('Starting generation...');
    for (let i = 1; i <= 100; i += 10) {
      await new Promise((r) => setTimeout(r, 120));
      setProgress(i);
      if (i < 30) setStatus('Uploading...');
      else if (i < 60) setStatus('Processing...');
      else if (i < 90) setStatus('Finalizing...');
      else setStatus('Almost done...');
    }
  };

  // Connect blue button to API
  const handleGenerate = async () => {
    setLoading(true);
    setVideoUrl('');
    setStatus('Queued...');
    setProgress(0);
    await simulateProgress();
    try {
      const res = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt: inputText,
          model: selectedModel,
          aspect: selectedAspect,
          duration: selectedDuration
        })
      });
      const data = await res.json();
      if (data.success) {
        setPreviewUrl(data.url);
        setVideoUrl(data.url); // For demo, use same url as video
        setStatus('Generation complete!');
        setProgress(100);
      } else {
        setStatus(data.message || 'Generation failed.');
      }
    } catch (e) {
      setStatus('Generation failed.');
    }
    setLoading(false);
  };

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
          {/* Progress Bar and Status */}
          {loading && (
            <div style={{ width: '100%', padding: '0 0 8px 0' }}>
              <div style={{
                height: '6px',
                width: '100%',
                background: '#232b39',
                borderRadius: '6px',
                overflow: 'hidden',
                marginBottom: '6px'
              }}>
                <div
                  style={{
                    width: `${progress}%`,
                    height: '100%',
                    background: 'linear-gradient(90deg,#3b82f6,#8b5cf6)',
                    transition: 'width 0.2s'
                  }}
                />
              </div>
              <div style={{
                color: '#9ca3af',
                fontSize: '13px',
                fontWeight: 500,
                textAlign: 'center'
              }}>
                {status}
              </div>
            </div>
          )}

          {/* ...rest of your UI (upload, input, dropdowns)... */}

          {/* Bottom row: Dropdowns and Remix */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '14px',
            marginTop: '2px',
            marginBottom: 0,
            width: '100%'
          }}>
            {/* ...dropdowns... */}
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
                cursor: loading ? 'not-allowed' : 'pointer',
                marginLeft: '0',
                boxShadow: '0 2px 8px 0 rgba(59,130,246,0.10)',
                transition: 'background 0.2s',
                opacity: loading ? 0.7 : 1
              }}
              onMouseOver={() => setRemixHover(true)}
              onMouseOut={() => setRemixHover(false)}
              onClick={handleGenerate}
              disabled={loading}
            >
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                {!remixHover && (
                  <svg width="16" height="16" fill="none" stroke="white" viewBox="0 0 24 24" style={{ marginRight: 2 }}>
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                )}
                {loading ? 'Generating...' : 'Remix'}
              </span>
            </button>
            {/* ...rest of UI... */}
          </div>

          {/* Preview uploaded file or generated video */}
          {(videoUrl || previewUrl) && (
            <div style={{ marginTop: '16px', textAlign: 'left', position: 'relative', display: 'inline-block' }}>
              {videoUrl ? (
                <video
                  src={videoUrl}
                  controls
                  style={{ maxWidth: '320px', maxHeight: '180px', borderRadius: '8px', border: '1px solid #23232b' }}
                />
              ) : uploadedFile && uploadedFile.type.startsWith('image') ? (
                <>
                  <img
                    src={previewUrl}
                    alt="Preview"
                    style={{ maxWidth: '160px', maxHeight: '90px', borderRadius: '8px', border: '1px solid #23232b' }}
                  />
                  {/* Cross button to remove image */}
                  <button
                    onClick={() => {
                      setUploadedFile(null);
                      setPreviewUrl('');
                    }}
                    style={{
                      position: 'absolute',
                      top: 4,
                      right: 4,
                      background: 'rgba(0,0,0,0.7)',
                      border: 'none',
                      borderRadius: '50%',
                      width: '24px',
                      height: '24px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: '#fff',
                      cursor: 'pointer',
                      zIndex: 2,
                      fontSize: '16px',
                      transition: 'background 0.2s'
                    }}
                    title="Remove image"
                    aria-label="Remove image"
                  >
                    &#10005;
                  </button>
                </>
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
      )}
      {/* ...chat button... */}
    </>
  );
};

export default BottomInputBar;