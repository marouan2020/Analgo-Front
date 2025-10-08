// app/copyright/page.tsx or pages/copyright.tsx

import React from 'react';

export default function CopyrightPage() {
    // Get the current year for automatic updates
    const currentYear = new Date().getFullYear();

    return (
        <>
            <section  className="container my-5">
                <p className="h2 display-4 fw-bold mb-5 text-dark">
                    Copyright Terms and Conditions
                </p>
                <div className="card shadow-sm p-4 p-md-5 bg-white">
                    <h2 className="h4 text-primary mb-3">
                        All Rights Reserved © Analgo {currentYear}
                    </h2>
                    <p className="lead text-secondary">
                        This website, its components, and content, including but not limited to text, graphics, logos, icons, images, audio clips, digital downloads, data compilations, and software, are the exclusive property of **Analgo** or its content suppliers and are protected by international copyright laws.
                    </p>
                    <hr className="my-4" />

                    <h3 className="h5 fw-bold mt-4 mb-3">
                        License and Site Access
                    </h3>
                    <p className="text-muted">
                        The use of this site&apos;s content for commercial purposes is strictly prohibited without our express written consent. You may not frame or utilize framing techniques to enclose any trademark, logo, or other proprietary information (including images, text, page layout, or form) of Analgo without express written consent.
                    </p>

                    <h3 className="h5 fw-bold mt-4 mb-3">
                        Trademarks
                    </h3>
                    <p className="text-muted">
                        Analgo and other Analgo trademarks used on the site are registered trademarks of Analgo. All other trademarks not owned by Analgo that appear on this site are the property of their respective owners.
                    </p>

                    <p className="small mt-5 text-end text-muted">
                        Last updated: October 04, {currentYear}
                    </p>
                </div>
            </section>
        </>
    );
}