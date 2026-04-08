"use client"

import React, { useState } from 'react';
import { Settings2, Type, Sparkles, PaintBucket, Palette, MousePointerClick, AlignLeft } from 'lucide-react';

export default function App() {
  // State for customizing the Grab Card
  const [title, setTitle] = useState('Interactive Grip');
  const [description, setDescription] = useState('Hover over this card to feel the physical grab effect. The hand smoothly folds into a fist and squeezes the container.');
  const [handColor, setHandColor] = useState('#e5e5e5');
  const [glowColor, setGlowColor] = useState('#8b5cf6'); // Violet glow
  const [bgColor, setBgColor] = useState('#121212');
  const [manualHover, setManualHover] = useState(false);

  // Preset themes
  const presets = [
    { name: 'Neon', hand: '#e5e5e5', glow: '#8b5cf6', bg: '#121212' },
    { name: 'Toxic', hand: '#39ff14', glow: '#39ff14', bg: '#0a1a0a' },
    { name: 'Crimson', hand: '#ff2a00', glow: '#ff0000', bg: '#1a0f0f' },
    { name: 'Ghost', hand: '#ffffff', glow: '#ffffff', bg: '#000000' },
  ];

  const applyPreset = (preset) => {
    setHandColor(preset.hand);
    setGlowColor(preset.glow);
    setBgColor(preset.bg);
  };

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-200 font-sans flex flex-col lg:flex-row w-full overflow-hidden">
      
      {/* PREVIEW AREA */}
      <div className="flex-1 relative flex flex-col items-center justify-center p-8 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-neutral-900 to-neutral-950 border-b lg:border-b-0 lg:border-r border-neutral-800">

        
        {/* The Grab Card Component */}
        <div className="w-full max-w-sm">
          <GrabCard 
            title={title} 
            description={description}
            handColor={handColor} 
            glowColor={glowColor} 
            bgColor={bgColor} 
            manualHover={manualHover}
          />
        </div>
        
        <p className="mt-12 text-neutral-500 text-sm flex items-center gap-2 bg-neutral-900/50 px-4 py-2 rounded-full shadow-lg">
          <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
          Hover the card to trigger the grab physics
        </p>
      </div>

      {/* CONTROLS PANEL */}
      <div className="w-full lg:w-96 bg-neutral-900 p-6 flex flex-col gap-6 overflow-y-auto z-10 shadow-2xl">
        <div className="flex items-center gap-2 border-b border-neutral-800 pb-4">
          <Settings2 size={24} className="text-neutral-400" />
          <h2 className="text-xl font-bold tracking-tight text-white">Card Props</h2>
        </div>

        {/* Hover Force Toggle */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <label 
              className="text-xs font-bold uppercase tracking-wider text-neutral-400 flex items-center gap-2 cursor-pointer" 
              onClick={() => setManualHover(!manualHover)}
            >
              <MousePointerClick size={14} /> Force Grab State
            </label>
            <button 
              onClick={() => setManualHover(!manualHover)}
              className={`w-10 h-5 rounded-full relative transition-colors duration-200 focus:outline-none ${manualHover ? 'bg-amber-500' : 'bg-neutral-700'}`}
            >
              <div className={`absolute top-1 left-1 w-3 h-3 rounded-full bg-white transition-transform duration-200 ${manualHover ? 'translate-x-5' : 'translate-x-0'}`} />
            </button>
          </div>
          <p className="text-xs text-neutral-500">Manually lock the card into its squeezed state.</p>
        </div>

        {/* Content Inputs */}
        <div className="space-y-4 pt-4 border-t border-neutral-800">
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-wider text-neutral-400 flex items-center gap-2">
              <Type size={14} /> Card Title
            </label>
            <input 
              type="text" 
              value={title} 
              onChange={(e) => setTitle(e.target.value)}
              className="w-full bg-neutral-800 border border-neutral-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-neutral-500 focus:ring-1 focus:ring-neutral-500 transition-colors font-bold"
              placeholder="Enter title"
            />
          </div>
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-wider text-neutral-400 flex items-center gap-2">
              <AlignLeft size={14} /> Description
            </label>
            <textarea 
              value={description} 
              onChange={(e) => setDescription(e.target.value)}
              rows={3}
              className="w-full bg-neutral-800 border border-neutral-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-neutral-500 focus:ring-1 focus:ring-neutral-500 transition-colors text-sm resize-none"
              placeholder="Enter description"
            />
          </div>
        </div>

        {/* Color Pickers */}
        <div className="space-y-4 pt-4 border-t border-neutral-800">
          <label className="text-xs font-bold uppercase tracking-wider text-neutral-400 flex items-center gap-2">
            <PaintBucket size={14} /> Aesthetics
          </label>
          
          <div className="grid grid-cols-2 gap-4">
            <ColorInput label="Hand Color" value={handColor} onChange={setHandColor} />
            <ColorInput label="Grab Glow" value={glowColor} onChange={setGlowColor} />
            <ColorInput label="Background" value={bgColor} onChange={setBgColor} className="col-span-2" />
          </div>
        </div>

        {/* Presets */}
        <div className="space-y-3 pt-4 border-t border-neutral-800">
          <label className="text-xs font-bold uppercase tracking-wider text-neutral-400 flex items-center gap-2">
            <Palette size={14} /> Style Presets
          </label>
          <div className="grid grid-cols-2 gap-2">
            {presets.map((preset) => (
              <button
                key={preset.name}
                onClick={() => applyPreset(preset)}
                className="py-2 px-3 rounded bg-neutral-800 border border-neutral-700 hover:bg-neutral-700 hover:border-neutral-500 transition-all text-xs font-bold text-neutral-300"
              >
                {preset.name}
              </button>
            ))}
          </div>
        </div>
        
        <div className="mt-auto pt-6">
          <button className="w-full py-3 rounded-lg bg-white text-black font-bold tracking-wide hover:bg-neutral-200 transition-colors shadow-[0_0_15px_rgba(255,255,255,0.1)]">
            Export Card Code
          </button>
        </div>
      </div>
    </div>
  );
}

