'use client';

import { Suspense, useEffect } from 'react';
import { initiateLogin } from '@/lib/auth';

function LoginPage() {
  useEffect(() => {
    initiateLogin();
  }, []);

  return <div>Redirecting to login...</div>;
}

export default function Login() {
  return <Suspense fallback={<div>Loading...</div>}>
    <LoginPage />
  </Suspense>;
}
