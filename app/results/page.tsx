import PageLayout from "@/components/page-layout"
import ResultsTabs from "@/components/results-tabs"

export default function ResultsPage() {
  return (
    <PageLayout>
      <div className="container mx-auto px-6 py-12">
        <div className="max-w-5xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Your Research
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
              {" "}
              Transformed
            </span>
          </h1>
          <p className="text-gray-400 text-xl mb-8">
            We've processed your paper and created the following transformations.
          </p>

          <ResultsTabs />
        </div>
      </div>
    </PageLayout>
  )
}
