"use client"
import React, { useState } from 'react';
import { Settings2, Type, Sparkles, PaintBucket, Palette, SlidersHorizontal, MousePointerClick } from 'lucide-react';

export default function App() {
  // State for customizing the devil button
  const [text, setText] = useState('BUTTON');
  const [eyeColor, setEyeColor] = useState('#ff2a00');
  const [borderColor, setBorderColor] = useState('#b30000');
  const [borderWidth, setBorderWidth] = useState(6);
  const [textColor, setTextColor] = useState('#ffebd6');
  const [bgColor, setBgColor] = useState('#1a0f0f');
  const [mouthColor, setMouthColor] = useState('#000000');
  const [manualHover, setManualHover] = useState(false);

  // Preset themes
  const presets = [
    { name: 'Demon', eye: '#ff2a00', border: '#b30000', width: 6, text: '#ffebd6', bg: '#1a0f0f', mouth: '#000000' },
    { name: 'Toxic', eye: '#39ff14', border: '#004d00', width: 4, text: '#ccffcc', bg: '#0a1a0a', mouth: '#000000' },
    { name: 'Phantom', eye: '#00ffff', border: '#005580', width: 0, text: '#e6ffff', bg: '#05101a', mouth: '#000000' },
  ];

  type Preset = { name: string; eye: string; border: string; width: number; text: string; bg: string; mouth: string; };
  const applyPreset = (preset: Preset) => {
    setEyeColor(preset.eye);
    setBorderColor(preset.border);
    setBorderWidth(preset.width);
    setTextColor(preset.text);
    setBgColor(preset.bg);
    setMouthColor(preset.mouth);
  };

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-200 font-sans flex flex-col lg:flex-row w-full overflow-hidden">
      <style>{"@import url('https://fonts.googleapis.com/css2?family=Creepster&display=swap');"}</style>

      {/* PREVIEW AREA */}
      <div className="flex-1 relative flex flex-col items-center justify-center p-8 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-neutral-900 to-neutral-950 border-b lg:border-b-0 lg:border-r border-neutral-800">
        <div className="absolute top-6 left-6 flex items-center gap-2 text-neutral-400">
          <Sparkles size={20} className="text-amber-500" />
          <span className="font-semibold tracking-wider text-sm uppercase">Canvas Preview</span>
        </div>

        {/* The Devil Button Component */}
        <div className="w-full max-w-[220px]">
          <DevilButton
            text={text || ' '}
            eyeColor={eyeColor}
            borderColor={borderColor}
            borderWidth={borderWidth}
            textColor={textColor}
            bgColor={bgColor}
            mouthColor={mouthColor}
            manualHover={manualHover}
          />
        </div>

        <p className="mt-12 text-neutral-500 text-sm flex items-center gap-2 bg-neutral-900/50 px-4 py-2 rounded-full">
          <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
          Hover or click the button to see the interactions
        </p>
      </div>

      {/* CONTROLS PANEL */}
      <div className="w-full lg:w-96 bg-neutral-900 p-6 flex flex-col gap-6 overflow-y-auto z-10 shadow-2xl">
        <div className="flex items-center gap-2 border-b border-neutral-800 pb-4">
          <Settings2 size={24} className="text-neutral-400" />
          <h2 className="text-xl font-bold tracking-tight text-white">Component Props</h2>
        </div>

        {/* Text Input */}
        <div className="space-y-2">
          <label className="text-xs font-bold uppercase tracking-wider text-neutral-400 flex items-center gap-2">
            <Type size={14} /> Button Text
          </label>
          <input
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value.toUpperCase().slice(0, 10))}
            className="w-full bg-neutral-800 border border-neutral-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-neutral-500 focus:ring-1 focus:ring-neutral-500 transition-colors uppercase font-bold"
            placeholder="ENTER TEXT"
          />
          <p className="text-xs text-neutral-500">Max 10 characters for best visual fit.</p>
        </div>

        {/* Hover Force Toggle */}
        <div className="space-y-2 pt-4 border-t border-neutral-800">
          <div className="flex items-center justify-between">
            <label
              className="text-xs font-bold uppercase tracking-wider text-neutral-400 flex items-center gap-2 cursor-pointer"
              onClick={() => setManualHover(!manualHover)}
            >
              <MousePointerClick size={14} /> Force Hover State
            </label>
            <button
              onClick={() => setManualHover(!manualHover)}
              className={`w-10 h-5 rounded-full relative transition-colors duration-200 focus:outline-none ${manualHover ? 'bg-amber-500' : 'bg-neutral-700'}`}
            >
              <div className={`absolute top-1 left-1 w-3 h-3 rounded-full bg-white transition-transform duration-200 ${manualHover ? 'translate-x-5' : 'translate-x-0'}`} />
            </button>
          </div>
          <p className="text-xs text-neutral-500">Preview the hover animation manually.</p>
        </div>

        {/* Border Thickness Slider */}
        <div className="space-y-2 pt-4 border-t border-neutral-800">
          <label className="text-xs font-bold uppercase tracking-wider text-neutral-400 flex items-center gap-2">
            <SlidersHorizontal size={14} /> Border Thickness: {borderWidth}px
          </label>
          <div className="flex items-center gap-4">
            <span className="text-xs text-neutral-500">0</span>
            <input
              type="range"
              min="0"
              max="15"
              value={borderWidth}
              onChange={(e) => setBorderWidth(Number(e.target.value))}
              className="flex-1 accent-neutral-500 h-2 bg-neutral-800 rounded-lg appearance-none cursor-pointer"
            />
            <span className="text-xs text-neutral-500">15</span>
          </div>
        </div>

        {/* Color Pickers */}
        <div className="space-y-4 pt-4 border-t border-neutral-800">
          <label className="text-xs font-bold uppercase tracking-wider text-neutral-400 flex items-center gap-2">
            <PaintBucket size={14} /> Color Configuration
          </label>

          <div className="grid grid-cols-2 gap-4">
            <ColorInput label="Eye Glow" value={eyeColor} onChange={setEyeColor} />
            <ColorInput label="Border" value={borderColor} onChange={setBorderColor} />
            <ColorInput label="Teeth Text" value={textColor} onChange={setTextColor} />
            <ColorInput label="Background" value={bgColor} onChange={setBgColor} />
          </div>
        </div>

        {/* Presets */}
        <div className="space-y-3 pt-4 border-t border-neutral-800">
          <label className="text-xs font-bold uppercase tracking-wider text-neutral-400 flex items-center gap-2">
            <Palette size={14} /> Style Presets
          </label>
          <div className="flex gap-2">
            {presets.map((preset) => (
              <button
                key={preset.name}
                onClick={() => applyPreset(preset)}
                className="flex-1 py-2 px-3 rounded bg-neutral-800 border border-neutral-700 hover:bg-neutral-700 hover:border-neutral-500 transition-all text-xs font-bold text-neutral-300"
              >
                {preset.name}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-auto pt-6">
          <button className="w-full py-3 rounded-lg bg-white text-black font-bold tracking-wide hover:bg-neutral-200 transition-colors shadow-[0_0_15px_rgba(255,255,255,0.1)]">
            Export Component Code
          </button>
        </div>
      </div>
    </div>
  );
}

// Reusable Color Input Component
interface ColorInputProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
}
function ColorInput({ label, value, onChange }: ColorInputProps) {
  return (
    <div className="flex flex-col gap-1.5">
      <span className="text-xs text-neutral-400">{label}</span>
      <div className="flex items-center gap-2 bg-neutral-800 p-1.5 rounded-md border border-neutral-700">
        <input
          type="color"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-8 h-8 rounded cursor-pointer bg-transparent border-0 p-0 color-picker-custom"
        />
        <span className="text-xs text-neutral-300 font-mono uppercase">{value}</span>
      </div>
    </div>
  );
}

