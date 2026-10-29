import {
  CodeCategory,
  DetailKind,
  FieldGuide,
  SearchResultItem,
  SymptomItem,
  TroubleCode,
} from '../types/diagnostics';

export const TROUBLE_CODES: TroubleCode[] = [
  {
    code: 'P0300',
    title: 'Random / Multiple Cylinder Misfire',
    category: CodeCategory.Engine,
    summary:
      'The engine computer detected misfires, but the pattern does not point to one cylinder only.',
    meaning:
      'P0300 indicates random or multiple-cylinder misfire detection. It does not prove that spark plugs, coils, injectors, or any one part has failed.',
    causes: [
      'Ignition faults such as worn plugs or coil problems',
      'Fuel delivery or injector issues',
      'Unmetered air, mechanical faults, or low compression',
      'Fuel quality or vehicle-specific control issues',
    ],
    checks: [
      'Note whether the light is flashing and whether the engine is shaking severely.',
      'Read all stored and pending codes plus freeze-frame data if available.',
      'Inspect maintenance history and visible intake or ignition concerns only when safe.',
      'Use vehicle-specific service information to choose the next test.',
    ],
    warning:
      'A flashing check-engine light or severe misfire can damage the catalytic converter. Reduce load, stop safely, and seek qualified help.',
  },
  {
    code: 'P0171',
    title: 'System Too Lean · Bank 1',
    category: CodeCategory.AirFuel,
    summary:
      'The control system reports a lean mixture on bank 1 under its monitoring conditions.',
    meaning:
      'This code reports a fuel-trim condition, not a confirmed vacuum leak or failed oxygen sensor.',
    causes: [
      'Unmetered air or intake leaks',
      'Fuel pressure or delivery problems',
      'Airflow sensor measurement errors',
      'Exhaust leaks or other control-system faults',
    ],
    checks: [
      'Record related codes and freeze-frame conditions.',
      'Visually inspect accessible intake ducts and hoses with the engine off and cool.',
      'Compare fuel trims and airflow readings using vehicle-specific diagnostic guidance.',
      'Do not replace sensors based on this code alone.',
    ],
    warning:
      'Avoid flammable spray-based leak tests. Use an appropriate diagnostic method and professional help when needed.',
  },
  {
    code: 'P0172',
    title: 'System Too Rich · Bank 1',
    category: CodeCategory.AirFuel,
    summary:
      'The control system reports a richer-than-expected mixture on bank 1.',
    meaning:
      'Possible causes span fuel delivery, air measurement, temperature inputs, and engine-control issues.',
    causes: [
      'Leaking injector or excessive fuel pressure',
      'Incorrect airflow or temperature input',
      'Restricted air intake',
      'Purge-system or other control faults',
    ],
    checks: [
      'Check for fuel odor or visible leaks; if present, stop and seek help.',
      'Record related codes and freeze-frame data.',
      'Review sensor values and fuel trims against service information.',
      'Confirm the cause with tests before replacing components.',
    ],
    warning:
      'If you smell raw fuel or see a leak, shut the vehicle off in a safe location and keep ignition sources away.',
  },
  {
    code: 'P0128',
    title: 'Coolant Temperature Below Regulating Range',
    category: CodeCategory.Temperature,
    summary:
      'The engine did not reach the expected operating temperature within the monitored conditions.',
    meaning:
      'A thermostat issue is possible, but coolant level, sensor accuracy, and vehicle-specific strategy matter.',
    causes: [
      'Thermostat stuck open',
      'Coolant temperature sensor or circuit issue',
      'Low coolant or other cooling-system concern',
      'Driving conditions outside expected warm-up assumptions',
    ],
    checks: [
      'Only inspect coolant level when the engine is fully cool.',
      'Look for leaks or signs of overheating.',
      'Compare coolant temperature data with ambient conditions and service specifications.',
      'Confirm the vehicle-specific test before replacing a thermostat.',
    ],
    warning:
      'Never open a hot pressurized cooling system. If the engine overheats, stop driving and allow it to cool.',
  },
  {
    code: 'P0420',
    title: 'Catalyst System Efficiency Below Threshold · Bank 1',
    category: CodeCategory.Engine,
    summary:
      'The monitoring system reports catalyst efficiency below its expected threshold.',
    meaning:
      'This code does not by itself prove the catalytic converter has failed. Misfires, exhaust leaks, and sensor or engine conditions can affect monitoring.',
    causes: [
      'Catalyst deterioration',
      'Exhaust leak affecting readings',
      'Upstream engine problem such as misfire or mixture fault',
      'Oxygen-sensor or wiring issue',
    ],
    checks: [
      'Check for other codes, especially misfire and fuel-mixture codes.',
      'Address underlying engine faults before catalyst conclusions.',
      'Inspect exhaust condition only when safely cool.',
      'Follow the exact vehicle\'s catalyst-monitor test procedure.',
    ],
    warning:
      'Catalytic converters and exhaust components become extremely hot. Do not work underneath an unsupported vehicle.',
  },
  {
    code: 'P0455',
    title: 'EVAP System Large Leak Detected',
    category: CodeCategory.AirFuel,
    summary:
      'The evaporative-emissions system detected a large leak or could not seal as expected.',
    meaning:
      'A loose or damaged fuel cap is one possibility, not a guaranteed cause.',
    causes: [
      'Loose, incorrect, or damaged fuel cap',
      'Damaged EVAP hose or seal',
      'Purge or vent valve fault',
      'Other leak in the evaporative system',
    ],
    checks: [
      'If safe, check that the correct fuel cap is properly installed.',
      'Inspect only accessible hoses for obvious damage with the vehicle off.',
      'Read related EVAP codes and follow the specified leak-test procedure.',
      'A smoke test may be needed; use equipment and procedures intended for EVAP systems.',
    ],
    warning:
      'Keep flames and sparks away from fuel vapors. Do not pressurize the EVAP system with improvised equipment.',
  },
  {
    code: 'P0442',
    title: 'EVAP System Small Leak Detected',
    category: CodeCategory.AirFuel,
    summary:
      'The evaporative-emissions monitor detected a small leak or sealing issue.',
    meaning:
      'The code narrows the system involved but does not identify the exact leak location.',
    causes: [
      'Fuel cap seal or filler-neck issue',
      'Small hose or connection leak',
      'Purge or vent valve not sealing',
      'Other EVAP component leak',
    ],
    checks: [
      'Check the fuel cap and seal if the vehicle uses one.',
      'Look for visible damage on accessible EVAP hoses.',
      'Use a vehicle-specific EVAP test plan and appropriate leak-detection equipment.',
      'Verify the repair by completing the prescribed monitor procedure.',
    ],
    warning:
      'Fuel vapor is flammable. Do not use open flames or improvised leak-finding methods.',
  },
  {
    code: 'P0118',
    title: 'Engine Coolant Temperature Circuit High Input',
    category: CodeCategory.Electrical,
    summary:
      'The computer sees an unexpectedly high electrical signal from the coolant-temperature circuit.',
    meaning:
      'This is a circuit/signal code; it does not automatically mean the coolant itself is too hot.',
    causes: [
      'Open circuit or disconnected connector',
      'Damaged wiring or poor connection',
      'Sensor fault',
      'Reference, ground, or control-module issue',
    ],
    checks: [
      'Distinguish actual overheating from a gauge or scan-data anomaly.',
      'With the vehicle off, inspect accessible connectors for damage or disconnection.',
      'Compare cold-soak scan data with ambient conditions where appropriate.',
      'Use the correct wiring diagram and electrical test procedure.',
    ],
    warning:
      'Keep clear of moving fans; electric cooling fans can start unexpectedly even when the engine is off.',
  },
  {
    code: 'P0101',
    title: 'Mass or Volume Airflow Circuit Range / Performance',
    category: CodeCategory.AirFuel,
    summary:
      'Airflow readings do not match what the control system expects under monitored conditions.',
    meaning:
      'The code may involve airflow measurement, intake integrity, wiring, or engine operating conditions.',
    causes: [
      'Intake duct leak or restriction',
      'Contamination or fault at airflow sensor',
      'Wiring or connector issue',
      'Other engine or air-control condition',
    ],
    checks: [
      'Check for related codes and obvious intake damage with engine off.',
      'Verify the air filter and ducting are installed correctly.',
      'Review live data using vehicle-specific expected values.',
      'Do not clean or replace a sensor without confirming the correct procedure.',
    ],
    warning:
      'Use only approved cleaners and procedures for the specific sensor. Some sensors are easily damaged.',
  },
  {
    code: 'P0301',
    title: 'Cylinder 1 Misfire Detected',
    category: CodeCategory.Engine,
    summary:
      'The computer detected a misfire associated with cylinder 1.',
    meaning:
      'The code identifies the cylinder associated with detection, not the failed component.',
    causes: [
      'Ignition fault',
      'Fuel injector or delivery issue',
      'Air leak affecting that cylinder',
      'Compression or mechanical concern',
    ],
    checks: [
      'Check whether the engine is shaking or the check-engine light is flashing.',
      'Read all codes and note when the misfire occurs.',
      'Use the manufacturer\'s cylinder identification and test sequence.',
      'Confirm ignition, fuel, and mechanical condition with appropriate tests.',
    ],
    warning:
      'A severe or flashing misfire warrants stopping safely. Avoid running the engine unnecessarily.',
  },
  {
    code: 'P0562',
    title: 'System Voltage Low',
    category: CodeCategory.Electrical,
    summary:
      'The control module detected system voltage below its expected range.',
    meaning:
      'Possible causes include a discharged battery, charging issue, poor connection, or wiring fault.',
    causes: [
      'Weak or discharged battery',
      'Charging system concern',
      'Loose or corroded connections',
      'Ground or wiring fault',
    ],
    checks: [
      'Inspect for obvious battery-terminal damage with the vehicle off.',
      'Check battery condition and charging performance using correct equipment.',
      'Review whether multiple modules have low-voltage codes.',
      'Follow battery safety precautions and vehicle-specific procedures.',
    ],
    warning:
      'Batteries can produce explosive gas and high short-circuit current. Remove jewelry and use proper protection; seek help if unsure.',
  },
  {
    code: 'P0700',
    title: 'Transmission Control System Malfunction',
    category: CodeCategory.Engine,
    summary:
      'The engine computer received a request or status indicating a transmission-control fault.',
    meaning:
      'P0700 often points to additional transmission-module codes. It is not a diagnosis of a particular transmission part.',
    causes: [
      'Transmission control module stored a separate fault',
      'Wiring, power, or communication issue',
      'Transmission sensor or system concern',
      'Vehicle-specific control-system fault',
    ],
    checks: [
      'Retrieve transmission-module codes with a compatible scan tool.',
      'Record symptoms and any fail-safe or limp-mode behavior.',
      'Check service information for the exact vehicle and transmission.',
      'Avoid clearing codes before recording data.',
    ],
    warning:
      'If shifting is unpredictable, driveability is unsafe, or fluid is leaking, stop driving and arrange qualified diagnosis.',
  },
];

