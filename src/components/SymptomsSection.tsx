import React from 'react';
import { SYMPTOM_ITEMS } from '../data/diagnosticsData';

interface SymptomsSectionProps {
  onSelectSymptom: (symptomQuery: string) => void;
}

export const SymptomsSection: React.FC<SymptomsSectionProps> = ({
  onSelectSymptom,
}) => {
  const handleSymptomClick = (
    event: React.MouseEvent<HTMLAnchorElement>,
    symptomQuery: string
  ) => {
    event.preventDefault();
    onSelectSymptom(symptomQuery);
  };

  return (
    <section className="section-wrap symptoms-section" id="symptoms">
      <div className="section-heading">
        <div>
          <div className="eyebrow">
            <span className="eyebrow-line" /> SYMPTOM-BASED TROUBLESHOOTING
          </div>
          <h2>
            Start with what <span className="text-cyan">you noticed.</span>
          </h2>
        </div>
        <p>
          The same symptom can have several causes. Choose the closest match to
          explore safe first observations and possible next tests.
        </p>
      </div>

      <div className="symptom-grid">
        {SYMPTOM_ITEMS.map((item) => (
          <a
            key={item.index}
            className="symptom-card"
            href="#search"
            onClick={(e) => handleSymptomClick(e, item.query)}
          >
            <span className="symptom-icon">{item.icon}</span>
            <span className="symptom-index">{item.index}</span>
            <strong>{item.title}</strong>
            <small>{item.subtitle}</small>
            <span className="symptom-arrow">↗</span>
          </a>
        ))}
      </div>
    </section>
  );
};
