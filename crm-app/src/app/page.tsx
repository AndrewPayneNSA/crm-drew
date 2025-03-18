'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthContext } from '@/contexts/AuthContext';
import { auth } from '@/lib/firebase';

export default function Home() {
  const router = useRouter();
  const { user, loading } = useAuthContext();
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    // Wait for Firebase Auth to initialize
    const unsubscribe = auth.onAuthStateChanged(() => {
      setIsInitialized(true);
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (isInitialized && !loading) {
      if (user) {
        router.replace('/dashboard');
      } else {
        router.replace('/login');
      }
    }
  }, [user, loading, router, isInitialized]);

  // Show loading state while checking auth
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500 mx-auto mb-4"></div>
        <p className="text-gray-600">Loading...</p>
      </div>
    </div>
  );
}