// Reusable Color Input Component
function ColorInput({ label, value, onChange, className = "" }) {
  return (
    <div className={`flex flex-col gap-1.5 ${className}`}>
      <span className="text-xs text-neutral-400">{label}</span>
      <div className="flex items-center gap-2 bg-neutral-800 p-1.5 rounded-md border border-neutral-700">
        <input 
          type="color" 
          value={value} 
          onChange={(e) => onChange(e.target.value)}
          className="w-8 h-8 rounded cursor-pointer bg-transparent border-0 p-0"
        />
        <span className="text-xs text-neutral-300 font-mono uppercase">{value}</span>
      </div>
    </div>
  );
}

// THE GRAB CARD COMPONENT
function GrabCard({ title, description, handColor, glowColor, bgColor, manualHover }) {
  const [isHovered, setIsHovered] = useState(false);
  const effectiveHover = isHovered || manualHover;

  return (
    <div 
      className="relative w-full h-80 rounded-2xl p-8 flex flex-col justify-end cursor-pointer transition-all duration-500 border border-neutral-800"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        backgroundColor: bgColor,
        transform: effectiveHover ? 'scale(0.95) translateY(5px)' : 'scale(1) translateY(0)',
        borderColor: effectiveHover ? glowColor : '#262626',
        boxShadow: effectiveHover 
          ? `inset 0 0 0 1px ${glowColor}, 0 25px 50px rgba(0,0,0,0.8), 0 0 40px ${glowColor}30` 
          : `inset 0 0 0 1px rgba(255,255,255,0.05), 0 10px 30px rgba(0,0,0,0.5)`,
      }}
    >
      {/* Background Glow */}
      <div 
        className="absolute top-0 left-0 w-full h-full rounded-2xl pointer-events-none transition-opacity duration-500"
        style={{
          background: `radial-gradient(circle at 10% 10%, ${glowColor}40 0%, transparent 50%)`,
          opacity: effectiveHover ? 1 : 0,
        }}
      />

      {/* The Animated SVG Hand - Precisely positioned on the top-left edge */}
      <div 
        className="absolute top-0 left-0 w-16 h-16 z-20 transition-all duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)] origin-top-left"
        style={{
          // Hand rests gently on the corner, and clamps down sharply when grabbed
          transform: effectiveHover 
            ? 'translate(-4px, -4px) rotate(-15deg) scale(0.95)' 
            : 'translate(-8px, -8px) rotate(0deg) scale(1)',
          filter: effectiveHover 
            ? `drop-shadow(0 4px 12px rgba(0,0,0,0.8)) drop-shadow(0 0 4px ${glowColor}80)` 
            : 'drop-shadow(0 8px 16px rgba(0,0,0,0.6))'
        }}
      >
        <MorphingHand color={handColor} isGrabbed={effectiveHover} />
      </div>

      {/* Card Content */}
      <div 
        className="relative z-10 transition-transform duration-500"
        style={{ transform: effectiveHover ? 'translateY(-4px)' : 'translateY(0)' }}
      >
        <h3 
          className="text-2xl font-black mb-3 transition-colors duration-300"
          style={{ color: effectiveHover ? glowColor : '#ffffff' }}
        >
          {title}
        </h3>
        <p className="text-neutral-400 text-sm leading-relaxed line-clamp-3">
          {description}
        </p>
      </div>
    </div>
  );
}

