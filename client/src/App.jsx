import { useState } from 'react'

function App() {
  const [isSetupComplete] = useState(true)

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <header className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            StageCraft
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Event Ticketing & Seat Reservation System
          </p>
          <p className="text-sm text-gray-500 mt-2">
            Crafting seamless ticketing experiences that work flawlessly under pressure
          </p>
        </header>

        <main className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                Setup Status
              </h2>
              <div className="space-y-3">
                <div className="flex items-center">
                  <span className="w-3 h-3 bg-green-500 rounded-full mr-3"></span>
                  <span className="text-gray-700">React + Vite</span>
                </div>
                <div className="flex items-center">
                  <span className="w-3 h-3 bg-green-500 rounded-full mr-3"></span>
                  <span className="text-gray-700">TailwindCSS</span>
                </div>
                <div className="flex items-center">
                  <span className="w-3 h-3 bg-green-500 rounded-full mr-3"></span>
                  <span className="text-gray-700">Redux Toolkit</span>
                </div>
                <div className="flex items-center">
                  <span className="w-3 h-3 bg-green-500 rounded-full mr-3"></span>
                  <span className="text-gray-700">Project Structure</span>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                Key Features
              </h2>
              <ul className="space-y-2 text-gray-700">
                <li>Interactive Seat Map Selection</li>
                <li>Secure Payment Integration</li>
                <li>QR Code Ticket Generation</li>
                <li>Live Sales Dashboards</li>
                <li>Fraud Detection Engine</li>
              </ul>
            </div>
      </div>

          <div className="text-center">
            <div className="bg-primary-50 border border-primary-200 rounded-lg p-6">
              <h3 className="text-lg font-medium text-primary-900 mb-2">
                Ready to Start Development!
              </h3>
              <p className="text-primary-700 mb-4">
                Your StageCraft frontend is set up and ready for feature development.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <button className="btn-primary">
                  Start Building Features
                </button>
                <button className="btn-secondary">
                  View Documentation
        </button>
              </div>
            </div>
          </div>
        </main>

        <footer className="text-center mt-12 text-gray-500 text-sm">
          <p>Built with React, Vite, and TailwindCSS</p>
          <p className="mt-1">Team StageCraft - Building the future of event ticketing</p>
        </footer>
      </div>
    </div>
  )
}

export default App