export const FIELD_GUIDES: FieldGuide[] = [
  {
    id: 'check-engine',
    icon: '⚠',
    title: 'Check-engine light: what next?',
    type: 'Basics',
    summary: 'Separate urgent warnings from routine diagnostic work.',
    time: '5 min',
    search: 'check engine light CEL flashing steady warning',
    sections: [
      {
        heading: 'First, assess urgency',
        body: 'A flashing check-engine light, severe shaking, smoke, fuel smell, overheating, or major power loss means stop safely and seek qualified help. A steady light without severe symptoms may allow cautious travel to a safe place, but consult the vehicle manual.',
      },
      {
        heading: 'Record evidence',
        body: 'Note when the light appeared, recent repairs or refueling, drivability changes, and all stored or pending codes. Do not assume the code names the failed part.',
      },
      {
        heading: 'Choose the next test',
        body: 'Use codes, freeze-frame data, symptoms, and service information for the exact vehicle. Confirm causes before replacing parts.',
      },
    ],
  },
  {
    id: 'battery',
    icon: 'ϟ',
    title: 'Battery appears dead',
    type: 'Electrical',
    summary:
      'Start with safe visual checks and the difference between no-crank and slow-crank.',
    time: '6 min',
    search: 'battery dead no crank slow crank electrical',
    sections: [
      {
        heading: 'Clarify the symptom',
        body: 'Do dashboard lights work? Is there silence, rapid clicking, one click, or slow cranking? Different symptoms can have different causes.',
      },
      {
        heading: 'Inspect safely',
        body: 'With the vehicle off, look for obvious terminal looseness, corrosion, or damage. Do not bridge terminals with tools. Keep jewelry away from battery connections.',
      },
      {
        heading: "Test, don't guess",
        body: 'Battery state, cable voltage drop, starter current draw, and charging performance require suitable tools and correct test procedures. Follow the vehicle manual for jump-starting.',
      },
    ],
  },
  {
    id: 'clicking',
    icon: '⌁',
    title: 'Clicking when starting',
    type: 'Starting',
    summary: 'A click is a clue, not proof that the starter motor is bad.',
    time: '5 min',
    search: 'clicking noise start starter battery no crank',
    sections: [
      {
        heading: 'Identify the pattern',
        body: 'Rapid clicking, a single click, and a slow crank are different clues. Note whether lights dim and whether the engine turns.',
      },
      {
        heading: 'Check the basics',
        body: 'A weak battery or high resistance in cables and connections can prevent cranking. Inspect only accessible areas with the vehicle off.',
      },
      {
        heading: 'Verify the circuit',
        body: 'A proper diagnosis may require battery testing, voltage-drop testing, starter control-circuit checks, and vehicle-specific wiring information.',
      },
    ],
  },
  {
    id: 'overheating',
    icon: '♨',
    title: 'Engine overheating',
    type: 'Cooling',
    summary: 'Protect people and the engine before investigating the cause.',
    time: '4 min',
    search: 'overheating coolant temperature hot steam',
    sections: [
      {
        heading: 'Stop safely',
        body: 'If the temperature warning indicates overheating, pull over safely and shut the engine off. Steam or coolant spray can cause severe burns.',
      },
      {
        heading: 'Let it cool completely',
        body: 'Never remove a hot pressurized radiator or coolant cap. Keep clear of fans, which may start unexpectedly.',
      },
      {
        heading: 'Inspect only when cool',
        body: "Look for visible leaks or low coolant only after cooling and according to the owner's manual. Repeated overheating needs qualified diagnosis.",
      },
    ],
  },
  {
    id: 'rough-idle',
    icon: '≈',
    title: 'Rough idle or engine shaking',
    type: 'Engine',
    summary:
      'Use timing, codes, and operating conditions to narrow the possibilities.',
    time: '6 min',
    search: 'rough idle shaking misfire engine',
    sections: [
      {
        heading: 'Capture the conditions',
        body: 'Does it happen cold, warm, at idle, under acceleration, or with accessories on? Note any warning lights.',
      },
      {
        heading: 'Read all codes',
        body: 'Misfire, mixture, airflow, and other codes help organize testing but do not prove a component failed.',
      },
      {
        heading: 'Avoid prolonged running if severe',
        body: 'Severe shaking, flashing check-engine light, fuel odor, or smoke means stop safely and seek help.',
      },
    ],
  },
  {
    id: 'scan-tool',
    icon: '⌕',
    title: 'Using an OBD-II scan tool',
    type: 'Tools',
    summary: 'Capture useful information before clearing anything.',
    time: '7 min',
    search: 'scan tool OBD2 trouble code freeze frame live data',
    sections: [
      {
        heading: 'Read before clearing',
        body: 'Record stored, pending, and permanent codes when supported, plus freeze-frame data and readiness status.',
      },
      {
        heading: 'Understand the limits',
        body: 'A generic code reader may not access every module or manufacturer-specific data. A code is evidence, not proof of a failed part.',
      },
      {
        heading: 'Keep context',
        body: "Record symptoms, recent repairs, and when the fault occurs. Use the exact vehicle's service information for tests and specifications.",
      },
    ],
  },
];

