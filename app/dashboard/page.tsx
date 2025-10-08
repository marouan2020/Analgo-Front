'use client';

import 'leaflet/dist/leaflet.css';

import { useAuth } from '../../hooks/useAuth';

export default function DashboardPage() {
  useAuth();

  return (
    <div className="col-12 p-4">
      <div>
        <h1>Dashboard</h1>
        <p>Welcome to your dashboard!</p>
      </div>
      <div style={{ height: '500px', width: '100%' }}>
      </div>
      <div style={{height: 400 }} className='col-3'>
      <h3 className="mb-3">Visitors per Month</h3>
    </div>
    </div>
  );
}
