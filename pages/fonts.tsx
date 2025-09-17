import React from 'react';

const FontDemoPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-white text-gray-900 px-6 py-10">
      <div className="max-w-4xl mx-auto space-y-10">
        <header className="mb-8">
          <h1 className="text-3xl font-bold">Demo Font</h1>
          <p className="text-gray-600 mt-2">Contoh teks untuk setiap font yang digunakan di situs ini.</p>
        </header>


        {/* Vanilla Extract (sekarang Tailwind font-display) */}
        <section className="p-6 rounded-2xl shadow-soft border border-gray-100">
          <h2 className="text-xl font-semibold mb-2">Vanilla Extract (Display)</h2>
          <p className="text-sm text-gray-500 mb-4">Sumber: Google Fonts, dipakai untuk display via Tailwind font-display</p>
          <div className="text-lg font-display">
            The quick brown fox jumps over the lazy dog — 0123456789
          </div>
        </section>

        {/* Plus Jakarta Sans (Tailwind font-sans / body) */}
        <section className="p-6 rounded-2xl shadow-soft border border-gray-100">
          <h2 className="text-xl font-semibold mb-2">Plus Jakarta Sans (Body)</h2>
          <p className="text-sm text-gray-500 mb-4">Sumber: Google Fonts, dipetakan ke Tailwind font-sans</p>
          <div className="text-lg font-sans">
            The quick brown fox jumps over the lazy dog — 0123456789
          </div>
        </section>


        {/* Fredoka (untuk teks berganti-ganti) */}
        <section className="p-6 rounded-2xl shadow-soft border border-gray-100">
          <h2 className="text-xl font-semibold mb-2">Fredoka (Morphing Text)</h2>
          <p className="text-sm text-gray-500 mb-4">Sumber: Google Fonts, dipakai untuk teks berganti-ganti di HeroBanner</p>
          <div className="text-lg morphing-text-fredoka">
            The quick brown fox jumps over the lazy dog — 0123456789
          </div>
        </section>

        {/* JetBrains Mono (Tailwind font-mono) */}
        <section className="p-6 rounded-2xl shadow-soft border border-gray-100">
          <h2 className="text-xl font-semibold mb-2">JetBrains Mono</h2>
          <p className="text-sm text-gray-500 mb-4">Sumber: Google Fonts, dipetakan ke Tailwind font-mono</p>
          <div className="text-lg font-mono">
            The quick brown fox jumps over the lazy dog — 0123456789
          </div>
        </section>
      </div>
    </div>
  );
};

export default FontDemoPage;


