

// // import React, { useState } from 'react';
// // import { Link } from 'react-router-dom';
// // import { 
// //   TrendingUp, Package, DollarSign, Search, Bell, 
// //   ArrowUpRight, ArrowDownLeft, Plus, CheckCircle2, Clock
// // } from 'lucide-react';
// // import { toast, Toaster } from 'sonner';
// // import Logo  from '../../assets/Logo.jpeg'

// // export default function MinimalDashboard() {
// //   const [activeTab, setActiveTab] = useState('overview');
// //   const [orderView, setOrderView] = useState('sales'); // 'sales' or 'purchases'

// //   // Dynamic Expenses State (so adding works)
// //   const [expenses, setExpenses] = useState([
// //     { id: 1, category: 'Materials', amount: 12500, note: 'Canvas & paint' },
// //     { id: 2, category: 'Shipping', amount: 2800, note: 'International delivery' },
// //     { id: 3, category: 'Tools', amount: 15000, note: 'Graphic Tablet Pro' },
// //   ]);

// //   // Expense Form State
// //   const [newExpense, setNewExpense] = useState({ amount: '', category: '', note: '' });

// //   const handleAddExpense = (e) => {
// //     e.preventDefault();
// //     if (!newExpense.amount || !newExpense.category) return toast.error("Amount and Category required.");
    
// //     setExpenses([
// //       { id: Date.now(), amount: Number(newExpense.amount), category: newExpense.category, note: newExpense.note },
// //       ...expenses
// //     ]);
// //     setNewExpense({ amount: '', category: '', note: '' });
// //     toast.success("Expense added");
// //   };

// //   // Mock Data
// //   const orders = {
// //     sales: [
// //       { id: 'ORD-001', name: 'Sarah Chen', item: 'Charcoal Study I', amount: '₹4,500', status: 'delivered' },
// //       { id: 'ORD-002', name: 'Marcus Ross', item: 'Graphite Dreams', amount: '₹6,000', status: 'processing' },
// //       { id: 'ORD-003', name: 'Elena H.', item: 'Zinc Abstract', amount: '₹3,200', status: 'delivered' },
// //     ],
// //     purchases: [
// //       { id: 'PUR-001', name: 'Art Supplies Co.', item: 'Premium Canvas Pack', amount: '₹2,500', status: 'delivered' },
// //       { id: 'PUR-002', name: 'Ink Masters', item: 'Charcoal Sticks', amount: '₹1,800', status: 'processing' },
// //     ]
// //   };

// //   const inventory = [
// //     { id: 1, name: 'Charcoal Study I', sku: 'ART-001', stock: 3, price: '₹4,500' },
// //     { id: 2, name: 'Graphite Dreams', sku: 'ART-002', stock: 1, price: '₹6,000' },
// //     { id: 3, name: 'Zinc Abstract', sku: 'ART-003', stock: 0, price: '₹3,200' },
// //     { id: 4, name: 'Noir Portrait', sku: 'ART-004', stock: 2, price: '₹5,500' },
// //   ];

// //   const totalSales = 13700;
// //   const totalExpenses = expenses.reduce((sum, exp) => sum + exp.amount, 0);

// //   // Shared glass/card style
// //   const cardStyle = "bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl shadow-sm";

// //   return (
// //     <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-50 font-sans transition-colors duration-300">
// //       <Toaster position="top-center" richColors theme="system" />

// //       {/* 1. Navbar */}
// //       <nav className="sticky top-0 z-40 w-full backdrop-blur-xl bg-white/80 dark:bg-zinc-950/80 border-b border-zinc-200 dark:border-zinc-800 px-4 md:px-6 py-3 flex items-center justify-between">
// //         <div className=' w-full max-w-7xl mx-auto flex items-center justify-between'>
// //         <Link to={'/'} className="flex items-center gap-3">
// //           <div className="w-8 h-8 bg-zinc-900 dark:bg-zinc-100 rounded-lg flex items-center justify-center overflow-hidden">
// //             <img src={Logo} alt="" />
// //           </div>
// //           <span className="font-bold text-lg tracking-tight hidden sm:block font-Eagle">
// //             Painters' Diary
// //           </span>
// //         </Link>
        
// //         <div className="flex items-center gap-2">
// //           <div className=" hidden md:flex items-center gap-2 bg-zinc-100 dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-800 px-3 py-1.5 rounded-lg">
// //             <Search size={16} className="text-zinc-400" />
// //             <input 
// //               type="text" 
// //               placeholder="Search anything..." 
// //               className="  bg-transparent border-none outline-none text-sm w-48 text-zinc-700 dark:text-zinc-300 placeholder:text-zinc-400" 
// //             />
// //           </div>
// //           <div className=' md:hidden block relative p-2 text-zinc-500 hover:text-zinc-900 dark:hover:text-white transition-colors'>
// //             <Search size={20}/>
// //           </div>
// //           <Link to={'/notification'} className="relative p-2 text-zinc-500 hover:text-zinc-900 dark:hover:text-white transition-colors">
// //             <Bell size={20} />
// //             <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-zinc-900 dark:bg-zinc-100 rounded-full"></span>
// //           </Link>
// //         </div>
// //         </div>
// //       </nav>

// //       {/* Main Content Area */}
// //       <main className="max-w-5xl mx-auto px-4 sm:px-6 py-8">
        
// //         {/* Header & Tabs */}
// //         <div className="mb-8">
// //           <h1 className="text-2xl font-black mb-6" style={{ fontFamily: "'Quicksand', sans-serif" }}>Dashboard</h1>
          
// //           <div className="flex items-center gap-2 overflow-x-auto pb-2 no-scrollbar">
// //             {[
// //               { id: 'overview', label: 'Overview', icon: TrendingUp },
// //               { id: 'orders', label: 'Orders', icon: Package },
// //               { id: 'inventory', label: 'Inventory', icon: Package },
// //               { id: 'expenses', label: 'Expenses', icon: DollarSign },
// //             ].map((tab) => (
// //               <button
// //                 key={tab.id}
// //                 onClick={() => setActiveTab(tab.id)}
// //                 className={`flex items-center gap-2 px-4 py-2.5 rounded-lg font-bold text-sm transition-all duration-200 ${
// //                   activeTab === tab.id
// //                     ? 'bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 shadow-sm'
// //                     : 'bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-zinc-500 hover:text-zinc-900 dark:hover:text-white'
// //                 }`}
// //                 style={{ fontFamily: "'Quicksand', sans-serif" }}
// //               >
// //                 <tab.icon size={16} />
// //                 {tab.label}
// //               </button>
// //             ))}
// //           </div>
// //         </div>

