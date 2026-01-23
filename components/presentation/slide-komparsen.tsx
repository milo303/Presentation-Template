"use client"

import { SlideTemplate } from "./slide-template"

interface SlideKomparsenProps {
  isActive: boolean
  skipAnimations?: boolean
}

export function SlideKomparsen({ isActive, skipAnimations }: SlideKomparsenProps) {
  return (
    <SlideTemplate
      isActive={isActive}
      skipAnimations={skipAnimations}
      mode="cinematic"
      backgroundVideo="/clips/Komparsen.mp4"
      contentClassName="hidden"
      contentWrapperClassName="pointer-events-none"
    >
      {null}
    </SlideTemplate>
  )
}
