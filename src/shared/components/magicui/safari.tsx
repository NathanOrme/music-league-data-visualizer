'use client';

import { cn } from '@/shared/lib/utils';

export interface SafariProps {
  className?: string;
  url?: string;
  src?: string;
  width?: number;
  height?: number;
  children?: React.ReactNode;
}

export function Safari({
  className,
  url = 'https://magicui.design',
  src,
  width = 1200,
  height = 750,
  children,
}: SafariProps) {
  return (
    <div
      className={cn(
        'relative mx-auto overflow-hidden rounded-t-xl bg-gray-100 shadow-2xl',
        className,
      )}
      style={{
        width: width,
        height: height + 40, // Add space for browser chrome
      }}
    >
      {/* Browser Chrome */}
      <div className="flex h-10 items-center justify-between bg-gray-200 px-4">
        {/* Traffic Light Buttons */}
        <div className="flex space-x-2">
          <div className="h-3 w-3 rounded-full bg-red-500" />
          <div className="h-3 w-3 rounded-full bg-yellow-500" />
          <div className="h-3 w-3 rounded-full bg-green-500" />
        </div>

        {/* URL Bar */}
        <div className="flex-1 mx-8">
          <div className="flex items-center rounded-md bg-white px-3 py-1 shadow-sm border border-gray-300">
            <svg
              className="h-4 w-4 text-gray-400 mr-2"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path d="M12 15l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2M3 12a9 9 0 1118 0 9 9 0 01-18 0z" />
            </svg>
            <span className="text-sm text-gray-600 truncate">
              {url}
            </span>
          </div>
        </div>

        {/* Browser Actions */}
        <div className="flex items-center space-x-2">
          <button className="p-1 rounded hover:bg-gray-300 transition-colors">
            <svg
              className="h-4 w-4 text-gray-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
              />
            </svg>
          </button>
          <button className="p-1 rounded hover:bg-gray-300 transition-colors">
            <svg
              className="h-4 w-4 text-gray-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z"
              />
            </svg>
          </button>
        </div>
      </div>

      {/* Content Area */}
      <div className="h-full bg-white">
        {src ? (
          <img
            src={src}
            alt="Safari content"
            className="h-full w-full object-cover object-top"
            style={{ height: height }}
          />
        ) : (
          <div
            className="flex h-full w-full items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100"
            style={{ height: height }}
          >
            {children || (
              <div className="text-center">
                <div className="mb-4 text-6xl">🌐</div>
                <h2 className="text-2xl font-semibold text-gray-800 mb-2">
                  Safari Browser Mockup
                </h2>
                <p className="text-gray-600">
                  Add your content here or use the src prop
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
