'use client';

import { useEffect, useState } from 'react';
import { useAuthContext } from '@/contexts/AuthContext';
import { getClientsByUserId, calculateMonthlyRevenue, calculateShares } from '@/lib/db';
import { Client } from '@/types/client';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export default function DashboardPage() {
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
        <h3 className="text-lg font-medium text-gray-900 mb-4">Monthly Revenue</h3>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="amount" fill="#6366f1" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="bg-white shadow rounded-lg p-6">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Recent Clients</h3>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead>
              <tr>
                <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Name
                </th>
                <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Email
                </th>
                <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Amount Paid
                </th>
                <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Payment Method
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {clients.slice(0, 5).map((client) => (
                <tr key={client.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {client.fullName}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {client.email}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    ${client.amountPaid.toFixed(2)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {client.paymentMethod}
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