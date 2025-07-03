'use client';
import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const Sidebar = () => {
  const pathname = usePathname();

  const commonStyles = {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    padding: '12px',
    borderRadius: '6px',
    marginBottom: '4px',
    cursor: 'pointer',
    textDecoration: 'none'
  };

  return (
    <div style={{
      width: '240px',
      backgroundColor: '#1a1a1a',
      minHeight: '100vh',
      padding: '16px',
      borderRight: '1px solid #2d2d2d'
    }}>
      {/* User Profile */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
        padding: '12px',
        backgroundColor: '#2d2d2d',
        borderRadius: '8px',
        marginBottom: '24px'
      }}>
        <div style={{
          width: '32px',
          height: '32px',
          backgroundColor: '#3b82f6',
          borderRadius: '50%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'white',
          fontWeight: 'bold',
          fontSize: '14px'
        }}>P</div>
        <span style={{ color: 'white', fontWeight: '500' }}>PushKalmatcha</span>
      </div>

      {/* Create Section */}
      <div style={{ marginBottom: '24px' }}>
        <h3 style={{ color: '#9ca3af', fontSize: '12px', fontWeight: '600', marginBottom: '8px', textTransform: 'uppercase' }}>Create</h3>
      </div>

      {/* Navigation */}
      <nav>
        <Link
          href="/"
          style={{
            ...commonStyles,
            color: pathname === '/' ? 'white' : '#9ca3af',
            backgroundColor: pathname === '/' ? '#2d2d2d' : 'transparent'
          }}
        >
          <span>🏠</span>
          <span>Home</span>
        </Link>
        <Link
          href="/my-projects"
          style={{
            ...commonStyles,
            color: pathname === '/my-projects' ? 'white' : '#9ca3af',
            backgroundColor: pathname === '/my-projects' ? '#2d2d2d' : 'transparent'
          }}
        >
          <span>📁</span>
          <span>My Projects</span>
        </Link>
        <Link
          href="/profile"
          style={{
            ...commonStyles,
            color: pathname === '/profile' ? 'white' : '#9ca3af',
            backgroundColor: pathname === '/profile' ? '#2d2d2d' : 'transparent'
          }}
        >
          <span>👤</span>
          <span>Profile</span>
        </Link>
      </nav>

      {/* Account Section */}
      <div style={{ marginBottom: '16px' }}>
        <h3 style={{ color: '#9ca3af', fontSize: '12px', fontWeight: '600', marginBottom: '8px', textTransform: 'uppercase' }}>Account</h3>
        <Link href="/activity" style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            padding: '12px',
            color: pathname === '/activity' ? 'white' : '#9ca3af',
            backgroundColor: pathname === '/activity' ? '#2d2d2d' : 'transparent',
            borderRadius: '6px',
            marginBottom: '4px',
            cursor: 'pointer',
            textDecoration: 'none'
          }}>
            <span>📊</span>
            <span>Activity</span>
        </Link>
        <Link href="/support" style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            padding: '12px',
            color: pathname === '/support' ? 'white' : '#9ca3af',
            backgroundColor: pathname === '/support' ? '#2d2d2d' : 'transparent',
            borderRadius: '6px',
            marginBottom: '4px',
            cursor: 'pointer',
            textDecoration: 'none'
          }}>
            <span>🔧</span>
            <span>Support</span>
        </Link>
        <Link href="/subscription" style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            padding: '12px',
            color: pathname === '/subscription' ? 'white' : '#9ca3af',
            backgroundColor: pathname === '/subscription' ? '#2d2d2d' : 'transparent',
            borderRadius: '6px',
            marginBottom: '4px',
            cursor: 'pointer',
            textDecoration: 'none'
          }}>
            <span>👑</span>
            <span>Subscription</span>
        </Link>
        <Link href="/logout" style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            padding: '12px',
            color: pathname === '/logout' ? 'white' : '#9ca3af',
            backgroundColor: pathname === '/logout' ? '#2d2d2d' : 'transparent',
            borderRadius: '6px',
            marginBottom: '4px',
            cursor: 'pointer',
            textDecoration: 'none'
          }}>
            <span>🚪</span>
            <span>Logout</span>
        </Link>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          padding: '12px',
          color: '#9ca3af',
          borderRadius: '6px',
          cursor: 'pointer'
        }}>
          <span>🌙</span>
          <span>Dark Mode</span>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;