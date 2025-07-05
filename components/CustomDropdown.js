import React, { useState, useRef, useEffect } from 'react';

const CustomDropdown = ({ value, onChange, options = [], placeholder = 'Select', style = {} }) => {
  const [open, setOpen] = useState(false);
  const buttonRef = useRef(null);
  const dropdownRef = useRef(null);

  // Close dropdown on outside click
  useEffect(() => {
    if (!open) return;
    function handleClick(e) {
      if (
        buttonRef.current && !buttonRef.current.contains(e.target) &&
        dropdownRef.current && !dropdownRef.current.contains(e.target)
      ) {
        setOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, [open]);

  // Find selected label
  const selected = options.find(opt => opt.value === value);

  return (
    <div style={{ position: 'relative', minWidth: 120, ...style }}>
      <button
        ref={buttonRef}
        type="button"
        onClick={() => setOpen(v => !v)}
        style={{
          width: '100%',
          background: '#10141c',
          color: '#fff',
          border: 'none',
          borderRadius: '12px',
          padding: '8px 18px',
          fontSize: '14px',
          fontWeight: 600,
          boxShadow: '0 2px 8px 0 rgba(0,0,0,0.10)',
          outline: open ? '2px solid #3b82f6' : 'none',
          cursor: 'pointer',
          textAlign: 'left',
          transition: 'background 0.2s',
        }}
        aria-haspopup="listbox"
        aria-expanded={open}
      >
        {selected ? selected.label : <span style={{ color: '#9ca3af' }}>{placeholder}</span>}
      </button>
      {open && (
        <div
          ref={dropdownRef}
          style={{
            position: 'absolute',
            left: 0,
            right: 0,
            bottom: '110%',
            background: '#18181b',
            borderRadius: '12px',
            boxShadow: '0 8px 32px 0 rgba(0,0,0,0.25)',
            zIndex: 100,
            padding: '6px 0',
            marginTop: 4,
            minWidth: 120,
          }}
          role="listbox"
        >
          {options.map(opt => (
            <div
              key={opt.value}
              role="option"
              aria-selected={value === opt.value}
              onClick={e => {
                setOpen(false);
                if (onChange) {
                  // Simulate event for compatibility
                  onChange({ target: { value: opt.value } });
                }
              }}
              style={{
                padding: '10px 18px',
                color: value === opt.value ? '#3b82f6' : '#fff',
                background: value === opt.value ? 'rgba(59,130,246,0.08)' : 'none',
                fontWeight: value === opt.value ? 700 : 500,
                cursor: 'pointer',
                transition: 'background 0.15s',
                border: 'none',
                outline: 'none',
              }}
              onMouseOver={e => (e.currentTarget.style.background = 'rgba(59,130,246,0.15)')}
              onMouseOut={e => (e.currentTarget.style.background = value === opt.value ? 'rgba(59,130,246,0.08)' : 'none')}
            >
              {opt.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CustomDropdown;
