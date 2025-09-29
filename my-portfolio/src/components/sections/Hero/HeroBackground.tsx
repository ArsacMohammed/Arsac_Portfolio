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
                    background: 'linear-gradient(to bottom, #e0e0e0 0%, #f8f8f8 0%, #ffffff 100%, #ffffff 80%)'
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

            {/* MetaBalls Animation - Only on Mobile */}
            {/* {window.innerWidth < 768 && (
                <div
                    className="absolute transform -translate-x-1/2 -translate-y-1/2 z-0 pointer-events-none"
                    style={{
                        top: '30%',
                        left: '50%',
                        width: '100%',
                        height: '350px',
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
            )} */}
        </>
    );
};

export default HeroBackground;