// //         {/* ══ OVERVIEW TAB ══ */}
// //         {activeTab === 'overview' && (
// //           <div className="space-y-6">
// //             <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
// //               <StatCard title="Total Sales" value={`₹${totalSales.toLocaleString()}`} isPositive />
// //               <StatCard title="Total Expenses" value={`₹${totalExpenses.toLocaleString()}`} />
// //               <StatCard title="Net Profit" value={`₹${(totalSales - totalExpenses).toLocaleString()}`} isPositive />
// //               <StatCard title="Pending Orders" value="2" />
// //             </div>

// //             <div className={`p-6 ${cardStyle}`}>
// //               <h2 className="font-bold mb-4" style={{ fontFamily: "'Quicksand', sans-serif" }}>Recent Activity</h2>
// //               <div className="space-y-3">
// //                 {orders.sales.slice(0, 3).map(order => (
// //                   <div key={order.id} className="flex justify-between items-center p-3 bg-zinc-50 dark:bg-zinc-950 rounded-lg border border-zinc-100 dark:border-zinc-800/50">
// //                     <div>
// //                       <p className="text-sm font-bold">{order.item}</p>
// //                       <p className="text-xs text-zinc-500">Sold to {order.name}</p>
// //                     </div>
// //                     <span className="text-sm font-bold">{order.amount}</span>
// //                   </div>
// //                 ))}
// //               </div>
// //             </div>
// //           </div>
// //         )}

// //         {/* ══ ORDERS TAB ══ */}
// //         {activeTab === 'orders' && (
// //           <div className={`p-6 ${cardStyle}`}>
// //             <div className="flex p-1 bg-zinc-100 dark:bg-zinc-800/50 rounded-lg w-fit mb-6">
// //               <button 
// //                 onClick={() => setOrderView('sales')}
// //                 className={`px-5 py-1.5 rounded-md text-sm font-bold transition-all ${orderView === 'sales' ? 'bg-white dark:bg-zinc-900 shadow-sm' : 'text-zinc-500'}`}
// //               >
// //                 Store Sales
// //               </button>
// //               <button 
// //                 onClick={() => setOrderView('purchases')}
// //                 className={`px-5 py-1.5 rounded-md text-sm font-bold transition-all ${orderView === 'purchases' ? 'bg-white dark:bg-zinc-900 shadow-sm' : 'text-zinc-500'}`}
// //               >
// //                 My Purchases
// //               </button>
// //             </div>

// //             <div className="space-y-2">
// //               {orders[orderView].map((order) => (
// //                 <div key={order.id} className="flex flex-col sm:flex-row sm:items-center justify-between p-4 bg-zinc-50 dark:bg-zinc-950 border border-zinc-100 dark:border-zinc-800/50 rounded-lg gap-3">
// //                   <div className="flex-1">
// //                     <p className="text-xs text-zinc-400 font-bold mb-1">{order.id}</p>
// //                     <p className="text-sm font-bold">{order.item}</p>
// //                     <p className="text-xs text-zinc-500">{order.name}</p>
// //                   </div>
// //                   <div className="flex items-center justify-between sm:justify-end gap-6 w-full sm:w-auto">
// //                     <span className="font-bold">{order.amount}</span>
// //                     {order.status === 'delivered' ? (
// //                       <span className="flex items-center gap-1 text-[11px] font-bold text-emerald-600 bg-emerald-50 dark:bg-emerald-900/20 px-2 py-1 rounded-md"><CheckCircle2 size={12}/> Delivered</span>
// //                     ) : (
// //                       <span className="flex items-center gap-1 text-[11px] font-bold text-amber-600 bg-amber-50 dark:bg-amber-900/20 px-2 py-1 rounded-md"><Clock size={12}/> Processing</span>
// //                     )}
// //                   </div>
// //                 </div>
// //               ))}
// //             </div>
// //           </div>
// //         )}

// //         {/* ══ INVENTORY TAB ══ */}
// //         {activeTab === 'inventory' && (
// //           <div className={`p-6 ${cardStyle}`}>
// //             <h2 className="font-bold mb-6" style={{ fontFamily: "'Quicksand', sans-serif" }}>Current Stock</h2>
// //             <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
// //               {inventory.map((item) => (
// //                 <div key={item.id} className="flex justify-between items-center p-4 bg-zinc-50 dark:bg-zinc-950 border border-zinc-100 dark:border-zinc-800/50 rounded-lg">
// //                   <div>
// //                     <p className="text-sm font-bold">{item.name}</p>
// //                     <p className="text-xs text-zinc-500 mt-0.5">SKU: {item.sku}</p>
// //                   </div>
// //                   <div className="text-right">
// //                     <p className="text-sm font-bold">{item.price}</p>
// //                     <p className={`text-xs font-bold mt-0.5 ${item.stock > 0 ? 'text-zinc-500' : 'text-red-500'}`}>
// //                       {item.stock > 0 ? `${item.stock} in stock` : 'Out of stock'}
// //                     </p>
// //                   </div>
// //                 </div>
// //               ))}
// //             </div>
// //           </div>
// //         )}

// //         {/* ══ EXPENSES TAB (Simplified & Interactive) ══ */}
// //         {activeTab === 'expenses' && (
// //           <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
            
// //             {/* Left Col: Add Expense Form */}
// //             <div className={`md:col-span-2 p-6 h-fit ${cardStyle}`}>
// //               <h2 className="font-bold mb-4 flex items-center gap-2" style={{ fontFamily: "'Quicksand', sans-serif" }}>
// //                 <Plus size={16} /> Log Expense
// //               </h2>
// //               <form onSubmit={handleAddExpense} className="space-y-4">
// //                 <div>
// //                   <label className="block text-xs font-bold text-zinc-500 mb-1.5">Amount (₹)</label>
// //                   <input 
// //                     type="number" 
// //                     value={newExpense.amount}
// //                     onChange={(e) => setNewExpense({...newExpense, amount: e.target.value})}
// //                     placeholder="e.g. 1500"
// //                     className="w-full bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-lg px-3 py-2 text-sm outline-none focus:border-zinc-400 transition-colors"
// //                   />
// //                 </div>
// //                 <div>
// //                   <label className="block text-xs font-bold text-zinc-500 mb-1.5">Category</label>
// //                   <input 
// //                     type="text" 
// //                     value={newExpense.category}
// //                     onChange={(e) => setNewExpense({...newExpense, category: e.target.value})}
// //                     placeholder="e.g. Materials, Shipping"
// //                     className="w-full bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-lg px-3 py-2 text-sm outline-none focus:border-zinc-400 transition-colors"
// //                   />
// //                 </div>
// //                 <div>
// //                   <label className="block text-xs font-bold text-zinc-500 mb-1.5">Quick Note (Optional)</label>
// //                   <input 
// //                     type="text" 
// //                     value={newExpense.note}
// //                     onChange={(e) => setNewExpense({...newExpense, note: e.target.value})}
// //                     placeholder="What was this for?"
// //                     className="w-full bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-lg px-3 py-2 text-sm outline-none focus:border-zinc-400 transition-colors"
// //                   />
// //                 </div>
// //                 <button type="submit" className="w-full bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 font-bold text-sm py-2.5 rounded-lg hover:bg-zinc-800 dark:hover:bg-white transition-colors">
// //                   Save Expense
// //                 </button>
// //               </form>
// //             </div>

