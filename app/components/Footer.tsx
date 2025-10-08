'use client';

import Link from 'next/link';

export default function Footer() {
    return (
        <footer className="col-12 border-top pt-3">
            <div className='container'>
                <div className='row mb-2'>
                    <div className='col-12 text-center'>
                        <nav>
                            <Link href="/copyright" className="text-muted text-decoration-none mx-2">
                                Copyright
                            </Link>
                            <span className='text-muted '>--</span>
                            <Link href="/about" className="text-muted text-decoration-none mx-2">
                                About
                            </Link>
                            <span className='text-muted '>--</span>
                            <Link href="mailto:marouan.ben.mansour@gmail.com" className="text-muted text-decoration-none mx-2">
                                Contact
                            </Link>
                        </nav>
                    </div>
                </div>
                <div className='row'>
                    <p className='text-center text-muted'>&copy;2025 Analgo. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
}