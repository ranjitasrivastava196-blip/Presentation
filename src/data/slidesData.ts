export interface SlideData {
  id: number;
  slideNumber: number;
  title: string;
  subtitle: string;
  presenter4: {
    student: string;
    roleTitle: string;
    duration: string;
  };
  presenter3: {
    student: string;
    roleTitle: string;
    duration: string;
  };
  keyTakeaway: string;
  bulletPoints: {
    heading: string;
    text: string;
    subBullets?: string[];
  }[];
  formulas?: {
    label: string;
    expression: string;
    explanation: string;
  }[];
  memoryTrick?: string;
  diagramType: 'title_intro' | 'ac_dc_comparison' | 'rlc_components' | 'vi_relationships' | 'series_circuit' | 'phasor_diagram' | 'impedance_triangle' | 'resonance' | 'numerical_example' | 'formula_cheat_sheet';
  speakerScriptEnglish: string;
  speakerScriptHinglish: string;
  transitionNext?: string;
}

export const SLIDES_DATA: SlideData[] = [
  {
    id: 1,
    slideNumber: 1,
    title: 'Series R-L-C Circuit',
    subtitle: 'Phasor Diagram, Voltage-Current Relationships, Impedance & Resonance',
    presenter4: {
      student: 'Student 1',
      roleTitle: 'AC Basics & R-L-C Components',
      duration: 'Approx. 2 mins (Slides 1–3)'
    },
    presenter3: {
      student: 'Student 1',
      roleTitle: 'AC/DC & Components Overview',
      duration: 'Approx. 2.5 mins (Slides 1–3)'
    },
    keyTakeaway: 'Understanding how Resistors, Inductors, and Capacitors behave when connected in series with an AC sinusoidal voltage source.',
    bulletPoints: [
      {
        heading: 'Subject & Syllabus',
        text: 'Basic Electrical Engineering (BEE / BEEE) — Unit 2: Single Phase AC Circuits'
      },
      {
        heading: 'Core Presentation Objectives',
        text: 'Master individual component behavior, draw exact phasor diagrams, calculate total impedance Z, understand phase angle φ, and analyze electrical resonance.'
      },
      {
        heading: 'Group Roadmap',
        text: '1. AC/DC & Component Basics → 2. V-I Phase Relationships → 3. Phasor Diagrams & Impedance Triangle → 4. Resonance & Solved Numerical.'
      }
    ],
    diagramType: 'title_intro',
    speakerScriptEnglish: 'Good morning, respected sir and my dear friends. Today, our group is going to explain the Series R-L-C circuit. We will discuss its individual components, voltage-current relationships, phasor diagram, impedance, phase angle, and resonance. We will explain everything with simple examples, practical analogies, and clear diagrams. Let us begin!',
    speakerScriptHinglish: 'Good morning, respected sir and my dear friends. Aaj humara group Series R-L-C circuit explain karne ja raha hai. Hum discuss karenge iske components, voltage aur current ka relationship, phasor diagram, total impedance, phase angle aur resonance. Har ek concept ko simple examples aur diagrams ke saath dekhenge.',
    transitionNext: 'Let us start by clearly distinguishing between Direct Current (DC) and Alternating Current (AC).'
  },
  {
    id: 2,
    slideNumber: 2,
    title: 'Direct Current (DC) vs Alternating Current (AC)',
    subtitle: 'Understanding Unidirectional Flow vs Periodic Waveforms',
    presenter4: {
      student: 'Student 1',
      roleTitle: 'AC Basics & R-L-C Components',
      duration: 'Part of 2 min slot'
    },
    presenter3: {
      student: 'Student 1',
      roleTitle: 'AC/DC & Components Overview',
      duration: 'Part of 2.5 min slot'
    },
    keyTakeaway: 'DC maintains a constant direction, whereas AC periodically alternates its magnitude and reverses its direction over time.',
    bulletPoints: [
      {
        heading: 'Direct Current (DC)',
        text: 'Current flows in only ONE direction with constant or steady magnitude.',
        subBullets: [
          'Source: Batteries, DC generators, solar photovoltaic cells.',
          'Frequency f = 0 Hz (no alternation, period T = ∞).',
          'Voltage is constant: V(t) = V_DC.'
        ]
      },
      {
        heading: 'Alternating Current (AC)',
        text: 'Current and voltage continuously vary in magnitude and periodically reverse direction.',
        subBullets: [
          'Source: AC alternators, household wall sockets (230 V, 50 Hz in India / 120 V, 60 Hz in US).',
          'Sinusoidal waveform: v(t) = V_m sin(ωt), where ω = 2πf.',
          'Completes 50 full cycles every second (at 50 Hz).'
        ]
      }
    ],
    formulas: [
      {
        label: 'Instantaneous AC Voltage',
        expression: 'v(t) = V_m \\sin(\\omega t) = V_m \\sin(2\\pi f t)',
        explanation: 'V_m is peak voltage, f is frequency in Hz, ω is angular frequency in rad/s.'
      }
    ],
    memoryTrick: 'DC = Straight one-way road. AC = Two-way swing / pendulum that alternates smoothly.',
    diagramType: 'ac_dc_comparison',
    speakerScriptEnglish: 'First, let us understand the fundamental difference between AC and DC. In DC, current flows strictly in one direction, like the current from a chemical battery. In AC, voltage and current continuously change their magnitude and periodically reverse their direction. Our household mains electricity is AC, typically alternating 50 times per second.',
    speakerScriptHinglish: 'Sabse pehle, AC aur DC ko samajhte hain. DC mein current ek hi direction mein flow karta hai, jaise battery se milne wala current. Isme frequency zero hoti hai. AC mein current aur voltage time ke saath periodically change karte hain aur direction reverse hoti rehti hai. Hamare gharon mein aane wali mains electricity AC hoti hai jo 50 Hz par operate karti hai.',
    transitionNext: 'Now that we understand AC, let us meet the three fundamental circuit elements: R, L, and C.'
  },
  {
    id: 3,
    slideNumber: 3,
    title: 'The Three Building Blocks: R, L, and C',
    subtitle: 'Function, SI Units, Physical Energy Mechanics, and Practical Applications',
    presenter4: {
      student: 'Student 1',
      roleTitle: 'AC Basics & R-L-C Components',
      duration: 'Part of 2 min slot'
    },
    presenter3: {
      student: 'Student 1',
      roleTitle: 'AC/DC & Components Overview',
      duration: 'Part of 2.5 min slot'
    },
    keyTakeaway: 'Resistors dissipate electrical energy as heat; Inductors and Capacitors store energy in magnetic and electric fields respectively without dissipating active power.',
    bulletPoints: [
      {
        heading: 'R — Resistor',
        text: 'Opposes the flow of electric current through friction-like electron collisions.',
        subBullets: [
          'SI Unit: Ohm (Ω)',
          'Energy: Dissipates real power as heat: P = I²R Watts.',
          'Practical Example: Heating element, current-limiting resistor, filament lamp.'
        ]
      },
      {
        heading: 'L — Inductor',
        text: 'A coil of insulated wire that opposes any change in current (Lenz\'s law).',
        subBullets: [
          'SI Unit: Henry (H)',
          'Energy: Stores energy in a magnetic field: E_L = ½ L I² Joules.',
          'Practical Example: Electric motor winding, choke coil, transformer primary/secondary.'
        ]
      },
      {
        heading: 'C — Capacitor',
        text: 'Two conducting plates separated by an insulator (dielectric) that opposes changes in voltage.',
        subBullets: [
          'SI Unit: Farad (F, usually μF or nF)',
          'Energy: Stores energy in an electrostatic field: E_C = ½ C V² Joules.',
          'Practical Example: Power factor correction bank, camera flash, ceiling fan starting capacitor.'
        ]
      }
    ],
    diagramType: 'rlc_components',
    speakerScriptEnglish: 'Here are the three passive linear components: R, L, and C. R stands for Resistance, measured in Ohms (Ω), which opposes current flow and dissipates heat. L is Inductance, measured in Henries (H), a coiled wire that opposes any sudden changes in current by building a magnetic field. C is Capacitance, measured in Farads (F), which stores charge in an electric field between its plates. These three react very differently when subjected to an AC supply!',
    speakerScriptHinglish: 'R ka matlab resistance, L ka matlab inductance aur C ka matlab capacitance hai. Resistor current ko oppose karta hai aur heat dissipate karta hai (unit: Ohm). Inductor ek coil hoti hai jo current mein aane wale change ko oppose karti hai aur magnetic field mein energy store karti hai (unit: Henry). Capacitor do plates ke beech electric field mein energy store karta hai (unit: Farad). In teeno components ka AC ke saath behaviour bilkul alag hota hai.',
    transitionNext: 'Ab jab hum R, L aur C ka basic meaning samajh chuke hain, Student 2 explain karenge ki AC circuit mein in teenon ke across voltage aur current ka relationship kya hota hai.'
  },
  {
    id: 4,
    slideNumber: 4,
    title: 'Individual Component Behavior & Phase Relationships',
    subtitle: 'Understanding In-Phase, Voltage Lead, and Current Lead with Reactances',
    presenter4: {
      student: 'Student 2',
      roleTitle: 'Component Behavior & Series Circuit',
      duration: 'Approx. 2 mins (Slides 4–5)'
    },
    presenter3: {
      student: 'Student 2',
      roleTitle: 'Phase Relations & Series Circuit',
      duration: 'Part of 3 min slot'
    },
    keyTakeaway: 'In pure R: V and I are in phase. In pure L: Voltage leads Current by 90°. In pure C: Current leads Voltage by 90°.',
    bulletPoints: [
      {
        heading: 'Resistor (Pure R)',
        text: 'Voltage and current reach their maximums, zeros, and minimums at the exact same instant.',
        subBullets: [
          'Phase difference: φ = 0° (In Phase).',
          'Ohm\'s Law: V_R = I × R.'
        ]
      },
      {
        heading: 'Inductor (Pure L)',
        text: 'Due to self-induced back EMF, voltage reaches its peak a quarter cycle (90°) ahead of current.',
        subBullets: [
          'Voltage LEADS current by 90° (Current LAGS voltage by 90°).',
          'Inductive Reactance: X_L = 2πfL (measured in Ohms Ω).',
          'Voltage drop: V_L = I × X_L.'
        ]
      },
      {
        heading: 'Capacitor (Pure C)',
        text: 'Charge must flow onto plates before voltage can build up across them.',
        subBullets: [
          'Current LEADS voltage by 90° (Voltage LAGS current by 90°).',
          'Capacitive Reactance: X_C = 1 / (2πfC) (measured in Ohms Ω).',
          'Voltage drop: V_C = I × X_C.'
        ]
      }
    ],
    formulas: [
      {
        label: 'Inductive Reactance',
        expression: 'X_L = 2\\pi f L = \\omega L \\; (\\Omega)',
        explanation: 'Increases linearly with frequency f. Blocks high-frequency AC.'
      },
      {
        label: 'Capacitive Reactance',
        expression: 'X_C = \\frac{1}{2\\pi f C} = \\frac{1}{\\omega C} \\; (\\Omega)',
        explanation: 'Decreases with frequency f. Blocks DC (f=0 gives X_C = ∞).'
      }
    ],
    memoryTrick: 'CIVIL or ELI the ICE man: In Inductor (L), E (voltage) leads I (current) → E-L-I. In Capacitor (C), I (current) leads E (voltage) → I-C-E!',
    diagramType: 'vi_relationships',
    speakerScriptEnglish: 'Now let us examine how voltage and current relate in each component. In a resistor, voltage and current cross zero and reach peaks together, so they are completely in phase (0° phase angle). In an inductor, voltage leads current by 90 degrees because back-EMF opposes current growth. In a capacitor, current leads voltage by 90 degrees because charging current must flow first before voltage can establish across the plates. Remember the memory trick: ELI the ICE man!',
    speakerScriptHinglish: 'Ab hum voltage aur current ke phase relationship ko samjhenge. Resistor mein voltage aur current ek saath maximum aur zero hote hain, isliye dono completely IN PHASE hain (0°). Inductor mein voltage current se 90 degree aage (LEAD) karta hai, aur formula hai V_L = I × X_L jahan X_L = 2πfL hai. Capacitor mein current voltage se 90 degree aage (LEAD) karta hai, aur X_C = 1/(2πfC) hota hai. Easy trick: ELI the ICE man!',
    transitionNext: 'Now let us connect all three components end-to-end in series across an AC power source.'
  },
  {
    id: 5,
    slideNumber: 5,
    title: 'Series R-L-C Circuit Architecture',
    subtitle: 'Single Current Path, Distinct Component Voltages, and Vectorial Voltage Sum',
    presenter4: {
      student: 'Student 2',
      roleTitle: 'Component Behavior & Series Circuit',
      duration: 'Part of 2 min slot'
    },
    presenter3: {
      student: 'Student 2',
      roleTitle: 'Phase Relations & Series Circuit',
      duration: 'Part of 3 min slot'
    },
    keyTakeaway: 'Because it is a series circuit, identical current I flows through R, L, and C. Therefore, Current I is chosen as the reference phasor.',
    bulletPoints: [
      {
        heading: 'Single Closed Loop',
        text: 'Resistor R, Inductor L, and Capacitor C are connected sequentially in one uninterrupted path.',
        subBullets: [
          'Current is COMMON: i(t) = I_m sin(ωt) passes through R, L, and C simultaneously.',
          'Reference Vector: Always plot current I along the horizontal reference axis (0°).'
        ]
      },
      {
        heading: 'Individual Voltage Drops',
        text: 'The voltage drops across R, L, and C differ in magnitude and phase:',
        subBullets: [
          'V_R = I·R (in phase with current I)',
          'V_L = I·X_L (leads current I by +90°)',
          'V_C = I·X_C (lags current I by -90°)'
        ]
      },
      {
        heading: 'Crucial Engineering Warning',
        text: 'Do NOT add voltages arithmetically! V ≠ V_R + V_L + V_C. The total supply voltage V is the PHASOR (vector) sum of the three drops.',
        subBullets: [
          'V_net = V_R + j(V_L - V_C)',
          'Because V_L and V_C act in directly opposite directions (180° apart), their net reactive effect is (V_L - V_C).'
        ]
      }
    ],
    formulas: [
      {
        label: 'Supply Voltage Phasor Equation',
        expression: '\\vec{V} = \\vec{V}_R + \\vec{V}_L + \\vec{V}_C',
        explanation: 'Phasor sum (not scalar addition) due to phase angle differences.'
      }
    ],
    diagramType: 'series_circuit',
    speakerScriptEnglish: 'In a series R-L-C circuit, the resistor, inductor, and capacitor are wired in a single closed loop across an AC supply. Since there is only one path, the exact same current I flows through all three elements. However, their voltage drops have completely different phase angles! Therefore, we cannot simply add the voltages like numbers—we must compute their phasor sum. This brings us directly to the Phasor Diagram.',
    speakerScriptHinglish: 'Series R-L-C circuit mein resistor, inductor aur capacitor ek hi continuous path mein connected hote hain. Isliye teeno components mein bilkul same current flow karta hai. Hum current ko apna reference vector maante hain. Lekin teeno ke across voltage drops ka phase alag-alag hota hai. Isiliye supply voltage nikalne ke liye hum normal addition nahi kar sakte, hume phasor diagram use karna padta hai.',
    transitionNext: 'Ab hum samajhte hain ki in voltage relationships ko phasor diagram mein kaise draw karte hain aur total impedance aur phase angle kaise calculate karte hain. Over to Student 3!'
  },
  {
    id: 6,
    slideNumber: 6,
    title: 'Series R-L-C Phasor Diagram Construction',
    subtitle: 'Step-by-Step Graphical Synthesis with Current as the Reference Axis',
    presenter4: {
      student: 'Student 3',
      roleTitle: 'Phasor Diagram, Impedance & Phase Angle',
      duration: 'Approx. 2.5–3 mins (Slides 6–7)'
    },
    presenter3: {
      student: 'Student 2 & 3',
      roleTitle: 'Phasor Construction & Vector Analysis',
      duration: 'Part of 3 min slot'
    },
    keyTakeaway: 'V_L (+90°) and V_C (-90°) oppose each other along the vertical axis, creating net reactive voltage (V_L - V_C). Supply voltage V forms the hypotenuse.',
    bulletPoints: [
      {
        heading: 'Step 1: Set Reference Vector',
        text: 'Draw current phasor I horizontally along the positive X-axis (0° angle).'
      },
      {
        heading: 'Step 2: Draw Resistor Voltage V_R',
        text: 'Plot V_R = I·R horizontally to the right, exactly in phase with reference current I.'
      },
      {
        heading: 'Step 3: Draw Inductor Voltage V_L',
        text: 'Plot V_L = I·X_L vertically upwards (+90° ahead of current I).'
      },
      {
        heading: 'Step 4: Draw Capacitor Voltage V_C',
        text: 'Plot V_C = I·X_C vertically downwards (-90° behind current I).'
      },
      {
        heading: 'Step 5: Net Reactive Voltage (V_L - V_C)',
        text: 'Because V_L and V_C are 180° out of phase, their net resultant is (V_L - V_C) pointing upwards (if V_L > V_C).'
      },
      {
        heading: 'Step 6: Resultant Supply Voltage V',
        text: 'By Pythagoras theorem on the right-angled voltage triangle: V = √[V_R² + (V_L - V_C)²].'
      }
    ],
    formulas: [
      {
        label: 'Supply Voltage Magnitude',
        expression: 'V = \\sqrt{V_R^2 + (V_L - V_C)^2}',
        explanation: 'Hypotenuse of the right-angled voltage triangle.'
      }
    ],
    diagramType: 'phasor_diagram',
    speakerScriptEnglish: 'A phasor is a rotating vector that represents an AC sinusoidal quantity in terms of its magnitude and phase angle. To construct the phasor diagram for a series R-L-C circuit, we place current I along the horizontal axis as reference. Resistor voltage V_R lies in phase along the same axis. Inductor voltage V_L points vertically upward at +90 degrees. Capacitor voltage V_C points vertically downward at -90 degrees. Since V_L and V_C directly oppose each other, their net vertical voltage is (V_L - V_C). Using Pythagoras theorem, the hypotenuse gives the resultant supply voltage V, and the angle between V and I is the phase angle φ.',
    speakerScriptHinglish: 'Phasor ek vector representation hai jo AC quantity ka magnitude aur phase angle graphically dikhata hai. Hum current I ko horizontal reference axis par draw karte hain. Resistor voltage V_R current ke saath horizontal direction mein hota hai. Inductor voltage V_L vertically upwards 90 degree aage hota hai, aur capacitor voltage V_C vertically downwards 90 degree peeche hota hai. Dono vertical voltages 180 degree opposite hain, isliye net vertical voltage (V_L - V_C) banta hai. Pythagoras theorem se hypotenuse supply voltage V deta hai!',
    transitionNext: 'Now let us translate this voltage triangle directly into the fundamental Impedance Triangle and Phase Angle formulas.'
  },
  {
    id: 7,
    slideNumber: 7,
    title: 'Impedance (Z), Phase Angle (φ) & The 3 Circuit Cases',
    subtitle: 'Opposition to AC Current, Power Factor, and Inductive vs Capacitive Behavior',
    presenter4: {
      student: 'Student 3',
      roleTitle: 'Phasor Diagram, Impedance & Phase Angle',
      duration: 'Part of 2.5–3 min slot'
    },
    presenter3: {
      student: 'Student 3',
      roleTitle: 'Impedance, Angle & Resonance',
      duration: 'Part of 3 min slot'
    },
    keyTakeaway: 'Impedance Z is the total opposition to AC current, combining Resistance R and Net Reactance X = (X_L - X_C).',
    bulletPoints: [
      {
        heading: 'Key Definitions',
        text: 'Clear distinction between fundamental AC parameters:',
        subBullets: [
          'Resistance (R): Pure opposition to current, consumes active power (Ohms).',
          'Reactance (X = X_L - X_C): Frequency-dependent reactive opposition (Ohms).',
          'Impedance (Z): Vector total opposition offered to alternating current (Ohms).',
          'Phase Angle (φ): Angle by which supply voltage leads or lags current.'
        ]
      },
      {
        heading: 'The Three Operating Regimes',
        text: 'The sign and value of net reactance determines circuit character:',
        subBullets: [
          'Case 1: X_L > X_C → Inductive Circuit. V leads I by φ (Current LAGS supply voltage). tanφ > 0.',
          'Case 2: X_C > X_L → Capacitive Circuit. I leads V by φ (Current LEADS supply voltage). tanφ < 0.',
          'Case 3: X_L = X_C → Purely Resistive (Resonance). V and I in phase (φ = 0°). tanφ = 0.'
        ]
      }
    ],
    formulas: [
      {
        label: 'Total Impedance',
        expression: 'Z = \\sqrt{R^2 + (X_L - X_C)^2} \\; (\\Omega)',
        explanation: 'Hypotenuse of the Impedance Triangle.'
      },
      {
        label: 'Ohm\'s Law for AC',
        expression: 'I = \\frac{V}{Z} \\; (\\text{Amperes})',
        explanation: 'RMS current equals RMS supply voltage divided by impedance.'
      },
      {
        label: 'Phase Angle Formula',
        expression: '\\tan\\phi = \\frac{X_L - X_C}{R} \\implies \\phi = \\tan^{-1}\\left(\\frac{X_L - X_C}{R}\\right)',
        explanation: 'Angle φ between supply voltage V and current I.'
      },
      {
        label: 'Power Factor',
        expression: '\\cos\\phi = \\frac{R}{Z}',
        explanation: 'Ratio of true power to apparent power. Cosine of phase angle.'
      }
    ],
    diagramType: 'impedance_triangle',
    speakerScriptEnglish: 'Dividing all voltages in the phasor diagram by current I yields the Impedance Triangle! Here, base is Resistance R, perpendicular is Net Reactance (X_L - X_C), and hypotenuse is Total Impedance Z. If inductive reactance exceeds capacitive reactance (X_L > X_C), the circuit acts inductive and current lags voltage. If X_C > X_L, the circuit acts capacitive and current leads voltage. If both reactances balance each other, the circuit enters Resonance! Student 4 will now explain this special condition.',
    speakerScriptHinglish: 'Impedance AC circuit ka total opposition hota hai. Isme resistance aur net reactance dono ka combined effect hota hai. Formula hai Z = √(R² + (X_L - X_C)²). Phase angle batata hai ki supply voltage aur current ke beech kitna angular shift hai. Agar inductive reactance zyada hai (X_L > X_C), to circuit inductive behave karega aur current lag karega. Agar capacitive reactance zyada hai, current lead karega. Aur agar dono barabar ho gaye, toh resonance hota hai!',
    transitionNext: 'Ab Student 4 resonance explain karenge aur ek numerical example solve karke dikhayenge, jisse ye formulas aur clear ho jayenge.'
  },
  {
    id: 8,
    slideNumber: 8,
    title: 'Resonance in a Series R-L-C Circuit',
    subtitle: 'The Special Condition Where Reactive Effects Cancel Out (X_L = X_C)',
    presenter4: {
      student: 'Student 4',
      roleTitle: 'Resonance, Numerical & Conclusion',
      duration: 'Approx. 2 mins (Slides 8–9)'
    },
    presenter3: {
      student: 'Student 3',
      roleTitle: 'Resonance & Numerical',
      duration: 'Part of 3 min slot'
    },
    keyTakeaway: 'At resonance, impedance drops to its absolute minimum (Z = R) and circuit current rises to its absolute maximum (I_max = V/R).',
    bulletPoints: [
      {
        heading: 'Definition of Series Resonance',
        text: 'A condition in an AC series R-L-C circuit where inductive reactance equals capacitive reactance:',
        subBullets: [
          'Condition: X_L = X_C  →  2πf_r L = 1 / (2πf_r C)',
          'Net Reactance: X = X_L - X_C = 0.'
        ]
      },
      {
        heading: 'Resonant Frequency Formula',
        text: 'Solving for frequency yields the natural resonant frequency:',
        subBullets: [
          'Angular resonant frequency: ω_r = 1 / √(LC) rad/s',
          'Cyclic resonant frequency: f_r = 1 / (2π√(LC)) Hz'
        ]
      },
      {
        heading: 'Unique Characteristics at Resonance',
        text: 'Exam favorite checklist:',
        subBullets: [
          'Impedance is MINIMUM and purely resistive: Z_min = R.',
          'Current is MAXIMUM for a given supply voltage: I_max = V / R.',
          'Phase angle is ZERO: φ = 0° (Voltage and Current are strictly in phase).',
          'Power factor is UNITY: cosφ = 1.0 (Maximum active power transfer).',
          'Voltage Magnification: V_L and V_C can be much higher than supply voltage V, but cancel each other externally!'
        ]
      }
    ],
    formulas: [
      {
        label: 'Resonant Frequency',
        expression: 'f_r = \\frac{1}{2\\pi\\sqrt{LC}} \\; (\\text{Hz})',
        explanation: 'Frequency at which X_L = X_C.'
      },
      {
        label: 'Quality Factor (Q-factor)',
        expression: 'Q = \\frac{\\omega_r L}{R} = \\frac{1}{R}\\sqrt{\\frac{L}{C}}',
        explanation: 'Measures circuit selectivity and voltage magnification at resonance.'
      }
    ],
    diagramType: 'resonance',
    speakerScriptEnglish: 'Resonance occurs when inductive reactance exactly equals capacitive reactance: X_L = X_C. Because their voltages are 180 degrees apart, they completely cancel each other out externally! The net reactance drops to zero, impedance drops to its lowest possible value (Z = R), and current reaches its maximum peak. The resonant frequency is given by f_r = 1 / (2π√(LC)). This phenomenon is the foundation of radio and tuning circuits, where a specific frequency is selected while rejecting all others.',
    speakerScriptHinglish: 'Resonance tab hota hai jab inductive reactance aur capacitive reactance bilkul equal ho jaate hain (X_L = X_C). Dono ek doosre ke reactive effect ko completely cancel kar dete hain. Is condition mein net reactance zero ho jata hai, impedance minimum ho kar sirf resistance R ke barabar reh jata hai, aur current maximum ho jata hai (I = V/R). Supply voltage aur current completely in phase hote hain aur power factor unity (1.0) hota hai. Formula hai f_r = 1 / (2π√(LC)).',
    transitionNext: 'Now let us solidify these principles with a classic exam numerical example.'
  },
  {
    id: 9,
    slideNumber: 9,
    title: 'Solved Numerical Problem',
    subtitle: 'Step-by-Step Calculation of Reactance, Impedance, Current, and Phase Angle',
    presenter4: {
      student: 'Student 4',
      roleTitle: 'Resonance, Numerical & Conclusion',
      duration: 'Part of 2 min slot'
    },
    presenter3: {
      student: 'Student 3',
      roleTitle: 'Numerical & Conclusion',
      duration: 'Part of 3 min slot'
    },
    keyTakeaway: 'Given R = 3 Ω, X_L = 8 Ω, X_C = 4 Ω, V = 10 V → Net Reactance X = 4 Ω, Impedance Z = 5 Ω, Current I = 2 A, Phase Angle φ ≈ 53.13° (Lagging).',
    bulletPoints: [
      {
        heading: 'Problem Statement',
        text: 'A series R-L-C circuit has Resistance R = 3 Ω, Inductive Reactance X_L = 8 Ω, Capacitive Reactance X_C = 4 Ω, connected across AC supply V = 10 V. Find: (a) Net reactance X, (b) Impedance Z, (c) Current I, (d) Phase angle φ and circuit nature.'
      },
      {
        heading: 'Step 1: Net Reactance X',
        text: 'X = X_L - X_C = 8 - 4 = 4 Ω'
      },
      {
        heading: 'Step 2: Total Impedance Z',
        text: 'Z = √(R² + X²) = √(3² + 4²) = √(9 + 16) = √25 = 5 Ω (Classic 3-4-5 Pythagorean triangle!)'
      },
      {
        heading: 'Step 3: Circuit Current I',
        text: 'I = V / Z = 10 / 5 = 2.0 A'
      },
      {
        heading: 'Step 4: Phase Angle φ & Power Factor',
        text: 'tanφ = (X_L - X_C) / R = 4 / 3 ≈ 1.333 → φ = tan⁻¹(4/3) ≈ 53.13°'
      },
      {
        heading: 'Step 5: Physical Interpretation',
        text: 'Since X_L (8 Ω) > X_C (4 Ω), the circuit is INDUCTIVE. Current I lags supply voltage V by 53.13°. Power factor cosφ = R/Z = 3/5 = 0.6 lagging.'
      }
    ],
    formulas: [
      {
        label: 'Step 1: Net Reactance',
        expression: 'X = X_L - X_C = 8\\Omega - 4\\Omega = 4\\,\\Omega',
        explanation: 'Inductive reactance dominates.'
      },
      {
        label: 'Step 2: Impedance',
        expression: 'Z = \\sqrt{3^2 + 4^2} = \\sqrt{25} = 5\\,\\Omega',
        explanation: 'Total AC opposition.'
      },
      {
        label: 'Step 3: Current',
        expression: 'I = \\frac{10\\text{ V}}{5\\,\\Omega} = 2.0\\,\\text{A}',
        explanation: 'RMS current in circuit.'
      },
      {
        label: 'Step 4: Phase Angle',
        expression: '\\phi = \\tan^{-1}\\left(\\frac{4}{3}\\right) \\approx 53.13^\\circ \\; (\\text{Lagging})',
        explanation: 'Current lags voltage.'
      }
    ],
    diagramType: 'numerical_example',
    speakerScriptEnglish: 'Let us solve this classic exam problem. We are given R = 3 Ohms, X_L = 8 Ohms, X_C = 4 Ohms, and V = 10 Volts. First, net reactance is 8 minus 4, which is 4 Ohms. Second, using Pythagoras theorem, impedance Z is the square root of 3 squared plus 4 squared, giving square root of 25, which is exactly 5 Ohms! Third, dividing voltage 10 Volts by impedance 5 Ohms gives a current of 2 Amperes. Finally, tan phi is 4 over 3, giving a phase angle of 53.1 degrees. Because X_L is greater than X_C, the circuit is inductive, so current lags the supply voltage by 53.1 degrees.',
    speakerScriptHinglish: 'Is numerical example ko dekhiye. R = 3 ohms, X_L = 8 ohms, X_C = 4 ohms aur supply voltage 10 volts diya hai. Step 1 mein net reactance X = 8 - 4 = 4 ohms milta hai. Step 2 mein impedance Z = √(3² + 4²) = √25 = 5 ohms aata hai. Step 3 mein current I = 10 / 5 = 2 amperes nikalta hai. Step 4 mein tan phi = 4/3 hone se angle lagbhag 53.1 degrees aata hai. Kyunki X_L bada hai X_C se, isliye circuit inductive hai aur current supply voltage se 53.1 degree lag karta hai.',
    transitionNext: 'Let us now summarize everything with our Quick Revision Formula Sheet and final conclusion.'
  },
  {
    id: 10,
    slideNumber: 10,
    title: 'Quick Revision & Master Formula Summary',
    subtitle: 'BEE Unit 2 Exam Cheat Sheet & Key Engineering Takeaways',
    presenter4: {
      student: 'All / Student 4',
      roleTitle: 'Summary & Conclusion',
      duration: 'Wrap-up (1 min)'
    },
    presenter3: {
      student: 'All / Student 3',
      roleTitle: 'Summary & Conclusion',
      duration: 'Wrap-up (1 min)'
    },
    keyTakeaway: 'A complete overview of formulas, units, phasor conventions, and exam conditions in a single glance.',
    bulletPoints: [
      {
        heading: 'Phase Conventions',
        text: 'Resistor: φ = 0° (In Phase) | Inductor: V leads I by 90° | Capacitor: I leads V by 90°.'
      },
      {
        heading: 'Impedance & Ohm\'s Law',
        text: 'Z = √[R² + (X_L - X_C)²] Ω, where X_L = 2πfL and X_C = 1/(2πfC). V = I·Z.'
      },
      {
        heading: 'Phase Angle & Power Factor',
        text: 'tanφ = (X_L - X_C) / R, cosφ = R / Z (Power Factor).'
      },
      {
        heading: 'Resonance Summary',
        text: 'Condition: X_L = X_C | f_r = 1 / (2π√LC) | Z_min = R | I_max = V / R | cosφ = 1.0 (Unity).'
      }
    ],
    formulas: [
      {
        label: 'Impedance',
        expression: 'Z = \\sqrt{R^2 + (X_L - X_C)^2}',
        explanation: 'Total AC opposition (Ohms)'
      },
      {
        label: 'Resonant Frequency',
        expression: 'f_r = \\frac{1}{2\\pi\\sqrt{LC}}',
        explanation: 'Resonance frequency (Hertz)'
      },
      {
        label: 'Power Factor',
        expression: '\\cos\\phi = \\frac{R}{Z}',
        explanation: 'Power factor (dimensionless)'
      }
    ],
    diagramType: 'formula_cheat_sheet',
    speakerScriptEnglish: 'To conclude, a series R-L-C circuit contains resistance, inductance, and capacitance in a single path with the same current throughout. The phasor diagram helps us compute the resultant voltage, impedance, and phase angle. At resonance, inductive and capacitive reactances cancel out, leaving the circuit purely resistive with maximum current. Thank you, respected sir and everyone, for your kind attention. We are now open for any questions!',
    speakerScriptHinglish: 'To conclude, Series R-L-C circuit mein resistance, inductance aur capacitance hote hain. Current teeno components mein same hota hai, lekin voltages ke phase alag hote hain. Phasor diagram ki help se hum resultant voltage, total impedance aur phase angle calculate karte hain. Resonance par reactances cancel ho jaate hain aur current maximum ho jata hai. Thank you, respected sir and dear classmates! Agar aapka koi question ya doubt hai, to please pooch sakte hain.',
    transitionNext: 'End of presentation.'
  }
];

