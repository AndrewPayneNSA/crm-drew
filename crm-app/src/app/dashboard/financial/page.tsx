'use client';

import { useEffect, useState } from 'react';
import { useAuthContext } from '@/contexts/AuthContext';
import { getClientsByUserId, calculateMonthlyRevenue, calculateShares } from '@/lib/db';
import { Client } from '@/types/client';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export default function FinancialPage() {
  const { user } = useAuthContext();
  const [clients, setClients] = useState<Client[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchClients = async () => {
      if (user) {
        try {
          const fetchedClients = await getClientsByUserId(user.uid);
          setClients(fetchedClients);
        } catch (error) {
          console.error('Error fetching clients:', error);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchClients();
  }, [user]);

  const monthlyRevenue = calculateMonthlyRevenue(clients);
  const totalRevenue = Object.values(monthlyRevenue).reduce((a, b) => a + b, 0);
  const { tenPercent, thirteenPercent } = calculateShares(totalRevenue);

  const chartData = Object.entries(monthlyRevenue).map(([month, amount]) => ({
    month,
    amount,
    tenPercentShare: amount * 0.10,
    thirteenPercentShare: amount * 0.13,
  }));

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <dt className="text-sm font-medium text-gray-500 truncate">
              Total Revenue
            </dt>
            <dd className="mt-1 text-3xl font-semibold text-gray-900">
              ${totalRevenue.toFixed(2)}
            </dd>
          </div>
        </div>
        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <dt className="text-sm font-medium text-gray-500 truncate">
              10% Share
            </dt>
            <dd className="mt-1 text-3xl font-semibold text-gray-900">
              ${tenPercent.toFixed(2)}
            </dd>
          </div>
        </div>
        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <dt className="text-sm font-medium text-gray-500 truncate">
              13% Share
            </dt>
            <dd className="mt-1 text-3xl font-semibold text-gray-900">
              ${thirteenPercent.toFixed(2)}
            </dd>
          </div>
        </div>
      </div>

      <div className="bg-white shadow rounded-lg p-6">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Monthly Revenue Breakdown</h3>
        <div className="h-96">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="amount" name="Total Revenue" fill="#6366f1" />
              <Bar dataKey="tenPercentShare" name="10% Share" fill="#10b981" />
              <Bar dataKey="thirteenPercentShare" name="13% Share" fill="#f59e0b" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="bg-white shadow rounded-lg p-6">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Monthly Summary</h3>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead>
              <tr>
                <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Month
                </th>
                <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Total Revenue
                </th>
                <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  10% Share
                </th>
                <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  13% Share
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {chartData.map((data) => (
                <tr key={data.month}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {data.month}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    ${data.amount.toFixed(2)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    ${data.tenPercentShare.toFixed(2)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    ${data.thirteenPercentShare.toFixed(2)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
} 