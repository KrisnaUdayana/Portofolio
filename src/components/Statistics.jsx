import React from "react";

const stats = [
  { value: "10+", label: "Years turning ideas into production software" },
  { value: "45+", label: "Projects shipped across web, cloud, and data" },
  { value: "30+", label: "Clients and teams supported through delivery" },
  { value: "99%", label: "Focus on usable, maintainable implementation" },
];

export default function Statistics() {
  return (
    <section className="stats-band" aria-label="Portfolio statistics">
      <div className="container stats-grid">
        {stats.map((stat) => (
          <div key={stat.label} className="stat-item">
            <strong>{stat.value}</strong>
            <span>{stat.label}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
