export default function Footer() {
  return (
    <footer className="border-t border-gray-100 bg-white mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-gray-500">
            © {new Date().getFullYear()} Nomorgh. Sales & purchases management.
          </p>
          <p className="text-sm text-gray-400">
            Powered by Cosmic
          </p>
        </div>
      </div>
    </footer>
  )
}