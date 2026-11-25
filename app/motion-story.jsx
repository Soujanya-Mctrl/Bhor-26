'use client';

import { useEffect } from 'react';
import { initializeMotion } from '../site/motion.js';

export default function MotionStory() {
  useEffect(() => initializeMotion(), []);
  return null;
}