// //             {/* Right Col: Expense List */}
// //             <div className={`md:col-span-3 p-6 ${cardStyle}`}>
// //               <div className="flex justify-between items-end mb-6">
// //                 <h2 className="font-bold" style={{ fontFamily: "'Quicksand', sans-serif" }}>Recent Expenses</h2>
// //                 <div className="text-right">
// //                   <p className="text-xs font-bold text-zinc-500 uppercase">Total Spent</p>
// //                   <p className="text-xl font-black text-zinc-900 dark:text-white">₹{totalExpenses.toLocaleString()}</p>
// //                 </div>
// //               </div>

// //               <div className="space-y-3">
// //                 {expenses.length === 0 ? (
// //                   <p className="text-sm text-zinc-500 italic">No expenses logged yet.</p>
// //                 ) : (
// //                   expenses.map((exp) => (
// //                     <div key={exp.id} className="flex justify-between items-center p-3 bg-zinc-50 dark:bg-zinc-950 border border-zinc-100 dark:border-zinc-800/50 rounded-lg">
// //                       <div>
// //                         <p className="text-sm font-bold">{catEmoji(exp.category)} {exp.category}</p>
// //                         {exp.note && <p className="text-xs text-zinc-500 mt-0.5" style={{ fontFamily: "'Playfair Display', serif" }}>{exp.note}</p>}
// //                       </div>
// //                       <span className="font-bold text-sm">₹{exp.amount.toLocaleString()}</span>
// //                     </div>
// //                   ))
// //                 )}
// //               </div>
// //             </div>

// //           </div>
// //         )}

// //       </main>
// //     </div>
// //   );
// // }

// // // Minimal Stat Card Component
// // const StatCard = ({ title, value, isPositive }) => (
// //   <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-4 rounded-xl shadow-sm">
// //     <p className="text-xs font-bold text-zinc-500 mb-1">{title}</p>
// //     <p className="text-xl font-black text-zinc-900 dark:text-white" style={{ fontFamily: "'Quicksand', sans-serif" }}>{value}</p>
// //   </div>
// // );

// // // Helper for expense category icons
// // const catEmoji = (category) => {
// //   const lower = category.toLowerCase();
// //   if (lower.includes('material')) return '🎨';
// //   if (lower.includes('ship')) return '📦';
// //   if (lower.includes('tool')) return '💻';
// //   return '💸';
// // };




// import React, { useState } from 'react';
// import { Link } from 'react-router-dom';
// import { 
//   TrendingUp, Package, DollarSign, Search, Bell, 
//   ShoppingCart, Store, Plus, CheckCircle2, Clock, 
//   Truck, MessageSquare, ChevronDown
// } from 'lucide-react';
// import { toast, Toaster } from 'sonner';
// import Logo from '../../assets/Logo.jpeg';

// export default function MinimalDashboard() {
//   const [activeTab, setActiveTab] = useState('sales');

//   // ─── STATE: EXPENSES ───
//   const [expenses, setExpenses] = useState([
//     { id: 1, category: 'Materials', amount: 12500, note: 'Canvas & paint' },
//     { id: 2, category: 'Shipping', amount: 2800, note: 'International delivery' },
//   ]);
//   const [newExpense, setNewExpense] = useState({ amount: '', category: '', note: '' });

//   const handleAddExpense = (e) => {
//     e.preventDefault();
//     if (!newExpense.amount || !newExpense.category) return toast.error("Amount and Category required.");
//     setExpenses([{ id: Date.now(), amount: Number(newExpense.amount), category: newExpense.category, note: newExpense.note }, ...expenses]);
//     setNewExpense({ amount: '', category: '', note: '' });
//     toast.success("Expense added");
//   };

//   // ─── STATE: SALES (Seller View) ───
//   const [sales, setSales] = useState([
//     { id: 'ORD-001', buyer: 'Sarah Chen', item: 'Charcoal Study I', amount: 4500, status: 'delivered', date: 'Oct 12' },
//     { id: 'ORD-002', buyer: 'Marcus Ross', item: 'Graphite Dreams', amount: 6000, status: 'processing', date: 'Oct 14' },
//     { id: 'ORD-003', buyer: 'Elena H.', item: 'Zinc Abstract', amount: 3200, status: 'pending', date: 'Oct 15' },
//   ]);

//   const updateSaleStatus = (id, newStatus) => {
//     setSales(sales.map(sale => sale.id === id ? { ...sale, status: newStatus } : sale));
//     toast.success(`Order ${id} marked as ${newStatus}`);
//   };

//   // ─── STATE: PURCHASES (Buyer View) ───
//   const [purchases, setPurchases] = useState([
//     { id: 'PUR-001', producer: 'Art Supplies Co.', item: 'Premium Canvas Pack', amount: 2500, status: 'shipped', date: 'Oct 10' },
//     { id: 'PUR-002', producer: 'Ink Masters', item: 'Charcoal Sticks', amount: 1800, status: 'processing', date: 'Oct 14' },
//   ]);

//   const handleMessageProducer = (producer) => {
//     toast.info(`Opening chat with ${producer}...`);
//   };

//   // ─── MOCK DATA: INVENTORY & STATS ───
//   const inventory = [
//     { id: 1, name: 'Charcoal Study I', sku: 'ART-001', stock: 3, price: '₹4,500' },
//     { id: 2, name: 'Graphite Dreams', sku: 'ART-002', stock: 1, price: '₹6,000' },
//     { id: 3, name: 'Zinc Abstract', sku: 'ART-003', stock: 0, price: '₹3,200' },
//   ];

//   const totalSales = sales.reduce((sum, sale) => sum + sale.amount, 0);
//   const totalExpenses = expenses.reduce((sum, exp) => sum + exp.amount, 0);

//   // ─── STYLES & HELPERS ───
//   const cardStyle = "bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl shadow-sm";

