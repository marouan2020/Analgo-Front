'use client';

import Link from 'next/link';
import { Dropdown } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignOutAlt, faCog, faStar } from '@fortawesome/free-solid-svg-icons';

export default function Topbar() {
    const username = typeof window !== 'undefined' ? localStorage.getItem('analgo_username') : '';

    const handleLogout = () => {
        localStorage.removeItem('analgo_token');
        localStorage.removeItem('analgo_username');
        window.location.href = '/login';
    };

    return (
        <aside className="col-12 d-flex align-items-center justify-content-between bg-dark px-4 py-3 text-white shadow-sm border-bottom border-secondary">
            {/* Logo */}
            <div className='d-flex align-items-center'>
                <Link href="/" className='text-white h4 fw-bold text-decoration-none'>
                    AnalGO
                </Link>
            </div>

            <div className="d-flex align-items-center gap-3">
                {/* Premium Offer Button */}
                <Link
                    href="/premium"
                    className="btn-premium d-flex align-items-center fw-semibold"
                >
                    <FontAwesomeIcon icon={faStar} className="me-2 text-warning" />
                    Premium Offer
                </Link>

                {/* Dropdown Menu */}
                <Dropdown align="end">
                    <Dropdown.Toggle
                        variant="dark"
                        className="bg-transparent border-0 text-white fw-semibold"
                    >
                        {username || 'Account'}
                    </Dropdown.Toggle>
                    <Dropdown.Menu variant="dark">
                        <Dropdown.Item as={Link} href="/settings">
                            <FontAwesomeIcon icon={faCog} className="me-2" />
                            Settings
                        </Dropdown.Item>
                        <Dropdown.Divider />
                        <Dropdown.Item onClick={handleLogout}>
                            <FontAwesomeIcon icon={faSignOutAlt} className="me-2" />
                            Sign out
                        </Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
            </div>
        </aside>
    );
}
