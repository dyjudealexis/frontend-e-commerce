// components/FullPageSpinner.tsx
import React from 'react';

const FullPageSpinner: React.FC = () => {
  return (
    <div
      style={{
        position: 'fixed', // changed from absolute to fixed
        top: 0,
        left: 0,
        width: '100%',
        height: '100vh',
        backgroundColor: 'rgba(255, 255, 255, 0.7)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 9999,
      }}
    >
      <div className="spinner-border text-primary" role="status" aria-label="Loading...">
        <span className="visually-hidden">Loading...</span>
      </div>
    </div>
  );
};

export default FullPageSpinner;
