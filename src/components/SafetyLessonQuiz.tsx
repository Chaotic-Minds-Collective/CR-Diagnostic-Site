import React, { useState } from 'react';

type Question = { prompt:string; options:string[]; answer:number; rationale:string };

// Source: supplied Round 1–3 mechanic-review drafts. Questions 16–20 were not supplied.
const QUESTIONS:Question[] = [
{prompt:'Before you work under a car raised with a jack, what should you do?',options:['Trust the jack to hold the car','Support the car on jack stands on level ground','Park on a slope for easier access','Leave the wheels on the ground'],answer:1,rationale:'A jack can slip or fail. Stands on level ground hold the weight safely.'},
{prompt:'When working near fuel, you should:',options:['Keep sparks and flames away','Smoke only if the engine is off','Use a bare light bulb to see better','Wear nylon clothing'],answer:0,rationale:'Fuel vapors ignite easily.'},
{prompt:'Which is a good safety step around a car battery?',options:['Wear a metal ring to keep a grip','Remove rings and metal jewelry','Lay metal tools on top of the battery','Hold a flame near it to check for leaks'],answer:1,rationale:'Metal can bridge the terminals and cause burns or sparks.'},
{prompt:'When is it safe to open a radiator or coolant cap?',options:['Right after driving','When the engine is running','Only after the engine has fully cooled','Whenever the temperature gauge reads high'],answer:2,rationale:'Hot coolant is under pressure and can spray and burn.'},
{prompt:'After driving, which parts can be hot enough to burn you?',options:['Only the tires','Only the seat','Exhaust parts, including the catalytic converter','Nothing, since the engine is off'],answer:2,rationale:'Exhaust parts stay very hot for a long time.'},
{prompt:'What is the safest way to deal with brake dust?',options:['Blow it away with compressed air','Clean it with a wet method or approved brake cleaner and avoid breathing it','Brush it dry with your hand','Ignore it'],answer:1,rationale:'Brake dust should not be breathed in, and older parts may contain harmful materials.'},
{prompt:'When should you wear eye protection?',options:['Only when grinding metal','Only on sunny days','Whenever fluids, dust or falling parts could reach your eyes, such as when working under a car','Never, since glasses fog up'],answer:2,rationale:'Fluids and debris can cause serious eye injuries.'},
{prompt:'What is the safest way to lift a heavy part?',options:['Bend at the waist and twist','Lift with your legs, keep the load close and ask for help if it is too heavy','Jerk it up quickly','Lift it overhead'],answer:1,rationale:'This helps avoid back injuries.'},
{prompt:'Why should you never run an engine in a closed garage?',options:['It wastes fuel','It can fill the space with carbon monoxide, a poisonous gas','It damages the garage door','It makes the engine cold'],answer:1,rationale:'Carbon monoxide has no smell and can be deadly.'},
{prompt:'Which step helps prevent shorts and burns before working on wiring?',options:['Work with power on so you can see sparks','Follow the service manual, including how to disconnect the battery','Use thin wire as a jumper','Lay tools on the battery'],answer:1,rationale:'Shorts can cause burns, fires and damage to electronics.'},
{prompt:'Which is a safe way to use cleaners and solvents?',options:['Mix different cleaners for more power','Use them in a ventilated space, read the label and wear gloves','Use them near a heater','Store them in drink bottles'],answer:1,rationale:'Fumes and splashes can harm you, and some mixes create dangerous gases.'},
{prompt:'Which type of fire extinguisher is commonly recommended for a garage?',options:['Water only','A kitchen-grease type only','An ABC-rated extinguisher kept where you can reach it','None, since fires never happen in garages'],answer:2,rationale:'ABC types handle ordinary materials, flammable liquids and electrical fires.'},
{prompt:'With the engine running, where should your hands and hair be?',options:['Close to the fan for a better look','Away from belts, fans and pulleys','On the belt to check tension','Under the hood with a loose sleeve'],answer:1,rationale:'Moving parts can pull in hands, hair and clothing.'},
{prompt:'What is safest near moving parts?',options:['Loose sleeves and dangling jewelry','Tied-back hair, no rings or dangling jewelry, and snug clothing','A scarf','A necklace tucked in your collar'],answer:1,rationale:'Loose items can catch.'},
{prompt:'Why chock the wheels that stay on the ground when you lift one end of a car?',options:['To make the car look level','To stop the car from rolling','To cool the tires','It is optional decoration'],answer:1,rationale:'A rolling car can fall off a jack or stands.'}
];

