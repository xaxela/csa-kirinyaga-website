/**
 * Activities Section Component
 * 
 * Collaborators: Add your Church Activities related code here
 * 
 * This component displays information about church activities and events
 */

import React from 'react';

const ActivitiesSection: React.FC = () => {
  return (
    <div id="activities" className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-8">Church Activities</h2>
        <p className="text-center text-gray-600 mb-8">
          Join us in our various activities and events
        </p>
      </div>
    </div>
  );
};

export default ActivitiesSection;
