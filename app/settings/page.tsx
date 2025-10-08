'use client';

import { useState, useEffect } from 'react';
import axios from 'axios';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table';

interface AppConfig {
  id: string;
  name: string;
  domainenName: string;
  platform: string;
  visitorType: string;
  status: string;
  createdAt: string;
}

export default function SettingsPage() {
  const [apps, setApps] = useState<AppConfig[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedApp, setSelectedApp] = useState<AppConfig | null>(null);
  const [apiKey, setApiKey] = useState<string>('');
  const [showViewModal, setShowViewModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState('');
  const [domainenName, setDomainenName] = useState('');
  const [platform, setPlatform] = useState('web');
  const [visitorType, setVisitorType] = useState('b2b');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const handleAddApp = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  useEffect(() => {
    const fetchApps = async () => {
      try {
          setLoading(true);
          const analgoToken = localStorage.getItem('analgo_token') ?? false;
          if (analgoToken) {
              const params = new URLSearchParams();
              params.append('analgoToken', analgoToken);
              const res = await axios.get(`${process.env.NEXT_PUBLIC_ENDPOINT_APPLICATION_LIST}?${params.toString()}`);
              setApps(res.data);
          }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchApps();
  }, []);

  const handleSave = async () => {
    try {
      const analgoKey = localStorage.getItem('analgo_token');
      await axios.post(process.env.NEXT_PUBLIC_ENDPOINT_APPLICATION_ADD!, { name, domainenName, platform, visitorType, analgoKey });
    
      // Reset form
      setName('');
      setDomainenName('');
      setPlatform('web');
      setVisitorType('b2b');
      setSuccess('Application successfully created!');
      setError('');
    } catch (err) {
      console.error(err);
    } finally {
        window.location.href = '/settings';
    }
  };

  // Action handlers
  const handleView = async (id: string) => {
    const app = apps.find(a => a.id === id);
    if (!app) return;
    setSelectedApp(app);
    try {
        setLoading(true);
        const analgoToken = localStorage.getItem('analgo_token') ?? false;
        if (analgoToken) {
            const params = new URLSearchParams();
            params.append('analgoToken', analgoToken);
            params.append('id', id);
            const res = await axios.get(`${process.env.NEXT_PUBLIC_ENDPOINT_APPLICATION_LIST}?${params.toString()}`);
            setApiKey(res.data.apiKey);
        }
    } catch (err) {
      console.error(err);
      setError('Error fetching API key');
    } finally {
      setLoading(false);
    }

    setShowViewModal(true);
 };

 const handleDelete = async (id: string) => {
   const confirmed = window.confirm("Are you sure you want to delete this application?");
   if (!confirmed) return;
   try {
        setLoading(true);
        const analgoToken = localStorage.getItem('analgo_token') ?? false;
        if (analgoToken) {
           const params = new URLSearchParams();
           params.append('analgoToken', analgoToken);
           params.append('delete', id);
           await axios.get(`${process.env.NEXT_PUBLIC_ENDPOINT_APPLICATION_LIST}?${params.toString()}`);
           setApps(apps.filter(app => app.id !== id));
           setSuccess('Application successfully deleted!');
        }
   } catch (err) {
     console.error(err);
     setError("Error deleting application.");
   } finally {
      setLoading(false);
    }
 };

  // Define react-table columns
  const columns: ColumnDef<AppConfig>[] = [
    { accessorKey: 'name', header: 'Name' },
    { accessorKey: 'domainenName', header: 'Domain' },
    { accessorKey: 'platform', header: 'Platform' },
    { accessorKey: 'visitorType', header: 'Visitor Type' },
    { accessorKey: 'status', header: 'Status' },
    { accessorKey: 'createdAt', header: 'Created at' },
    {
      id: 'actions',
      header: 'Action',
      cell: ({ row }) => (
        <>
          <button className="btn btn-sm btn-warning me-2" onClick={() => handleView(row.original.id)}>
            View
          </button>
          <button className="btn btn-sm btn-danger" onClick={() => handleDelete(row.original.id)}>
            Delete
          </button>
        </>
      ),
    },
  ];

  const table = useReactTable({
    data: apps,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="col-12 p-4">
      {/* Header */}
      <div className="d-flex justify-content-between align-items-center my-3">
        <h2>Subscription settings</h2>
        <button className="btn btn-primary" onClick={handleAddApp}>
          Add another app
        </button>
      </div>
      <div className='col-12'>
        <div className='row'>
           {error && <div className="text-danger mb-2">{error}</div>}
           {success && <div className="text-success mb-2">{success}</div>}
        </div>
      </div>

      {/* Table */}
      <div className="table-responsive">
        <table className="table table-bordered">
          <thead>
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th key={header.id}>
                    {flexRender(header.column.columnDef.header, header.getContext())}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody>
            {table.getRowModel().rows.length > 0 ? (
              table.getRowModel().rows.map((row) => (
                <tr key={row.id}>
                  {row.getVisibleCells().map((cell) => (
                    <td key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</td>
                  ))}
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={6} className="text-center">
                  No applications found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="modal show d-block" tabIndex={-1}>
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Add Application</h5>
                <button type="button" className="btn-close" onClick={handleCloseModal}></button>
              </div>
              <div className="modal-body">
                <div className="mb-3">
                  <label className="form-label">App Name</label>
                  <input
                    type="text"
                    className="form-control"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Domain Name</label>
                  <input
                    type="text"
                    className="form-control"
                    value={domainenName}
                    onChange={(e) => setDomainenName(e.target.value)}
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Platform</label>
                  <select className="form-select" value={platform} onChange={(e) => setPlatform(e.target.value)}>
                    <option value="web">Web</option>
                    <option value="mobile">Mobile</option>
                  </select>
                </div>
                <div className="mb-3">
                  <label className="form-label">Visitor Type</label>
                  <select className="form-select" value={visitorType} onChange={(e) => setVisitorType(e.target.value)}>
                    <option value="b2b">B2B</option>
                    <option value="b2c">B2C</option>
                    <option value="b2e">B2E</option>
                  </select>
                </div>
              </div>
              <div className="modal-footer">
                <button className="btn btn-secondary" onClick={handleCloseModal}>
                  Close
                </button>
                <button className="btn btn-primary" onClick={handleSave}>
                  Save
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {showViewModal && selectedApp && (
        <div className="modal show d-block" tabIndex={-1}>
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">Application Details</h5>
                        <button type="button" className="btn-close" onClick={() => setShowViewModal(false)}></button>
                    </div>
                    <div className="modal-body">
                        <div className='col-md-12 col-sm-12 code-js'>
                            <p><strong>Name:</strong> {selectedApp.name}</p>
                            <p><strong>Domain:</strong> {selectedApp.domainenName}</p>
                            <p><strong>Platform:</strong> {selectedApp.platform}</p>
                            <p><strong>Visitor Type:</strong> {selectedApp.visitorType}</p>
                            <p><strong>Visitor Type:</strong> {selectedApp.createdAt}</p>
                            <p><strong>Status:</strong> {selectedApp.status}</p>
                            <p><strong>API Key:</strong> {apiKey}</p>
                        </div>
                        <div className='col-md-12 col-sm-12 code-js'>
                          <p><strong>Add the code below to your common HTML template:</strong></p>
                          <pre>
                            <code>
                            {`<script>\n(function(apiKey){\n(function(p,e,n,d,o){var v,w,x,y,z;o=p[d]=p[d]||{};o._q=o._q||[];v=['initialize','identify','updateOptions','pageLoad','track'];for(w=0,x=v.length;w<x;++w)(function(m){o[m]=o[m]||function(){o._q[m===v[0]?'unshift':'push']([m].concat([].slice.call(arguments,0)));};})(v[w]);\ny=e.createElement(n);y.async=!0;y.src='https://apiv2.analgo.tech/modules/custom/api_user/js/analgo.js';\nz=e.getElementsByTagName(n)[0];\nz.parentNode.insertBefore(y,z);})(window,document,'script','analgo');\nanalgo.initialize({key:apiKey});})('${apiKey}');\n</script>`}
                            </code>
                          </pre>
                        </div>
                    </div>
                    <div className="modal-footer">
                        <button className="btn btn-secondary" onClick={() => setShowViewModal(false)}>Close</button>
                    </div>
                </div>
            </div>
        </div>
      )}
      <div className="container">
      {loading ? (
        <div className="text-center my-5">
          <FontAwesomeIcon icon={faSpinner} spin size="2x" />
          <p>Loading applications...</p>
        </div>
      ) : (
        <p></p>
      )}
    </div>
    </div>
  );
}
