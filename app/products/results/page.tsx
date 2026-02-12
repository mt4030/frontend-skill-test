import ResultsClient from "@/app/components/ResultsClient"

interface PageProps {
  searchParams: {
    q?: string
    genres?: string
    platforms?: string
    tags?: string
    items?: string
  }
}

export default function Page({ searchParams }: PageProps) {
  return <ResultsClient searchParams={searchParams} />
}
