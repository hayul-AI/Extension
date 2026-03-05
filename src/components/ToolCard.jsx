import React from 'react';
import { Link } from 'react-router-dom';

export default function ToolCard({ title, description, path, icon }) {
  return (
    <Link to={path} className="tool-card">
      {icon && <div className="tool-mark">{icon}</div>}
      <h3>{title}</h3>
      <p>{description}</p>
    </Link>
  );
}