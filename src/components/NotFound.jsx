
import React from 'react'
import { Link } from 'react-router-dom'

export default function NotFound() {
	return (
		<div className="min-h-screen flex items-center justify-center bg-linear-to-b from-white to-gray-50 px-6">
			<div className="max-w-3xl w-full rounded-2xl bg-white shadow-lg p-10 text-center">
				<div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-red-50 mb-6">
					<svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
						<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
					</svg>
				</div>
				<h1 className="text-4xl font-extrabold text-gray-900 mb-2">404 — Page not found</h1>
				<p className="text-gray-600 mb-6">Sorry, we couldn't find the page you're looking for.</p>

				<div className="flex items-center justify-center gap-4">
					<Link to="/" className="inline-block px-6 py-3 bg-sky-600 hover:bg-sky-700 text-white rounded-md font-medium">
						Go home
					</Link>
					<Link to="/signin" className="inline-block px-6 py-3 border border-gray-200 rounded-md text-gray-700">
						Sign in
					</Link>
				</div>
			</div>
		</div>
	)
}