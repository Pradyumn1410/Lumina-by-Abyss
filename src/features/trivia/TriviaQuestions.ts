export type Rarity = "Common" | "Rare" | "Epic" | "Legendary";

export interface TriviaQuestion {
    id: string;
    rarity: Rarity;
    question: string;
    options: string[];
    correctAnswerIndex: number;
    explanation: string;
}

export const TRIVIA_QUESTIONS: TriviaQuestion[] = [
    {
        id: "triv-1",
        rarity: "Common",
        question: "What is the deepest known location in Earth's oceans?",
        options: ["Puerto Rico Trench", "Mariana Trench", "Tonga Trench", "Java Trench"],
        correctAnswerIndex: 1,
        explanation: "The Mariana Trench contains the Challenger Deep, the deepest known point in the ocean, reaching nearly 11,000 meters below sea level."
    },
    {
        id: "triv-2",
        rarity: "Common",
        question: "Which of these marine animals is the largest known to have ever lived?",
        options: ["Megalodon", "Colossal Squid", "Blue Whale", "Whale Shark"],
        correctAnswerIndex: 2,
        explanation: "The Blue Whale is the largest known animal to have ever lived on Earth, reaching lengths of up to 100 feet and weighing upwards of 200 tons."
    },
    {
        id: "triv-3",
        rarity: "Rare",
        question: "What percentage of the Earth's surface is covered by oceans?",
        options: ["51%", "61%", "71%", "81%"],
        correctAnswerIndex: 2,
        explanation: "Oceans cover approximately 71% of the Earth's surface and contain 97% of the Earth's water."
    },
    {
        id: "triv-4",
        rarity: "Rare",
        question: "Which organism is primarily responsible for building coral reefs?",
        options: ["Sponges", "Polyps", "Algae", "Plankton"],
        correctAnswerIndex: 1,
        explanation: "Coral reefs are built by colonies of tiny animals called coral polyps. They secrete hard calcium carbonate exoskeletons which slowly build up the reef structure."
    },
    {
        id: "triv-5",
        rarity: "Epic",
        question: "What is the primary function of bioluminescence in deep-sea creatures?",
        options: ["Photosynthesis", "Regulating temperature", "Attracting prey or mates", "Digestive processes"],
        correctAnswerIndex: 2,
        explanation: "In the dark depths of the ocean, many creatures use bioluminescence to attract prey, find mates, or confuse predators."
    },
    {
        id: "triv-6",
        rarity: "Epic",
        question: "Which bivalve genus is most famous for producing high-quality pearls?",
        options: ["Pinctada", "Ostrea", "Tridacna", "Mytilus"],
        correctAnswerIndex: 0,
        explanation: "The genus Pinctada includes the pearl oysters, which are marine bivalve molluscs famously known for producing high-quality, commercially valuable pearls."
    },
    {
        id: "triv-7",
        rarity: "Legendary",
        question: "How much does the water pressure increase for every 10 meters you descend into the ocean?",
        options: ["0.5 atmosphere", "1 atmosphere", "2 atmospheres", "5 atmospheres"],
        correctAnswerIndex: 1,
        explanation: "For every 10 meters (33 feet) descended, pressure increases by 1 atmosphere (14.7 psi). In the deepest trenches, pressure exceeds 1,000 atmospheres."
    },
    {
        id: "triv-8",
        rarity: "Legendary",
        question: "What is the name of the oceanic zone where absolutely no sunlight reaches?",
        options: ["Epipelagic", "Mesopelagic", "Bathypelagic", "Abyssopelagic"],
        correctAnswerIndex: 3,
        explanation: "The Abyssopelagic zone (and the deeper Hadalpelagic zone) exists in total darkness. The Mesopelagic and Bathypelagic zones receive minimal 'twilight'."
    }
];
