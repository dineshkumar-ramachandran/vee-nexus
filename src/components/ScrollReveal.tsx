// Adapted from React Bits ScrollReveal (MIT + Commons Clause). Scoped cleanup and reduced motion added.
// https://github.com/DavidHDev/react-bits/tree/main/src/ts-default/TextAnimations/ScrollReveal
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);

export default function ScrollReveal({ text }: { text: string }) {
  const ref = useRef<HTMLParagraphElement>(null);
  useEffect(() => {
    const media = gsap.matchMedia();
    media.add('(min-width: 900px) and (prefers-reduced-motion: no-preference)', () => {
      const ctx = gsap.context(() => {
        gsap.fromTo('.word', { opacity: .72 }, {
          opacity: 1, stagger: .12, ease: 'none',
          scrollTrigger: { trigger: ref.current, start: 'top 85%', end: 'bottom 55%', scrub: true },
        });
      }, ref);
      return () => ctx.revert();
    });
    return () => media.revert();
  }, [text]);
  return <p ref={ref} className="scroll-reveal"><span className="sr-only">{text}</span>{text.split(/(\s+)/).map((word, index) => /^\s+$/.test(word) ? word : <span className="word" key={index} aria-hidden="true">{word}</span>)}</p>;
}

