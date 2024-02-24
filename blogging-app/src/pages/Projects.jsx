import React, { useEffect, useState } from 'react';

export default function Projects() {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await fetch('https://api.github.com/users/palbijewar/repos');
        const data = await response.json();

        if (response.ok) {
          setProjects(data);
        } else {
          console.error('Error fetching projects:', data.message);
        }
      } catch (error) {
        console.error('Error fetching projects:', error.message);
      }
    };

    fetchProjects();
  }, []);

  return (
    <div className='min-h-screen max-w-4xl mx-auto flex flex-col items-center p-8'>
      <h1 className='text-4xl font-bold mb-8'>Projects</h1>

      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'>
        {projects.map((project) => (
          <div key={project.id} className='bg-gray-700 rounded-lg shadow-md p-6 w-full'>
            <h2 className='text-lg font-semibold mb-2'>{project.name}</h2>
            <p className='text-gray-600 mb-4'>{project.description}</p>
            <a
              href={project.html_url}
              target='_blank'
              rel='noopener noreferrer'
              className='text-teal-500 hover:underline inline-block'
            >
              View on GitHub
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}