export const SafetyLessonQuiz:React.FC=()=>{
 const [index,setIndex]=useState(0);
 const [choice,setChoice]=useState<number|null>(null);
 const [score,setScore]=useState(0);
 const [complete,setComplete]=useState(false);
 const question=QUESTIONS[index];
 const progress=complete?100:((index+(choice===null?0:1))/QUESTIONS.length)*100;
 const answer=(value:number)=>{if(choice!==null)return;setChoice(value);if(value===question.answer)setScore(v=>v+1);};
 const next=()=>{if(choice===null)return;if(index===QUESTIONS.length-1){setComplete(true);return;}setIndex(v=>v+1);setChoice(null);};
 const reset=()=>{setIndex(0);setChoice(null);setScore(0);setComplete(false);};
 return <section className="safety-lesson-section" id="safety-lesson"><div className="section-wrap">
  <div className="section-heading"><div><div className="eyebrow"><span className="eyebrow-line"/> KNOWLEDGE CHECK / 01</div><h2>Automotive <span className="text-gold">safety basics.</span></h2></div><p>Test your understanding of the safety topics in the supplied lesson drafts. Review the explanation after each answer.</p></div>
  <div className="lesson-status" role="note"><strong>Draft preview — 15 of 20 questions available.</strong><span>The remaining five questions have not been supplied. This is a self-check only; it does not unlock another lesson or certify training.</span></div>
  <div className="lesson-quiz" aria-live="polite">
   <div className="lesson-quiz-top"><span>{complete?'KNOWLEDGE CHECK COMPLETE':`QUESTION ${index+1} / ${QUESTIONS.length}`}</span><span>{complete?`${score} / ${QUESTIONS.length} CORRECT`:`${score} CORRECT SO FAR`}</span></div>
   <div className="lesson-progress" role="progressbar" aria-label="Quiz progress" aria-valuemin={0} aria-valuemax={100} aria-valuenow={Math.round(progress)}><span style={{width:`${progress}%`}}/></div>
   {complete?<div className="lesson-result"><p className="lesson-kicker">YOUR RESULT</p><h3>{score} out of {QUESTIONS.length} correct</h3><p>This score covers only the 15 questions supplied. It is not the planned 20-question assessment and does not meet or replace the draft's stated 19-of-20 (95%) lesson requirement.</p><button className="button button-primary" type="button" onClick={reset}>Retake knowledge check</button></div>:<>
    <h3 className="lesson-question">{question.prompt}</h3>
    <div className="lesson-options" role="group" aria-label="Answer choices">{question.options.map((option,i)=>{const correct=i===question.answer;const selected=choice===i;const state=choice!==null&&correct?' is-correct':choice!==null&&selected?' is-incorrect':'';return <button className={`lesson-option${state}`} type="button" key={option} aria-pressed={selected} disabled={choice!==null} onClick={()=>answer(i)}><span className="lesson-option-letter">{String.fromCharCode(65+i)}</span><span>{option}</span>{choice!==null&&correct?<span className="lesson-option-mark" aria-label="Correct answer">✓</span>:null}{choice!==null&&selected&&!correct?<span className="lesson-option-mark" aria-label="Your answer">×</span>:null}</button>;})}</div>
    {choice!==null?<div className={`lesson-feedback${choice===question.answer?' is-correct':' is-incorrect'}`} role="status"><strong>{choice===question.answer?'Correct.':'Not quite.'}</strong><p>{question.rationale}</p></div>:<p className="lesson-hint">Choose one answer to see the explanation.</p>}
    <div className="lesson-controls"><span>Draft source: Rounds 1–3</span><button className="button button-primary" type="button" disabled={choice===null} onClick={next}>{index===QUESTIONS.length-1?'See my result':'Next question'} <span aria-hidden="true">→</span></button></div>
   </>}
  </div>
 </div></section>;
};
export default SafetyLessonQuiz;
