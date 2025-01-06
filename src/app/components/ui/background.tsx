import React from "react";

export function Background() {
  return (
    <div className="h-[30rem] w-full bg-black relative">
      <div className="absolute inset-0 bg-grid-small-white/[0.2]" />
      <div className="absolute inset-0 bg-dot-white/[0.2]" />
      {/* Radial gradient for the container to give a faded look */}
      <div className="absolute pointer-events-none inset-0 flex items-center justify-center [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]" />
    </div>
  );
}

export default Background;