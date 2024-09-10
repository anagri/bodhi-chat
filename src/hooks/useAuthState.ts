import { useState, useEffect } from 'react';
import { getStoredTokens } from '@/lib/auth';

export function useAuthState() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [accessToken, setAccessToken] = useState<string | null>(null);

  useEffect(() => {
    const tokens = getStoredTokens();
    if (tokens) {
      setIsAuthenticated(true);
      setAccessToken(tokens.accessToken);
    }
    setIsLoading(false);
  }, []);

  return { isAuthenticated, isLoading, accessToken };
}
