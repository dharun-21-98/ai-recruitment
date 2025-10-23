
import React, { useState } from 'react';
import { Page, Notification } from '../types';
import { NAV_ITEMS, MOCK_NOTIFICATIONS } from '../constants';

interface HeaderProps {
  currentPage: Page;
  navigateTo: (page: Page) => void;
}

const BellIcon: React.FC<{className?: string}> = ({className}) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className || "w-6 h-6"}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0" />
  </svg>
);

const UserCircleIcon: React.FC<{className?: string}> = ({className}) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className || "w-6 h-6"}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
);

const NotificationsHub: React.FC<{ notifications: Notification[] }> = ({ notifications }) => {
    return (
        <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-xl z-20 border border-brand-gray-200">
            <div className="p-4 border-b">
                <h3 className="font-semibold text-brand-gray-800">Notifications</h3>
            </div>
            <div className="divide-y divide-brand-gray-100 max-h-96 overflow-y-auto">
                {notifications.map(n => (
                    <div key={n.id} className={`p-4 hover:bg-brand-gray-50 ${!n.read ? 'bg-brand-blue-50' : ''}`}>
                        <p className="text-sm text-brand-gray-700">{n.message}</p>
                        <p className="text-xs text-brand-gray-400 mt-1">{n.timestamp}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

const Header: React.FC<HeaderProps> = ({ currentPage, navigateTo }) => {
  const [showNotifications, setShowNotifications] = useState(false);
  const unreadCount = MOCK_NOTIFICATIONS.filter(n => !n.read).length;

  return (
    <header className="bg-white shadow-sm sticky top-0 z-10">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <div className="flex-shrink-0 flex items-center gap-2">
              <img src="https://i.ibb.co/chHwdGbr/1.png" alt="Timeless_logo" className="w-8 h-8 object-contain"/>
              <span className="text-xl font-bold text-brand-gray-800">Timeless AI</span>
            </div>
            <nav className="hidden md:ml-10 md:flex md:space-x-8">
              {NAV_ITEMS.map(item => (
                <button
                  key={item}
                  onClick={() => navigateTo(item)}
                  className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium ${
                    currentPage === item
                      ? 'border-brand-blue-500 text-brand-gray-900'
                      : 'border-transparent text-brand-gray-500 hover:border-brand-gray-300 hover:text-brand-gray-700'
                  }`}
                >
                  {item}
                </button>
              ))}
            </nav>
          </div>
          <div className="flex items-center">
            <div className="relative">
                 <button onClick={() => setShowNotifications(!showNotifications)} className="p-1 rounded-full text-brand-gray-400 hover:text-brand-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-blue-500">
                    <span className="sr-only">View notifications</span>
                    <BellIcon className="h-6 w-6" />
                    {unreadCount > 0 && <span className="absolute top-0 right-0 block h-2 w-2 rounded-full bg-red-500 ring-2 ring-white"></span>}
                </button>
                {showNotifications && <NotificationsHub notifications={MOCK_NOTIFICATIONS} />}
            </div>
            <div className="ml-4">
                 <UserCircleIcon className="h-8 w-8 text-brand-gray-400"/>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
