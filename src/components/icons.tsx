import type { SVGProps } from 'react';

export function Logo(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 100 120"
      {...props}
    >
      <g fill="none" strokeWidth="1.5">
        {/* Horses */}
        <path fill="#FFF" stroke="#333" d="M15 50 C 5 70, 25 100, 30 110 L 40 110 C 40 100, 30 70, 25 50" />
        <path fill="#FFF" stroke="#333" d="M85 50 C 95 70, 75 100, 70 110 L 60 110 C 60 100, 70 70, 75 50" />
        
        {/* Shield */}
        <path fill="#000" stroke="#000" d="M30 45 C 30 35, 70 35, 70 45 L 70 85 C 70 95, 50 105, 50 105 C 50 105, 30 95, 30 85 Z" />
        
        {/* Wavy Y */}
        <path stroke="#FFF" strokeWidth="3" d="M50 48 L 50 65 M50 65 C 40 75, 40 85, 42 95 M50 65 C 60 75, 60 85, 58 95" />
        
        {/* Wreath */}
        <path fill="#FFF" d="M 35 40 A 15 15 0 0 1 65 40" />
        <path fill="#3E8635" d="M 40 38 A 10 10 0 0 1 60 38" />
        
        {/* Eagle */}
        <g fill="#A52A2A">
            <path d="M50 10 C 40 20, 60 20, 50 10 Z" />
            <path d="M50 15 L 45 35 L 55 35 Z" /> 
            <path d="M45 25 C 35 20, 35 30, 45 35" />
            <path d="M55 25 C 65 20, 65 30, 55 35" />
        </g>
        
        {/* Ground and Flowers */}
        <path fill="#3E8635" d="M 10 110 C 20 105, 80 105, 90 110 L 90 120 L 10 120 Z" />
        <g fill="#FFD700">
            <circle cx="25" cy="115" r="2" />
            <circle cx="35" cy="113" r="2" />
            <circle cx="45" cy="115" r="2" />
            <circle cx="55" cy="113" r="2" />
            <circle cx="65" cy="115" r="2" />
            <circle cx="75" cy="113" r="2" />
        </g>
      </g>
    </svg>
  );
}
