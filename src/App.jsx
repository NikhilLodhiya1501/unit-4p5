
import { useRef, useState } from "react";
import "./App.css";

export default function App() {
  const usernameRef = useRef(null);
  const keyRef = useRef(null);

  const [reveal, setReveal] = useState(false);
  const [agent, setAgent] = useState("");
  const [error, setError] = useState("");
  const [scanning, setScanning] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();

    const username = usernameRef.current.value.trim();
    const key = keyRef.current.value;

    if (!username || !key) {
      setError("IDENTITY ERROR: COMPLETE BOTH FIELDS");
      return;
    }

    if (key.length < 4) {
      setError("ACCESS KEY MUST HAVE AT LEAST 4 CHARACTERS");
      return;
    }

    setError("");
    setScanning(true);

    // Demonstration only; no real authentication.
    setTimeout(() => {
      setAgent(username);
      setScanning(false);
    }, 900);
  }

  function disconnect() {
    setAgent("");
    setError("");
    setReveal(false);
    usernameRef.current.value = "";
    keyRef.current.value = "";
  }

  return (
    <main className="cyber min-h-screen text-cyan-50">
      <div className="scanlines" />

      <header className="relative z-10 flex items-center justify-between
        border-b border-cyan-400/20 px-5 py-5 md:px-12">
        <div className="flex items-center gap-3">
          <div className="brand-mark">N</div>
          <div>
            <h1 className="font-black tracking-[0.2em]">
              NEXUS<span className="text-fuchsia-400">//</span>OS
            </h1>
            <p className="text-[9px] tracking-[0.3em] text-cyan-400/60">
              NEURAL ACCESS NETWORK
            </p>
          </div>
        </div>

        <div className="text-right">
          <p className="text-xs text-emerald-300">● SYSTEM ONLINE</p>
          <p className="mt-1 text-[9px] tracking-widest text-slate-500">
            BUILD 26.10
          </p>
        </div>
      </header>

      <section className="relative z-10 mx-auto grid max-w-6xl
        items-center gap-12 px-5 py-12 md:grid-cols-2 md:px-10 md:py-20">

        <div>
          <p className="mb-5 text-xs tracking-[0.35em] text-fuchsia-400">
            // RESTRICTED ZONE
          </p>

          <h2 className="hero-title text-5xl font-black leading-tight md:text-7xl">
            ENTER THE
            <br />
            <span className="neon-text">UNKNOWN.</span>
          </h2>

          <p className="mt-6 max-w-md text-sm leading-7 text-slate-400">
            Authenticate your identity and initialize your personal
            command environment. Only authorized agents may proceed.
          </p>

          <div className="mt-9 grid grid-cols-3 gap-3">
            {[
              ["01", "IDENTITY"],
              ["02", "VERIFY"],
              ["03", "CONNECT"],
            ].map(([number, label]) => (
              <div key={number} className="step-card p-3">
                <p className="text-xl font-bold text-fuchsia-400">
                  {number}
                </p>
                <p className="mt-2 text-[9px] tracking-widest text-slate-400">
                  {label}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-8 flex items-center gap-3 text-[10px]
            tracking-widest text-cyan-400/70">
            <span className="pulse-dot" />
            AWAITING OPERATOR INPUT
          </div>
        </div>

        <div className="terminal-card p-6 sm:p-9">
          <div className="mb-8 flex items-start justify-between">
            <div>
              <p className="text-[10px] tracking-[0.3em] text-fuchsia-400">
                TERMINAL 07
              </p>
              <h3 className="mt-3 text-2xl font-bold tracking-wide">
                {agent ? "ACCESS GRANTED" : "IDENTITY CHECK"}
              </h3>
              <p className="mt-2 text-xs text-slate-500">
                {agent
                  ? "Operator session initialized"
                  : "Enter your operator credentials"}
              </p>
            </div>
            <div className="target-icon">⌖</div>
          </div>

          {!agent ? (
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="field-label">OPERATOR ID</label>
                <input
                  ref={usernameRef}
                  className="cyber-input"
                  type="text"
                  placeholder="e.g. cyber_agent"
                  autoComplete="username"
                />
              </div>

              <div>
                <label className="field-label">ACCESS KEY</label>
                <div className="relative">
                  <input
                    ref={keyRef}
                    className="cyber-input pr-20"
                    type={reveal ? "text" : "password"}
                    placeholder="Enter access key"
                    autoComplete="off"
                  />
                  <button
                    type="button"
                    className="reveal-btn"
                    onClick={() => setReveal(!reveal)}
                  >
                    {reveal ? "HIDE" : "REVEAL"}
                  </button>
                </div>
              </div>

              {error && (
                <p role="alert" className="error-message">
                  ⚠ {error}
                </p>
              )}

              <button
                className="access-btn"
                type="submit"
                disabled={scanning}
              >
                {scanning ? "SCANNING IDENTITY..." : "INITIALIZE ACCESS"}
                <span>{scanning ? "◌" : "↗"}</span>
              </button>

              <div className="flex items-center justify-between border-t
                border-cyan-400/10 pt-5 text-[9px] tracking-wider
                text-slate-500">
                <span>ENCRYPTION: DEMO MODE</span>
                <span className="text-cyan-400">READY_</span>
              </div>
            </form>
          ) : (
            <div className="success-view">
              <div className="success-orb">✓</div>
              <p className="mt-5 text-xs tracking-[0.3em] text-emerald-300">
                AUTHORIZATION COMPLETE
              </p>
              <h4 className="mt-3 break-words text-3xl font-black">
                Welcome, {agent}
              </h4>
              <p className="mt-3 text-sm leading-6 text-slate-400">
                Your demo command environment is now active.
              </p>

              <div className="mt-7 space-y-3">
                <div className="data-row">
                  <span>OPERATOR</span>
                  <strong>{agent}</strong>
                </div>
                <div className="data-row">
                  <span>ACCESS LEVEL</span>
                  <strong className="text-fuchsia-300">LEVEL 01</strong>
                </div>
                <div className="data-row">
                  <span>SESSION</span>
                  <strong className="text-emerald-300">ACTIVE ●</strong>
                </div>
              </div>

              <button className="access-btn mt-7" onClick={disconnect}>
                TERMINATE SESSION <span>↗</span>
              </button>
            </div>
          )}
        </div>
      </section>

      <footer className="relative z-10 flex flex-wrap justify-between
        gap-3 border-t border-cyan-400/15 px-5 py-5 text-[9px]
        tracking-[0.2em] text-slate-600 md:px-12">
        <span>NEXUS SYSTEMS © 2026</span>
        <span>REACT × TAILWIND CSS</span>
        <span>ALL SYSTEMS NOMINAL</span>
      </footer>
    </main>
  );
}