import React from 'react';
import Sidebar from '../../components/Sidebar';

export default function ProfilePage() {
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
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', background: '#111' }}>
        {/* Top Bar */}
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

        {/* Profile Content */}
        <div style={{ flex: 1, padding: '40px 24px', maxWidth: '800px', margin: '0 auto', width: '100%' }}>
          {/* User Profile Header */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '16px',
            marginBottom: '32px'
          }}>
            <div style={{
              width: '64px',
              height: '64px',
              background: 'linear-gradient(135deg, #f97316 0%, #3b82f6 100%)',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'white',
              fontWeight: 'bold',
              fontSize: '24px'
            }}>
              P
            </div>
            <div>
              <div style={{ fontSize: '24px', fontWeight: '600', color: 'white', marginBottom: '4px' }}>
                Pushkalmatcha
              </div>
              <div style={{ color: '#9ca3af', fontSize: '14px', marginBottom: '8px' }}>
                matchapushkal@gmail.com
              </div>
              <div style={{
                display: 'inline-block',
                backgroundColor: '#374151',
                color: '#9ca3af',
                padding: '4px 8px',
                borderRadius: '4px',
                fontSize: '12px',
                fontWeight: '500'
              }}>
                free
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div style={{ display: 'flex', gap: '12px', marginBottom: '32px' }}>
            <button style={{
              backgroundColor: '#3b82f6',
              color: 'white',
              border: 'none',
              borderRadius: '6px',
              padding: '8px 16px',
              fontWeight: '500',
              fontSize: '14px',
              cursor: 'pointer'
            }}>
              Manage
            </button>
            <button style={{
              backgroundColor: '#374151',
              color: 'white',
              border: 'none',
              borderRadius: '6px',
              padding: '8px 16px',
              fontWeight: '500',
              fontSize: '14px',
              cursor: 'pointer'
            }}>
              Generate API Key
            </button>
            <button style={{
              backgroundColor: '#374151',
              color: 'white',
              border: 'none',
              borderRadius: '6px',
              padding: '8px 16px',
              fontWeight: '500',
              fontSize: '14px',
              cursor: 'pointer'
            }}>
              Connect with Zapier here
            </button>
          </div>

          {/* Referral Section */}
          <div style={{ marginBottom: '24px' }}>
            <label style={{
              display: 'block',
              color: 'white',
              fontSize: '14px',
              fontWeight: '500',
              marginBottom: '8px'
            }}>
              Referral
            </label>
            <input
              type="text"
              placeholder="Enter referral code"
              style={{
                width: '100%',
                padding: '12px 16px',
                backgroundColor: '#1f2937',
                border: '1px solid #374151',
                borderRadius: '6px',
                color: 'white',
                fontSize: '14px',
                outline: 'none'
              }}
            />
          </div>

          {/* Webhook Section */}
          <div style={{ marginBottom: '32px' }}>
            <label style={{
              display: 'block',
              color: 'white',
              fontSize: '14px',
              fontWeight: '500',
              marginBottom: '8px'
            }}>
              Webhook
            </label>
            <input
              type="text"
              placeholder="Input webhook url"
              style={{
                width: '100%',
                padding: '12px 16px',
                backgroundColor: '#1f2937',
                border: '1px solid #374151',
                borderRadius: '6px',
                color: 'white',
                fontSize: '14px',
                outline: 'none'
              }}
            />
          </div>

          {/* Add Social Accounts */}
          <div>
            <h3 style={{
              color: 'white',
              fontSize: '16px',
              fontWeight: '600',
              marginBottom: '16px'
            }}>
              Add Social Accounts
            </h3>
            <div style={{ display: 'flex', gap: '16px' }}>
              <div style={{
                flex: 1,
                backgroundColor: '#1f2937',
                border: '1px solid #374151',
                borderRadius: '8px',
                padding: '24px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                textAlign: 'center'
              }}>
                <div style={{
                  width: '48px',
                  height: '48px',
                  backgroundColor: '#ff0000',
                  borderRadius: '8px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: '12px'
                }}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="white">
                    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                  </svg>
                </div>
                <div style={{ color: 'white', fontSize: '16px', fontWeight: '500', marginBottom: '12px' }}>
                  YouTube
                </div>
                <button style={{
                  backgroundColor: 'transparent',
                  color: '#3b82f6',
                  border: '1px solid #3b82f6',
                  borderRadius: '6px',
                  padding: '8px 16px',
                  fontWeight: '500',
                  fontSize: '14px',
                  cursor: 'pointer'
                }}>
                  + Connect to YouTube
                </button>
              </div>
              <div style={{
                flex: 1,
                backgroundColor: '#1f2937',
                border: '1px solid #374151',
                borderRadius: '8px',
                padding: '24px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                textAlign: 'center'
              }}>
                <div style={{
                  width: '48px',
                  height: '48px',
                  backgroundColor: '#000',
                  borderRadius: '8px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: '12px'
                }}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="white">
                    <path d="M12.53.02C13.84 0 15.14.01 16.44 0c.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/>
                  </svg>
                </div>
                <div style={{ color: 'white', fontSize: '16px', fontWeight: '500', marginBottom: '12px' }}>
                  Tiktok
                </div>
                <button style={{
                  backgroundColor: 'transparent',
                  color: '#3b82f6',
                  border: '1px solid #3b82f6',
                  borderRadius: '6px',
                  padding: '8px 16px',
                  fontWeight: '500',
                  fontSize: '14px',
                  cursor: 'pointer'
                }}>
                  + Connect to TikTok
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}