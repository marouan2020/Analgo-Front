import React, {useState} from 'react';

interface StatCardProps {
  title?: string;
  description?: string;
  value: string | number;
  change?: {
    value: number;
    isPositive: boolean;
  };
  icon?: React.ReactNode;
  className?: string;
  editable?: boolean;
  onChange?: (data: { title: string; description: string }) => void;
}
import BarChartHeader from "@/app/components/BarChartHeader";

export default function StatCard({
  title = 'Stat card Widget',
  description = 'Add Description',
  value, 
  change, 
  icon, 
  className = '',
  editable = false,
  onChange,
}: StatCardProps){

    // @ts-ignore
  return (
    <div className="w-full h-100 border border-gray-200 rounded-xl overflow-hidden shadow-sm bg-white">
        {/* Header du graphique */}
        <BarChartHeader
          type={'stat'}
          title={title}
          description={description}
          editable={editable}
          onChange={onChange}
        />
        <div className={`bg-white dark:bg-background-dark rounded-lg shadow-md p-6 ${className}`}>
            <div className="flex justify-between items-start">
                <p className="text-text-primary dark:text-white text-2xl font-semibold">{value}</p>
                {change && (
                    <div className="flex items-center mt-2">
                      <span className={`text-sm font-medium ${change.isPositive ? 'text-green-500' : 'text-red-500'}`}>
                        {change.isPositive ? '+' : ''}{change.value}%
                      </span>
                      <span className="text-text-secondary dark:text-gray-400 text-xs ml-1">vs. previous period</span>
                    </div>
                )}
                {icon && (
                    <div className="p-2 bg-gray-100 dark:bg-gray-800 rounded-md">
                        {icon}
                    </div>
                )}
            </div>
        </div>
    </div>
  );
};
