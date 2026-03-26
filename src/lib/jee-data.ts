// JEE Mains Complete Syllabus and Questions Data

import { physicsQuestions } from './questions-physics'
import { chemistryQuestions } from './questions-chemistry'
import { mathematicsQuestions } from './questions-mathematics'
import { extendedPhysicsQuestions } from './questions-physics-extended'
import { physicsQuestionsPart2 } from './questions-physics-part2'
import { physicsQuestionsPart3 } from './questions-physics-part3'
import { chemistryQuestionsPart2 } from './questions-chemistry-part2'
import { chemistryQuestionsPart3 } from './questions-chemistry-part3'
import { mathematicsQuestionsPart2 } from './questions-mathematics-part2'

export interface Chapter {
  id: string;
  name: string;
  topics: string[];
}

export interface Subject {
  id: string;
  name: string;
  icon: string;
  color: string;
  chapters: Chapter[];
}

export interface Question {
  id: string;
  subjectId: string;
  chapterId: string;
  question: string;
  options: string[];
  correctAnswer: number; // index of correct option (0-3)
  difficulty: 'easy' | 'medium' | 'hard';
}

// Complete JEE Mains Syllabus
export const jeeSyllabus: Subject[] = [
  {
    id: 'physics',
    name: 'Physics',
    icon: '⚛️',
    color: 'bg-blue-500',
    chapters: [
      {
        id: 'physics-1',
        name: 'Units and Measurements',
        topics: ['Units of measurement', 'System of units', 'SI units', 'Errors in measurement', 'Significant figures', 'Dimensions of physical quantities', 'Dimensional analysis']
      },
      {
        id: 'physics-2',
        name: 'Kinematics',
        topics: ['Motion in straight line', 'Speed and velocity', 'Uniform and non-uniform motion', 'Average speed and velocity', 'Instantaneous velocity', 'Acceleration', 'Kinematic equations', 'Motion under gravity', 'Motion in two dimensions', 'Projectile motion', 'Relative velocity']
      },
      {
        id: 'physics-3',
        name: 'Laws of Motion',
        topics: ['Newton\'s first law', 'Newton\'s second law', 'Newton\'s third law', 'Momentum', 'Impulse', 'Friction', 'Types of friction', 'Dynamics of uniform circular motion']
      },
      {
        id: 'physics-4',
        name: 'Work, Energy and Power',
        topics: ['Work done by force', 'Kinetic energy', 'Potential energy', 'Work-energy theorem', 'Conservation of mechanical energy', 'Power', 'Collisions', 'Elastic and inelastic collisions']
      },
      {
        id: 'physics-5',
        name: 'Rotational Motion',
        topics: ['Centre of mass', 'Rotational motion', 'Torque', 'Angular momentum', 'Moment of inertia', 'Rolling motion', 'Conservation of angular momentum']
      },
      {
        id: 'physics-6',
        name: 'Gravitation',
        topics: ['Universal law of gravitation', 'Gravitational field', 'Gravitational potential', 'Escape velocity', 'Orbital velocity', 'Kepler\'s laws', 'Geostationary satellites']
      },
      {
        id: 'physics-7',
        name: 'Properties of Solids and Liquids',
        topics: ['Elastic behaviour', 'Stress and strain', 'Hooke\'s law', 'Young\'s modulus', 'Bulk modulus', 'Shear modulus', 'Pressure', 'Pascal\'s law', 'Buoyancy', 'Surface tension', 'Viscosity', 'Bernoulli\'s theorem']
      },
      {
        id: 'physics-8',
        name: 'Thermodynamics',
        topics: ['Thermal equilibrium', 'Zeroth law', 'Heat and temperature', 'First law of thermodynamics', 'Thermodynamic processes', 'Second law of thermodynamics', 'Carnot engine', 'Entropy']
      },
      {
        id: 'physics-9',
        name: 'Kinetic Theory of Gases',
        topics: ['Ideal gas equation', 'Kinetic theory assumptions', 'Root mean square speed', 'Degrees of freedom', 'Law of equipartition of energy', 'Specific heat capacity']
      },
      {
        id: 'physics-10',
        name: 'Oscillations and Waves',
        topics: ['Simple harmonic motion', 'Oscillations of spring', 'Pendulum', 'Damped oscillations', 'Resonance', 'Wave motion', 'Transverse and longitudinal waves', 'Sound waves', 'Doppler effect']
      },
      {
        id: 'physics-11',
        name: 'Electrostatics',
        topics: ['Electric charges', 'Coulomb\'s law', 'Electric field', 'Electric potential', 'Gauss\'s theorem', 'Capacitance', 'Parallel plate capacitor', 'Van de Graaff generator']
      },
      {
        id: 'physics-12',
        name: 'Current Electricity',
        topics: ['Electric current', 'Ohm\'s law', 'Drift velocity', 'Resistance', 'Resistivity', 'Series and parallel combinations', 'Kirchhoff\'s laws', 'Wheatstone bridge', 'Potentiometer']
      },
      {
        id: 'physics-13',
        name: 'Magnetic Effects of Current',
        topics: ['Biot-Savart law', 'Ampere\'s law', 'Magnetic field due to current', 'Force on current carrying conductor', 'Torque on current loop', 'Moving coil galvanometer', 'Ammeter and voltmeter']
      },
      {
        id: 'physics-14',
        name: 'Magnetism and Matter',
        topics: ['Earth\'s magnetism', 'Magnetic elements', 'Bar magnet', 'Magnetic field lines', 'Para, dia and ferromagnetic materials', 'Hysteresis', 'Permanent magnets']
      },
      {
        id: 'physics-15',
        name: 'Electromagnetic Induction',
        topics: ['Faraday\'s law', 'Lenz\'s law', 'Induced EMF', 'Self induction', 'Mutual induction', 'AC generator', 'Transformer', 'Eddy currents']
      },
      {
        id: 'physics-16',
        name: 'Alternating Current',
        topics: ['AC voltage and current', 'Peak and RMS values', 'Reactance and impedance', 'LCR circuits', 'Resonance', 'Power in AC circuits', 'AC generator', 'Wattless current']
      },
      {
        id: 'physics-17',
        name: 'Electromagnetic Waves',
        topics: ['Displacement current', 'Electromagnetic waves properties', 'Electromagnetic spectrum', 'Uses of electromagnetic waves']
      },
      {
        id: 'physics-18',
        name: 'Ray Optics',
        topics: ['Reflection of light', 'Mirrors', 'Refraction of light', 'Lenses', 'Prism', 'Total internal reflection', 'Optical instruments', 'Human eye', 'Defects of vision']
      },
      {
        id: 'physics-19',
        name: 'Wave Optics',
        topics: ['Huygens principle', 'Interference', 'Young\'s double slit experiment', 'Diffraction', 'Polarization', 'Resolving power']
      },
      {
        id: 'physics-20',
        name: 'Dual Nature of Matter',
        topics: ['Photoelectric effect', 'Einstein\'s equation', 'de Broglie wavelength', 'Davisson-Germer experiment', 'Matter waves']
      },
      {
        id: 'physics-21',
        name: 'Atoms and Nuclei',
        topics: ['Atomic models', 'Bohr model', 'Hydrogen spectrum', 'Nucleus', 'Atomic mass', 'Mass defect', 'Binding energy', 'Nuclear fission', 'Nuclear fusion', 'Radioactivity']
      },
      {
        id: 'physics-22',
        name: 'Semiconductor Electronics',
        topics: ['Semiconductors', 'P-type and N-type', 'P-N junction', 'Diodes', 'Rectifiers', 'Transistors', 'Logic gates', 'Boolean algebra']
      }
    ]
  },
  {
    id: 'chemistry',
    name: 'Chemistry',
    icon: '🧪',
    color: 'bg-green-500',
    chapters: [
      {
        id: 'chemistry-1',
        name: 'Some Basic Concepts in Chemistry',
        topics: ['Matter', 'Atomic and molecular masses', 'Mole concept', 'Chemical reactions', 'Stoichiometry', 'Laws of chemical combination']
      },
      {
        id: 'chemistry-2',
        name: 'Atomic Structure',
        topics: ['Atomic models', 'Bohr model', 'Quantum mechanical model', 'Quantum numbers', 'Orbitals', 'Electronic configuration', 'Aufbau principle', 'Hund\'s rule', 'Pauli exclusion principle']
      },
      {
        id: 'chemistry-3',
        name: 'Chemical Bonding',
        topics: ['Ionic bond', 'Covalent bond', 'Coordinate bond', 'VSEPR theory', 'Hybridization', 'Molecular orbital theory', 'Hydrogen bonding', 'Bond parameters']
      },
      {
        id: 'chemistry-4',
        name: 'States of Matter',
        topics: ['Gaseous state', 'Gas laws', 'Ideal gas equation', 'Kinetic theory', 'Real gases', 'Liquid state', 'Solid state', 'Types of solids', 'Crystal lattice', 'Unit cell']
      },
      {
        id: 'chemistry-5',
        name: 'Thermodynamics',
        topics: ['System and surroundings', 'Internal energy', 'Enthalpy', 'First law', 'Hess\'s law', 'Spontaneous processes', 'Entropy', 'Gibbs energy', 'Standard enthalpy changes']
      },
      {
        id: 'chemistry-6',
        name: 'Chemical Equilibrium',
        topics: ['Equilibrium constant', 'Law of mass action', 'Le Chatelier\'s principle', 'Homogeneous equilibrium', 'Heterogeneous equilibrium', 'Ionic equilibrium', 'pH scale', 'Buffer solutions', 'Solubility product']
      },
      {
        id: 'chemistry-7',
        name: 'Redox Reactions',
        topics: ['Oxidation and reduction', 'Oxidation number', 'Balancing redox reactions', 'Electrochemical cells', 'Nernst equation', 'Electrode potential']
      },
      {
        id: 'chemistry-8',
        name: 'Electrochemistry',
        topics: ['Conductance', 'Kohlrausch\'s law', 'Electrolytic cells', 'Galvanic cells', 'Nernst equation', 'Electrode potential', 'Batteries', 'Corrosion']
      },
      {
        id: 'chemistry-9',
        name: 'Chemical Kinetics',
        topics: ['Rate of reaction', 'Rate law', 'Order of reaction', 'Molecularity', 'Integrated rate equations', 'Half-life', 'Arrhenius equation', 'Collision theory']
      },
      {
        id: 'chemistry-10',
        name: 'Surface Chemistry',
        topics: ['Adsorption', 'Colloids', 'Emulsions', 'Catalysis', 'Enzymes', 'Applications of colloids']
      },
      {
        id: 'chemistry-11',
        name: 'Classification of Elements',
        topics: ['Modern periodic table', 'Periodic properties', 'Atomic radius', 'Ionization energy', 'Electron affinity', 'Electronegativity', 'Metallic character']
      },
      {
        id: 'chemistry-12',
        name: 's-Block Elements',
        topics: ['Alkali metals', 'Alkaline earth metals', 'Properties', 'Compounds', 'Biological importance', 'Industrial uses']
      },
      {
        id: 'chemistry-13',
        name: 'p-Block Elements',
        topics: ['Group 13 elements', 'Group 14 elements', 'Group 15 elements', 'Group 16 elements', 'Group 17 elements', 'Group 18 elements', 'Properties and compounds']
      },
      {
        id: 'chemistry-14',
        name: 'd-Block and f-Block Elements',
        topics: ['Transition metals', 'Properties', 'Lanthanides', 'Actinides', 'Coordination compounds', 'Werner\'s theory', 'Crystal field theory']
      },
      {
        id: 'chemistry-15',
        name: 'Coordination Compounds',
        topics: ['Nomenclature', 'Isomerism', 'Werner\'s theory', 'Valence bond theory', 'Crystal field theory', 'Magnetic properties', 'Colour of complexes']
      },
      {
        id: 'chemistry-16',
        name: 'Environmental Chemistry',
        topics: ['Air pollution', 'Water pollution', 'Soil pollution', 'Greenhouse effect', 'Ozone depletion', 'Acid rain', 'Strategies for control']
      },
      {
        id: 'chemistry-17',
        name: 'Purification and Characterization',
        topics: ['Purification methods', 'Qualitative analysis', 'Quantitative analysis', 'Molecular formula', 'Empirical formula']
      },
      {
        id: 'chemistry-18',
        name: 'Hydrocarbons',
        topics: ['Alkanes', 'Alkenes', 'Alkynes', 'Aromatic hydrocarbons', 'Isomerism', 'Reactions', 'Mechanisms']
      },
      {
        id: 'chemistry-19',
        name: 'Organic Compounds - Halides',
        topics: ['Alkyl halides', 'Aryl halides', 'SN1 and SN2 reactions', 'Preparation methods', 'Physical and chemical properties']
      },
      {
        id: 'chemistry-20',
        name: 'Organic Compounds - Oxygen',
        topics: ['Alcohols', 'Phenols', 'Ethers', 'Aldehydes', 'Ketones', 'Carboxylic acids', 'Preparation and reactions']
      },
      {
        id: 'chemistry-21',
        name: 'Organic Compounds - Nitrogen',
        topics: ['Amines', 'Diazonium salts', 'Nitro compounds', 'Preparation and properties']
      },
      {
        id: 'chemistry-22',
        name: 'Biomolecules',
        topics: ['Carbohydrates', 'Proteins', 'Vitamins', 'Nucleic acids', 'DNA and RNA', 'Enzymes']
      },
      {
        id: 'chemistry-23',
        name: 'Polymers',
        topics: ['Classification', 'Polymerization', 'Rubber', 'Plastics', 'Fibres', 'Biodegradable polymers']
      },
      {
        id: 'chemistry-24',
        name: 'Chemistry in Everyday Life',
        topics: ['Drugs and medicines', 'Chemicals in food', 'Cleansing agents', 'Artificial sweeteners', 'Antioxidants']
      }
    ]
  },
  {
    id: 'mathematics',
    name: 'Mathematics',
    icon: '📐',
    color: 'bg-purple-500',
    chapters: [
      {
        id: 'math-1',
        name: 'Sets, Relations and Functions',
        topics: ['Sets', 'Subsets', 'Power set', 'Relations', 'Types of relations', 'Functions', 'Types of functions', 'Composite functions', 'Inverse functions']
      },
      {
        id: 'math-2',
        name: 'Complex Numbers',
        topics: ['Complex numbers', 'Algebra of complex numbers', 'Modulus and argument', 'Conjugate', 'Polar form', 'De Moivre\'s theorem', 'Roots of unity']
      },
      {
        id: 'math-3',
        name: 'Matrices and Determinants',
        topics: ['Types of matrices', 'Matrix operations', 'Transpose', 'Inverse', 'Determinants', 'Properties of determinants', 'Adjoint', 'Cramer\'s rule', 'System of linear equations']
      },
      {
        id: 'math-4',
        name: 'Quadratic Equations',
        topics: ['Quadratic equations', 'Roots', 'Discriminant', 'Nature of roots', 'Relation between roots and coefficients', 'Formation of equations', 'Quadratic inequalities']
      },
      {
        id: 'math-5',
        name: 'Sequences and Series',
        topics: ['Arithmetic progression', 'Geometric progression', 'Arithmetic mean', 'Geometric mean', 'Sum of series', 'Special series', 'Arithmetic-geometric progression']
      },
      {
        id: 'math-6',
        name: 'Binomial Theorem',
        topics: ['Binomial theorem for positive index', 'General term', 'Middle term', 'Binomial coefficients', 'Binomial theorem for any index', 'Applications']
      },
      {
        id: 'math-7',
        name: 'Permutations and Combinations',
        topics: ['Fundamental principle of counting', 'Permutations', 'Combinations', 'Applications', 'Circular permutations', 'Division into groups']
      },
      {
        id: 'math-8',
        name: 'Mathematical Induction',
        topics: ['Principle of mathematical induction', 'Applications', 'Problems based on induction']
      },
      {
        id: 'math-9',
        name: 'Limit, Continuity and Differentiability',
        topics: ['Limits', 'Properties of limits', 'Continuity', 'Differentiability', 'Relation between continuity and differentiability', 'Derivatives', 'Chain rule']
      },
      {
        id: 'math-10',
        name: 'Integral Calculus',
        topics: ['Indefinite integrals', 'Definite integrals', 'Integration techniques', 'Substitution', 'By parts', 'Partial fractions', 'Properties of definite integrals']
      },
      {
        id: 'math-11',
        name: 'Application of Derivatives',
        topics: ['Rate of change', 'Increasing and decreasing functions', 'Maxima and minima', 'Tangents and normals', 'Approximation', 'Mean value theorem']
      },
      {
        id: 'math-12',
        name: 'Application of Integrals',
        topics: ['Area under curves', 'Area between two curves', 'Area bounded by curves']
      },
      {
        id: 'math-13',
        name: 'Differential Equations',
        topics: ['Order and degree', 'Formation of differential equations', 'Solution methods', 'Variable separable', 'Homogeneous', 'Linear differential equations']
      },
      {
        id: 'math-14',
        name: 'Coordinate Geometry - Straight Lines',
        topics: ['Distance formula', 'Section formula', 'Slope', 'Equation of line', 'Angle between lines', 'Distance of point from line', 'Family of lines']
      },
      {
        id: 'math-15',
        name: 'Coordinate Geometry - Circles',
        topics: ['Equation of circle', 'Standard form', 'General form', 'Parametric form', 'Tangent and normal', 'Chord', 'Family of circles']
      },
      {
        id: 'math-16',
        name: 'Coordinate Geometry - Parabola',
        topics: ['Standard equation', 'Parametric form', 'Focus', 'Directrix', 'Tangent and normal', 'Chord', 'Properties']
      },
      {
        id: 'math-17',
        name: 'Coordinate Geometry - Ellipse',
        topics: ['Standard equation', 'Parametric form', 'Focus', 'Directrix', 'Tangent and normal', 'Chord', 'Eccentricity']
      },
      {
        id: 'math-18',
        name: 'Coordinate Geometry - Hyperbola',
        topics: ['Standard equation', 'Parametric form', 'Asymptotes', 'Tangent and normal', 'Rectangular hyperbola']
      },
      {
        id: 'math-19',
        name: 'Vector Algebra',
        topics: ['Vectors', 'Types of vectors', 'Vector operations', 'Scalar product', 'Vector product', 'Triple products', 'Applications']
      },
      {
        id: 'math-20',
        name: 'Three Dimensional Geometry',
        topics: ['Direction cosines', 'Direction ratios', 'Equation of line', 'Equation of plane', 'Angle between lines', 'Angle between planes', 'Distance formula', 'Intersection']
      },
      {
        id: 'math-21',
        name: 'Probability',
        topics: ['Probability concepts', 'Conditional probability', 'Multiplication theorem', 'Bayes\' theorem', 'Probability distribution', 'Binomial distribution', 'Random variables']
      },
      {
        id: 'math-22',
        name: 'Trigonometric Functions',
        topics: ['Trigonometric ratios', 'Trigonometric identities', 'Compound angles', 'Multiple angles', 'Sub-multiple angles', 'Conditional identities']
      },
      {
        id: 'math-23',
        name: 'Trigonometric Equations',
        topics: ['General solutions', 'Principal solutions', 'Methods of solving', 'Inverse trigonometric functions', 'Properties']
      },
      {
        id: 'math-24',
        name: 'Statistics',
        topics: ['Measures of central tendency', 'Mean', 'Median', 'Mode', 'Variance', 'Standard deviation', 'Coefficient of variation']
      }
    ]
  }
];

