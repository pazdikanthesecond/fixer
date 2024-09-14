import { Bolt, FlaskConical, User } from 'lucide-react';
import { useState, useRef, useEffect } from 'preact/hooks';
import { useTranslation } from 'react-i18next';

export default function GameHomePage() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const sidebarRef = useRef<HTMLElement | null>(null);
  const toggleButtonRef = useRef<HTMLButtonElement | null>(null);

  const { t } = useTranslation();

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        isSidebarOpen &&
        sidebarRef.current &&
        !sidebarRef.current.contains(event.target as Node) &&
        toggleButtonRef.current &&
        !toggleButtonRef.current.contains(event.target as Node)
      ) {
        setIsSidebarOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isSidebarOpen]);

  return (
    <div className="flex flex-col h-screen bg-gray-100">
      {/* Adjust main content based on whether banner exists */}
      <div className={`flex-1`}>
        <div className="flex h-full">
          {/* Overlay */}
          {isSidebarOpen && (
            <div
              className="fixed inset-0 bg-black bg-opacity-50 z-20 lg:hidden"
              onClick={() => setIsSidebarOpen(false)}
            ></div>
          )}

          {/* Left Sidebar */}
          <aside
            ref={sidebarRef}
            className={`w-64 bg-gray-800 text-white p-4 fixed lg:static h-full z-30 flex flex-col justify-between transition-transform duration-300 ease-in-out ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0`}
          >
            <div>
              <h1 className="text-2xl font-bold mb-4">{t('game_name')}</h1>
              <nav>
                <ul className="space-y-2">
                  <li><a href="#" className="block py-2 px-4 hover:bg-gray-700 rounded">{t('page_title_home')}</a></li>
                  <li><a href="#" className="block py-2 px-4 hover:bg-gray-700 rounded">{t('page_title_database')}</a></li>
                </ul>
              </nav>
            </div>

            <div className="flex justify-center space-x-4 mb-4">
              <button className="p-2 hover:bg-gray-700 rounded-full" aria-label={t('debug_mode_title')}>
                <FlaskConical />
              </button>
              <button className="p-2 hover:bg-gray-700 rounded-full" aria-label={t('settings_title')}>
                <Bolt />
              </button>
              <button className="p-2 hover:bg-gray-700 rounded-full" aria-label={t('account_title')}>
                <User />
              </button>
            </div>
          </aside>

          <div className="flex flex-col flex-1">
            {/* Top Bar */}
            <header className="bg-white shadow-md p-4 flex justify-between items-center">
              <h1 className="text-xl font-bold">{t('page_title_home')}</h1>
              <div className="flex items-center">
                <button
                  ref={toggleButtonRef}
                  onClick={toggleSidebar}
                  className="lg:hidden mr-4"
                  aria-label={t('toggle_sidebar_title')}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                </button>
              </div>
            </header>

            {/* Main Content Area */}
            <main className="flex-1 p-6 overflow-auto">
              <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-lg font-semibold mb-4">{t('welcome_notice')}</h3>
                <div className="text-gray-600">
                  <p>{t('newNotifications', { count: 0 })}</p>
                  <p>{t('newNotifications', { count: 1 })}</p>
                  <p>{t('newNotifications', { count: 20 })}</p>
                </div>
              </div>
            </main>
          </div>
        </div>
      </div>
    </div>
  );
}
