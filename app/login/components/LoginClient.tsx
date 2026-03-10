'use client';

import React from 'react';
import Link from 'next/link';
import { Button } from 'antd';
import StackIcon from 'tech-stack-icons';
import { useRouter } from 'next/navigation';

export default function LoginClient() {
    const router = useRouter();

    /**
     * UNCOMMENT THIS FOR FULL IMPLEMENTATION
     * Use this when your backend is ready to handle Google OAuth
     */
    /*
    const handleGoogleLogin = () => {
        const backendUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';
        window.location.href = `${backendUrl}/auth/google/redirect`;
    };
    */

    /**
     * DEV IMPLEMENTATION (DEFAULT)
     * Redirects directly to dashboard for faster boilerplate testing
     */
    const handleGoogleLogin = () => {
        router.push('/dashboard');
    };

    return (
        <div className="flex min-h-screen bg-white">
            <div className="flex w-full md:w-1/2 lg:w-[45%] flex-col justify-between p-8 sm:p-12 relative z-10 border-r border-gray-100">
                <div>
                    <Link href="/" className="flex items-center gap-2 group w-max">
                        <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center group-hover:scale-105 transition-transform shadow-sm">
                            <span className="text-white font-bold text-xs">EX</span>
                        </div>
                        <span className="text-xl font-bold text-gray-900 tracking-tight">
                            Example Template
                        </span>
                    </Link>
                </div>

                <div className="flex-1 flex flex-col justify-center w-full max-w-md mx-auto text-center">
                    <h1 className="text-4xl font-bold text-gray-900 mb-4 tracking-tight">Login your account</h1>
                    <p className="text-gray-500 mb-10 text-lg">
                        Welcome back! Please login with your Google account to access the system.
                    </p>

                    <div className="flex flex-col gap-4">
                        <Button
                            onClick={handleGoogleLogin}
                            size="large"
                            className="flex items-center justify-center w-full gap-3 px-4 py-6 border border-gray-200 bg-gray-50 rounded-xl hover:bg-gray-100 transition-all font-semibold text-gray-700 hover:border-gray-300 shadow-sm"
                        >
                            <StackIcon name="google" className="w-5 h-5" />
                            Continue with Google
                        </Button>
                    </div>
                </div>

                <div className="flex justify-between items-center text-sm text-gray-400 font-medium">
                    <span>Copyright © {new Date().getFullYear()} Example Template</span>
                    <Link href="#" className="hover:text-gray-600 transition-colors">Privacy Policy</Link>
                </div>
            </div>

            <div className="hidden md:flex w-1/2 lg:w-[55%] bg-linear-to-br from-accent-1 to-primary relative overflow-hidden flex-col justify-center px-12 lg:px-24 text-white">
                <div className="relative z-10 w-full max-w-xl">
                    <h2 className="text-4xl lg:text-5xl font-bold mb-6 leading-tight tracking-tight text-white">
                        Lorem Ipsum is simply dummy text.
                    </h2>
                    <p className="text-blue-100 text-lg lg:text-xl leading-relaxed mb-12 opacity-90">
                        Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.
                    </p>
                </div>
            </div>
        </div>
    );
}
