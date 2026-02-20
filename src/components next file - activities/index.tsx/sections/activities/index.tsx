/**
 * Activities Section Component
 * 
 * This is the main component for the Activities section.
 * Each team member can customize this component to add their content.
 * 
 * Structure:
 * - You can add sub-components in this folder
 * - You can add data files for content
 * - Just make sure to export the main component as default
 */

function ActivitiesSection() {
  // You can add your data fetching logic here
  
  return (
    <section id="activities" className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-blue-700 mb-4">Activities</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Participate in various church activities including prayer meetings and community events.
          </p>
        </div>

        {/* 
          TODO: Add your Activities content here!
          - You can add cards, grids, lists, event calendars, etc.
          - Customize the styling as needed
          - Add data from external sources if needed
        */}

        {/* Placeholder Content - Replace this with actual content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h3 className="text-xl font-semibold text-gray-900 mb-3">Coming Soon</h3>
            <p className="text-gray-600">
              Activities content will be added here. Contact the team member working on this section.
            </p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h3 className="text-xl font-semibold text-gray-900 mb-3">Get Involved</h3>
            <p className="text-gray-600">
              Join our activities and be part of the community.
            </p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h3 className="text-xl font-semibold text-gray-900 mb-3">Learn More</h3>
            <p className="text-gray-600">
              Find out more about our upcoming activities and events.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ActivitiesSection;
