'use client';

import { useAuthState } from '@/hooks/useAuthState';
import { decodeToken } from '@/lib/auth';
import { Suspense } from 'react';

function ChatPage() {
  const { isAuthenticated, accessToken } = useAuthState();

  if (!isAuthenticated) {
    return <div>Please log in to access the chat.</div>;
  }

  const { email } = decodeToken(accessToken!);

  return (
    <div>
      <h1>Chat Page</h1>
      <p>Welcome, {email}!</p>
    </div>
  );
}

export default function Chat() {
  return <Suspense fallback={<div>Loading...</div>}>
    <ChatPage />
  </Suspense>;
}