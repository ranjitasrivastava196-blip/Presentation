export interface QuizQuestion {
  id: number;
  category: 'Impedance' | 'Phase Angle' | 'Resonance' | 'Components & Reactance';
  difficulty: 'Easy' | 'Medium' | 'Hard';
  question: string;
  options: string[];
  correctIndex: number;
  explanationEnglish: string;
  explanationHinglish: string;
  formula?: string;
  vivaRelevance: string;
}

export const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 1,
    category: 'Components & Reactance',
    difficulty: 'Easy',
    question: 'In an AC circuit with an ideal inductor, what is the phase relationship between voltage and current?',
    options: [
      'Voltage and current are in phase (φ = 0°)',
      'Voltage leads current by 90°',
      'Current leads voltage by 90°',
      'Voltage and current are 180° out of phase'
    ],
    correctIndex: 1,
    explanationEnglish: 'In a pure inductor, back EMF opposes current growth according to Faraday and Lenz laws. Consequently, the voltage reaches its peak a quarter cycle (90°) ahead of the current. Remember the mnemonic "ELI": In an Inductor (L), Voltage (E) leads Current (I).',
    explanationHinglish: 'Pure inductor mein back EMF current ke badhne ko oppose karta hai, isliye voltage current se 90 degree aage (lead) hota hai. Memory trick: "ELI" (Inductor L me Voltage E pehle aata hai).',
    formula: 'V_L \\text{ leads } I \\text{ by } 90^\\circ \\quad (X_L = 2\\pi f L)',
    vivaRelevance: 'Examiners check if you know the "ELI the ICE man" rule instantly.'
  },
  {
    id: 2,
    category: 'Components & Reactance',
    difficulty: 'Easy',
    question: 'Why is current (I) taken as the reference phasor on the horizontal axis in a series R-L-C circuit?',
    options: [
      'Because current is zero at all times',
      'Because the same common current flows sequentially through R, L, and C',
      'Because voltage across all components is identical',
      'Because it simplifies DC calculations only'
    ],
    correctIndex: 1,
    explanationEnglish: 'In a series circuit, there is only a single loop with one conductive path. Therefore, identical current flows through R, L, and C simultaneously. Choosing the common quantity as the reference phasor (along 0°) makes it easy to plot individual component voltage drops relative to it.',
    explanationHinglish: 'Series circuit mein ek hi path hota hai, isliye R, L aur C teeno me se exact same current flow karta hai. Jo quantity sab me common hoti hai, usko horizontal 0° reference manna sabse aasan hota hai.',
    formula: 'I_{\\text{common}} = I_R = I_L = I_C',
    vivaRelevance: 'Standard opening question in single-phase AC viva.'
  },
  {
    id: 3,
    category: 'Impedance',
    difficulty: 'Medium',
    question: 'A series R-L-C circuit has R = 3 Ω, X_L = 8 Ω, and X_C = 4 Ω. What is the total circuit impedance Z?',
    options: [
      '15.0 Ω',
      '7.0 Ω',
      '5.0 Ω',
      '1.0 Ω'
    ],
    correctIndex: 2,
    explanationEnglish: 'Net reactance X = X_L - X_C = 8 - 4 = 4 Ω. Total impedance Z = √(R² + X²) = √(3² + 4²) = √(9 + 16) = √25 = 5.0 Ω. This is the classic 3-4-5 right triangle!',
    explanationHinglish: 'Net reactance X = 8 - 4 = 4 Ω. Total impedance Z = √(3² + 4²) = √25 = 5 Ω. Yeh famous 3-4-5 right-angled triangle hai jo exams mein aksar pucha jata hai.',
    formula: 'Z = \\sqrt{R^2 + (X_L - X_C)^2} = \\sqrt{3^2 + 4^2} = 5\\,\\Omega',
    vivaRelevance: 'Exact problem from Slide 9 of your BEE presentation.'
  },
  {
    id: 4,
    category: 'Phase Angle',
    difficulty: 'Medium',
    question: 'When inductive reactance is greater than capacitive reactance (X_L > X_C), the series R-L-C circuit behaves as:',
    options: [
      'Capacitive, and current leads the supply voltage',
      'Inductive, and current lags the supply voltage',
      'Purely resistive, with current in phase with voltage',
      'Non-linear, with oscillating power factor'
    ],
    correctIndex: 1,
    explanationEnglish: 'When X_L > X_C, the net reactance X = (X_L - X_C) is positive, pointing upwards on the phasor diagram. Thus, the supply voltage leads the current, meaning the circuit is INDUCTIVE and current LAGS the supply voltage by phase angle φ.',
    explanationHinglish: 'Jab X_L > X_C hota hai, to net reactance positive hota hai aur inductive effect dominate karta hai. Circuit inductive behave karta hai aur current supply voltage se lag karta hai.',
    formula: '\\tan\\phi = \\frac{X_L - X_C}{R} > 0 \\implies \\text{Current Lags } V',
    vivaRelevance: 'Crucial concept for power factor correction questions.'
  },
  {
    id: 5,
    category: 'Resonance',
    difficulty: 'Easy',
    question: 'What is the fundamental condition for electrical resonance in a series R-L-C circuit?',
    options: [
      'R = X_L + X_C',
      'X_L = X_C',
      'X_L = 0 and X_C = 0',
      'V_R = 0'
    ],
    correctIndex: 1,
    explanationEnglish: 'Resonance occurs when inductive reactance equals capacitive reactance: X_L = X_C. Because their voltages V_L and V_C are 180° out of phase, they completely cancel each other out externally, leaving net reactance X = 0.',
    explanationHinglish: 'Resonance tab hota hai jab inductive reactance aur capacitive reactance barabar ho jaate hain (X_L = X_C). Dono ek doosre ke reactive effect ko 180 degree opposition ki wajah se cancel kar dete hain.',
    formula: 'X_L = X_C \\implies 2\\pi f_r L = \\frac{1}{2\\pi f_r C}',
    vivaRelevance: 'Guaranteed 2-mark question in every BEE semester exam.'
  },
  {
    id: 6,
    category: 'Resonance',
    difficulty: 'Medium',
    question: 'At series resonance, what happens to total impedance Z and circuit current I?',
    options: [
      'Impedance is maximum and current is zero',
      'Impedance is minimum (Z = R) and current is maximum (I = V/R)',
      'Impedance is zero and current is infinite',
      'Both impedance and current fluctuate unpredictably'
    ],
    correctIndex: 1,
    explanationEnglish: 'Because net reactance is zero at resonance (X_L - X_C = 0), total impedance drops to its minimum possible value: Z_min = √(R² + 0²) = R. For a fixed supply voltage V, the circuit current reaches its absolute maximum: I_max = V / R.',
    explanationHinglish: 'Resonance par net reactance zero hone se impedance minimum ho jata hai (Z = R) aur circuit purely resistive ban jata hai. Isliye current maximum hota hai: I = V/R.',
    formula: 'Z_{\\min} = R, \\quad I_{\\max} = \\frac{V}{R}',
    vivaRelevance: 'Why series R-L-C is termed an "Acceptor Circuit".'
  },
  {
    id: 7,
    category: 'Resonance',
    difficulty: 'Hard',
    question: 'What is the cyclic resonant frequency (f_r) formula in a series R-L-C circuit?',
    options: [
      'f_r = 2π √(LC)',
      'f_r = 1 / (2π √(LC))',
      'f_r = 1 / √(2π LC)',
      'f_r = √(L / C) / 2π'
    ],
    correctIndex: 1,
    explanationEnglish: 'Equating 2π f_r L = 1 / (2π f_r C) gives f_r² = 1 / (4π² LC). Taking the square root gives the standard resonant frequency formula: f_r = 1 / (2π √(LC)) in Hertz (Hz).',
    explanationHinglish: '2π f_r L = 1/(2π f_r C) ko solve karne par f_r = 1 / (2π √(LC)) aata hai. Yeh frequency Hertz (Hz) mein hoti hai.',
    formula: 'f_r = \\frac{1}{2\\pi\\sqrt{LC}} \\; (\\text{Hz})',
    vivaRelevance: 'Derivation frequently requested in written exams.'
  },
  {
    id: 8,
    category: 'Phase Angle',
    difficulty: 'Medium',
    question: 'What is the power factor (cos φ) of a series R-L-C circuit at resonance?',
    options: [
      '0.0 (Zero)',
      '0.5 lagging',
      '0.707 leading',
      '1.0 (Unity)'
    ],
    correctIndex: 3,
    explanationEnglish: 'At resonance, phase angle φ = 0° because supply voltage and current are in phase. Therefore, Power Factor = cos(0°) = R / Z = R / R = 1.0 (Unity Power Factor). All supplied power is converted to active real power.',
    explanationHinglish: 'Resonance par phase angle φ = 0° hota hai kyunki voltage aur current in phase hain. Isliye Power Factor = cos(0°) = 1.0 (Unity) hota hai.',
    formula: '\\cos\\phi = \\frac{R}{Z} = \\frac{R}{R} = 1.0 \\; (\\text{Unity})',
    vivaRelevance: 'Power factor values always range between 0 and 1.'
  },
  {
    id: 9,
    category: 'Components & Reactance',
    difficulty: 'Medium',
    question: 'If the supply frequency f is doubled, what happens to inductive reactance X_L and capacitive reactance X_C?',
    options: [
      'X_L doubles and X_C is halved',
      'Both X_L and X_C double',
      'Both X_L and X_C are halved',
      'X_L is halved and X_C doubles'
    ],
    correctIndex: 0,
    explanationEnglish: 'X_L = 2πfL is directly proportional to frequency (doubling f doubles X_L). X_C = 1/(2πfC) is inversely proportional to frequency (doubling f halves X_C).',
    explanationHinglish: 'X_L = 2πfL frequency ke directly proportional hai (frequency double hone par X_L double hoga). X_C = 1/(2πfC) inversely proportional hai (frequency double hone par X_C aadha ho jayega).',
    formula: 'X_L \\propto f, \\quad X_C \\propto \\frac{1}{f}',
    vivaRelevance: 'Tests graph comprehension of Reactance vs Frequency curves.'
  },
  {
    id: 10,
    category: 'Impedance',
    difficulty: 'Hard',
    question: 'In a series R-L-C circuit, V_R = 6 V, V_L = 16 V, and V_C = 8 V. What is the total supply voltage V?',
    options: [
      '30 V',
      '10 V',
      '14 V',
      '24 V'
    ],
    correctIndex: 1,
    explanationEnglish: 'Net reactive voltage is (V_L - V_C) = 16 - 8 = 8 V. By Pythagoras theorem on the phasor diagram, total supply voltage V = √[V_R² + (V_L - V_C)²] = √[6² + 8²] = √[36 + 64] = √100 = 10 V. You must NEVER add voltages arithmetically (6 + 16 + 8 = 30 V is completely wrong)!',
    explanationHinglish: 'Net reactive voltage V_L - V_C = 16 - 8 = 8 V. Phasor sum se V = √(6² + 8²) = √100 = 10 V. Scalar addition (6 + 16 + 8 = 30 V) galat hota hai kyunki AC mein phase difference hota hai!',
    formula: 'V = \\sqrt{V_R^2 + (V_L - V_C)^2} = \\sqrt{6^2 + 8^2} = 10\\,\\text{V}',
    vivaRelevance: 'Classic trap question to see if student knows phasor summation vs scalar addition.'
  }
];