// FULLY RE-ENGINEERED ARTICULATED CARTOON HAND
// Uses pure anatomy mapping: distinct wrist, palm, and rotating knuckle joints
function MorphingHand({ color, isGrabbed }) {
  const transitionClass = "transition-all duration-[400ms] ease-[cubic-bezier(0.34,1.56,0.64,1)]";
  
  // Slightly darken the base color to create depth lines without adding gross strokes
  const innerShadow = "rgba(0,0,0,0.15)";

  return (
    <svg viewBox="0 0 100 100" className="w-full h-full overflow-visible">
      {/* Wrist / Cuff */}
      <rect 
        x="30" y="80" width="40" height="20" rx="6" 
        fill={color} 
        className={transitionClass} 
      />

      {/* Main Palm Body */}
      <rect 
        x="26" y="48" width="48" height="38" rx="14" 
        fill={color} 
        className={transitionClass} 
      />

      {/* Knuckle Joints (Circles to hide rotation gaps perfectly) */}
      <circle cx="34" cy="50" r="5.5" fill={color} />
      <circle cx="50" cy="50" r="5.5" fill={color} />
      <circle cx="66" cy="50" r="5.5" fill={color} />
      <circle cx="21" cy="65" r="6.5" fill={color} />

      {/* Index Finger */}
      <rect 
        x="28" y="18" width="12" height="36" rx="6" 
        fill={color} 
        className={transitionClass} 
        style={{ 
          transformOrigin: '34px 50px', // Exact center of its knuckle joint
          transform: isGrabbed ? 'rotate(170deg)' : 'rotate(-10deg)' 
        }} 
      />
      
      {/* Middle Finger */}
      <rect 
        x="44" y="12" width="12" height="42" rx="6" 
        fill={color} 
        className={transitionClass} 
        style={{ 
          transformOrigin: '50px 50px', // Exact center of its knuckle joint
          transform: isGrabbed ? 'rotate(175deg)' : 'rotate(0deg)' 
        }} 
      />
      
      {/* Ring / Pinky Finger */}
      <rect 
        x="60" y="20" width="12" height="34" rx="6" 
        fill={color} 
        className={transitionClass} 
        style={{ 
          transformOrigin: '66px 50px', // Exact center of its knuckle joint
          transform: isGrabbed ? 'rotate(180deg)' : 'rotate(10deg)' 
        }} 
      />

      {/* Thumb - Last so it rests over the folded fingers */}
      <rect 
        x="14" y="45" width="14" height="30" rx="7" 
        fill={color} 
        className={transitionClass} 
        style={{ 
          transformOrigin: '21px 65px', // Exact center of thumb base joint
          // Swings from pointing outwards (-40deg) to crushing inwards over the fingers (85deg)
          transform: isGrabbed ? 'rotate(85deg) translate(2px, -4px)' : 'rotate(-40deg)' 
        }} 
      />

      {/* Small detail lines for the knuckles to make it read as a glove/hand */}
      <line x1="34" y1="45" x2="34" y2="55" stroke={innerShadow} strokeWidth="2" strokeLinecap="round" className={transitionClass} style={{ opacity: isGrabbed ? 0 : 1 }}/>
      <line x1="50" y1="45" x2="50" y2="55" stroke={innerShadow} strokeWidth="2" strokeLinecap="round" className={transitionClass} style={{ opacity: isGrabbed ? 0 : 1 }}/>
      <line x1="66" y1="45" x2="66" y2="55" stroke={innerShadow} strokeWidth="2" strokeLinecap="round" className={transitionClass} style={{ opacity: isGrabbed ? 0 : 1 }}/>
    </svg>
  );
}