import { useState, useEffect } from 'react';
import Head from 'next/head';
import Hero from '@/components/Hero';
import MessageCard from '@/components/MessageCard';
import Confetti from '@/components/Confetti';
import { Toaster } from '@/lib/toast';

export default function Home() {
  const [isGiftOpened, setIsGiftOpened] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [date, setDate] = useState('');

  useEffect(() => {
    const formatted = new Date().toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
    setDate(formatted);
  }, []);

  const handleOpenGift = () => {
    setIsGiftOpened(true);
    setShowConfetti(true);
  };

  const handleConfettiComplete = () => {
    setShowConfetti(false);
  };

  const handleRestart = () => {
    setIsGiftOpened(false);
    setShowConfetti(false);
  };

  return (
    <>
      <Head>
        <title>Happy Valentine’s Day ❤️</title>
        <meta name="description" content="A special Valentine surprise made with love." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <main className="min-h-screen">
        {!isGiftOpened && (
          <Hero
            onOpenGift={handleOpenGift}
            isGiftOpened={isGiftOpened}
          />
        )}

        {isGiftOpened && (
          <MessageCard
            isRevealed={isGiftOpened}
            onRestart={handleRestart}
          />
        )}

        <Confetti
          trigger={showConfetti}
          onComplete={handleConfettiComplete}
        />

        <footer className="px-4 py-8 text-center text-text/60">
          <p className="text-sm">
            Happy Valentine’s Day — {date}
          </p>
          <p className="text-xs mt-2">Made with ❤️</p>
        </footer>
      </main>

      <Toaster
        position="bottom-center"
        toastOptions={{
          duration: 3000,
          style: {
            background: 'var(--primary)',
            color: 'var(--text)',
            borderRadius: '12px',
            padding: '12px 20px',
            fontSize: '14px',
          },
        }}
      />
    </>
  );
}
