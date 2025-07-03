"use client";
import React, { useState } from 'react';
import Sidebar from '../../components/Sidebar';

const TABS = [
  { label: 'Videos', key: 'videos' },
  { label: 'Images', key: 'images' },
  { label: 'Musics', key: 'musics' },
  { label: '3D', key: '3d' },
];

const YOUTUBE_IFRAME = (
  <iframe
    width="560"
    height="315"
    src="https://www.youtube.com/embed/S0HDNnjAego?start=8"
    title="YouTube video player"
    frameBorder="0"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
    allowFullScreen
    style={{
      borderRadius: '12px',
      border: 'none',
      outline: 'none',
      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.3)'
    }}
  />
);

const DUMMY_CONTENT = {
  videos: YOUTUBE_IFRAME,
  images: YOUTUBE_IFRAME,
  musics: YOUTUBE_IFRAME,
  '3d': YOUTUBE_IFRAME,
};

const MyProjectsPage = () => {
  const [activeTab, setActiveTab] = useState('videos');
  return (
    <div style={{
      minHeight: '100vh',
      background: '#111',
      color: 'white',
      display: 'flex',
      fontFamily: 'system-ui, -apple-system, sans-serif',
      boxSizing: 'border-box',
      overflow: 'hidden'
    }}>
      <Sidebar />
      
      {/* Main Content */}
      <div style={{
        flex: 1,
        background: '#111',
        minHeight: '100vh'
      }}>
        {/* Header */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '16px 24px',
          borderBottom: '1px solid #2d2d2d'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <span style={{
              background: 'linear-gradient(135deg, #8b5cf6 0%, #3b82f6 100%)',
              borderRadius: '4px',
              width: '32px',
              height: '32px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontWeight: 'bold',
              color: 'white',
              fontSize: '14px'
            }}>V</span>
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

        {/* Projects Header */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '24px 24px 0 24px'
        }}>
          <h2 style={{ fontSize: '32px', fontWeight: 'bold', color: 'white', margin: 0 }}>Projects</h2>
          <button style={{
            background: '#1a1a1a',
            color: 'white',
            border: '1px solid #2d2d2d',
            borderRadius: '6px',
            padding: '8px 16px',
            fontWeight: '500',
            fontSize: '14px',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}>
            <span>📁</span>
            Create Folder
          </button>
        </div>

        {/* Controls */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '16px 24px',
          gap: '16px'
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px'
          }}>
            <span style={{ fontSize: '14px', color: '#9ca3af' }}>Sort By:</span>
            <select style={{
              background: '#1a1a1a',
              color: 'white',
              border: '1px solid #2d2d2d',
              borderRadius: '6px',
              padding: '6px 12px',
              fontSize: '14px'
            }}>
              <option>Newest</option>
              <option>Oldest</option>
            </select>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              background: '#1a1a1a',
              border: '1px solid #2d2d2d',
              borderRadius: '6px',
              padding: '6px 12px'
            }}>
              <span style={{ color: '#3b82f6' }}>🔍</span>
              <input
                type="text"
                placeholder="Search by name"
                style={{
                  background: 'transparent',
                  color: 'white',
                  border: 'none',
                  fontSize: '14px',
                  outline: 'none'
                }}
              />
            </div>
          </div>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px'
          }}>
            <button style={{
              background: '#1a1a1a',
              color: 'white',
              border: '1px solid #2d2d2d',
              borderRadius: '6px',
              padding: '6px 12px',
              fontSize: '14px',
              cursor: 'pointer'
            }}>
              ☰
            </button>
            <button style={{
              background: '#1a1a1a',
              color: 'white',
              border: '1px solid #2d2d2d',
              borderRadius: '6px',
              padding: '6px 16px',
              fontSize: '14px',
              cursor: 'pointer'
            }}>
              Select
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '32px',
          padding: '0 24px',
          borderBottom: '1px solid #2d2d2d'
        }}>
          {TABS.map(tab => (
            <span
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              style={{
                color: activeTab === tab.key ? '#3b82f6' : '#9ca3af',
                fontWeight: activeTab === tab.key ? 600 : 500,
                fontSize: '16px',
                borderBottom: activeTab === tab.key ? '2px solid #3b82f6' : 'none',
                paddingBottom: '12px',
                cursor: 'pointer',
                transition: 'color 0.2s, border-bottom 0.2s'
              }}
            >
              {tab.label}
            </span>
          ))}
        </div>

        {/* Tab Content */}
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: 'calc(100vh - 280px)',
          padding: '24px'
        }}>
          {DUMMY_CONTENT[activeTab]}
        </div>
      </div>
    </div>
  );
};

export default MyProjectsPage;