export interface GroupMember {
  id: number;
  roleNumber: number;
  defaultName: string;
  topic: string;
  slides: number[];
  durationMinutes: number;
  cueIntro: string;
  cueOutro: string;
}

export const FOUR_STUDENT_TEAM: GroupMember[] = [
  {
    id: 1,
    roleNumber: 1,
    defaultName: 'Student 1',
    topic: 'Introduction, AC vs DC & R-L-C Component Basics',
    slides: [1, 2, 3],
    durationMinutes: 2.0,
    cueIntro: 'Good morning respected sir and my dear friends...',
    cueOutro: 'Ab Student 2 explain karenge V-I relationship...'
  },
  {
    id: 2,
    roleNumber: 2,
    defaultName: 'Student 2',
    topic: 'Component AC Behavior & Series Circuit Architecture',
    slides: [4, 5],
    durationMinutes: 2.0,
    cueIntro: 'Ab hum voltage aur current ke phase relationship ko samjhenge...',
    cueOutro: 'Ab Student 3 phasor diagram aur impedance samjhayenge...'
  },
  {
    id: 3,
    roleNumber: 3,
    defaultName: 'Student 3',
    topic: 'Phasor Diagram, Impedance Triangle & Phase Angle',
    slides: [6, 7],
    durationMinutes: 2.5,
    cueIntro: 'Phasor ek vector representation hai...',
    cueOutro: 'Ab Student 4 resonance aur numerical solve karenge...'
  },
  {
    id: 4,
    roleNumber: 4,
    defaultName: 'Student 4',
    topic: 'Series Resonance, Solved Numerical & Conclusion',
    slides: [8, 9, 10],
    durationMinutes: 2.5,
    cueIntro: 'Resonance tab hota hai jab XL aur XC equal hote hain...',
    cueOutro: 'To conclude, thank you sir and everyone!'
  }
];

