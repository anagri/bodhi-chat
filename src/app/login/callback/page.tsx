'use client';

import { Suspense, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { handleAuthCallback } from '@/lib/auth';
import ErrorDisplay from '@/components/ErrorDisplay';

function CallbackPage() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    handleAuthCallback()
      .then(() => router.push('/chat'))
      .catch((err) => setError(err.message));
  }, [router]);

  if (error) {
    return <ErrorDisplay error={error} />;
  }

  return <div>Processing login...</div>;
}

export default function Callback() {
  return <Suspense fallback={<div>Loading...</div>}>
    <CallbackPage />
  </Suspense>;
}
