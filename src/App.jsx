import React, { useState } from 'react';
import { Joystick, Crosshair, ChevronUp, ChevronDown, ChevronLeft, ChevronRight, Zap, ArrowRight, ShieldAlert, Cpu } from 'lucide-react';

const bindings = {
  base: {
    name: 'Base (No Modifier)',
    hatUp: 'Thrust Forward',
    hatDown: 'Thrust Backward',
    hatRight: 'Thrust Right',
    hatLeft: 'Thrust Left',
    btn1: 'Fire',
    btn2: 'S. Fire',
    btn3: 'Target Ahead',
    btn4: 'Next Tar.',
    btn5: 'Highest Threat',
    btn6: 'Prev. Ship',
  },
  7: {
    name: 'Modifier 7 Held',
    hatUp: 'Thrust Up',
    hatDown: 'Thrust Down',
    hatRight: 'Rotational Correction',
    hatLeft: 'Orbit Lines',
    btn1: 'Toggle Flight Assist',
    btn2: 'Hyperspace Jump',
    btn3: 'Boost',
    btn4: 'Super Cruise',
    btn5: 'Frame Shift',
    btn6: 'Back Tgt',
  },
  8: {
    name: 'Modifier 8 Held',
    hatUp: 'Next Syst. Route',
    hatDown: 'Teammate Navlock',
    hatRight: 'Next Subsys',
    hatLeft: 'Prev Subsys',
    btn1: 'Select Teammate Target',
    btn2: 'Teammate 1',
    btn3: 'Next Hostile',
    btn4: 'Prev Hostile',
    btn5: 'Teammate 2',
    btn6: 'Teammate 3',
  },
  9: {
    name: 'Modifier 9 Held',
    hatUp: 'Power to Engines',
    hatDown: 'Power Balance',
    hatRight: 'Power to Weapons',
    hatLeft: 'Power to Systems',
    btn1: 'Deploy Heat Sink',
    btn2: 'Deploy Hardpoints',
    btn3: '-',
    btn4: '-',
    btn5: 'Prev. Fire G.',
    btn6: 'Next Fire G.',
  },
  10: {
    name: 'Modifier 10 Held',
    hatUp: 'Inc. Sensor Zoom',
    hatDown: 'Dec. Sensor Zoom',
    hatRight: 'Lights',
    hatLeft: 'Night Vision',
    btn1: '-',
    btn2: '-',
    btn3: 'Landing Gear',
    btn4: 'Buggy',
    btn5: 'Cargo Scoop',
    btn6: '-',
  },
  11: {
    name: 'Modifier 11 Held',
    hatUp: 'UI Up',
    hatDown: 'UI Down',
    hatRight: 'UI Right',
    hatLeft: 'UI Left',
    btn1: 'UI FOCUS',
    btn2: 'Role Panel',
    btn3: 'External Pan',
    btn4: 'Internal Pan',
    btn5: 'Comms Pan.',
    btn6: '-',
  },
  12: {
    name: 'Modifier 12 Held',
    hatUp: 'Enter FSS',
    hatDown: '-',
    hatRight: '-',
    hatLeft: '-',
    btn1: 'Switch Cockpit Mode',
    btn2: '-',
    btn3: 'System Map',
    btn4: '-',
    btn5: 'Galaxy Map',
    btn6: 'Game Menu',
  },
  '11+12': {
    name: 'Modifier 11+12 Held',
    hatUp: '-',
    hatDown: '-',
    hatRight: '-',
    hatLeft: '-',
    btn1: 'Jettison All Cargo',
    btn2: '-',
    btn3: '-',
    btn4: '-',
    btn5: '-',
    btn6: '-',
  },
};

