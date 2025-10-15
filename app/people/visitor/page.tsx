'use client';

import { useState, useEffect, useMemo } from 'react';
import axios from 'axios';
import {
  useReactTable,
  getCoreRowModel,
  getPaginationRowModel,
  ColumnDef,
  flexRender,
  PaginationState,
} from '@tanstack/react-table';

interface PageViewDetails {
    date: string;
    title?: string;
    url?: string;
}
interface PageDetails {
    title?: string;
}
interface PagesUrlGroup {
    [key: string]: PageViewDetails;
}
interface VisitorPages {
    [url: string]: PagesUrlGroup;
}
interface Visitor {
  id: string;
  pagesViewed: number;
  number_view: number;
  pages: { [url: string]: PageDetails };
  visitDate: string;
}

interface Application {
    id: string;
    name: string;
}

export default function VisitorPage() {
  const [visitors, setVisitors] = useState<Visitor[]>([]);
  const [loading, setLoading] = useState(true);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [applications, setApplications] = useState<Application[]>([]);
  const [selectedAppId, setSelectedAppId] = useState('');
  const [pagination, setPagination] = useState<PaginationState>({
      pageIndex: 0,
      pageSize: 10,
  });
  useEffect(() => {
      const fetchApps = async () => {
          try {
              const analgoToken = localStorage.getItem('analgo_token') ?? false;
              if (analgoToken) {
                  const params = new URLSearchParams();
                  params.append('analgoToken', analgoToken);
                  const res = await axios.get(process.env.NEXT_PUBLIC_ENDPOINT_APPLICATION_LIST!, { params });
                  setApplications(res.data);
                  if (res.data.length > 0) {
                      setSelectedAppId(selectedAppId ?? '');
                  }
              }
          } catch (err) {
              console.error("Error fetching applications:", err);
          }
      };
    const fetchVisitors = async () => {
      try {
          setLoading(true);
          const params = new URLSearchParams();
          if (selectedAppId) {
              params.append('appId', selectedAppId);
          }
          if (startDate) {
              params.append('from', startDate);
          }
          if (endDate) {
              params.append('to', endDate);
          }
          const analgoToken = localStorage.getItem('analgo_token') ?? false;
          if (analgoToken) {
              params.append('analgoToken', analgoToken);
          }
          const res = await axios.get(`${process.env.NEXT_PUBLIC_URL_VISITORS_DATA}?${params.toString()}`);
          setVisitors(res.data);
          setPagination(prev => ({ ...prev, pageIndex: 0 }));
          if (selectedAppId) {
              setSelectedAppId(selectedAppId);
          }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
      fetchApps();
    fetchVisitors();
  }, [startDate, endDate, selectedAppId]);
  const dataToDisplay = visitors;
  const totalViews = useMemo(() => {
      return dataToDisplay.reduce((sum, visitor) => {
         const views = typeof visitor.number_view === 'number' ? visitor.number_view : 0;
         return sum + views;
      }, 0);
  }, [dataToDisplay]);
  const columns = useMemo<ColumnDef<Visitor>[]>(
    () => [
      {
        header: 'Visitor ID',
        accessorKey: 'visitor_id',
      },
      {
        header: 'Number views per page',
        accessorKey: 'number_view',
      },{
            header: 'Pages',
            accessorFn: row => row.pages,
            id: 'pageTitle',
            cell: info => {
                const pagesObject = info.getValue() as { [url: string]: PageDetails[] };
                const urls = Object.keys(pagesObject);

                if (urls.length === 0) {
                    return '-';
                }
                const titleListItems = urls.map((url, index) => {
                    const pageDetailsArray = pagesObject[url];
                    const pageDetail = pageDetailsArray[0];
                    const title = pageDetail?.title || url;
                    const displayTitle = title.length > 80 ? title.substring(0, 77) + '...' : title;
                    return (
                        <li key={index} title={title}>
                            <a href={url} target='_blank'>{displayTitle}</a>
                        </li>
                    );
                });

                // Retourner une liste non ordonnée contenant tous les titres
                return (
                    <ul style={{ paddingLeft: '20px', margin: 0 }}>
                        {titleListItems}
                    </ul>
                );
            },
        }
        ,{
            header: 'Date',
            accessorFn: row => row.pages,
            id: 'date',
            cell: info => {
                const pagesObject = info.getValue() as VisitorPages;
                const urls = Object.keys(pagesObject);
                if (urls.length === 0) {
                    return '-';
                }
                const titleListItems = urls.map((url, index) => {
                    const pageGroup = pagesObject[url];
                    const pageDetail = pageGroup['0'];
                    const date = pageDetail?.date || '--';
                    return (
                        <li key={index} title={date}>
                            {date}
                        </li>
                    );
                });
                return (
                    <ul style={{ paddingLeft: '20px', margin: 0 }}>
                        {titleListItems}
                    </ul>
                );
            },
        },
    ],
    []
  );

  const table = useReactTable({
    data: dataToDisplay,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    state: {
       pagination,
    },
    onPaginationChange: setPagination,
  });

    return (
        <div className="col-12 p-4">
            <p className='h2 strong pb-3 border-bottom'>Visitors ({dataToDisplay.length})</p>
            {!loading && (
                <div className="col-md-3 col-sm-12 alert alert-info d-flex justify-content-between align-items-center mb-4 p-3 shadow-sm">
                    <h5 className="m-0 text-dark">
                        Total Pages Views
                    </h5>
                    <span style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>
                        {totalViews}
                    </span>
                </div>
            )}
            {/* 4. CONTRÔLES DE FILTRE PAR DATE */}
            <div className="col-12 mb-4 pl-2 pr-2 d-md-flex alert alert-info">
                <div className="col-md-2 col-sm-12 mr-1 mt-sm-2">
                    <label style={{ color: 'black'}} htmlFor="startDate" className="pl-2 form-label">From:</label>
                    <input
                        type="date"
                        id="startDate"
                        className="form-control"
                        value={startDate}
                        onChange={e => setStartDate(e.target.value)}
                    />
                </div>
                <div className="col-md-2 col-sm-12 mt-sm-2">
                    <label  style={{ color: 'black'}}  htmlFor="endDate" className="form-label pl-2">TO:</label>
                    <input
                        type="date"
                        id="endDate"
                        className="form-control"
                        value={endDate}
                        onChange={e => setEndDate(e.target.value)}
                    />
                </div>
                <div className="col-md-2 col-sm-12 mt-sm-2 ml-3">
                    <label style={{ color: 'black'}} htmlFor="appFilter" className="pl-2 form-label">Application:</label>
                    <select
                        id="appFilter"
                        className="form-select"
                        value={selectedAppId}
                        onChange={e => setSelectedAppId(e.target.value)}
                        disabled={loading}
                    >
                        {loading && <option value="">Loading applications...</option>}
                        {!loading && applications.length === 0 && <option value="">No applications found</option>}
                        <option value="">All applications</option>
                        {applications.map(app => (
                            <option key={app.id} value={app.id}>
                                {app.name}
                            </option>
                        ))}
                    </select>
                </div>
            </div>
            {loading ? (
                <p>Loading visitors...</p>
            ) : (
                <div className="overflow-auto">
                    <table className="table alert alert-info justify-content-between shadow-sm">
                        <thead>
                        {table.getHeaderGroups().map(headerGroup => (
                            <tr key={headerGroup.id}>
                                {headerGroup.headers.map(header => (
                                    <th key={header.id}>
                                        {flexRender(header.column.columnDef.header, header.getContext())}
                                    </th>
                                ))}
                            </tr>
                        ))}
                        </thead>
                        <tbody>
                        {table.getRowModel().rows.map(row => (
                            <tr key={row.id}>
                                {row.getVisibleCells().map(cell => (
                                    <td key={cell.id}>
                                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                    </td>
                                ))}
                            </tr>
                        ))}
                        </tbody>
                    </table>
                    {/* ... Fin Table ... */}
                </div>
            )}

            {/* Contrôles de Pagination */}
            {!loading && dataToDisplay.length > 0 && (
                <div className="d-flex justify-content-between align-items-center mt-3">
                      <span className="d-flex align-items-center text-center gap-1">
                        Page{' '}
                          <strong>
                          {table.getState().pagination.pageIndex + 1} sur {table.getPageCount()}
                        </strong>
                          {' '} ({table.getState().pagination.pageSize} pages)
                      </span>
                    <div className="btn-group bg-black " role="group">
                        <button
                            className="p-1 btn btn-outline-secondary text-white btn-sm"
                            onClick={() => table.previousPage()}
                            disabled={!table.getCanPreviousPage()}
                        >
                            &laquo; Précédente
                        </button>
                        <button
                            className="p-1 btn btn-outline-secondary text-white btn-sm"
                            onClick={() => table.nextPage()}
                            disabled={!table.getCanNextPage()}
                        >
                            Suivante &raquo;
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}