// All Questions combined from subject-specific files
// Plus additional sample questions
const baseQuestions: Question[] = [
  // Physics Questions
  {
    id: 'p-base-1',
    subjectId: 'physics',
    chapterId: 'physics-11',
    question: 'Two point charges +q and +4q are separated by a distance l. The point where the electric field is zero is at a distance:',
    options: ['l/3 from +q', 'l/3 from +4q', 'l/2 from +q', '2l/3 from +q'],
    correctAnswer: 0,
    difficulty: 'medium'
  },
  {
    id: 'p-base-2',
    subjectId: 'physics',
    chapterId: 'physics-12',
    question: 'A wire of resistance 4 Ω is stretched to twice its original length. The new resistance is:',
    options: ['16 Ω', '4 Ω', '8 Ω', '2 Ω'],
    correctAnswer: 0,
    difficulty: 'easy'
  },
  {
    id: 'p-base-3',
    subjectId: 'physics',
    chapterId: 'physics-18',
    question: 'The power of a lens is -2D. Its focal length is:',
    options: ['-50 cm', '+50 cm', '+20 cm', '-20 cm'],
    correctAnswer: 0,
    difficulty: 'easy'
  },
  {
    id: 'p-base-4',
    subjectId: 'physics',
    chapterId: 'physics-20',
    question: 'The work function of a metal is 4 eV. For photoelectric emission, the minimum frequency of incident radiation is:',
    options: ['0.97 × 10¹⁵ Hz', '10¹⁵ Hz', '2 × 10¹⁵ Hz', '4 × 10¹⁵ Hz'],
    correctAnswer: 0,
    difficulty: 'medium'
  },
  
  // Chemistry Questions
  {
    id: 'c-base-1',
    subjectId: 'chemistry',
    chapterId: 'chemistry-5',
    question: 'For the reaction N₂ + 3H₂ → 2NH₃, ΔH = -92 kJ. The enthalpy change when 2 moles of NH₃ are formed is:',
    options: ['-92 kJ', '+92 kJ', '-184 kJ', '+184 kJ'],
    correctAnswer: 0,
    difficulty: 'medium'
  },
  {
    id: 'c-base-2',
    subjectId: 'chemistry',
    chapterId: 'chemistry-6',
    question: 'The pH of 0.001 M HCl solution is:',
    options: ['3', '1', '2', '4'],
    correctAnswer: 0,
    difficulty: 'easy'
  },
  {
    id: 'c-base-3',
    subjectId: 'chemistry',
    chapterId: 'chemistry-7',
    question: 'The oxidation number of Mn in KMnO₄ is:',
    options: ['+7', '+4', '+5', '+6'],
    correctAnswer: 0,
    difficulty: 'easy'
  },
  {
    id: 'c-base-4',
    subjectId: 'chemistry',
    chapterId: 'chemistry-9',
    question: 'The rate constant of a reaction doubles when temperature increases from 27°C to 37°C. The activation energy is approximately:',
    options: ['53.6 kJ/mol', '26.8 kJ/mol', '107.2 kJ/mol', '5.36 kJ/mol'],
    correctAnswer: 0,
    difficulty: 'hard'
  },
  {
    id: 'c-base-5',
    subjectId: 'chemistry',
    chapterId: 'chemistry-11',
    question: 'Which of the following has the highest first ionization energy?',
    options: ['Mg', 'Na', 'Al', 'Si'],
    correctAnswer: 0,
    difficulty: 'medium'
  },
  {
    id: 'c-base-6',
    subjectId: 'chemistry',
    chapterId: 'chemistry-18',
    question: 'Markovnikov\'s rule is applicable to:',
    options: ['Addition of HBr to propene', 'Addition of Br₂ to ethene', 'Substitution reaction of methane', 'Combustion of hydrocarbons'],
    correctAnswer: 0,
    difficulty: 'medium'
  },
  {
    id: 'c-base-7',
    subjectId: 'chemistry',
    chapterId: 'chemistry-20',
    question: 'Which of the following gives iodoform test?',
    options: ['Ethanol', 'Methanol', 'Propanol', 'Phenol'],
    correctAnswer: 0,
    difficulty: 'easy'
  },
  {
    id: 'c-base-8',
    subjectId: 'chemistry',
    chapterId: 'chemistry-22',
    question: 'Which of the following is a disaccharide?',
    options: ['Sucrose', 'Glucose', 'Fructose', 'Starch'],
    correctAnswer: 0,
    difficulty: 'easy'
  },
  
  // Mathematics Questions
  {
    id: 'm-base-1',
    subjectId: 'mathematics',
    chapterId: 'math-6',
    question: 'The middle term in the expansion of (x + y)⁸ is:',
    options: ['Both 4th and 5th terms', '5th term', '4th term', '6th term'],
    correctAnswer: 0,
    difficulty: 'medium'
  },
  {
    id: 'm-base-2',
    subjectId: 'mathematics',
    chapterId: 'math-7',
    question: 'The value of ⁸P₂ is:',
    options: ['56', '28', '64', '48'],
    correctAnswer: 0,
    difficulty: 'easy'
  },
  {
    id: 'm-base-3',
    subjectId: 'mathematics',
    chapterId: 'math-9',
    question: 'The derivative of sin(x²) with respect to x is:',
    options: ['2x cos(x²)', 'cos(x²)', 'x cos(x²)', '2cos(x²)'],
    correctAnswer: 0,
    difficulty: 'medium'
  },
  {
    id: 'm-base-4',
    subjectId: 'mathematics',
    chapterId: 'math-10',
    question: '∫1/x dx equals:',
    options: ['ln|x| + C', 'x⁻²/-2 + C', 'x²/2 + C', '1/x² + C'],
    correctAnswer: 0,
    difficulty: 'easy'
  },
  {
    id: 'm-base-5',
    subjectId: 'mathematics',
    chapterId: 'math-11',
    question: 'The maximum value of f(x) = x³ - 6x² + 9x + 15 in [0, 5] is:',
    options: ['21', '15', '19', '25'],
    correctAnswer: 0,
    difficulty: 'hard'
  },
  {
    id: 'm-base-6',
    subjectId: 'mathematics',
    chapterId: 'math-14',
    question: 'The slope of the line 3x + 4y = 12 is:',
    options: ['-3/4', '3/4', '4/3', '-4/3'],
    correctAnswer: 0,
    difficulty: 'easy'
  },
  {
    id: 'm-base-7',
    subjectId: 'mathematics',
    chapterId: 'math-15',
    question: 'The equation of a circle with center at origin and radius 5 is:',
    options: ['x² + y² = 25', 'x² + y² = 5', 'x² - y² = 25', '(x-5)² + (y-5)² = 0'],
    correctAnswer: 0,
    difficulty: 'easy'
  },
  {
    id: 'm-base-8',
    subjectId: 'mathematics',
    chapterId: 'math-19',
    question: 'If |a⃗| = 3, |b⃗| = 4 and a⃗ · b⃗ = 0, then |a⃗ × b⃗| is:',
    options: ['12', '0', '7', '5'],
    correctAnswer: 0,
    difficulty: 'medium'
  },
  {
    id: 'm-base-9',
    subjectId: 'mathematics',
    chapterId: 'math-21',
    question: 'If P(A) = 0.4, P(B) = 0.5 and P(A∩B) = 0.2, then P(A∪B) is:',
    options: ['0.7', '0.9', '0.3', '0.5'],
    correctAnswer: 0,
    difficulty: 'easy'
  },
  {
    id: 'm-base-10',
    subjectId: 'mathematics',
    chapterId: 'math-22',
    question: 'The value of sin²30° + cos²60° is:',
    options: ['3/4', '1/2', '1/4', '1'],
    correctAnswer: 0,
    difficulty: 'easy'
  },
];

