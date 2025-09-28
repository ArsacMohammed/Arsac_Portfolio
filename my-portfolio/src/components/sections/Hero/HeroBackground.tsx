import React from 'react';

// Dynamic import for MetaBalls to reduce initial bundle size
const MetaBalls = React.lazy(() => import('./Metaballs'));

const HeroBackground: React.FC = () => {
    return (
        <>
            {/* Gradient Background */}
            <div
                className="absolute inset-0"
                style={{
                    background: 'linear-gradient(to bottom, #e0e0e0 0%, #f8f8f8 30%, #ffffff 50%, #ffffff 80%)'
                }}
            />

            {/* Black Ribbon Bar */}
            <div
                className="absolute left-0 right-0 transform -translate-y-1/2 bg-black z-0"
                style={{
                    // height: '152px', 
                    height: window.innerWidth < 768 ? '80px' : '152px',  // smaller on mobile
                    top: window.innerWidth < 768 ? '55%' : '80%'
                }}
            />

            {/* MetaBalls Animation */}
            <div
                className="absolute transform -translate-x-1/2 -translate-y-1/2 z-0 pointer-events-none"
                style={{
                    top: window.innerWidth < 768 ? '30%' : '50%',   // up on mobile
                    left: window.innerWidth < 768 ? '50%' : '75%', // more left on mobile
                    width: window.innerWidth < 768 ? '100%' : '1300px',
                    height: window.innerWidth < 768 ? '350px' : '700px',
                    maxWidth: '100vw'
                }}
            >

                <React.Suspense fallback={<div className="w-full h-full bg-transparent" />}>
                    <MetaBalls
                        color="#000000"
                        cursorBallColor="#000000"
                        cursorBallSize={1}
                        ballCount={10}
                        animationSize={15}
                        enableMouseInteraction={true}
                        enableTransparency={true}
                        hoverSmoothness={0.05}
                        clumpFactor={1}
                        speed={0.9}
                    />
                </React.Suspense>
            </div>
        </>
    );
};

export default HeroBackground;