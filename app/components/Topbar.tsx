'use client';

import Link from 'next/link';
import { Dropdown } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignOutAlt, faCog } from '@fortawesome/free-solid-svg-icons';

export default function Topbar() {
    const username = localStorage.getItem('analgo_username');
    const handleLogout = () => {
        localStorage.removeItem('analgo_token');
        localStorage.removeItem('analgo_username');
        window.location.href = '/login';
    };
    return (
        <aside className="col-12 d-flex bg-dark p-3  text-white">
            <div className='col-10 float-left'>
                <Link href="/" className='text-white h3 strong'>
                   AnalGO
                </Link>
            </div>
            <div className="col-2">
                <Dropdown className="mt-auto text-end">
                    <Dropdown.Toggle variant="dark">
                        {username}
                    </Dropdown.Toggle>
                    <Dropdown.Menu variant="dark">
                        <Dropdown.Item onClick={handleLogout}>
                            <FontAwesomeIcon icon={faSignOutAlt} className="me-2" />
                            Sign out
                        </Dropdown.Item>
                        <Dropdown.Item as={Link} href="/settings">
                            <FontAwesomeIcon icon={faCog} className="me-2" />
                            Settings
                        </Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
            </div>
        </aside >
    );
}
