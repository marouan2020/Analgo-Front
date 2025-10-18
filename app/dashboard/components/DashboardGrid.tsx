'use client';

import GridLayout from 'react-grid-layout';
import WidgetRenderer from './WidgetRenderer';

export default function DashboardGrid({ widgets, layout, setLayout, availableWidgets, isDraggable, markers }) {
    return (
        <div className="container-dashboard">
            {widgets.length === 0 ? (
                <p className="text-gray-500 text-center mt-10">No widgets added yet.</p>
            ) : (
                <GridLayout
                    className="layout"
                    cols={6}
                    rowHeight={100}
                    width={1200}
                    isDraggable={isDraggable}
                    isResizable={isDraggable}
                    margin={[15, 15]}
                    onLayoutChange={setLayout}
                >
                    {widgets.map((id) => (
                        <div key={id}
                             data-grid={layout.find((l) => l.i === id) || { i: id, x: 0, y: 0, w: 3, h: 2 }}>
                            <WidgetRenderer id={id} availableWidgets={availableWidgets} markers={markers} isDraggable={isDraggable} />
                        </div>
                    ))}
                </GridLayout>
            )}
        </div>
    );
}
