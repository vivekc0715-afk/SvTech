import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const API = 'http://localhost:5000/api';

// ─── helpers ─────────────────────────────────────────────────────────────────
const getToken = () => localStorage.getItem('token');
const authHeaders = () => ({ 'Content-Type': 'application/json', 'x-auth-token': getToken() });

// Tab config: endpoint, label, icon, fields for create/edit form
const TABS = [
  {
    id: 'messages',
    label: 'Messages',
    icon: '✉️',
    endpoint: 'messages',
    readOnly: true, // Messages come from users — admin can only view/delete/mark-read
    columns: ['name', 'email', 'subject', 'message'],
  },
  {
    id: 'services',
    label: 'Services',
    icon: '💼',
    endpoint: 'services',
    fields: [
      { name: 'title', label: 'Title', required: true },
      { name: 'description', label: 'Description', type: 'textarea', required: true },
      { name: 'icon', label: 'Icon (e.g. Cpu, Code, Cloud, Shield)', placeholder: 'Cpu' },
      { name: 'category', label: 'Category', type: 'select', options: ['ai', 'development', 'cloud', 'security'] },
      { name: 'image', label: 'Image URL' },
      { name: 'timeline', label: 'Timeline (e.g. 4-8 weeks)' },
    ],
    columns: ['title', 'category', 'timeline'],
  },
  {
    id: 'jobs',
    label: 'Jobs',
    icon: '📝',
    endpoint: 'jobs/all', // Admin uses /all endpoint
    postEndpoint: 'jobs',
    fields: [
      { name: 'title', label: 'Job Title', required: true },
      { name: 'department', label: 'Department', required: true },
      { name: 'location', label: 'Location', required: true },
      { name: 'type', label: 'Type', type: 'select', options: ['Full-time', 'Part-time', 'Internship', 'Contract'] },
      { name: 'salary', label: 'Salary (e.g. ₹5-8 LPA)' },
      { name: 'description', label: 'Description', type: 'textarea', required: true },
      { name: 'status', label: 'Status', type: 'select', options: ['active', 'closed'] },
    ],
    columns: ['title', 'department', 'type', 'status'],
  },
  {
    id: 'testimonials',
    label: 'Testimonials',
    icon: '⭐',
    endpoint: 'testimonials',
    fields: [
      { name: 'name', label: 'Client Name', required: true },
      { name: 'role', label: 'Role / Company', required: true },
      { name: 'content', label: 'Testimonial', type: 'textarea', required: true },
      { name: 'avatar', label: 'Avatar URL' },
      { name: 'rating', label: 'Rating (1–5)', type: 'number' },
    ],
    columns: ['name', 'role', 'rating'],
  },
];

