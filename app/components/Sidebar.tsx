'use client';

import Link from 'next/link';
import { Dropdown, Nav } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faChartLine,
    faUsers,
    faChalkboardTeacher,
    faTachometerAlt,
} from '@fortawesome/free-solid-svg-icons';

export default function Sidebar() {
  return (
   <aside className="left d-flex flex-column flex-shrink-0 bg-dark text-white">
      <Nav className="flex-column mb-auto">
        <Nav.Item>
          <Link href="/dashboard" className="nav-link text-white">
            <FontAwesomeIcon icon={faTachometerAlt} className="me-2" />
            Dashboard
          </Link>
        </Nav.Item>
        {/* People Dropdown */}
        <Dropdown>
          <Dropdown.Toggle variant="dark" className="flex items-center gap-2 text-gray-200 hover:text-white transition">
            <FontAwesomeIcon icon={faUsers} className="me-2" />
            People
          </Dropdown.Toggle>
          <Dropdown.Menu variant="dark">
            <Dropdown.Item as={Link} href="/people/visitor">
              Visitor
            </Dropdown.Item>
            <Dropdown.Item as={Link} href="/people/visitor">
              Account
            </Dropdown.Item>
            <Dropdown.Item as={Link} href="/people/segments">
              Segment
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
          <Dropdown>
              <Dropdown.Toggle variant="dark" className="w-100 text-start">
                  <FontAwesomeIcon icon={faChalkboardTeacher} className="me-2" />
                  Guides
              </Dropdown.Toggle>
              <Dropdown.Menu variant="dark">
                  <Dropdown.Item as={Link} href="/guides">
                      Guide
                  </Dropdown.Item>
                  <Dropdown.Item as={Link} href="/dashboard">
                      Form validation
                  </Dropdown.Item>
              </Dropdown.Menu>
          </Dropdown>
        <Nav.Item>
          <Link href="/dashboard" className="nav-link text-white">
              <FontAwesomeIcon icon={faChartLine} className="me-2" />
              AI SEO Analyzer
          </Link>
        </Nav.Item>
      </Nav>
    </aside >
  );
}
