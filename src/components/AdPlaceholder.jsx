import React from 'react';

export default function AdPlaceholder({ text = "Advertisement Space" }) {
  return (
    <div className="ad-slot">
      <span>{text}</span>
    </div>
  );
}
