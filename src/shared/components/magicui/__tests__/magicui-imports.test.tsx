/**
 * Basic import test for all MagicUI components
 * Tests that all components can be imported without errors
 */

import {
  // Existing components
  AnimatedBeam,
  AnimatedGradientText,
  AnimatedGridPattern,
  // Newly added components
  AnimatedList,
  AvatarCircles,
  BentoCard,
  BentoGrid,
  BlurFade,
  BorderBeam,
  BoxReveal,
  Confetti,
  Dock,
  DockIcon,
  Globe,
  MagicCard,
  Marquee,
  Meteors,
  NeonGradientCard,
  NumberTicker,
  OrbitingCircles,
  Particles,
  PulsatingButton,
  RainbowButton,
  Safari,
  ShimmerButton,
  ShinyButton,
  Terminal,
  TypingAnimation,
} from '../index';

describe('MagicUI Components Import Test', () => {
  test('all components should be importable', () => {
    // Test existing components
    expect(AnimatedBeam).toBeDefined();
    expect(AnimatedGradientText).toBeDefined();
    expect(AnimatedGridPattern).toBeDefined();
    expect(BlurFade).toBeDefined();
    expect(BorderBeam).toBeDefined();
    expect(BoxReveal).toBeDefined();
    expect(Dock).toBeDefined();
    expect(DockIcon).toBeDefined();
    expect(MagicCard).toBeDefined();
    expect(Marquee).toBeDefined();
    expect(Meteors).toBeDefined();
    expect(NeonGradientCard).toBeDefined();
    expect(NumberTicker).toBeDefined();
    expect(Particles).toBeDefined();
    expect(PulsatingButton).toBeDefined();
    expect(RainbowButton).toBeDefined();
    expect(ShimmerButton).toBeDefined();
    expect(ShinyButton).toBeDefined();
    expect(Terminal).toBeDefined();
    expect(TypingAnimation).toBeDefined();

    // Test newly added components
    expect(AnimatedList).toBeDefined();
    expect(AvatarCircles).toBeDefined();
    expect(BentoGrid).toBeDefined();
    expect(BentoCard).toBeDefined();
    expect(Confetti).toBeDefined();
    expect(Globe).toBeDefined();
    expect(OrbitingCircles).toBeDefined();
    expect(Safari).toBeDefined();
  });

  test('components should be functions or objects', () => {
    expect(typeof MagicCard).toBe('function');
    expect(typeof BorderBeam).toBe('function');
    expect(typeof AvatarCircles).toBe('function');
    expect(typeof BentoGrid).toBe('function');
    expect(typeof Safari).toBe('function');
  });
});
