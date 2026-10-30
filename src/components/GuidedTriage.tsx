import React, { useState } from 'react';
import './GuidedTriage.css';

type TriagePath = {
  id: string;
  label: string;
  summary: string;
  record: string[];
  stopSigns: string[];
  nextStep: string;
};

const PATHS: TriagePath[] = [
  {
    id: 'no-start',
    label: 'It will not start',
    summary: 'The engine does not start, or it cranks without running.',
    record: [
      'Does the engine crank, click, or stay completely silent?',
      'Do the dashboard lights behave normally?',
      'Did the problem begin suddenly or develop over time?',
      'Are there warning messages or stored trouble codes?',
    ],
    stopSigns: [
      'Fuel odor, visible fuel leakage, smoke, or signs of an electrical fire.',
      'A damaged, swollen, leaking, or unusually hot battery.',
    ],
    nextStep: 'Record the exact starting behavior and scan for codes if you have the correct equipment. Do not bridge terminals or bypass safety interlocks. Battery and starting-system tests should follow vehicle-specific procedures.',
  },
  {
    id: 'runs-poorly',
    label: 'It runs rough or loses power',
    summary: 'The engine shakes, misfires, stalls, or feels unusually weak.',
    record: [
      'Does it happen at idle, while accelerating, or all the time?',
      'Is the check-engine light steady or flashing?',
      'Are there unusual smells, noises, or visible smoke?',
      'Record all stored and pending codes before clearing anything.',
    ],
    stopSigns: [
      'A flashing check-engine light with severe shaking or major power loss.',
      'Smoke, raw-fuel odor, overheating, or an oil-pressure warning.',
    ],
    nextStep: 'Avoid heavy acceleration. A flashing warning light or severe misfire can cause further damage; stop safely and arrange qualified diagnosis. Do not replace ignition or fuel parts based on a code alone.',
  },
  {
    id: 'warning-light',
    label: 'A warning light is on',
    summary: 'A dashboard warning appeared, but the vehicle may still run normally.',
    record: [
      'Identify the exact warning symbol or message.',
      'Note whether the light is steady, flashing, or accompanied by a chime.',
      'Record when it appeared and what the vehicle was doing.',
      'Retrieve codes with a compatible scan tool when appropriate.',
    ],
    stopSigns: [
      'Oil-pressure, brake-system, or high-temperature warnings.',
      'A flashing check-engine light, charging-system failure with unsafe operation, or any warning paired with smoke or loss of control.',
    ],
    nextStep: 'Check the owner manual for the exact warning. Red warnings and safety-system warnings may require stopping immediately. A generic code reader may not access every vehicle module.',
  },
  {
    id: 'overheating',
    label: 'It is overheating',
    summary: 'The temperature gauge is high, a temperature warning appears, or steam is visible.',
    record: [
      'Note the temperature warning and whether steam or coolant is visible.',
      'Record whether the cabin heater changed behavior.',
      'Look for a puddle only from a safe position, without touching hot parts.',
      'Note recent cooling-system work or coolant loss.',
    ],
    stopSigns: [
      'A high-temperature warning, rising gauge, steam, or coolant discharge.',
      'Any need to open a hot pressurized cooling system.',
    ],
    nextStep: 'Pull over safely, switch off the engine, and allow it to cool. Never remove a hot radiator or expansion-tank cap. Arrange professional inspection if overheating or coolant loss occurred.',
  },
  {
    id: 'noise-leak',
    label: 'There is a new noise, smell, or leak',
    summary: 'Something sounds, smells, or looks different from normal.',
    record: [
      'Describe the sound or smell without putting yourself near moving parts.',
      'Note whether it occurs during startup, braking, turning, or driving.',
      'Record the fluid color and approximate location only if visible from a safe distance.',
      'Take a photo from a safe position if it helps document the condition.',
    ],
    stopSigns: [
      'Fuel odor or visible fuel leak, smoke, burning-electrical smell, or a rapidly growing leak.',
      'Grinding brakes, steering problems, or a noise accompanied by loss of control.',
    ],
    nextStep: 'Do not crawl under a vehicle to investigate a leak. Keep ignition sources away from fuel vapors. If braking, steering, or vehicle control may be affected, do not continue driving.',
  },
];

export const GuidedTriage: React.FC = () => {
  const [selectedId, setSelectedId] = useState(PATHS[0].id);
  const selected = PATHS.find((path) => path.id === selectedId) ?? PATHS[0];

  return (
    <section className="triage-section" id="guided-triage">
      <div className="section-wrap">
        <div className="section-heading">
          <div>
            <div className="eyebrow">
              <span className="eyebrow-line" /> GUIDED INTAKE
            </div>
            <h2>
              Start with the <span className="text-cyan">symptoms.</span>
            </h2>
          </div>
          <p>
            Organize what you are noticing before choosing a test. This guide
            helps you record useful observations; it does not diagnose the
            vehicle or replace service information.
          </p>
        </div>

        <div className="triage-layout">
          <div className="triage-choices" role="group" aria-label="Choose the main vehicle concern">
            {PATHS.map((path) => (
              <button
                className={`triage-choice${selectedId === path.id ? ' is-active' : ''}`}
                type="button"
                key={path.id}
                aria-pressed={selectedId === path.id}
                onClick={() => setSelectedId(path.id)}
              >
                <span>{path.label}</span>
                <small>{path.summary}</small>
              </button>
            ))}
          </div>

          <article className="triage-detail" aria-live="polite">
            <div className="triage-kicker">OBSERVATION CHECKLIST</div>
            <h3>{selected.label}</h3>
            <p>{selected.summary}</p>

            <h4>What to record</h4>
            <ul>
              {selected.record.map((item) => <li key={item}>{item}</li>)}
            </ul>

            <div className="triage-stop">
              <strong>Stop and get help if:</strong>
              <ul>
                {selected.stopSigns.map((item) => <li key={item}>{item}</li>)}
              </ul>
            </div>

            <h4>Safe next step</h4>
            <p>{selected.nextStep}</p>
            <p className="triage-disclaimer">
              General educational guidance only. Vehicle-specific owner and
              service information takes priority. If the vehicle may be unsafe,
              do not drive it.
            </p>
          </article>
        </div>
      </div>
    </section>
  );
};

export default GuidedTriage;
