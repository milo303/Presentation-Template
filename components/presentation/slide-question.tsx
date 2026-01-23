"use client"

import { SlideTemplate, SlideHeading } from "./slide-template"

interface SlideQuestionProps {
  isActive: boolean
  skipAnimations?: boolean
}

export function SlideQuestion({ isActive, skipAnimations }: SlideQuestionProps) {
  return (
    <SlideTemplate
      isActive={isActive}
      skipAnimations={skipAnimations}
      alignment="center"
      mode="cinematic"
      className="bg-black"
    >
      <div className="flex h-full w-full items-center justify-center text-center">
        <SlideHeading
          isActive={isActive}
          skipAnimations={skipAnimations}
          className="text-[clamp(3.4rem,5vw+1.6rem,7rem)] font-semibold tracking-[0.04em]"
        >
          Warum Wildholz?
        </SlideHeading>
      </div>
    </SlideTemplate>
  )
}
