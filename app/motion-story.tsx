'use client';

import { useEffect } from 'react';
import { initializeMotion } from '../site/motion';

export default function MotionStory() {
  useEffect(() => initializeMotion(), []);
  return null;
}
