export default function BrushFilters() {
  return (
    <svg style={{ position: 'absolute', width: 0, height: 0 }} aria-hidden="true">
      <defs>
        <filter id="rough-edges">
          {/* Turbulence to create the raw, irregular edges */}
          <feTurbulence 
            type="fractalNoise" 
            baseFrequency="0.04" 
            numOctaves="3" 
            result="noise" 
          />
          {/* Displace the text slightly based on the noise for the "bristle" look */}
          <feDisplacementMap 
            in="SourceGraphic" 
            in2="noise" 
            scale="4" 
            xChannelSelector="R" 
            yChannelSelector="G" 
          />
          {/* Subtle erosion to simulate dry brush ink flow */}
          <feMorphology operator="erode" radius="0.5" in="SourceGraphic" />
        </filter>
      </defs>
    </svg>
  );
}
