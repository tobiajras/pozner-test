'use client';

import { useScrollToTop } from '../hooks/useScrollToTop';

export const ScrollToTopProvider = () => {
  useScrollToTop({
    behavior: 'smooth',
    delay: 100,
    enabled: true,
  });

  return null;
};