export const THREE_STUDENT_TEAM: GroupMember[] = [
  {
    id: 1,
    roleNumber: 1,
    defaultName: 'Student 1',
    topic: 'Introduction, AC/DC, R-L-C & Individual Component Behavior',
    slides: [1, 2, 3, 4],
    durationMinutes: 2.5,
    cueIntro: 'Good morning respected sir and classmates...',
    cueOutro: 'Ab Student 2 series circuit aur phasor diagram explain karenge...'
  },
  {
    id: 2,
    roleNumber: 2,
    defaultName: 'Student 2',
    topic: 'Series R-L-C Circuit, Phasor Diagram & Vector Analysis',
    slides: [5, 6],
    durationMinutes: 3.0,
    cueIntro: 'Series R-L-C circuit mein same current flow karta hai...',
    cueOutro: 'Ab Student 3 impedance, resonance aur numerical solve karenge...'
  },
  {
    id: 3,
    roleNumber: 3,
    defaultName: 'Student 3',
    topic: 'Impedance, Phase Angle, Resonance, Numerical & Conclusion',
    slides: [7, 8, 9, 10],
    durationMinutes: 3.5,
    cueIntro: 'Impedance AC circuit ka total opposition hota hai...',
    cueOutro: 'To conclude, thank you respected sir and friends!'
  }
];