export const QUICK_SEARCHES: { label: string; query: string }[] = [
  { label: 'Check engine light', query: 'check engine light' },
  { label: 'Dead battery', query: 'battery' },
  { label: 'Clicking start', query: 'clicking' },
  { label: 'Overheating', query: 'overheating' },
];

export const FILTER_TABS: { label: string; value: CodeCategory }[] = [
  { label: 'All codes', value: CodeCategory.All },
  { label: 'Engine', value: CodeCategory.Engine },
  { label: 'Air & fuel', value: CodeCategory.AirFuel },
  { label: 'Electrical', value: CodeCategory.Electrical },
  { label: 'Temperature', value: CodeCategory.Temperature },
];

export const SYMPTOM_ITEMS: SymptomItem[] = [
  {
    index: 'SYMPTOM / 01',
    icon: '⌁',
    title: "Won't start",
    subtitle: 'Clicking, silence, or slow cranking',
    query: 'clicking',
  },
  {
    index: 'SYMPTOM / 02',
    icon: '♨',
    title: 'Running hot',
    subtitle: 'Temperature warning or steam',
    query: 'overheating',
  },
  {
    index: 'SYMPTOM / 03',
    icon: '≈',
    title: 'Shaking or rough idle',
    subtitle: 'Misfire-like symptoms and vibration',
    query: 'rough idle',
  },
  {
    index: 'SYMPTOM / 04',
    icon: 'ϟ',
    title: 'Electrical trouble',
    subtitle: 'Dim lights or low-voltage clues',
    query: 'battery',
  },
];

