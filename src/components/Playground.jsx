import React, { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { FiCpu, FiDatabase, FiGitBranch, FiRefreshCw, FiServer, FiShield, FiZap } from "react-icons/fi";

const modes = ["Architecture", "Delivery", "AI"];

const nodes = [
  { id: "ui", label: "UI System", icon: FiCpu, tone: "teal", x: 8, y: 14, metrics: ["Design tokens", "Reusable views", "Motion cues"] },
  { id: "api", label: "API Layer", icon: FiGitBranch, tone: "amber", x: 54, y: 10, metrics: ["Clean routes", "Auth rules", "Typed payloads"] },
  { id: "data", label: "Data Core", icon: FiDatabase, tone: "rose", x: 22, y: 54, metrics: ["Queries", "Models", "Reports"] },
  { id: "cloud", label: "Cloud Ship", icon: FiServer, tone: "ink", x: 66, y: 48, metrics: ["CI/CD", "Monitoring", "Rollback"] },
  { id: "guard", label: "Quality Gate", icon: FiShield, tone: "teal", x: 40, y: 74, metrics: ["Tests", "Review", "Hardening"] },
];

const modeCopy = {
  Architecture: ["Map product flow", "Split system boundaries", "Keep ownership clear"],
  Delivery: ["Ship thin increments", "Measure the result", "Improve the next loop"],
  AI: ["Scope useful automation", "Human review stays visible", "Make output traceable"],
};

export default function Playground() {
  const { ref, inView } = useInView({ threshold: 0.15, triggerOnce: true });
  const [activeNode, setActiveNode] = useState(nodes[0]);
  const [mode, setMode] = useState(modes[0]);
  const [resetKey, setResetKey] = useState(0);

  const activeDetails = useMemo(() => {
    return [...activeNode.metrics, ...modeCopy[mode]].slice(0, 5);
  }, [activeNode, mode]);

  return (
    <section id="lab" ref={ref} className="section-pad lab-section">
      <div className="container">
        <div className="section-heading lab-heading">
          <div>
            <span className="section-kicker">Interactive lab</span>
            <h2>A live-feeling systems map for the way I build.</h2>
          </div>

          <div className="lab-mode-row" aria-label="Lab modes">
            {modes.map((item) => (
              <button key={item} type="button" className={mode === item ? "active" : ""} onClick={() => setMode(item)}>
                {item}
              </button>
            ))}
          </div>
        </div>

        <motion.div
          className="lab-board"
          initial={{ opacity: 0, y: 28 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <div className="lab-topbar">
            <div>
              <span className="lab-status">
                <FiZap size={15} />
                Live map
              </span>
              <strong>{activeNode.label}</strong>
            </div>
            <button type="button" className="lab-reset" onClick={() => setResetKey((value) => value + 1)}>
              <FiRefreshCw size={17} />
              Reset
            </button>
          </div>

          <div className="lab-layout">
            <div className="lab-canvas" key={resetKey}>
              <div className="lab-grid-lines" aria-hidden="true" />
              <svg className="lab-links" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
                <path d="M18 24 C34 15, 48 16, 62 20" />
                <path d="M62 20 C74 28, 76 42, 74 58" />
                <path d="M30 64 C44 72, 54 72, 74 58" />
                <path d="M30 64 C33 72, 40 80, 48 83" />
              </svg>

              {nodes.map((node, index) => (
                <motion.button
                  key={node.id}
                  type="button"
                  className={`lab-node tone-${node.tone} ${activeNode.id === node.id ? "active" : ""}`}
                  style={{ left: `clamp(78px, ${node.x}%, calc(100% - 78px))`, top: `${node.y}%` }}
                  drag
                  dragMomentum={false}
                  dragElastic={0.12}
                  dragConstraints={{ top: -54, right: 54, bottom: 54, left: -54 }}
                  onFocus={() => setActiveNode(node)}
                  onMouseEnter={() => setActiveNode(node)}
                  onPointerDown={() => setActiveNode(node)}
                  initial={{ opacity: 0, scale: 0.88 }}
                  animate={{ opacity: 1, scale: 1 }}
                  whileHover={{ y: -4 }}
                  whileTap={{ scale: 0.96 }}
                  transition={{ delay: index * 0.06 }}
                >
                  <node.icon size={19} />
                  <span>{node.label}</span>
                </motion.button>
              ))}
            </div>

            <aside className="lab-console" aria-label="Active lab details">
              <div className="console-header">
                <span>Signal</span>
                <strong>{mode}</strong>
              </div>

              <div className="console-meter" aria-hidden="true">
                <i />
                <i />
                <i />
                <i />
              </div>

              <ul>
                {activeDetails.map((item) => (
                  <li key={item}>
                    <span />
                    {item}
                  </li>
                ))}
              </ul>
            </aside>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