//   const getStatusBadge = (status) => {
//     switch(status) {
//       case 'delivered': return <span className="flex items-center gap-1 text-[11px] font-bold text-emerald-600 bg-emerald-50 dark:bg-emerald-900/20 px-2 py-1 rounded-md"><CheckCircle2 size={12}/> Delivered</span>;
//       case 'shipped': return <span className="flex items-center gap-1 text-[11px] font-bold text-blue-600 bg-blue-50 dark:bg-blue-900/20 px-2 py-1 rounded-md"><Truck size={12}/> Shipped</span>;
//       case 'processing': return <span className="flex items-center gap-1 text-[11px] font-bold text-amber-600 bg-amber-50 dark:bg-amber-900/20 px-2 py-1 rounded-md"><Clock size={12}/> Processing</span>;
//       default: return <span className="flex items-center gap-1 text-[11px] font-bold text-zinc-500 bg-zinc-100 dark:bg-zinc-800 px-2 py-1 rounded-md"><Clock size={12}/> Pending</span>;
//     }
//   };

//   return (
//     <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-50 font-sans transition-colors duration-300">
//       <Toaster position="top-center" richColors theme="system" />

//       {/* Navbar */}
//       <nav className="sticky top-0 z-40 w-full backdrop-blur-xl bg-white/80 dark:bg-zinc-950/80 border-b border-zinc-200 dark:border-zinc-800 px-4 md:px-6 py-3 flex items-center justify-between">
//         <div className='w-full max-w-7xl mx-auto flex items-center justify-between'>
//           <Link to={'/'} className="flex items-center gap-3">
//             <div className="w-8 h-8 bg-zinc-900 dark:bg-zinc-100 rounded-lg flex items-center justify-center overflow-hidden">
//               <img src={Logo} alt="Logo" className="w-full h-full object-cover" />
//             </div>
//             <span className="font-bold text-lg tracking-tight hidden sm:block font-Eagle">Painters' Diary</span>
//           </Link>
          
//           <div className="flex items-center gap-2">
//             <div className="hidden md:flex items-center gap-2 bg-zinc-100 dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-800 px-3 py-1.5 rounded-lg">
//               <Search size={16} className="text-zinc-400" />
//               <input type="text" placeholder="Search anything..." className="bg-transparent border-none outline-none text-sm w-48 text-zinc-700 dark:text-zinc-300 placeholder:text-zinc-400" />
//             </div>
//             <div className='md:hidden block relative p-2 text-zinc-500 hover:text-zinc-900 dark:hover:text-white transition-colors'>
//               <Search size={20}/>
//             </div>
//             <Link to={'/notification'} className="relative p-2 text-zinc-500 hover:text-zinc-900 dark:hover:text-white transition-colors">
//               <Bell size={20} />
//               <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-zinc-900 dark:bg-zinc-100 rounded-full"></span>
//             </Link>
//           </div>
//         </div>
//       </nav>

//       {/* Main Content Area */}
//       <main className="max-w-5xl mx-auto px-4 sm:px-6 py-8">
        
//         {/* Header & Main Navigation Tabs */}
//         <div className="mb-8">
//           <h1 className="text-2xl font-black mb-6" style={{ fontFamily: "'Quicksand', sans-serif" }}>Dashboard</h1>
          
//           <div className="flex items-center gap-2 overflow-x-auto pb-2 no-scrollbar">
//             {[
//               { id: 'overview', label: 'Overview', icon: TrendingUp },
//               { id: 'sales', label: 'Store Sales', icon: Store },
//               { id: 'purchases', label: 'My Purchases', icon: ShoppingCart },
//               { id: 'inventory', label: 'Inventory', icon: Package },
//               { id: 'expenses', label: 'Expenses', icon: DollarSign },
//             ].map((tab) => (
//               <button
//                 key={tab.id}
//                 onClick={() => setActiveTab(tab.id)}
//                 className={`flex items-center gap-2 px-4 py-2.5 rounded-lg font-bold text-sm transition-all duration-200 whitespace-nowrap ${
//                   activeTab === tab.id
//                     ? 'bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 shadow-sm'
//                     : 'bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-zinc-500 hover:text-zinc-900 dark:hover:text-white'
//                 }`}
//                 style={{ fontFamily: "'Quicksand', sans-serif" }}
//               >
//                 <tab.icon size={16} />
//                 {tab.label}
//               </button>
//             ))}
//           </div>
//         </div>

//         {/* ══ OVERVIEW TAB ══ */}
//         {activeTab === 'overview' && (
//           <div className="space-y-6">
//             <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
//               <StatCard title="Total Sales" value={`₹${totalSales.toLocaleString()}`} isPositive />
//               <StatCard title="Total Expenses" value={`₹${totalExpenses.toLocaleString()}`} />
//               <StatCard title="Net Profit" value={`₹${(totalSales - totalExpenses).toLocaleString()}`} isPositive />
//               <StatCard title="Active Orders" value={sales.filter(s => s.status !== 'delivered').length} />
//             </div>
//           </div>
//         )}

//         {/* ══ STORE SALES TAB (For the Seller) ══ */}
//         {activeTab === 'sales' && (
//           <div className={`p-6 ${cardStyle}`}>
//             <h2 className="font-bold mb-1" style={{ fontFamily: "'Quicksand', sans-serif" }}>Store Sales</h2>
//             <p className="text-sm text-zinc-500 mb-6">Manage incoming orders from your customers.</p>

//             <div className="space-y-3">
//               {sales.map((sale) => (
//                 <div key={sale.id} className="flex flex-col md:flex-row md:items-center justify-between p-4 bg-zinc-50 dark:bg-zinc-950 border border-zinc-100 dark:border-zinc-800/50 rounded-lg gap-4">
//                   <div className="flex-1">
//                     <div className="flex items-center gap-2 mb-1">
//                       <span className="text-xs text-zinc-400 font-bold">{sale.id}</span>
//                       <span className="text-[10px] text-zinc-500">• {sale.date}</span>
//                     </div>
//                     <p className="text-sm font-bold">{sale.item}</p>
//                     <p className="text-xs text-zinc-500">Buyer: <span className="font-semibold text-zinc-700 dark:text-zinc-300">{sale.buyer}</span></p>
//                   </div>
                  
//                   <div className="flex items-center justify-between md:justify-end gap-4 w-full md:w-auto">
//                     <span className="font-bold">₹{sale.amount.toLocaleString()}</span>
                    
