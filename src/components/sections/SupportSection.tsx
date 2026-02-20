function SupportSection() {
  return (
    <section id="support" className='py-16 bg-blue-700 text-white'>
      <div className='max-w-4xl mx-auto px-4 text-center'>
        <h3 className='text-3xl font-bold mb-4'>Support the Growth of Our Community</h3>
        <p className='text-blue-100 mb-8 text-lg'>Your generous contributions help us continue our mission of serving the people of Kirinyaga through faith, education, and community outreach. Every donation makes a difference.</p>

        {/* donate button*/}
        <div>
          <button className='bg-white text-blue-700 hover:bg-gray-100 px-8 py-3 rounded-full font-bold shadow-lg transition-colors'>Donate Now</button>
        </div>
      </div>
    </section>
  )
}

export default SupportSection
