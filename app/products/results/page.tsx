
import ResultsClient from "./ResultsClient";

interface PageProps {
  searchParams: Promise<{
    q?: string;
    genres?: string;
    type?: string;
    items?: string;
  }>;
}

export default async function Page({ searchParams }: PageProps) {
  const params = await searchParams;

  return <ResultsClient searchParams={params} />;
}