//                     {/* Seller Action: Update Status */}
//                     <div className="relative group">
//                       <select 
//                         value={sale.status}
//                         onChange={(e) => updateSaleStatus(sale.id, e.target.value)}
//                         className={`appearance-none text-[11px] font-bold px-3 py-1.5 rounded-md outline-none cursor-pointer border pr-8 ${
//                           sale.status === 'delivered' ? 'bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-900/20 dark:border-emerald-800' :
//                           sale.status === 'shipped' ? 'bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-900/20 dark:border-blue-800' :
//                           'bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-900/20 dark:border-amber-800'
//                         }`}
//                       >
//                         <option value="pending">Pending</option>
//                         <option value="processing">Processing</option>
//                         <option value="shipped">Shipped</option>
//                         <option value="delivered">Delivered</option>
//                       </select>
//                       <ChevronDown size={12} className="absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none opacity-50" />
//                     </div>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>
//         )}

//         {/* ══ MY PURCHASES TAB (For the Buyer) ══ */}
//         {activeTab === 'purchases' && (
//           <div className={`p-6 ${cardStyle}`}>
//             <h2 className="font-bold mb-1" style={{ fontFamily: "'Quicksand', sans-serif" }}>My Purchases</h2>
//             <p className="text-sm text-zinc-500 mb-6">Track artworks and supplies you have ordered.</p>

//             <div className="space-y-3">
//               {purchases.map((purchase) => (
//                 <div key={purchase.id} className="flex flex-col md:flex-row md:items-center justify-between p-4 bg-zinc-50 dark:bg-zinc-950 border border-zinc-100 dark:border-zinc-800/50 rounded-lg gap-4">
//                   <div className="flex-1">
//                     <div className="flex items-center gap-2 mb-1">
//                       <span className="text-xs text-zinc-400 font-bold">{purchase.id}</span>
//                       <span className="text-[10px] text-zinc-500">• {purchase.date}</span>
//                     </div>
//                     <p className="text-sm font-bold">{purchase.item}</p>
//                     <p className="text-xs text-zinc-500">Producer: <span className="font-semibold text-zinc-700 dark:text-zinc-300">{purchase.producer}</span></p>
//                   </div>
                  
//                   <div className="flex items-center justify-between md:justify-end gap-6 w-full md:w-auto">
//                     <span className="font-bold">₹{purchase.amount.toLocaleString()}</span>
                    
//                     {/* Buyer Action: View Status & Message */}
//                     <div className="flex items-center gap-3">
//                       {getStatusBadge(purchase.status)}
//                       <button 
//                         onClick={() => handleMessageProducer(purchase.producer)}
//                         className="p-1.5 text-zinc-400 hover:text-zinc-900 dark:hover:text-white bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 rounded-md transition-colors tooltip"
//                         title="Message Producer"
//                       >
//                         <MessageSquare size={14} />
//                       </button>
//                     </div>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>
//         )}

//         {/* ══ INVENTORY TAB ══ */}
//         {activeTab === 'inventory' && (
//           <div className={`p-6 ${cardStyle}`}>
//             <h2 className="font-bold mb-6" style={{ fontFamily: "'Quicksand', sans-serif" }}>Current Stock</h2>
//             <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
//               {inventory.map((item) => (
//                 <div key={item.id} className="flex justify-between items-center p-4 bg-zinc-50 dark:bg-zinc-950 border border-zinc-100 dark:border-zinc-800/50 rounded-lg">
//                   <div>
//                     <p className="text-sm font-bold">{item.name}</p>
//                     <p className="text-xs text-zinc-500 mt-0.5">SKU: {item.sku}</p>
//                   </div>
//                   <div className="text-right">
//                     <p className="text-sm font-bold">{item.price}</p>
//                     <p className={`text-xs font-bold mt-0.5 ${item.stock > 0 ? 'text-zinc-500' : 'text-red-500'}`}>
//                       {item.stock > 0 ? `${item.stock} in stock` : 'Out of stock'}
//                     </p>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>
//         )}

//         {/* ══ EXPENSES TAB ══ */}
//         {activeTab === 'expenses' && (
//           <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
//             <div className={`md:col-span-2 p-6 h-fit ${cardStyle}`}>
//               <h2 className="font-bold mb-4 flex items-center gap-2" style={{ fontFamily: "'Quicksand', sans-serif" }}>
//                 <Plus size={16} /> Log Expense
//               </h2>
//               <form onSubmit={handleAddExpense} className="space-y-4">
//                 <div>
//                   <label className="block text-xs font-bold text-zinc-500 mb-1.5">Amount (₹)</label>
//                   <input type="number" value={newExpense.amount} onChange={(e) => setNewExpense({...newExpense, amount: e.target.value})} placeholder="e.g. 1500" className="w-full bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-lg px-3 py-2 text-sm outline-none focus:border-zinc-400 transition-colors" />
//                 </div>
//                 <div>
//                   <label className="block text-xs font-bold text-zinc-500 mb-1.5">Category</label>
//                   <input type="text" value={newExpense.category} onChange={(e) => setNewExpense({...newExpense, category: e.target.value})} placeholder="e.g. Materials" className="w-full bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-lg px-3 py-2 text-sm outline-none focus:border-zinc-400 transition-colors" />
//                 </div>
//                 <div>
//                   <label className="block text-xs font-bold text-zinc-500 mb-1.5">Note</label>
//                   <input type="text" value={newExpense.note} onChange={(e) => setNewExpense({...newExpense, note: e.target.value})} placeholder="What was this for?" className="w-full bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-lg px-3 py-2 text-sm outline-none focus:border-zinc-400 transition-colors" />
//                 </div>
//                 <button type="submit" className="w-full bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 font-bold text-sm py-2.5 rounded-lg hover:bg-zinc-800 dark:hover:bg-white transition-colors">Save Expense</button>
//               </form>
//             </div>

//             <div className={`md:col-span-3 p-6 ${cardStyle}`}>
//               <div className="flex justify-between items-end mb-6">
//                 <h2 className="font-bold" style={{ fontFamily: "'Quicksand', sans-serif" }}>Recent Expenses</h2>
//                 <div className="text-right">
//                   <p className="text-xs font-bold text-zinc-500 uppercase">Total Spent</p>
//                   <p className="text-xl font-black text-zinc-900 dark:text-white">₹{totalExpenses.toLocaleString()}</p>
//                 </div>
//               </div>
//               <div className="space-y-3">
//                 {expenses.length === 0 ? (
//                   <p className="text-sm text-zinc-500 italic">No expenses logged yet.</p>
//                 ) : (
//                   expenses.map((exp) => (
//                     <div key={exp.id} className="flex justify-between items-center p-3 bg-zinc-50 dark:bg-zinc-950 border border-zinc-100 dark:border-zinc-800/50 rounded-lg">
//                       <div>
//                         <p className="text-sm font-bold">{exp.category}</p>
//                         {exp.note && <p className="text-xs text-zinc-500 mt-0.5">{exp.note}</p>}
//                       </div>
//                       <span className="font-bold text-sm">₹{exp.amount.toLocaleString()}</span>
//                     </div>
//                   ))
//                 )}
//               </div>
//             </div>
//           </div>
//         )}

