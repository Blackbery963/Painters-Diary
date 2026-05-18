import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Bell, Search, UserPlus, Package, Image as ImageIcon, 
  BookOpen, Heart, CheckCircle2, DollarSign, MoreHorizontal,
  ShoppingCart,
  Box
} from 'lucide-react';
import { toast, Toaster } from 'sonner';
import Logo from '../../assets/Logo.jpeg'

export default function NotificationsPage() {
  const [filter, setFilter] = useState('all'); // 'all', 'orders', 'social'
  
  // Mock Notification Data
  const [notifications, setNotifications] = useState([
    { 
      id: 1, type: 'order', category: 'orders', isRead: false, time: '10 mins ago', 
      title: 'Order Delivered', 
      message: 'Your purchase of "Premium Canvas Pack" has been delivered.', 
      icon: Package, 
      actionText: 'View Order' 
    },
    { 
      id: 2, type: 'follow', category: 'social', isRead: false, time: '2 hours ago', 
      title: 'New Follower', 
      message: 'Elena R. started following you.', 
      userAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop&q=60', 
      actionText: 'Follow Back' 
    },
    { 
      id: 3, type: 'sale', category: 'orders', isRead: true, time: '5 hours ago', 
      title: 'New Sale!', 
      message: 'You sold "Zinc Abstract" to David Kim.', 
      icon: DollarSign, 
      thumbnail: 'https://images.unsplash.com/photo-1500462918059-b1a0cb512f1d?auto=format&fit=crop&q=80&w=100&grayscale',
      actionText: 'View Details' 
    },
    { 
      id: 4, type: 'post', category: 'social', isRead: true, time: 'Yesterday', 
      title: 'New Artwork', 
      message: 'Marcus T. posted a new artwork: "Graphite Dreams".', 
      userAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=60', 
      thumbnail: 'https://images.unsplash.com/photo-1550684848-fac1c5b4e853?auto=format&fit=crop&q=80&w=100&grayscale' 
    },
    { 
      id: 5, type: 'like', category: 'social', isRead: true, time: 'Yesterday', 
      title: 'New Like', 
      message: 'Sarah Chen liked your artwork "Charcoal Study I".', 
      userAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=60', 
      thumbnail: 'https://images.unsplash.com/photo-1547826039-bfc35e0f1ea8?auto=format&fit=crop&q=80&w=100&grayscale' 
    },
    { 
      id: 6, type: 'diary', category: 'social', isRead: true, time: '2 days ago', 
      title: 'New Diary Entry', 
      message: 'Aarav K. published: "Late Night Studio Thoughts".', 
      userAvatar: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=100&auto=format&fit=crop&q=60',
      actionText: 'Read Entry' 
    },
  ]);

  // Actions
  const markAllAsRead = () => {
    setNotifications(notifications.map(n => ({ ...n, isRead: true })));
    toast.success("All notifications marked as read");
  };

  const markAsRead = (id) => {
    setNotifications(notifications.map(n => n.id === id ? { ...n, isRead: true } : n));
  };

  const filteredNotifications = notifications.filter(n => filter === 'all' || n.category === filter);

  // Helper to render the left-side icon or avatar
  const renderIcon = (notif) => {
    if (notif.userAvatar) {
      return (
        <div className="relative">
          <img src={notif.userAvatar} alt="User" className="w-10 h-10 rounded-full object-cover border border-zinc-200 dark:border-zinc-700" />
          {/* Small badge icon on bottom right of avatar */}
          <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-white dark:bg-zinc-900 rounded-full flex items-center justify-center border border-zinc-200 dark:border-zinc-800">
            {notif.type === 'follow' && <UserPlus size={10} className="text-zinc-900 dark:text-white" />}
            {notif.type === 'post' && <ImageIcon size={10} className="text-zinc-900 dark:text-white" />}
            {notif.type === 'like' && <Heart size={10} className="text-zinc-900 dark:text-white" />}
            {notif.type === 'diary' && <BookOpen size={10} className="text-zinc-900 dark:text-white" />}
          </div>
        </div>
      );
    }
    
    // Fallback icon for non-social notifications (like orders)
    const IconComponent = notif.icon;
    return (
      <div className="w-10 h-10 rounded-full bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center border border-zinc-200 dark:border-zinc-700">
        <IconComponent size={18} className="text-zinc-700 dark:text-zinc-300" />
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-50 font-sans transition-colors duration-300">
      <Toaster position="top-center" richColors theme="system" />

      {/* Navbar (Reused minimalist nav) */}
      <nav className="sticky top-0 z-40 w-full backdrop-blur-xl bg-white/80 dark:bg-zinc-950/80 border-b border-zinc-200 dark:border-zinc-800 px-4 md:px-6 py-3 flex items-center justify-between">
        <div className=' w-full max-w-7xl flex items-center justify-between mx-auto'> 
        <Link to={'/'} className="flex items-center gap-3">
          <div className="w-8 h-8 bg-zinc-900 dark:bg-zinc-100 rounded-lg flex items-center justify-center overflow-hidden">
            <img src={Logo} alt="" />
          </div>
          <span className="font-bold text-lg tracking-tight hidden sm:block font-Eagle">
            Painters' Diary
          </span>
        </Link>
        
        <div className="flex items-center gap-4">
          <div className="hidden md:flex items-center gap-2 bg-zinc-100 dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-800 px-3 py-1.5 rounded-lg">
            <Search size={16} className="text-zinc-400" />
            <input 
              type="text" 
              placeholder="Search anything..." 
              className="bg-transparent border-none outline-none text-sm w-48 text-zinc-700 dark:text-zinc-300 placeholder:text-zinc-400" 
            />
          </div>
          <div className=' flex items-center justify-between gap-1'>
          <Link to={'/cart-dashboard'} className="p-2 text-zinc-900 dark:text-white transition-colors">
            <ShoppingCart size={20} />
          </Link>
          <Link to={'/order-dashboard'} className="p-2 text-zinc-900 dark:text-white transition-colors">
            <Box size={20} />
          </Link>
          </div>
        </div>
        </div>
      </nav>

      {/* Main Content Area */}
      <main className="max-w-3xl mx-auto px-4 sm:px-6 py-8">
        
        {/* Header & Controls */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-6 gap-4">
          <div>
            <h1 className="text-2xl font-black mb-1" style={{ fontFamily: "'Quicksand', sans-serif" }}>Notifications</h1>
            <p className="text-sm text-zinc-500 font-medium">Stay updated with your store and network.</p>
          </div>
          <button 
            onClick={markAllAsRead}
            className="flex items-center gap-1.5 text-xs font-bold text-zinc-500 hover:text-zinc-900 dark:hover:text-white transition-colors"
          >
            <CheckCircle2 size={14} /> Mark all as read
          </button>
        </div>

        {/* Filter Tabs */}
        <div className="flex items-center gap-2 mb-6">
          {['all', 'orders', 'social'].map((tab) => (
            <button
              key={tab}
              onClick={() => setFilter(tab)}
              className={`px-4 py-2 rounded-lg font-bold text-sm capitalize transition-all duration-200 ${
                filter === tab
                  ? 'bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 shadow-sm'
                  : 'bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-zinc-500 hover:text-zinc-900 dark:hover:text-white'
              }`}
              style={{ fontFamily: "'Quicksand', sans-serif" }}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Notifications List */}
        <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl shadow-sm overflow-hidden flex flex-col">
          {filteredNotifications.length === 0 ? (
            <div className="p-10 text-center flex flex-col items-center">
              <Bell size={32} className="text-zinc-300 dark:text-zinc-700 mb-3" />
              <p className="text-sm font-bold text-zinc-500">No notifications found.</p>
            </div>
          ) : (
            filteredNotifications.map((notif, index) => (
              <div 
                key={notif.id}
                onClick={() => markAsRead(notif.id)}
                className={`relative flex items-start gap-4 p-4 md:p-5 cursor-pointer transition-colors ${
                  !notif.isRead 
                    ? 'bg-zinc-50 dark:bg-zinc-800/30' 
                    : 'hover:bg-zinc-50 dark:hover:bg-zinc-900/50'
                } ${
                  index !== filteredNotifications.length - 1 ? 'border-b border-zinc-100 dark:border-zinc-800/60' : ''
                }`}
              >
                {/* Unread Indicator Dot */}
                {!notif.isRead && (
                  <div className="absolute top-1/2 -translate-y-1/2 left-1.5 w-1.5 h-1.5 rounded-full bg-zinc-900 dark:bg-zinc-100"></div>
                )}

                {/* Left: Icon / Avatar */}
                <div className="shrink-0 pl-2 sm:pl-0">
                  {renderIcon(notif)}
                </div>

                {/* Middle: Content */}
                <div className="flex-1 min-w-0 pt-0.5">
                  <div className="flex items-center justify-between gap-2 mb-0.5">
                    <p className="text-sm font-bold text-zinc-900 dark:text-zinc-100" style={{ fontFamily: "'Quicksand', sans-serif" }}>
                      {notif.title}
                    </p>
                    <span className="text-[11px] font-bold text-zinc-400 whitespace-nowrap">
                      {notif.time}
                    </span>
                  </div>
                  
                  <p className="text-[13px] text-zinc-600 dark:text-zinc-400 leading-relaxed" style={{ fontFamily: "'Playfair Display', serif" }}>
                    {notif.message}
                  </p>

                  {/* Optional Action Button (e.g. Follow back, View Order) */}
                  {notif.actionText && (
                    <button className="mt-3 px-4 py-1.5 bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 text-zinc-900 dark:text-zinc-100 text-xs font-bold rounded-md transition-colors w-fit">
                      {notif.actionText}
                    </button>
                  )}
                </div>

                {/* Right: Thumbnail (if applicable) or Options */}
                <div className="shrink-0 flex flex-col items-end gap-2">
                  <button className="text-zinc-400 hover:text-zinc-900 dark:hover:text-white transition-colors opacity-0 md:opacity-100 md:group-hover:opacity-100">
                    <MoreHorizontal size={18} />
                  </button>
                  {notif.thumbnail && (
                    <img 
                      src={notif.thumbnail} 
                      alt="Thumbnail" 
                      className="w-12 h-12 object-cover rounded-md border border-zinc-200 dark:border-zinc-700 mt-1" 
                    />
                  )}
                </div>

              </div>
            ))
          )}
        </div>

      </main>
    </div>
  );
}