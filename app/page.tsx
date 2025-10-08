'use client';

import Image from "next/image";
import ImageSoft from '../public/images/software_analgo.svg';
import Link from 'next/link';
import {useEffect} from "react";
import { useRouter } from 'next/navigation';

export default function Home() {
    const router = useRouter();
    useEffect(() => {
        const token = localStorage.getItem('analgo_token');
        if (token) {
            router.push('/dashboard');
        }
    }, [router]);
    return (
        <div className="row mt-3 pl-3">
            <section className="col-12 d-md-flex">
                <div className="col-md-6">
                    <div className="row">
                        <h1 className="text-3xl font-bold mb-4">Make every software experience better, whether SaaS or agent-based.</h1>
                        <p className="mb-4">
                            Analgo uniquely enables you to understand and improve every software experience for customers and employees—whether on web, mobile, SaaS, AI, or agent platforms.
                        </p>

                        <div className="flex gap-2">
                            <Link href="/login">
                                <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
                                    Login
                                </button>
                            </Link>
                            <Link href="/register">
                                <button className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700">
                                    Register
                                </button>
                            </Link>
                        </div>
                    </div>
                </div>
                <div className='col-md-6'>
                    <Image
                        className="img-reponsive "
                        src={ImageSoft}
                        alt="Analgo software experience"
                    />
                </div>
            </section>
            <section className="bg-white py-20">
                <div className="max-w-7xl mx-auto px-6 lg:px-8">
                    <div className="grid md:grid-cols-2 gap-12 items-center">

                        {/* Texte à gauche */}
                        <div>
                            <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
                                ⚙️ Configure Your Website & Track Client Analytics
                            </h2>
                            <p className="mt-4 text-lg text-gray-600">
                                Easily set up your website and define the elements you want to track.
                                Our platform gives you a full overview of your visitors, page views,
                                and engagement metrics – all in real-time.
                            </p>

                            <ul className="mt-6 space-y-4 text-gray-700">
                                <li className="flex items-start">
                                    <span className="text-indigo-600 text-xl mr-2">✔</span>
                                    Easy configuration of websites & tracking rules
                                </li>
                                <li className="flex items-start">
                                    <span className="text-indigo-600 text-xl mr-2">✔</span>
                                    Real-time visitor & page view analytics
                                </li>
                                <li className="flex items-start">
                                    <span className="text-indigo-600 text-xl mr-2">✔</span>
                                    Client dashboard with clear engagement insights
                                </li>
                                <li className="flex items-start">
                                    <span className="text-indigo-600 text-xl mr-2">✔</span>
                                    Exportable reports & continuous monitoring
                                </li>
                            </ul>

                            <div className="mt-8">
                                <a
                                    href="/register"
                                    className="px-8 py-3 rounded-lg bg-indigo-600 text-white font-semibold hover:bg-indigo-700 transition"
                                >
                                    Start Your Free Tracking Now
                                </a>
                            </div>
                        </div>

                        {/* Illustration / Mockup */}
                        <div className="relative">
                            <div className="rounded-2xl shadow-lg border p-6 bg-gray-50">
                                <h3 className="text-lg font-semibold text-gray-800 mb-4">
                                    Example Analytics Dashboard
                                </h3>
                                <div className="space-y-4">
                                    <div className="flex justify-between text-sm text-gray-700">
                                        <span>Visitors Today</span>
                                        <span className="font-bold">1,245</span>
                                    </div>
                                    <div className="flex justify-between text-sm text-gray-700">
                                        <span>Page Views</span>
                                        <span className="font-bold">3,482</span>
                                    </div>
                                    <div className="flex justify-between text-sm text-gray-700">
                                        <span>Tracked Elements</span>
                                        <span className="font-bold">12</span>
                                    </div>
                                    <div className="flex justify-between text-sm text-gray-700">
                                        <span>Bounce Rate</span>
                                        <span className="font-bold text-red-500">42%</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </section>
            <section className="py-20">
                <div className="max-w-7xl mx-auto px-6 lg:px-8">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
                            🔎 AI SEO Analyzer – Get Clear Insights on Your Pages
                        </h2>
                        <p className="mt-4 text-lg text-gray-600">
                            Configure your website, analyze multiple pages, and receive a detailed SEO & compliance report.
                            From <span className="font-semibold text-indigo-600">W3C validation</span> to
                            <span className="font-semibold text-indigo-600">content quality</span> – everything in one place.
                        </p>
                    </div>

                    <div className="grid gap-10 md:grid-cols-3">
                        <div className="p-6 bg-white rounded-2xl shadow-md border">
                            <h3 className="text-xl font-semibold text-gray-800">⚙️ Configure</h3>
                            <p className="mt-2 text-gray-600">
                                Add your website or multiple pages in your client account for continuous monitoring.
                            </p>
                        </div>
                        <div className="p-6 bg-white rounded-2xl shadow-md border">
                            <h3 className="text-xl font-semibold text-gray-800">📊 Analyze</h3>
                            <p className="mt-2 text-gray-600">
                                Our AI runs SEO checks, W3C validation, and content analysis on each page.
                            </p>
                        </div>
                        <div className="p-6 bg-white rounded-2xl shadow-md border">
                            <h3 className="text-xl font-semibold text-gray-800">✅ Report</h3>
                            <p className="mt-2 text-gray-600">
                                Get a clear report showing errors, improvements, and optimization opportunities.
                            </p>
                        </div>
                    </div>
                </div>
            </section>
            <section id="no-code-onboarding" className="bg-gray-50 py-5 text-center">
                <div className="container py-5">

                    <h2 className="display-4 fw-bold text-dark mb-4">
                        Guide Users from A to Z: Effortless Activation. 💡
                    </h2>

                    <p className="lead text-muted mb-5">
                        Beyond analytics, Analgo gives you the power to act. Create onboarding flows, pop-ups, and contextual forms without writing a single line of code.
                    </p>

                    <div className="row g-4">

                        <div className="col-lg-4 col-md-6">
                            <div className="p-4 bg-white rounded shadow-sm border-top border-4 border-primary h-100">
                                <div className="fs-1 text-primary mb-3">
                                    ✨
                                </div>
                                <h3 className="h5 fw-bold text-dark mb-2">
                                    No-Code Walkthroughs & Guides
                                </h3>
                                <p className="text-secondary">
                                    Build clear, step-by-step <strong>product tours</strong> and onboarding journeys using an intuitive <strong>drag-and-drop</strong> interface.
                                </p>
                            </div>
                        </div>

                        <div className="col-lg-4 col-md-6">
                            <div className="p-4 bg-white rounded shadow-sm border-top border-4 border-success h-100">
                                <div className="fs-1 text-success mb-3">
                                    💬
                                </div>
                                <h3 className="h5 fw-bold text-dark mb-2">
                                    Contextual Pop-ups & Feedback
                                </h3>
                                <p className="text-secondary">
                                    Display announcements, messages, or <strong>feedback forms</strong> targeting specific user segments at the perfect moment.
                                </p>
                            </div>
                        </div>

                        <div className="col-lg-4 col-md-12">
                            <div className="p-4 bg-white rounded shadow-sm border-top border-4 border-warning h-100">
                                <div className="fs-1 text-warning mb-3">
                                    🎯
                                </div>
                                <h3 className="h5 fw-bold text-dark mb-2">
                                    Drive Feature Adoption
                                </h3>
                                <p className="text-secondary">
                                    Use targeted messaging to guide users toward underutilized features, ensuring higher <strong>retention</strong> and maximizing product value.
                                </p>
                            </div>
                        </div>

                    </div>

                </div>
            </section>
        </div>
    );
}
