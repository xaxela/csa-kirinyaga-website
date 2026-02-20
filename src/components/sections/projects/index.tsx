/**
 * Projects Section Component
 * 
 * Collaborators: Add your Church Projects related code here
 * 
 * This component displays information about ongoing and past church projects
 */

import React from 'react';

const ProjectsSection: React.FC = () => {
  return (
    <div id="projects" className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-8">Our Projects</h2>
        <p className="text-center text-gray-600 mb-8">
          Supporting our community through various initiatives
        </p>
      </div>
    </div>
  );
};

export default ProjectsSection;
