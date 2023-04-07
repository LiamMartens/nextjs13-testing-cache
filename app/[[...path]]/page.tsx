import Link from 'next/link';
import equal from 'fast-deep-equal';
import { notFound } from 'next/navigation';

type Params = {
  path: string[]
}

const allParams =  [
  { path: [] }, // i18n.defaultLocale homepage
  { path: ['page-1'] },
  { path: ['page-2'] },
];

export async function generateStaticParams(): Promise<Params[]> {
  return allParams
}

export default function Page({ params }: { params?: Params }) {
  const isMatch = !params?.path || allParams.some((x) =>  equal(x.path, params?.path));

  if (!isMatch) {
    notFound();
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div>
        <Link href="/">Homepage</Link>
        <Link href="/page-1">Page 1</Link>
        <Link href="/page-2">Page 2</Link>
      </div>
    </main>
  )
}