//       </main>
//     </div>
//   );
// }

// const StatCard = ({ title, value, isPositive }) => (
//   <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-4 rounded-xl shadow-sm">
//     <p className="text-xs font-bold text-zinc-500 mb-1">{title}</p>
//     <p className="text-xl font-black text-zinc-900 dark:text-white" style={{ fontFamily: "'Quicksand', sans-serif" }}>{value}</p>
//   </div>
// );


import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  TrendingUp, Package, DollarSign, Search, Bell, 
  ShoppingCart, Store, Plus, CheckCircle2, Clock, 
  Truck, MessageSquare, ChevronDown, XCircle, Phone, CheckCircle
} from 'lucide-react';
import { toast, Toaster } from 'sonner';
import Logo from '../../assets/Logo.jpeg'; // Ensure your logo path is correct

export default function MinimalDashboard() {
  const [activeTab, setActiveTab] = useState('sales');
  const [orderView, setOrderView] = useState('sales'); 

  // ─── STATE: EXPENSES ───
  const [expenses, setExpenses] = useState([
    { id: 1, category: 'Materials', amount: 12500, note: 'Canvas & paint' },
    { id: 2, category: 'Shipping', amount: 2800, note: 'International delivery' },
  ]);
  const [newExpense, setNewExpense] = useState({ amount: '', category: '', note: '' });

  const handleAddExpense = (e) => {
    e.preventDefault();
    if (!newExpense.amount || !newExpense.category) return toast.error("Amount and Category required.");
    setExpenses([{ id: Date.now(), amount: Number(newExpense.amount), category: newExpense.category, note: newExpense.note }, ...expenses]);
    setNewExpense({ amount: '', category: '', note: '' });
    toast.success("Expense added");
  };

  // ─── STATE: SALES (Seller View) ───
  const [sales, setSales] = useState([
    { 
      id: 'ORD-001', item: 'Charcoal Study I', amount: 4500, status: 'delivered', date: 'May 14',
      buyer: { name: 'Sarah Chen', phone: '+91 98765 43210', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop&q=60' }
    },
    { 
      id: 'ORD-002', item: 'Graphite Dreams', amount: 6000, status: 'processing', date: 'May 15',
      buyer: { name: 'Marcus Ross', phone: '+91 87654 32109', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=60' }
    },
    { 
      id: 'ORD-003', item: 'Zinc Abstract', amount: 3200, status: 'cancelled', date: 'May 16',
      buyer: { name: 'Elena H.', phone: '+91 76543 21098', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=60' }
    },
  ]);

  const updateSaleStatus = (id, newStatus) => {
    setSales(sales.map(sale => sale.id === id ? { ...sale, status: newStatus } : sale));
    if (newStatus === 'delivered') toast.info("Marked as delivered. Awaiting buyer confirmation.");
    else toast.success(`Order status updated to ${newStatus}`);
  };

  // ─── STATE: PURCHASES (Buyer View) ───
  const [purchases, setPurchases] = useState([
    { 
      id: 'PUR-001', item: 'Premium Canvas Pack', amount: 2500, status: 'delivered', date: 'May 12',
      producer: { name: 'Art Supplies Co.', avatar: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=100&auto=format&fit=crop&q=60' }
    },
    { 
      id: 'PUR-002', item: 'Charcoal Sticks', amount: 1800, status: 'pending', date: 'May 15',
      producer: { name: 'Ink Masters', avatar: 'https://images.unsplash.com/photo-1500462918059-b1a0cb512f1d?w=100&auto=format&fit=crop&q=60' }
    },
  ]);

  const handleCancelPurchase = (id) => {
    setPurchases(purchases.map(p => p.id === id ? { ...p, status: 'cancelled' } : p));
    toast.error("Order has been cancelled.");
  };

  const handleConfirmReceipt = (id) => {
    setPurchases(purchases.map(p => p.id === id ? { ...p, status: 'completed' } : p));
    toast.success("Delivery confirmed! Order is now completed.");
  };

  const handleMessage = (personName) => {
    toast.info(`Opening chat with ${personName}...`);
  };

  // ─── STATS & HELPERS ───
  const activeSalesCount = sales.filter(s => s.status === 'pending' || s.status === 'processing' || s.status === 'shipped').length;
  // Calculate total sales only for completed/delivered items
  const totalSales = sales.reduce((sum, sale) => (sale.status !== 'cancelled' ? sum + sale.amount : sum), 0);
  const totalExpenses = expenses.reduce((sum, exp) => sum + exp.amount, 0);

  const cardStyle = "bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl shadow-sm";

  const getStatusBadge = (status) => {
    switch(status) {
      case 'completed': return <span className="flex items-center gap-1 text-[11px] font-bold text-emerald-700 bg-emerald-100 dark:bg-emerald-900/30 dark:text-emerald-400 px-2.5 py-1 rounded-md"><CheckCircle size={12}/> Confirmed</span>;
      case 'delivered': return <span className="flex items-center gap-1 text-[11px] font-bold text-indigo-700 bg-indigo-50 dark:bg-indigo-900/20 dark:text-indigo-400 px-2.5 py-1 rounded-md"><CheckCircle2 size={12}/> Delivered</span>;
      case 'shipped': return <span className="flex items-center gap-1 text-[11px] font-bold text-blue-700 bg-blue-50 dark:bg-blue-900/20 dark:text-blue-400 px-2.5 py-1 rounded-md"><Truck size={12}/> Shipped</span>;
      case 'processing': return <span className="flex items-center gap-1 text-[11px] font-bold text-amber-700 bg-amber-50 dark:bg-amber-900/20 dark:text-amber-400 px-2.5 py-1 rounded-md"><Clock size={12}/> Processing</span>;
      case 'cancelled': return <span className="flex items-center gap-1 text-[11px] font-bold text-red-700 bg-red-50 dark:bg-red-900/20 dark:text-red-400 px-2.5 py-1 rounded-md"><XCircle size={12}/> Cancelled</span>;
      default: return <span className="flex items-center gap-1 text-[11px] font-bold text-zinc-600 bg-zinc-100 dark:bg-zinc-800 dark:text-zinc-300 px-2.5 py-1 rounded-md"><Clock size={12}/> Pending</span>;
    }
  };

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-50 font-sans transition-colors duration-300 pb-12">
      <Toaster position="top-center" richColors theme="system" />

      {/* Navbar */}
      <nav className="sticky top-0 z-40 w-full backdrop-blur-xl bg-white/80 dark:bg-zinc-950/80 border-b border-zinc-200 dark:border-zinc-800 px-4 md:px-6 py-3 flex items-center justify-between">
        <div className='w-full max-w-7xl mx-auto flex items-center justify-between'>
          <Link to={'/'} className="flex items-center gap-3">
            <div className="w-8 h-8 bg-zinc-900 dark:bg-zinc-100 rounded-lg flex items-center justify-center overflow-hidden">
              <img src={Logo} alt="Logo" className="w-full h-full object-cover" />
            </div>
            <span className="font-bold text-lg tracking-tight hidden sm:block" style={{ fontFamily: "'Quicksand', sans-serif" }}>Painters' Diary</span>
          </Link>
          
          <div className="flex items-center gap-2">
            <div className="hidden md:flex items-center gap-2 bg-zinc-100 dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-800 px-3 py-1.5 rounded-lg">
              <Search size={16} className="text-zinc-400" />
              <input type="text" placeholder="Search orders..." className="bg-transparent border-none outline-none text-sm w-48 text-zinc-700 dark:text-zinc-300 placeholder:text-zinc-400" />
            </div>
            <div className='md:hidden block relative p-2 text-zinc-500 hover:text-zinc-900 dark:hover:text-white transition-colors'>
              <Search size={20}/>
            </div>
            <Link to={'/notification'} className="relative p-2 text-zinc-500 hover:text-zinc-900 dark:hover:text-white transition-colors">
              <Bell size={20} />
            </Link>
          </div>
        </div>
      </nav>

      {/* Main Content Area */}
      <main className="max-w-5xl mx-auto px-4 sm:px-6 py-8">
        
        {/* Header & Tabs */}
        <div className="mb-8">
          <h1 className="text-2xl font-black mb-6" style={{ fontFamily: "'Quicksand', sans-serif" }}>Dashboard</h1>
          
          <div className="flex items-center gap-2 overflow-x-auto pb-2 no-scrollbar">
            {[
              { id: 'overview', label: 'Overview', icon: TrendingUp },
              { id: 'sales', label: 'Store Sales', icon: Store },
              { id: 'purchases', label: 'My Purchases', icon: ShoppingCart },
              { id: 'expenses', label: 'Expenses', icon: DollarSign },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-lg font-bold text-sm transition-all duration-200 whitespace-nowrap ${
                  activeTab === tab.id
                    ? 'bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 shadow-sm'
                    : 'bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-zinc-500 hover:text-zinc-900 dark:hover:text-white'
                }`}
                style={{ fontFamily: "'Quicksand', sans-serif" }}
              >
                <tab.icon size={16} />
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* ══ OVERVIEW TAB ══ */}
        {activeTab === 'overview' && (
          <div className="space-y-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <StatCard title="Total Revenue" value={`₹${totalSales.toLocaleString()}`} isPositive />
              <StatCard title="Total Expenses" value={`₹${totalExpenses.toLocaleString()}`} />
              <StatCard title="Net Profit" value={`₹${(totalSales - totalExpenses).toLocaleString()}`} isPositive />
              <StatCard title="Active Orders" value={activeSalesCount} />
            </div>
          </div>
        )}

        {/* ══ STORE SALES TAB (Seller View) ══ */}
        {activeTab === 'sales' && (
          <div className={`p-6 ${cardStyle}`}>
            <h2 className="font-bold mb-1" style={{ fontFamily: "'Quicksand', sans-serif" }}>Store Sales</h2>
            <p className="text-sm text-zinc-500 mb-6">Manage incoming orders and contact buyers.</p>

            <div className="space-y-4">
              {sales.map((sale) => (
                <div key={sale.id} className="flex flex-col md:flex-row md:items-center justify-between p-4 bg-zinc-50 dark:bg-zinc-950/50 border border-zinc-100 dark:border-zinc-800/60 rounded-xl gap-4 transition-all">
                  
                  {/* Left: Buyer Profile & Item */}
                  <div className="flex gap-4 items-center">
                    <img src={sale.buyer.avatar} alt="Buyer" className="w-12 h-12 rounded-full object-cover border border-zinc-200 dark:border-zinc-800 shrink-0" />
                    <div>
                      <div className="flex items-center gap-2 mb-0.5">
                        <span className="text-xs font-bold text-zinc-400">{sale.id}</span>
                        <span className="text-[10px] text-zinc-500 font-medium">• {sale.date}</span>
                      </div>
                      <p className="text-sm font-bold text-zinc-900 dark:text-zinc-100 mb-1">{sale.item}</p>
                      <div className="flex flex-wrap items-center gap-2 text-xs">
                        <span className="font-bold text-zinc-700 dark:text-zinc-300">{sale.buyer.name}</span>
                        <span className="text-zinc-400">|</span>
                        <span className="text-zinc-500 flex items-center gap-1"><Phone size={10}/> {sale.buyer.phone}</span>
                      </div>
                    </div>
                  </div>
                  
                  {/* Right: Status & Actions */}
                  <div className="flex items-center justify-between md:justify-end gap-4 w-full md:w-auto pt-2 md:pt-0 border-t border-zinc-200 dark:border-zinc-800 md:border-none">
                    <span className="font-black" style={{ fontFamily: "'Quicksand', sans-serif" }}>₹{sale.amount.toLocaleString()}</span>
                    
                    {/* Status Logic */}
                    {sale.status === 'completed' || sale.status === 'cancelled' ? (
                      getStatusBadge(sale.status)
                    ) : (
                      <div className="relative group">
                        <select 
                          value={sale.status}
                          onChange={(e) => updateSaleStatus(sale.id, e.target.value)}
                          className="appearance-none text-[11px] font-bold px-3 py-1.5 rounded-md outline-none cursor-pointer border bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-700 pr-8 shadow-sm"
                        >
                          <option value="pending">Pending</option>
                          <option value="processing">Processing</option>
                          <option value="shipped">Shipped</option>
                          <option value="delivered">Delivered</option>
                          <option value="cancelled">Cancel Order</option>
                        </select>
                        <ChevronDown size={12} className="absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none opacity-50" />
                      </div>
                    )}
                    
                    {/* Message Buyer */}
                    <button 
                      onClick={() => handleMessage(sale.buyer.name)}
                      className="p-2 text-zinc-500 hover:text-zinc-900 dark:hover:text-white bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-md shadow-sm transition-colors"
                      title="Message Buyer"
                    >
                      <MessageSquare size={16} />
                    </button>
                  </div>

                </div>
              ))}
            </div>
          </div>
        )}

        {/* ══ MY PURCHASES TAB (Buyer View) ══ */}
        {activeTab === 'purchases' && (
          <div className={`p-6 ${cardStyle}`}>
            <h2 className="font-bold mb-1" style={{ fontFamily: "'Quicksand', sans-serif" }}>My Purchases</h2>
            <p className="text-sm text-zinc-500 mb-6">Track your orders and confirm delivery receipts.</p>

            <div className="space-y-4">
              {purchases.map((purchase) => (
                <div key={purchase.id} className="flex flex-col md:flex-row md:items-center justify-between p-4 bg-zinc-50 dark:bg-zinc-950/50 border border-zinc-100 dark:border-zinc-800/60 rounded-xl gap-4 transition-all">
                  
                  {/* Left: Producer Profile & Item */}
                  <div className="flex gap-4 items-center">
                    <img src={purchase.producer.avatar} alt="Producer" className="w-12 h-12 rounded-full object-cover border border-zinc-200 dark:border-zinc-800 shrink-0" />
                    <div>
                      <div className="flex items-center gap-2 mb-0.5">
                        <span className="text-xs font-bold text-zinc-400">{purchase.id}</span>
                        <span className="text-[10px] text-zinc-500 font-medium">• {purchase.date}</span>
                      </div>
                      <p className="text-sm font-bold text-zinc-900 dark:text-zinc-100 mb-1">{purchase.item}</p>
                      <p className="text-xs text-zinc-500">Producer: <span className="font-bold text-zinc-700 dark:text-zinc-300">{purchase.producer.name}</span></p>
                    </div>
                  </div>
                  
                  {/* Right: Actions */}
                  <div className="flex items-center justify-between md:justify-end gap-4 w-full md:w-auto pt-2 md:pt-0 border-t border-zinc-200 dark:border-zinc-800 md:border-none">
                    <span className="font-black mr-2" style={{ fontFamily: "'Quicksand', sans-serif" }}>₹{purchase.amount.toLocaleString()}</span>
                    
                    {getStatusBadge(purchase.status)}

                    <div className="flex items-center gap-2">
                      {/* Confirm Receipt (Only if Delivered) */}
                      {purchase.status === 'delivered' && (
                        <button 
                          onClick={() => handleConfirmReceipt(purchase.id)}
                          className="px-3 py-1.5 bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 text-[11px] font-bold rounded-md shadow-sm hover:scale-105 transition-transform"
                        >
                          Confirm Receipt
                        </button>
                      )}

                      {/* Cancel Order (Only if Pending/Processing) */}
                      {(purchase.status === 'pending' || purchase.status === 'processing') && (
                        <button 
                          onClick={() => handleCancelPurchase(purchase.id)}
                          className="p-1.5 text-zinc-400 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-950/30 rounded-md transition-colors"
                          title="Cancel Order"
                        >
                          <XCircle size={18} />
                        </button>
                      )}

                      {/* Message Producer */}
                      <button 
                        onClick={() => handleMessage(purchase.producer.name)}
                        className="p-1.5 text-zinc-500 hover:text-zinc-900 dark:hover:text-white bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-md shadow-sm transition-colors"
                        title="Message Producer"
                      >
                        <MessageSquare size={18} />
                      </button>
                    </div>
                  </div>

                </div>
              ))}
            </div>
          </div>
        )}

        {/* ══ EXPENSES TAB ══ */}
        {activeTab === 'expenses' && (
          <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
            <div className={`md:col-span-2 p-6 h-fit ${cardStyle}`}>
              <h2 className="font-bold mb-4 flex items-center gap-2" style={{ fontFamily: "'Quicksand', sans-serif" }}>
                <Plus size={16} /> Log Expense
              </h2>
              <form onSubmit={handleAddExpense} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-zinc-500 mb-1.5">Amount (₹)</label>
                  <input type="number" value={newExpense.amount} onChange={(e) => setNewExpense({...newExpense, amount: e.target.value})} placeholder="e.g. 1500" className="w-full bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-lg px-3 py-2 text-sm outline-none focus:border-zinc-400 transition-colors" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-zinc-500 mb-1.5">Category</label>
                  <input type="text" value={newExpense.category} onChange={(e) => setNewExpense({...newExpense, category: e.target.value})} placeholder="e.g. Materials" className="w-full bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-lg px-3 py-2 text-sm outline-none focus:border-zinc-400 transition-colors" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-zinc-500 mb-1.5">Note</label>
                  <input type="text" value={newExpense.note} onChange={(e) => setNewExpense({...newExpense, note: e.target.value})} placeholder="What was this for?" className="w-full bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-lg px-3 py-2 text-sm outline-none focus:border-zinc-400 transition-colors" />
                </div>
                <button type="submit" className="w-full bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 font-bold text-sm py-2.5 rounded-lg hover:bg-zinc-800 dark:hover:bg-white transition-colors">Save Expense</button>
              </form>
            </div>

            <div className={`md:col-span-3 p-6 ${cardStyle}`}>
              <div className="flex justify-between items-end mb-6">
                <h2 className="font-bold" style={{ fontFamily: "'Quicksand', sans-serif" }}>Recent Expenses</h2>
                <div className="text-right">
                  <p className="text-xs font-bold text-zinc-500 uppercase">Total Spent</p>
                  <p className="text-xl font-black text-zinc-900 dark:text-white">₹{totalExpenses.toLocaleString()}</p>
                </div>
              </div>
              <div className="space-y-3">
                {expenses.length === 0 ? (
                  <p className="text-sm text-zinc-500 italic">No expenses logged yet.</p>
                ) : (
                  expenses.map((exp) => (
                    <div key={exp.id} className="flex justify-between items-center p-3 bg-zinc-50 dark:bg-zinc-950 border border-zinc-100 dark:border-zinc-800/50 rounded-lg">
                      <div>
                        <p className="text-sm font-bold">{exp.category}</p>
                        {exp.note && <p className="text-xs text-zinc-500 mt-0.5">{exp.note}</p>}
                      </div>
                      <span className="font-bold text-sm">₹{exp.amount.toLocaleString()}</span>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        )}

      </main>
    </div>
  );
}

const StatCard = ({ title, value, isPositive }) => (
  <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-4 rounded-xl shadow-sm">
    <p className="text-xs font-bold text-zinc-500 mb-1">{title}</p>
    <p className="text-xl font-black text-zinc-900 dark:text-white" style={{ fontFamily: "'Quicksand', sans-serif" }}>{value}</p>
  </div>
);