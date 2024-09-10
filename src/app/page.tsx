'use client';

import { useAuthState } from '@/hooks/useAuthState';
import LoginButton from '@/components/LoginButton';
import { Suspense } from 'react';

function HomeContent() {
  const { isAuthenticated, isLoading } = useAuthState();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex items-center justify-center min-h-screen">
      {isAuthenticated ? (
        <p>You are logged in. Go to <a href="/chat">Chat</a></p>
      ) : (
        <LoginButton />
      )}
    </div>
  );
}

export default function Home() {
  return <Suspense fallback={<div>Loading...</div>}>
    <HomeContent />
  </Suspense>;
}