export const SAFETY_RULES: { icon: string; title: string; body: string }[] = [
  {
    icon: '⚠',
    title: 'Never trust a jack alone',
    body: 'Work on level, stable ground with correctly rated jack stands at approved lift points. If you cannot support the vehicle safely, stop.',
  },
  {
    icon: 'ϟ',
    title: 'Respect electricity and fuel',
    body: 'Short circuits can cause burns, fire, or module damage. Keep sparks and flames away from fuel and follow vehicle-specific procedures.',
  },
  {
    icon: '◉',
    title: 'Hot parts stay hot',
    body: 'Let the engine and exhaust cool. Never open a hot pressurized cooling system. Never run an engine in an enclosed space.',
  },
  {
    icon: '↗',
    title: 'Use the right service data',
    body: 'Pinouts, torque values, thresholds, and procedures vary by vehicle. This site will not invent specifications to fill a gap.',
  },
];

export function normalizeQuery(value: string): string {
  return String(value || '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, ' ')
    .trim();
}

export function searchDiagnosticLibrary(rawQuery: string): {
  status: string;
  results: SearchResultItem[];
} {
  const q = normalizeQuery(rawQuery);
  if (!q) {
    return {
      status:
        'Enter a trouble code, symptom, or guide topic to start investigating.',
      results: [],
    };
  }

  const words = q.split(' ');
  const matches: SearchResultItem[] = [];

  for (const codeItem of TROUBLE_CODES) {
    const hay = normalizeQuery(
      [
        codeItem.code,
        codeItem.title,
        codeItem.summary,
        codeItem.meaning,
        codeItem.category,
      ].join(' ')
    );
    if (hay.includes(q) || words.every((word) => hay.includes(word))) {
      matches.push({
        kind: DetailKind.Code,
        id: codeItem.code,
        badge: codeItem.code,
        title: codeItem.title,
        summary: codeItem.summary,
        meta: 'Trouble code · Draft',
      });
    }
  }

  for (const guideItem of FIELD_GUIDES) {
    const hay = normalizeQuery(
      [
        guideItem.title,
        guideItem.summary,
        guideItem.search,
        guideItem.type,
      ].join(' ')
    );
    if (hay.includes(q) || words.every((word) => hay.includes(word))) {
      matches.push({
        kind: DetailKind.Guide,
        id: guideItem.id,
        badge: guideItem.type,
        title: guideItem.title,
        summary: guideItem.summary,
        meta: `Field guide · ${guideItem.time}`,
      });
    }
  }

  if (!matches.length) {
    return {
      status:
        'No exact match in this small draft library. Try a shorter symptom, a code such as P0300, or browse all guides.',
      results: [],
    };
  }

  return {
    status: `${matches.length} result${
      matches.length === 1 ? '' : 's'
    } found. Open a result to review draft guidance.`,
    results: matches.slice(0, 9),
  };
}
