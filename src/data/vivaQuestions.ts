export interface VivaQuestion {
  id: number;
  question: string;
  hindiTranslation: string;
  answerEnglish: string;
  answerHinglish: string;
  keyKeywords: string[];
  examinerTip: string;
}

export const VIVA_QUESTIONS: VivaQuestion[] = [
  {
    id: 1,
    question: 'Why is current taken as the reference phasor in a series R-L-C circuit?',
    hindiTranslation: 'Series R-L-C circuit mein current ko hi reference kyu lete hain?',
    answerEnglish: 'In a series circuit, there is only one continuous path for charge flow, meaning the same current I flows through all components (R, L, and C) simultaneously. Taking the common quantity (current) as the reference along the horizontal axis (0°) makes it straightforward to compare the different phase angles of individual voltage drops V_R, V_L, and V_C.',
    answerHinglish: 'Series circuit mein ek hi loop hota hai, isliye R, L aur C teeno me se exact SAME current flow karta hai. Jo quantity sabhi components me common hoti hai, usko horizontal axis (0°) par reference lena sabse easy hota hai taaki alag-alag voltages ko compare kar sakein.',
    keyKeywords: ['Single loop', 'Same current', 'Common reference', 'Horizontal axis'],
    examinerTip: 'Examiners love this! Contrast it with parallel circuits, where VOLTAGE is common and chosen as the reference.'
  },
  {
    id: 2,
    question: 'What is electrical resonance, and what is the condition for it in a series R-L-C circuit?',
    hindiTranslation: 'Resonance kya hota hai aur series circuit mein iski condition kya hai?',
    answerEnglish: 'Resonance in a series R-L-C circuit is a specific operating condition where the inductive reactance exactly equals the capacitive reactance (X_L = X_C). As a result, the net reactive voltage (V_L - V_C) becomes zero, total impedance drops to its minimum possible value (Z = R), and current reaches its maximum value in phase with the supply voltage.',
    answerHinglish: 'Resonance wo condition hai jab inductive reactance aur capacitive reactance equal ho jaate hain (X_L = X_C). Isse net reactance zero ho jata hai, circuit purely resistive ban jata hai (Z = R), aur current maximum ho jata hai.',
    keyKeywords: ['X_L = X_C', 'Z_min = R', 'Net reactance = 0', 'Maximum current', 'Unity power factor'],
    examinerTip: 'Always mention that impedance is purely resistive (Z = R) and power factor is unity (cosφ = 1).'
  },
  {
    id: 3,
    question: 'Can the voltage across L or C be greater than the total supply voltage at resonance? What is this called?',
    hindiTranslation: 'Kya resonance par inductor ya capacitor ke across voltage supply voltage se bada ho sakta hai?',
    answerEnglish: 'Yes! At resonance, the circuit current is very high (I_max = V / R). Consequently, V_L = I_max × X_L and V_C = I_max × X_C can be significantly higher than the input supply voltage V. This phenomenon is called "Voltage Magnification" or "Q-factor magnification". Although V_L and V_C are individually huge, they are 180° out of phase and cancel each other out across the series combination.',
    answerHinglish: 'Haan bilkul! Resonance par current bohot high hota hai (I = V/R). Isliye V_L aur V_C supply voltage V se kai guna bade ho sakte hain. Isko "Voltage Magnification" kehte hain. Dono voltages 180 degree out of phase hote hain isliye externally cancel ho jaate hain.',
    keyKeywords: ['Voltage Magnification', 'Q-Factor', '180° out of phase', 'Series Acceptor Circuit'],
    examinerTip: 'This is why series R-L-C is also known as an "Acceptor Circuit" with voltage resonance.'
  },
  {
    id: 4,
    question: 'What is the memory mnemonic to remember phase relationships in L and C?',
    hindiTranslation: 'L aur C mein voltage aur current ke lead/lag ko yaad rakhne ki trick kya hai?',
    answerEnglish: 'The classic mnemonic is "ELI the ICE man" (or "CIVIL"): In an inductor (L), E (EMF/voltage) leads I (current) → E-L-I. In a capacitor (C), I (current) leads E (EMF/voltage) → I-C-E.',
    answerHinglish: 'Trick hai "ELI the ICE man". E-L-I ka matlab Inductor (L) mein E (voltage) pehle aata hai current (I) se. I-C-E ka matlab Capacitor (C) mein current (I) pehle aata hai voltage (E) se.',
    keyKeywords: ['ELI the ICE man', 'CIVIL', 'L: Voltage leads', 'C: Current leads'],
    examinerTip: 'Saying "ELI the ICE man" instantly proves you have clear conceptual clarity and quick recall.'
  },
  {
    id: 5,
    question: 'What happens to inductive reactance (X_L) and capacitive reactance (X_C) when frequency increases?',
    hindiTranslation: 'Frequency badhane par X_L aur X_C par kya asar padta hai?',
    answerEnglish: 'Inductive reactance X_L = 2πfL is directly proportional to frequency f, so it increases linearly. Capacitive reactance X_C = 1 / (2πfC) is inversely proportional to frequency, so it decreases asymptotically. At f = 0 (DC), X_L = 0 (short circuit) and X_C = ∞ (open circuit).',
    answerHinglish: 'X_L = 2πfL frequency ke directly proportional hai, to frequency badhane par X_L badhta hai. X_C = 1/(2πfC) frequency ke inversely proportional hai, to frequency badhane par X_C kam hota hai. DC (f=0) mein inductor short circuit aur capacitor open circuit hota hai.',
    keyKeywords: ['Directly proportional', 'Inversely proportional', 'DC block', 'Linear curve vs hyperbola'],
    examinerTip: 'Sketch the frequency response curves in your mind: X_L is a straight line through origin, X_C is a hyperbolic curve.'
  },
  {
    id: 6,
    question: 'What is the physical meaning of Power Factor (cos φ)?',
    hindiTranslation: 'Power Factor (cos φ) ka practical meaning kya hai?',
    answerEnglish: 'Power Factor is the ratio of Real (Active) Power P (in Watts) that does useful physical work to the Total Apparent Power S (in Volt-Amperes) supplied to the circuit: cosφ = P / S = R / Z. A low power factor means heavy reactive current is circulating without doing useful work, causing unnecessary I²R heat losses in transmission lines.',
    answerHinglish: 'Power Factor batata hai ki kitni total electrical energy actually useful work (heat, motion) mein convert ho rahi hai compared to total supply. Formula hai cosφ = R / Z. Pure resistor ka power factor 1.0 (unity) hota hai.',
    keyKeywords: ['cosφ = R / Z', 'Active power / Apparent power', 'Useful work', 'Unity at resonance'],
    examinerTip: 'Remember that power factor is always dimensionless and between 0 and 1.'
  },
  {
    id: 7,
    question: 'Why is Series R-L-C circuit called an "Acceptor Circuit"?',
    hindiTranslation: 'Series R-L-C circuit ko "Acceptor Circuit" kyu kaha jata hai?',
    answerEnglish: 'Because at the resonant frequency f_r, total impedance Z drops to its absolute minimum (Z = R). Therefore, it "accepts" or allows maximum current to pass through at that specific resonant frequency, while offering high impedance and rejecting signals at all other frequencies. This makes it ideal for radio tuners.',
    answerHinglish: 'Kyunki resonant frequency par circuit ka impedance sabse kam (minimum) ho jata hai, jisse wo us particular frequency ke signal ko maximum current ke saath pass (accept) hone deta hai aur doosri frequencies ko block kar deta hai.',
    keyKeywords: ['Accepts resonant frequency', 'Minimum impedance', 'Radio receiver tuning', 'Bandpass filter'],
    examinerTip: 'This contrasts with parallel RLC which has maximum impedance at resonance and is called a "Rejector circuit".'
  },
  {
    id: 8,
    question: 'What is the phase difference between V_L and V_C in a series R-L-C circuit?',
    hindiTranslation: 'V_L aur V_C ke beech kitna phase difference hota hai?',
    answerEnglish: 'The phase difference between V_L and V_C is exactly 180 degrees (π radians). V_L leads current by +90°, while V_C lags current by -90°. Therefore, (+90°) - (-90°) = 180°. They point in directly opposite directions on the phasor diagram and subtract directly.',
    answerHinglish: 'V_L aur V_C ke beech phase difference exact 180 degree hota hai. V_L current se +90 degree aage hota hai aur V_C current se -90 degree peeche. Isliye dono vector diagram mein opposite directions mein hote hain aur net voltage (V_L - V_C) hota hai.',
    keyKeywords: ['180 degrees', 'Opposite vectors', 'Direct cancellation', 'π radians'],
    examinerTip: 'State 180 degrees immediately without hesitation; this demonstrates vector clarity.'
  }
];
