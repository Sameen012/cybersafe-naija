import { useMemo, useState } from 'react';

const incomingReports = [
  { id: 1, number: '+234 803 222 1188', type: 'Investment', date: '27 Nov 2025 - 09:45', status: 'Pending' },
  { id: 2, number: '+234 708 555 7710', type: 'WhatsApp Loan', date: '27 Nov 2025 - 12:18', status: 'Pending' },
  { id: 3, number: '+234 901 661 0300', type: 'Romance', date: '26 Nov 2025 - 20:04', status: 'Pending' }
];

const AdminDashboard = () => {
  const [reports, setReports] = useState(incomingReports);
  const [token] = useState(() => localStorage.getItem('csn_admin_token'));

  const pendingCount = useMemo(() => reports.filter((report) => report.status === 'Pending').length, [reports]);

  if (!token) {
    return (
      <section className="mx-auto max-w-3xl py-16 text-center">
        <h1 className="text-3xl font-black text-brand-dark">Admin Dashboard</h1>
        <p className="mt-4 rounded-3xl border border-red-200 bg-red-50 px-6 py-5 text-lg font-semibold text-red-600">
          Access Denied
        </p>
        <p className="mt-3 text-sm text-slate-600">
          Save your mock token as <code>csn_admin_token</code> in localStorage to preview the control room UI.
        </p>
      </section>
    );
  }

  const handleApprove = (id) => {
    setReports((prev) => prev.map((report) => (report.id === id ? { ...report, status: 'Approved' } : report)));
  };

  const handleDelete = (id) => {
    setReports((prev) => prev.filter((report) => report.id !== id));
  };

  return (
    <section className="mx-auto max-w-5xl space-y-8">
      <header className="space-y-2">
        <p className="text-xs font-semibold uppercase tracking-[0.4em] text-brand-green">Control Room</p>
        <h1 className="text-4xl font-black text-brand-dark">Incoming Reports</h1>
        <p className="text-sm text-slate-600">Mock data mode — wire to the backend later.</p>
      </header>

      <div className="grid gap-4 sm:grid-cols-3">
        <article className="rounded-3xl border border-brand-green/30 bg-white p-6 shadow-sm">
          <p className="text-xs uppercase tracking-[0.3em] text-brand-green">Pending</p>
          <p className="mt-2 text-3xl font-black text-brand-dark">{pendingCount}</p>
        </article>
        <article className="rounded-3xl border border-brand-green/30 bg-white p-6 shadow-sm">
          <p className="text-xs uppercase tracking-[0.3em] text-brand-green">Resolved</p>
          <p className="mt-2 text-3xl font-black text-brand-dark">{reports.length - pendingCount}</p>
        </article>
        <article className="rounded-3xl border border-brand-green/30 bg-white p-6 shadow-sm">
          <p className="text-xs uppercase tracking-[0.3em] text-brand-green">Today&apos;s Alerts</p>
          <p className="mt-2 text-3xl font-black text-brand-dark">3</p>
        </article>
      </div>

      <div className="overflow-x-auto rounded-3xl border border-brand-green/30 bg-white shadow-sm">
        <table className="min-w-full text-left text-sm">
          <thead className="bg-brand-light text-xs uppercase tracking-widest text-slate-500">
            <tr>
              <th className="px-4 py-3">Scammer Number</th>
              <th className="px-4 py-3">Scam Type</th>
              <th className="px-4 py-3">Date</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {reports.map((report) => (
              <tr key={report.id} className="border-t border-slate-100">
                <td className="px-4 py-4 font-semibold text-brand-dark">{report.number}</td>
                <td className="px-4 py-4 text-slate-600">{report.type}</td>
                <td className="px-4 py-4 text-slate-500">{report.date}</td>
                <td className="px-4 py-4">
                  {(() => {
                    const isApproved = report.status === 'Approved';
                    const badgeClass = isApproved
                      ? 'bg-green-50 text-green-700'
                      : 'bg-yellow-50 text-yellow-700';
                    return (
                      <span className={`rounded-full px-3 py-1 text-xs font-semibold ${badgeClass}`}>
                        {report.status}
                      </span>
                    );
                  })()}
                </td>
                <td className="px-4 py-4 text-right">
                  <div className="inline-flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => handleApprove(report.id)}
                      className="rounded-full bg-green-700 px-3 py-1 text-xs font-semibold text-white"
                    >
                      Approve
                    </button>
                    <button
                      type="button"
                      onClick={() => handleDelete(report.id)}
                      className="rounded-full border border-red-300 px-3 py-1 text-xs font-semibold text-red-600 hover:bg-red-50"
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default AdminDashboard;