// ─── Modal ────────────────────────────────────────────────────────────────────
const Modal = ({ tab, item, onClose, onSaved }) => {
  const isEdit = !!item?._id;
  const blankForm = () =>
    (tab.fields || []).reduce((acc, f) => ({ ...acc, [f.name]: item?.[f.name] ?? '' }), {});
  const [form, setForm] = useState(blankForm);
  const [saving, setSaving] = useState(false);
  const [err, setErr] = useState('');

  const endpointBase = tab.postEndpoint || tab.endpoint;

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    setErr('');
    try {
      const url = isEdit
        ? `${API}/${endpointBase}/${item._id}`
        : `${API}/${endpointBase}`;
      const res = await fetch(url, {
        method: isEdit ? 'PUT' : 'POST',
        headers: authHeaders(),
        body: JSON.stringify(form),
      });
      if (!res.ok) {
        const d = await res.json().catch(() => ({}));
        throw new Error(d.msg || `HTTP ${res.status}`);
      }
      onSaved();
    } catch (e) {
      setErr(e.message);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
      <div className="bg-[#0f172a] border border-white/10 rounded-2xl w-full max-w-xl shadow-2xl max-h-[90vh] flex flex-col">
        <div className="flex justify-between items-center p-6 border-b border-white/10">
          <h2 className="text-xl font-bold text-white">
            {isEdit ? `Edit ${tab.label.replace(/s$/, '')}` : `Add ${tab.label.replace(/s$/, '')}`}
          </h2>
          <button onClick={onClose} className="text-slate-400 hover:text-white text-2xl leading-none">×</button>
        </div>

        <form onSubmit={handleSave} className="flex-1 overflow-y-auto p-6 space-y-4">
          {err && <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-sm">{err}</div>}

          {(tab.fields || []).map((field) => (
            <div key={field.name}>
              <label className="block text-sm font-medium text-slate-300 mb-1">
                {field.label}{field.required && <span className="text-red-400 ml-1">*</span>}
              </label>
              {field.type === 'textarea' ? (
                <textarea
                  required={field.required}
                  rows={3}
                  value={form[field.name]}
                  onChange={e => setForm({ ...form, [field.name]: e.target.value })}
                  placeholder={field.placeholder || ''}
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-blue-500/40 resize-none text-sm"
                />
              ) : field.type === 'select' ? (
                <select
                  value={form[field.name]}
                  onChange={e => setForm({ ...form, [field.name]: e.target.value })}
                  className="w-full px-4 py-3 bg-[#0f172a] border border-white/10 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-blue-500/40 text-sm"
                >
                  <option value="">-- Select --</option>
                  {field.options.map(o => <option key={o} value={o}>{o}</option>)}
                </select>
              ) : (
                <input
                  type={field.type || 'text'}
                  required={field.required}
                  value={form[field.name]}
                  onChange={e => setForm({ ...form, [field.name]: e.target.value })}
                  placeholder={field.placeholder || ''}
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-blue-500/40 text-sm"
                />
              )}
            </div>
          ))}

          <button
            type="submit"
            disabled={saving}
            className="w-full py-3 mt-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-semibold rounded-xl transition-all disabled:opacity-60"
          >
            {saving ? 'Saving…' : isEdit ? 'Update' : 'Create'}
          </button>
        </form>
      </div>
    </div>
  );
};

// ─── View Message Modal ───────────────────────────────────────────────────────
const MessageModal = ({ item, onClose, onMarkRead, onDelete }) => (
  <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
    <div className="bg-[#0f172a] border border-white/10 rounded-2xl w-full max-w-lg shadow-2xl">
      <div className="flex justify-between items-center p-6 border-b border-white/10">
        <h2 className="text-xl font-bold text-white">Message</h2>
        <button onClick={onClose} className="text-slate-400 hover:text-white text-2xl leading-none">×</button>
      </div>
      <div className="p-6 space-y-3 text-sm">
        <div><span className="text-slate-400">From:</span> <span className="text-white font-medium">{item.name}</span> &lt;{item.email}&gt;</div>
        {item.phone && <div><span className="text-slate-400">Phone:</span> <span className="text-white">{item.phone}</span></div>}
        {item.subject && <div><span className="text-slate-400">Subject:</span> <span className="text-white">{item.subject}</span></div>}
        <div className="mt-3 p-4 bg-white/5 rounded-xl text-slate-200 leading-relaxed">{item.message}</div>
        <div className="text-slate-500 text-xs mt-2">{new Date(item.createdAt).toLocaleString()}</div>
      </div>
      <div className="flex gap-3 p-6 border-t border-white/10">
        {!item.isRead && (
          <button onClick={() => onMarkRead(item._id)} className="flex-1 py-2 bg-green-600/20 border border-green-500/30 text-green-400 rounded-xl hover:bg-green-600/30 transition-all text-sm font-medium">
            ✓ Mark as Read
          </button>
        )}
        <button onClick={() => onDelete(item._id)} className="flex-1 py-2 bg-red-600/20 border border-red-500/30 text-red-400 rounded-xl hover:bg-red-600/30 transition-all text-sm font-medium">
          Delete
        </button>
      </div>
    </div>
  </div>
);

// ─── Confirm Delete ───────────────────────────────────────────────────────────
const ConfirmDelete = ({ onConfirm, onCancel }) => (
  <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/80">
    <div className="bg-[#0f172a] border border-white/10 rounded-2xl p-8 max-w-sm w-full text-center shadow-2xl">
      <div className="text-4xl mb-4">🗑️</div>
      <h3 className="text-xl font-bold text-white mb-2">Delete this item?</h3>
      <p className="text-slate-400 text-sm mb-6">This action cannot be undone.</p>
      <div className="flex gap-3">
        <button onClick={onCancel} className="flex-1 py-2 border border-white/10 text-slate-300 rounded-xl hover:bg-white/5 transition-all">Cancel</button>
        <button onClick={onConfirm} className="flex-1 py-2 bg-red-600 text-white rounded-xl hover:bg-red-500 transition-all font-semibold">Delete</button>
      </div>
    </div>
  </div>
);

// ─── Toast ────────────────────────────────────────────────────────────────────
const Toast = ({ message, type }) => (
  <div className={`fixed bottom-6 right-6 z-[70] px-5 py-3 rounded-xl shadow-2xl text-white font-medium text-sm transition-all ${type === 'error' ? 'bg-red-600' : 'bg-green-600'}`}>
    {type === 'error' ? '✕ ' : '✓ '}{message}
  </div>
);

// ─── Dashboard ────────────────────────────────────────────────────────────────
const Dashboard = () => {
  const [activeTabId, setActiveTabId] = useState('messages');
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [modal, setModal] = useState(null); // null | { type: 'create' | 'edit' | 'view', item?: {} }
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [toast, setToast] = useState(null);
  const navigate = useNavigate();

  const tab = TABS.find(t => t.id === activeTabId);

  useEffect(() => {
    const token = getToken();
    if (!token) { navigate('/admin/login'); return; }
    fetchData();
  }, [activeTabId]);

  const showToast = (message, type = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  const fetchData = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${API}/${tab.endpoint}`, { headers: authHeaders() });
      if (res.status === 401) { localStorage.removeItem('token'); navigate('/admin/login'); return; }
      if (res.ok) setData(await res.json());
    } catch (e) {
      showToast('Failed to load data', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    const endpointBase = tab.postEndpoint || tab.endpoint.replace('/all', '');
    try {
      const res = await fetch(`${API}/${endpointBase}/${id}`, {
        method: 'DELETE',
        headers: authHeaders(),
      });
      if (!res.ok) throw new Error();
      setData(prev => prev.filter(i => i._id !== id));
      showToast('Deleted successfully');
    } catch {
      showToast('Failed to delete', 'error');
    } finally {
      setDeleteTarget(null);
      setModal(null);
    }
  };

  const handleMarkRead = async (id) => {
    try {
      await fetch(`${API}/messages/${id}/read`, { method: 'PUT', headers: authHeaders() });
      setData(prev => prev.map(i => i._id === id ? { ...i, isRead: true } : i));
      showToast('Marked as read');
      setModal(null);
    } catch {
      showToast('Failed to update', 'error');
    }
  };

  const handleSaved = () => {
    setModal(null);
    fetchData();
    showToast(modal?.type === 'edit' ? 'Updated successfully' : 'Created successfully');
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('admin');
    navigate('/admin/login');
  };

  return (
    <div className="min-h-screen bg-[#020617] text-white flex">
      {/* Sidebar */}
      <div className="fixed left-0 top-0 h-full w-64 bg-white/5 border-r border-white/10 p-6 flex flex-col z-10">
        <div className="mb-10 px-2">
          <h2 className="text-xl font-bold bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent">Solvion Admin</h2>
        </div>
        <nav className="flex-1 space-y-2">
          {TABS.map((t) => (
            <button
              key={t.id}
              onClick={() => { setActiveTabId(t.id); setData([]); }}
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all ${activeTabId === t.id ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/20' : 'text-slate-400 hover:bg-white/5 hover:text-white'}`}
            >
              <span>{t.icon}</span>
              <span className="font-medium">{t.label}</span>
            </button>
          ))}
        </nav>
        <button
          onClick={handleLogout}
          className="px-4 py-3 text-slate-400 hover:text-red-400 flex items-center space-x-3 transition-colors rounded-xl hover:bg-red-500/5"
        >
          <span>🚪</span><span>Logout</span>
        </button>
      </div>

      {/* Main Content */}
      <div className="ml-64 flex-1 p-8">
        <header className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold capitalize">{tab.label}</h1>
            <p className="text-slate-400 mt-1 text-sm">Manage your {tab.label.toLowerCase()} here</p>
          </div>
          <div className="flex gap-3">
            <button onClick={fetchData} className="px-4 py-2 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 transition-all text-sm">
              🔄 Refresh
            </button>
            {!tab.readOnly && (
              <button
                onClick={() => setModal({ type: 'create' })}
                className="px-5 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 rounded-xl text-sm font-semibold transition-all shadow-lg shadow-blue-600/20"
              >
                + Add {tab.label.replace(/s$/, '')}
              </button>
            )}
          </div>
        </header>

        {/* Stats bar */}
        <div className="mb-6 text-sm text-slate-400">
          <span className="px-3 py-1 bg-white/5 rounded-full border border-white/10">
            {loading ? '…' : data.length} {tab.label.toLowerCase()} {activeTabId === 'messages' && `(${data.filter(m => !m.isRead).length} unread)`}
          </span>
        </div>

        {/* Table */}
        <div className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden">
          {loading ? (
            <div className="p-20 text-center text-slate-400 animate-pulse">Loading data…</div>
          ) : data.length === 0 ? (
            <div className="p-20 text-center text-slate-500">
              <div className="text-4xl mb-3">{tab.icon}</div>
              <p>No {tab.label.toLowerCase()} yet.</p>
              {!tab.readOnly && (
                <button onClick={() => setModal({ type: 'create' })} className="mt-4 px-5 py-2 bg-blue-600/20 border border-blue-500/30 text-blue-400 rounded-xl text-sm hover:bg-blue-600/30 transition-all">
                  + Add your first {tab.label.replace(/s$/, '')}
                </button>
              )}
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead>
                  <tr className="border-b border-white/10 text-slate-400 uppercase tracking-wider text-xs">
                    {activeTabId === 'messages' && <>
                      <th className="px-6 py-4 font-medium">From</th>
                      <th className="px-6 py-4 font-medium">Subject</th>
                      <th className="px-6 py-4 font-medium">Status</th>
                      <th className="px-6 py-4 font-medium">Date</th>
                      <th className="px-6 py-4 font-medium text-right">Actions</th>
                    </>}
                    {activeTabId === 'services' && <>
                      <th className="px-6 py-4 font-medium">Title</th>
                      <th className="px-6 py-4 font-medium">Category</th>
                      <th className="px-6 py-4 font-medium">Timeline</th>
                      <th className="px-6 py-4 font-medium text-right">Actions</th>
                    </>}
                    {activeTabId === 'jobs' && <>
                      <th className="px-6 py-4 font-medium">Title</th>
                      <th className="px-6 py-4 font-medium">Department</th>
                      <th className="px-6 py-4 font-medium">Type</th>
                      <th className="px-6 py-4 font-medium">Status</th>
                      <th className="px-6 py-4 font-medium text-right">Actions</th>
                    </>}
                    {activeTabId === 'testimonials' && <>
                      <th className="px-6 py-4 font-medium">Client</th>
                      <th className="px-6 py-4 font-medium">Role</th>
                      <th className="px-6 py-4 font-medium">Rating</th>
                      <th className="px-6 py-4 font-medium text-right">Actions</th>
                    </>}
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {data.map((item) => (
                    <tr key={item._id} className="hover:bg-white/5 transition-colors">
                      {activeTabId === 'messages' && <>
                        <td className="px-6 py-4">
                          <div className="font-medium text-white">{item.name}</div>
                          <div className="text-slate-500 text-xs mt-0.5">{item.email}</div>
                        </td>
                        <td className="px-6 py-4 text-slate-300 max-w-[200px] truncate">{item.subject || '—'}</td>
                        <td className="px-6 py-4">
                          <span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${item.isRead ? 'bg-slate-500/20 text-slate-400' : 'bg-blue-500/20 text-blue-400'}`}>
                            {item.isRead ? 'Read' : 'Unread'}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-slate-500 text-xs">{new Date(item.createdAt).toLocaleDateString()}</td>
                        <td className="px-6 py-4 text-right space-x-2">
                          <button onClick={() => setModal({ type: 'view', item })} className="px-3 py-1.5 rounded-lg bg-blue-500/10 text-blue-400 hover:bg-blue-500/20 transition-all text-xs font-medium">View</button>
                          <button onClick={() => setDeleteTarget(item._id)} className="px-3 py-1.5 rounded-lg bg-red-500/10 text-red-400 hover:bg-red-500/20 transition-all text-xs font-medium">Delete</button>
                        </td>
                      </>}

                      {activeTabId === 'services' && <>
                        <td className="px-6 py-4">
                          <div className="font-medium text-white">{item.title}</div>
                          <div className="text-slate-500 text-xs mt-0.5 line-clamp-1">{item.description}</div>
                        </td>
                        <td className="px-6 py-4">
                          <span className="px-2 py-0.5 rounded-full text-xs font-semibold bg-indigo-500/20 text-indigo-300 capitalize">{item.category || 'ai'}</span>
                        </td>
                        <td className="px-6 py-4 text-slate-400 text-xs">{item.timeline || '—'}</td>
                        <td className="px-6 py-4 text-right space-x-2">
                          <button onClick={() => setModal({ type: 'edit', item })} className="px-3 py-1.5 rounded-lg bg-yellow-500/10 text-yellow-400 hover:bg-yellow-500/20 transition-all text-xs font-medium">Edit</button>
                          <button onClick={() => setDeleteTarget(item._id)} className="px-3 py-1.5 rounded-lg bg-red-500/10 text-red-400 hover:bg-red-500/20 transition-all text-xs font-medium">Delete</button>
                        </td>
                      </>}

                      {activeTabId === 'jobs' && <>
                        <td className="px-6 py-4">
                          <div className="font-medium text-white">{item.title}</div>
                          <div className="text-slate-500 text-xs mt-0.5">{item.location}</div>
                        </td>
                        <td className="px-6 py-4 text-slate-300">{item.department}</td>
                        <td className="px-6 py-4 text-slate-400 text-xs">{item.type}</td>
                        <td className="px-6 py-4">
                          <span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${item.status === 'active' ? 'bg-green-500/20 text-green-400' : 'bg-slate-500/20 text-slate-400'}`}>
                            {item.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-right space-x-2">
                          <button onClick={() => setModal({ type: 'edit', item })} className="px-3 py-1.5 rounded-lg bg-yellow-500/10 text-yellow-400 hover:bg-yellow-500/20 transition-all text-xs font-medium">Edit</button>
                          <button onClick={() => setDeleteTarget(item._id)} className="px-3 py-1.5 rounded-lg bg-red-500/10 text-red-400 hover:bg-red-500/20 transition-all text-xs font-medium">Delete</button>
                        </td>
                      </>}

                      {activeTabId === 'testimonials' && <>
                        <td className="px-6 py-4">
                          <div className="font-medium text-white">{item.name}</div>
                          <div className="text-slate-500 text-xs mt-0.5 line-clamp-1">{item.content}</div>
                        </td>
                        <td className="px-6 py-4 text-slate-300">{item.role}</td>
                        <td className="px-6 py-4 text-yellow-400">{'★'.repeat(item.rating || 5)}</td>
                        <td className="px-6 py-4 text-right space-x-2">
                          <button onClick={() => setModal({ type: 'edit', item })} className="px-3 py-1.5 rounded-lg bg-yellow-500/10 text-yellow-400 hover:bg-yellow-500/20 transition-all text-xs font-medium">Edit</button>
                          <button onClick={() => setDeleteTarget(item._id)} className="px-3 py-1.5 rounded-lg bg-red-500/10 text-red-400 hover:bg-red-500/20 transition-all text-xs font-medium">Delete</button>
                        </td>
                      </>}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      {/* Modals */}
      {modal?.type === 'view' && activeTabId === 'messages' && (
        <MessageModal
          item={modal.item}
          onClose={() => setModal(null)}
          onMarkRead={handleMarkRead}
          onDelete={(id) => { setModal(null); setDeleteTarget(id); }}
        />
      )}

      {(modal?.type === 'create' || modal?.type === 'edit') && (
        <Modal
          tab={tab}
          item={modal?.item}
          onClose={() => setModal(null)}
          onSaved={handleSaved}
        />
      )}

      {deleteTarget && (
        <ConfirmDelete
          onConfirm={() => handleDelete(deleteTarget)}
          onCancel={() => setDeleteTarget(null)}
        />
      )}

      {toast && <Toast message={toast.message} type={toast.type} />}
    </div>
  );
};

export default Dashboard;