export default function App() {
  const [activeMod, setActiveMod] = useState('base');
  const current = bindings[activeMod];

  const ModButton = ({ modKey, label }) => {
    const isActive = activeMod === modKey;
    return (
      <button
        onClick={() => setActiveMod(modKey)}
        className={`w-full text-left px-4 py-3 relative transition-all duration-300 uppercase tracking-wider text-sm font-bold flex items-center justify-between group overflow-hidden ${
          isActive
            ? 'bg-orange-500/20 text-orange-400 border-l-4 border-orange-500 shadow-[inset_4px_0_0_0_#f97316]'
            : 'bg-black/40 text-gray-400 border-l-4 border-transparent hover:bg-orange-500/10 hover:text-orange-300 hover:border-orange-500/50'
        }`}
      >
        {/* Hover Highlight Background */}
        <div className="absolute inset-0 bg-gradient-to-r from-orange-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
        
        <span className="relative z-10">{label}</span>
        
        {isActive && (
          <ArrowRight size={16} className="text-orange-500 animate-pulse relative z-10" />
        )}
      </button>
    );
  };

  return (
    <div className="min-h-screen bg-[#050505] text-orange-500 font-mono p-4 flex flex-col md:flex-row gap-6 selection:bg-orange-500 selection:text-black overflow-hidden relative">
      
      {/* Custom Keyframes for Animations */}
      <style>{`
        @keyframes scanline {
          0% { transform: translateY(-100%); }
          100% { transform: translateY(100vh); }
        }
        .animate-scanline {
          animation: scanline 8s linear infinite;
        }
        @keyframes fade-in-scale {
          0% { opacity: 0; transform: scale(0.98) translateY(10px); }
          100% { opacity: 1; transform: scale(1) translateY(0); }
        }
        .animate-fade-in {
          animation: fade-in-scale 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
        .hud-corner {
          position: absolute;
          width: 20px;
          height: 20px;
          border-color: rgba(249, 115, 22, 0.5);
          border-style: solid;
        }
      `}</style>

      {/* Global Background Effects */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.03]" style={{ backgroundImage: 'linear-gradient(rgba(249, 115, 22, 1) 1px, transparent 1px), linear-gradient(90deg, rgba(249, 115, 22, 1) 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-orange-500/5 to-transparent h-32 w-full animate-scanline pointer-events-none opacity-50 blur-sm" />

      {/* Left Menu - Modifier Selection */}
      <div className="w-full md:w-72 flex-shrink-0 flex flex-col gap-4 relative z-10">
        <div className="bg-gradient-to-r from-orange-600 to-orange-500 text-black p-4 font-bold uppercase tracking-widest flex items-center justify-between shadow-[0_0_20px_rgba(249,115,22,0.3)] rounded-t-lg">
          <div className="flex items-center gap-2">
            <Joystick size={22} />
            <span>X3D Pro</span>
          </div>
          <Cpu size={18} className="opacity-70 animate-pulse" />
        </div>
        
        <div className="flex flex-col gap-1 rounded-b-lg overflow-hidden backdrop-blur-md bg-black/40 border border-orange-500/20 shadow-[0_4px_30px_rgba(0,0,0,0.5)]">
          <ModButton modKey="base" label="Base (No Key)" />
          <ModButton modKey="7" label="Modifier: 7" />
          <ModButton modKey="8" label="Modifier: 8" />
          <ModButton modKey="9" label="Modifier: 9" />
          <ModButton modKey="10" label="Modifier: 10" />
          <ModButton modKey="11" label="Modifier: 11" />
          <ModButton modKey="12" label="Modifier: 12" />
          <ModButton modKey="11+12" label="Modifier: 11+12" />
        </div>

        {/* Status Indicator */}
        <div className="mt-auto border border-orange-500/20 bg-black/40 backdrop-blur-md p-4 rounded-lg flex items-center gap-3">
          <div className="w-2 h-2 rounded-full bg-green-500 shadow-[0_0_10px_#22c55e] animate-pulse" />
          <span className="text-xs text-orange-500/70 uppercase tracking-widest">System Online</span>
        </div>
      </div>

      {/* Right Panel - Visualization */}
      <div className="flex-1 bg-black/60 backdrop-blur-xl border border-orange-500/30 shadow-[0_0_40px_rgba(249,115,22,0.1)] rounded-2xl p-8 relative overflow-hidden flex flex-col z-10">
        
        {/* HUD Corners */}
        <div className="hud-corner top-0 left-0 border-t-2 border-l-2 rounded-tl-xl m-4" />
        <div className="hud-corner top-0 right-0 border-t-2 border-r-2 rounded-tr-xl m-4" />
        <div className="hud-corner bottom-0 left-0 border-b-2 border-l-2 rounded-bl-xl m-4" />
        <div className="hud-corner bottom-0 right-0 border-b-2 border-r-2 rounded-br-xl m-4" />

        <div className="flex items-center justify-between border-b border-orange-500/20 pb-4 mb-8">
          <div className="flex flex-col">
            <span className="text-[10px] text-orange-500/50 uppercase tracking-widest mb-1">Current Configuration</span>
            <h2 className="text-3xl font-bold uppercase tracking-widest text-orange-400 drop-shadow-[0_0_10px_rgba(249,115,22,0.5)]">
              {current.name}
            </h2>
          </div>
          <div className="flex gap-4 items-center">
            <div className="flex gap-2">
              <span className="w-4 h-4 rounded-sm bg-orange-500 animate-[pulse_1s_ease-in-out_infinite] shadow-[0_0_10px_#f97316]"></span>
              <span className="w-4 h-4 rounded-sm bg-orange-500/30"></span>
              <span className="w-4 h-4 rounded-sm bg-orange-500/30"></span>
            </div>
          </div>
        </div>

        {/* Animated Wrapper for Content */}
        <div key={activeMod} className="animate-fade-in flex-1 grid grid-cols-1 lg:grid-cols-2 gap-12">
          
          {/* HAT SWITCH (POV) SECTION */}
          <div className="flex flex-col items-center justify-center">
            <h3 className="text-orange-500/70 uppercase tracking-widest text-sm mb-8 flex items-center gap-2 bg-orange-950/30 px-4 py-2 rounded-full border border-orange-500/20">
              <Crosshair size={16} /> Hat Switch (POV)
            </h3>
            
            <div className="grid grid-cols-3 gap-3 w-full max-w-[18rem] relative">
              {/* Center Glow */}
              <div className="absolute inset-0 bg-orange-500/5 blur-3xl rounded-full pointer-events-none" />

              <div className="col-start-2 flex justify-center">
                <div className="bg-gradient-to-b from-orange-950/80 to-black/80 border border-orange-500/40 p-2 rounded-t-xl text-center w-full aspect-square flex flex-col items-center justify-center hover:bg-orange-900/50 hover:border-orange-400 hover:scale-105 transition-all duration-300 group shadow-lg">
                  <ChevronUp size={20} className="text-orange-500 mb-1 group-hover:drop-shadow-[0_0_8px_#f97316] transition-all" />
                  <span className="text-[11px] uppercase break-words leading-tight font-semibold text-orange-200 group-hover:text-white">{current.hatUp}</span>
                </div>
              </div>
              
              <div className="col-start-1 row-start-2 flex justify-end">
                <div className="bg-gradient-to-r from-orange-950/80 to-black/80 border border-orange-500/40 p-2 rounded-l-xl text-center w-full aspect-square flex flex-col items-center justify-center hover:bg-orange-900/50 hover:border-orange-400 hover:scale-105 transition-all duration-300 group shadow-lg">
                  <ChevronLeft size={20} className="text-orange-500 mb-1 group-hover:drop-shadow-[0_0_8px_#f97316] transition-all" />
                  <span className="text-[11px] uppercase break-words leading-tight font-semibold text-orange-200 group-hover:text-white">{current.hatLeft}</span>
                </div>
              </div>
              
              <div className="col-start-2 row-start-2 bg-black/60 border-2 border-orange-500/30 rounded-full flex items-center justify-center aspect-square shadow-[inset_0_0_20px_rgba(0,0,0,0.8)] relative">
                 <div className="w-10 h-10 rounded-full bg-gradient-to-br from-orange-400 to-orange-700 shadow-[0_0_20px_rgba(249,115,22,0.6)] animate-pulse border border-orange-300/50"></div>
              </div>

              <div className="col-start-3 row-start-2 flex justify-start">
                <div className="bg-gradient-to-l from-orange-950/80 to-black/80 border border-orange-500/40 p-2 rounded-r-xl text-center w-full aspect-square flex flex-col items-center justify-center hover:bg-orange-900/50 hover:border-orange-400 hover:scale-105 transition-all duration-300 group shadow-lg">
                  <ChevronRight size={20} className="text-orange-500 mb-1 group-hover:drop-shadow-[0_0_8px_#f97316] transition-all" />
                  <span className="text-[11px] uppercase break-words leading-tight font-semibold text-orange-200 group-hover:text-white">{current.hatRight}</span>
                </div>
              </div>

              <div className="col-start-2 row-start-3 flex justify-center">
                <div className="bg-gradient-to-t from-orange-950/80 to-black/80 border border-orange-500/40 p-2 rounded-b-xl text-center w-full aspect-square flex flex-col items-center justify-center hover:bg-orange-900/50 hover:border-orange-400 hover:scale-105 transition-all duration-300 group shadow-lg">
                  <ChevronDown size={20} className="text-orange-500 mb-1 group-hover:drop-shadow-[0_0_8px_#f97316] transition-all" />
                  <span className="text-[11px] uppercase break-words leading-tight font-semibold text-orange-200 group-hover:text-white">{current.hatDown}</span>
                </div>
              </div>
            </div>
          </div>

          {/* BUTTONS SECTION */}
          <div className="flex flex-col gap-8 justify-center">
            
            {/* Trigger and Thumb */}
            <div className="flex gap-4">
              <div className="flex-1 bg-gradient-to-br from-red-950/40 to-black/60 border border-red-500/40 rounded-xl p-4 border-l-[6px] border-l-red-600 relative overflow-hidden group h-28 flex flex-col justify-center text-center hover:bg-red-900/30 hover:border-red-400 hover:-translate-y-1 transition-all duration-300 shadow-lg">
                <div className="absolute top-0 right-0 bg-red-600 text-black text-[10px] font-bold px-3 py-1 rounded-bl-lg shadow-md">TRIGGER (1)</div>
                <Zap className="absolute -bottom-4 -left-4 text-red-500/10 w-24 h-24 group-hover:text-red-500/20 transition-colors" />
                <span className="text-red-400 font-bold uppercase mt-3 text-sm md:text-lg leading-tight break-words group-hover:text-red-300 group-hover:drop-shadow-[0_0_8px_#ef4444] relative z-10">{current.btn1}</span>
              </div>
              
              <div className="flex-1 bg-gradient-to-bl from-orange-950/40 to-black/60 border border-orange-500/40 rounded-xl p-4 border-l-[6px] border-l-orange-500 relative overflow-hidden group h-28 flex flex-col justify-center text-center hover:bg-orange-900/30 hover:border-orange-400 hover:-translate-y-1 transition-all duration-300 shadow-lg">
                <div className="absolute top-0 right-0 bg-orange-500 text-black text-[10px] font-bold px-3 py-1 rounded-bl-lg shadow-md">SIDE (2)</div>
                <span className="text-orange-400 font-bold uppercase mt-3 text-sm md:text-lg leading-tight break-words group-hover:text-orange-300 group-hover:drop-shadow-[0_0_8px_#f97316] relative z-10">{current.btn2}</span>
              </div>
            </div>

            {/* Top Head Buttons (3,4,5,6) */}
            <div className="bg-black/40 backdrop-blur-sm border border-orange-500/20 rounded-2xl p-5 shadow-inner">
              <h3 className="text-orange-500/60 uppercase tracking-widest text-xs mb-5 text-center flex items-center justify-center gap-4">
                <div className="h-px bg-orange-500/20 flex-1"></div>
                <span className="px-2">Head Buttons</span>
                <div className="h-px bg-orange-500/20 flex-1"></div>
              </h3>
              
              <div className="grid grid-cols-2 gap-4">
                {/* Button 5 */}
                <div className="bg-gradient-to-br from-orange-900/20 to-black/40 border border-orange-500/30 rounded-xl p-2 text-center flex flex-col items-center justify-center h-24 overflow-hidden hover:bg-orange-800/40 hover:border-orange-400 hover:scale-[1.02] transition-all duration-300 group">
                   <span className="bg-orange-500/10 text-orange-400/80 text-[9px] px-2 py-0.5 rounded-full mb-2 font-bold border border-orange-500/20">BTN 5</span>
                   <span className="uppercase text-xs font-bold text-orange-200 leading-tight break-words group-hover:text-white">{current.btn5}</span>
                </div>

                {/* Button 6 */}
                <div className="bg-gradient-to-bl from-orange-900/20 to-black/40 border border-orange-500/30 rounded-xl p-2 text-center flex flex-col items-center justify-center h-24 overflow-hidden hover:bg-orange-800/40 hover:border-orange-400 hover:scale-[1.02] transition-all duration-300 group">
                   <span className="bg-orange-500/10 text-orange-400/80 text-[9px] px-2 py-0.5 rounded-full mb-2 font-bold border border-orange-500/20">BTN 6</span>
                   <span className="uppercase text-xs font-bold text-orange-200 leading-tight break-words group-hover:text-white">{current.btn6}</span>
                </div>

                {/* Button 3 */}
                <div className="bg-gradient-to-tr from-orange-900/20 to-black/40 border border-orange-500/30 rounded-xl p-2 text-center flex flex-col items-center justify-center h-24 overflow-hidden hover:bg-orange-800/40 hover:border-orange-400 hover:scale-[1.02] transition-all duration-300 group">
                   <span className="bg-orange-500/10 text-orange-400/80 text-[9px] px-2 py-0.5 rounded-full mb-2 font-bold border border-orange-500/20">BTN 3</span>
                   <span className="uppercase text-xs font-bold text-orange-200 leading-tight break-words group-hover:text-white">{current.btn3}</span>
                </div>

                {/* Button 4 */}
                <div className="bg-gradient-to-tl from-orange-900/20 to-black/40 border border-orange-500/30 rounded-xl p-2 text-center flex flex-col items-center justify-center h-24 overflow-hidden hover:bg-orange-800/40 hover:border-orange-400 hover:scale-[1.02] transition-all duration-300 group">
                   <span className="bg-orange-500/10 text-orange-400/80 text-[9px] px-2 py-0.5 rounded-full mb-2 font-bold border border-orange-500/20">BTN 4</span>
                   <span className="uppercase text-xs font-bold text-orange-200 leading-tight break-words group-hover:text-white">{current.btn4}</span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}