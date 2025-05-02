import PageLayout from "@/components/page-layout"
import UploadForm from "@/components/upload-form"

export default function UploadPage() {
  return (
    <PageLayout>
      <div className="container mx-auto px-6 py-12">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Upload Your
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
              {" "}
              Research
            </span>
          </h1>
          <p className="text-gray-400 text-xl mb-8">
            Upload your research paper and our AI will transform it into engaging, accessible formats.
          </p>

          <UploadForm />
        </div>
      </div>
    </PageLayout>
  )
}