// Combine all questions
export const questions: Question[] = [
  ...physicsQuestions,
  ...extendedPhysicsQuestions,
  ...physicsQuestionsPart2,
  ...physicsQuestionsPart3,
  ...chemistryQuestions,
  ...chemistryQuestionsPart2,
  ...chemistryQuestionsPart3,
  ...mathematicsQuestions,
  ...mathematicsQuestionsPart2,
  ...baseQuestions
];

// Get questions by chapter
export function getQuestionsByChapter(chapterId: string): Question[] {
  return questions.filter(q => q.chapterId === chapterId);
}

// Get questions by subject
export function getQuestionsBySubject(subjectId: string): Question[] {
  return questions.filter(q => q.subjectId === subjectId);
}

// Get chapter by ID
export function getChapterById(chapterId: string): Chapter | undefined {
  for (const subject of jeeSyllabus) {
    const chapter = subject.chapters.find(c => c.id === chapterId);
    if (chapter) return chapter;
  }
  return undefined;
}

// Get subject by ID
export function getSubjectById(subjectId: string): Subject | undefined {
  return jeeSyllabus.find(s => s.id === subjectId);
}

// Get full test questions (random selection from all subjects)
export function getFullTestQuestions(countPerSubject: number = 10): Question[] {
  const result: Question[] = [];
  
  for (const subject of jeeSyllabus) {
    const subjectQuestions = getQuestionsBySubject(subject.id);
    const shuffled = [...subjectQuestions].sort(() => Math.random() - 0.5);
    result.push(...shuffled.slice(0, countPerSubject));
  }
  
  return result;
}

// Get topic-wise test questions
export function getTopicTestQuestions(chapterId: string): Question[] {
  return getQuestionsByChapter(chapterId);
}
