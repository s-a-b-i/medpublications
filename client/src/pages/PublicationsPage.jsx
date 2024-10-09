import React, { useState, useEffect, useContext, useCallback } from 'react';
import { ThemeContext } from '../components/ThemeContext';
import { fetchPublications as fetchPublicationsFromService } from '../utils/apiService';
import LazyLoad from 'react-lazyload';

const PublicationCard = React.memo(({ pub, theme, getFilePreview }) => (
  <li
    className={`rounded-lg shadow-md overflow-hidden ${
      theme === 'dark' ? 'bg-gray-800' : 'bg-white'
    } transition-transform duration-300 ease-in-out transform hover:scale-105`}
  >
    <LazyLoad height={300} once offset={100} placeholder={<LoadingPlaceholder />}>
      {getFilePreview(pub.fileUrl)}
    </LazyLoad>
    <div className="p-6">
      <h3 className="text-xl font-semibold mb-2">{pub.title}</h3>
      <p className="mb-4 text-sm">
        {pub.description.length > 100
          ? `${pub.description.substring(0, 100)}...`
          : pub.description}
      </p>
      <a
        href={pub.fileUrl}
        target="_blank"
        rel="noopener noreferrer"
        className={`inline-block px-4 py-2 rounded ${
          theme === 'dark'
            ? 'bg-blue-600 hover:bg-blue-700'
            : 'bg-blue-500 hover:bg-blue-600'
        } text-white transition duration-300 ease-in-out`}
      >
        View Publication
      </a>
    </div>
  </li>
));

const LoadingPlaceholder = () => (
  <div className="w-full h-64 bg-gray-300 animate-pulse rounded-t-lg"></div>
);

const PublicationsPage = () => {
  const [publications, setPublications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { theme } = useContext(ThemeContext);

  const fetchPublications = useCallback(async () => {
    try {
      const data = await fetchPublicationsFromService();
      setPublications(Array.isArray(data) ? data : []);
      setError(null);
    } catch (error) {
      console.error('Error fetching publications:', error);
      setError('Failed to fetch publications. Please try again later.');
      setPublications([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchPublications();
  }, [fetchPublications]);

  const getFilePreview = useCallback((fileUrl) => {
    const fileExtension = fileUrl.split(".").pop().toLowerCase();

    if (["jpg", "jpeg", "png", "gif"].includes(fileExtension)) {
      return (
        <img
          src={fileUrl}
          alt="Publication preview"
          className="w-full h-64 object-cover rounded-t-lg"
          loading="lazy"
        />
      );
    } else if (fileExtension === "pdf") {
      return (
        <div className="w-full flex items-center justify-center bg-gray-200 rounded-t-lg">
          <iframe
            src={`${fileUrl}#page=1`}
            title="PDF Preview"
            className="rounded-t-lg w-full h-[300px]"
            style={{ border: "none" }}
            scrolling="no"
          >
            <p className="text-sm text-gray-600">PDF Preview Unavailable</p>
          </iframe>
        </div>
      );
    } else {
      return (
        <div className="w-full h-64 flex flex-col items-center justify-center bg-gray-200 rounded-t-lg">
          <svg
            className="w-16 h-16 text-gray-500 mb-2"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path
              fillRule="evenodd"
              d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z"
              clipRule="evenodd"
            />
          </svg>
          <p className="text-sm text-gray-600">File Preview Unavailable</p>
        </div>
      );
    }
  }, []);

  return (
    <div className={`pt-20 min-h-screen${theme === 'dark' 
      ? 'bg-gray-900 text-white' 
      : 'bg-gradient-to-r from-blue-100 to-teal-100 text-gray-800'}`}>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-5xl font-extrabold mb-10 text-center tracking-wide font-inter">Publications</h1>
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, index) => (
              <LoadingPlaceholder key={index} />
            ))}
          </div>
        ) : error ? (
          <p className="text-center text-red-500">{error}</p>
        ) : publications.length > 0 ? (
          <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {publications.map((pub) => (
              <PublicationCard
                key={pub._id}
                pub={pub}
                theme={theme}
                getFilePreview={getFilePreview}
              />
            ))}
          </ul>
        ) : (
          <p className="text-center">No publications available.</p>
        )}
      </div>
    </div>
  );
};

export default PublicationsPage;