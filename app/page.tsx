import z from 'zod';
import Link from 'next/link';
import { cache } from 'react';

export const revalidate = 0;

const uuid = cache(async (ts?: number) => {
  const response = await fetch('https://uuid-cf-test.liammartens.workers.dev/', {
    method: 'POST',
    cache: ts ? 'no-cache' : 'default',
  })
    .then((x) => x.json());
  const result = z.array(z.string()).safeParse(response);
  return result.success ? result.data : [];
});

export default async function Home() {
  const value = await uuid();
  const value1 = await uuid(Date.now());

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div>
        <Link href="/">Homepage</Link>
        <Link href="/page-1">Page 1</Link>
        <Link href="/page-2">Page 2</Link>
        UUID: {value[0]} {value1[0]}
      </div>
    </main>
  )
}