// THE DEVIL BUTTON COMPONENT
interface DevilButtonProps {
  text: string;
  eyeColor: string;
  borderColor: string;
  borderWidth: number;
  textColor: string;
  bgColor: string;
  mouthColor: string;
  manualHover: boolean;
}
function DevilButton({ text, eyeColor, borderColor, borderWidth, textColor, bgColor, mouthColor, manualHover }: DevilButtonProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [isPressed, setIsPressed] = useState(false);

  // Combine actual hover state with the manual override toggle
  const effectiveHover = isHovered || manualHover;

  // SVG Paths for animations
  // Adjusted to a compact pill shape, pushing eyes to the top and text to the bottom
  const textCurveNormal = "M 70,80 Q 200,110 330,80";
  const textCurveHover = "M 45,75 Q 200,125 355,75";
  const currentTextCurve = effectiveHover ? textCurveHover : textCurveNormal;

  return (
    <div
      className="relative w-full transition-transform duration-200 ease-[cubic-bezier(0.34,1.56,0.64,1)]"
      style={{ transform: isPressed ? 'scale(0.95)' : (effectiveHover ? 'scale(1.02)' : 'scale(1)') }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => { setIsHovered(false); setIsPressed(false); }}
      onMouseDown={() => setIsPressed(true)}
      onMouseUp={() => setIsPressed(false)}
      role="button"
      tabIndex={0}
    >
      <svg
        viewBox="0 0 400 140"
        className="w-full drop-shadow-[0_15px_25px_rgba(0,0,0,0.5)]"
        style={{ filter: effectiveHover ? `drop-shadow(0 0 15px ${eyeColor}40)` : 'none', transition: 'filter 0.3s' }}
      >
        <defs>
          {/* Eye Glow Effect */}
          <filter id="eyeGlow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation={effectiveHover ? 8 : 4} result="blur" className="transition-all duration-300" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>

          {/* Invisible path for the text to follow */}
          <path
            id="textCurve"
            d={currentTextCurve}
            style={{ transition: 'd 0.3s cubic-bezier(0.4, 0, 0.2, 1)' }}
          />
        </defs>

        {/* Main Pill Body */}
        <rect
          x="10" y="10" width="380" height="120" rx="60"
          fill={bgColor}
          stroke={borderWidth > 0 ? borderColor : "none"}
          strokeWidth={borderWidth}
          className="transition-colors duration-300"
        />

        {/* Devil Eyes - Pushed to the very top edge */}
        <g filter="url(#eyeGlow)" className="transition-all duration-300">
          {/* Left Eye */}
          <path
            d={effectiveHover ? "M 75,25 L 145,35 L 105,45 Z" : "M 90,30 L 140,35 L 115,40 Z"}
            fill={eyeColor}
            style={{ transition: 'd 0.3s cubic-bezier(0.4, 0, 0.2, 1), fill 0.3s' }}
          />
          {/* Right Eye */}
          <path
            d={effectiveHover ? "M 325,25 L 255,35 L 295,45 Z" : "M 310,30 L 260,35 L 285,40 Z"}
            fill={eyeColor}
            style={{ transition: 'd 0.3s cubic-bezier(0.4, 0, 0.2, 1), fill 0.3s' }}
          />
        </g>

        {/* Text Formed into a Smile - Pushed to the bottom edge */}
        <text
          fill={textColor}
          fontSize={effectiveHover ? 42 : 36}
          fontFamily="'Creepster', Impact, sans-serif"
          className="transition-all duration-300 select-none"
        >
          <textPath
            href="#textCurve"
            startOffset="50%"
            textAnchor="middle"
            textLength={text.length > 2 ? (effectiveHover ? 270 : 220) : undefined}
            lengthAdjust={text.length > 2 ? "spacingAndGlyphs" : undefined}
          >
            {text}
          </textPath>
        </text>
      </svg>
    </div>
  );
}