import OceanBackgroundCanvas from "../components/ocean/OceanBackgroundCanvas";
import AtmosphericSpacer from "../components/decorative/AtmosphericSpacer";
import Hero from "../components/sections/Hero";
import About from "../components/sections/About";
import OceanJourney from "../components/sections/OceanJourney";
import Expeditions from "../components/sections/Expeditions";
import Gallery from "../components/sections/Gallery";
import Statistics from "../components/sections/Statistics";
import Testimonials from "../components/sections/Testimonials";
import FAQ from "../components/sections/FAQ";
import FinalCTA from "../components/sections/FinalCTA";
import Footer from "../components/layout/Footer";

import { TriviaProvider, Pinctada, PearlProgress, TRIVIA_QUESTIONS } from "../features/trivia";

export default function Home() {
    return (
        <TriviaProvider>
            <main className="relative z-1">
                <PearlProgress />
                {/* Dynamic 3D Ocean Background */}
                <OceanBackgroundCanvas />

                <div className="relative">
                    <Hero />
                    {/* No oysters in the surface/hero zone */}
                </div>

                <AtmosphericSpacer
                    depth="10m"
                    label="Epipelagic Threshold"
                    quote="The photic zone absorbs red wavelengths within the first few meters."
                />

                <div className="relative">
                    <About />
                    <Pinctada questionData={TRIVIA_QUESTIONS[0]} top="20%" right="4%" />
                    <Pinctada questionData={TRIVIA_QUESTIONS[1]} bottom="15%" left="3%" />
                </div>

                <AtmosphericSpacer
                    depth="200m"
                    label="Mesopelagic Boundary"
                    quote="Beyond 200 meters, sunlight turns into eternal cyan twilight."
                />

                <div className="relative">
                    <OceanJourney />
                    <Pinctada questionData={TRIVIA_QUESTIONS[2]} top="45%" right="6%" />
                </div>

                <AtmosphericSpacer
                    depth="1,000m"
                    label="Bathypelagic Extinction"
                    quote="The midnight zone begins. Hydrostatic pressure builds continuously."
                />

                <div className="relative">
                    <Expeditions />
                    <Pinctada questionData={TRIVIA_QUESTIONS[3]} top="35%" left="4%" />
                </div>

                <AtmosphericSpacer
                    depth="4,000m"
                    label="Abyssal Plain"
                    quote="A world of absolute dark, where temperatures hover just above freezing."
                />

                <div className="relative">
                    <Gallery />
                    <Pinctada questionData={TRIVIA_QUESTIONS[4]} top="20%" right="5%" />
                    <Pinctada questionData={TRIVIA_QUESTIONS[5]} bottom="25%" left="3%" />
                </div>

                <AtmosphericSpacer
                    depth="6,000m"
                    label="Hadal Trench Entrance"
                    quote="Entering Earth's deepest subduction trenches."
                />

                <div className="relative">
                    <Statistics />
                    <Pinctada questionData={TRIVIA_QUESTIONS[6]} top="40%" right="4%" />
                </div>
                
                <div className="relative">
                    <Testimonials />
                    <Pinctada questionData={TRIVIA_QUESTIONS[7]} top="50%" left="5%" />
                </div>
                
                <div className="relative">
                    <FAQ />
                </div>
                
                <FinalCTA />
                <Footer />
            </main>
        </TriviaProvider>
    );
}