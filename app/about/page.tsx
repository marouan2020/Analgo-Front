'use client';

import Image from 'next/image';

export default function AboutPage() {
    return (
        <div className="col-12 pt-5 pl-3">
            <div className='row'>
            <p className="h2 mb-4 text-center">AnalGo strives to transform software into better experiences for everyone.</p>
            <p className="h4 mb-6 text-lg  text-center">
                Across every industry, AnalGo helps organizations achieve one goal: <br />driving faster and deeper product adoption.
            </p>
            <div className='col-12 pt-4'>
                <div className='row d-md-flex'>
                    <div className="text-lg col-md-7 col-sm-12">
                        <p className='text-muted'>
                            Analgo, the most comprehensive product experience platform, empowers companies to put product at the heart of everything they do. We help teams embed product intelligence across their organizations so they can innovate with confidence and keep pace with evolving user needs—removing the guesswork from delivering world-class product experiences.
                        </p>
                        <p className='text-muted'>
                          Analgo unites powerful software usage analytics with in-app guidance and user feedback, enabling even non-technical teams to create better product experiences for customers and employees alike. And through our Mind the Product and customer communities, we provide education, events, and training that support product and digital leaders everywhere. Learn more about what Analgo offers here.
                        </p>
                    </div>

                    <p className="col-md-5 col-sm-12">
                        <Image
                            src="https://cdn.analgo.tech/image_traking_user.webp"
                            alt="Analyse statistique users"
                            width={400}
                            height={400}
                            className='mx-auto d-block float-md-right'
                            style={{borderRadius: '50%', objectFit: 'cover' }}
                        />
                    </p>
                </div>
            </div>
            </div>
        </div>
    );
}