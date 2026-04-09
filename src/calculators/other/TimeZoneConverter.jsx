import React, { useState } from 'react';
import { Watch } from 'lucide-react';
import CalculatorLayout from '../../components/CalculatorLayout';

export default function TimeZoneConverter() {
  const [time, setTime] = useState('12:00');
  const [fromZone, setFromZone] = useState(Intl.DateTimeFormat().resolvedOptions().timeZone);

  const majorTimeZones = [
    'UTC', 'America/New_York', 'America/Los_Angeles', 'Europe/London', 
    'Europe/Paris', 'Asia/Tokyo', 'Asia/Shanghai', 'Australia/Sydney', 'Australia/Perth'
  ];

  const convertTime = (targetZone) => {
    try {
        const [hours, minutes] = time.split(':');
        const now = new Date();
        const date = new Date(now.getFullYear(), now.getMonth(), now.getDate(), hours, minutes);
        
        // This is a bit tricky in plain JS without libraries like luxon, 
        // but we can use Intl to format into target zone.
        return new Intl.DateTimeFormat('en-US', {
            timeZone: targetZone,
            hour: '2-digit',
            minute: '2-digit',
            hour12: true
        }).format(date);
    } catch (e) {
        return "Error";
    }
  };

  const InputPanel = (
    <div className="space-y-6">
      <div className="input-group">
        <label className="input-label">Local Time</label>
        <input 
            type="time" 
            className="input-field text-xl" 
            value={time} 
            onChange={(e) => setTime(e.target.value)} 
        />
      </div>

      <div className="input-group">
        <label className="input-label">Your Current Zone</label>
        <div className="p-4 bg-secondary rounded-lg border border-border-color font-bold text-primary text-center">
            {fromZone}
        </div>
        <p className="text-xs text-muted mt-2">Detected automatically from your browser.</p>
      </div>
    </div>
  );

  const ResultPanel = (
    <div className="space-y-4">
      {majorTimeZones.map(zone => (
          <div key={zone} className="p-4 bg-secondary/50 rounded-xl border border-border-color flex justify-between items-center hover:border-primary/50 transition-all">
              <div className="flex flex-col">
                  <span className="text-white font-bold">{zone.split('/').pop().replace('_', ' ')}</span>
                  <span className="text-xs text-muted font-medium">{zone}</span>
              </div>
              <span className="text-2xl font-black text-primary-light">
                  {convertTime(zone)}
              </span>
          </div>
      ))}
    </div>
  );

  return (
    <CalculatorLayout
      title="Time Zone Converter"
      description="Convert your local time across major global time zones instantly."
      path="/other/time-zone-converter"
      icon={Watch}
      inputs={InputPanel}
      results={ResultPanel}
      instructions={<p>Enter your local time above. The calculator will automatically show what that time corresponds to in other major cities around the world.</p>}
    />
  );
}
