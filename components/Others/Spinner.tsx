// components/CenteredSpinner.tsx
'use client';

import React from 'react';

const Spinner: React.FC = () => {
  return (
    <div className="d-flex justify-content-center align-items-center" style={{minHeight: "70vh"}}>
      <div className="spinner-border text-primary" role="status" aria-label="Loading...">
        <span className="visually-hidden">Loading...</span>
      </div>
    </div>
  );
};

export default Spinner;
