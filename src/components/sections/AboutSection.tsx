function AboutSection() {
  return (
    <section id="about" className="max-w-7xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
      <div className="text-center max-w-4xl mx-auto mb-16">
        <h1 className="text-3xl md:text-4xl font-bold text-blue-700 mb-6">Welcome to CSA Kirinyaga</h1>
        <p className="text-gray-600 text-lg leading-relaxed">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nulla cum, nobis commodi aperiam suscipit consequuntur sequi expedita, voluptatibus, placeat ipsa eveniet aut tempore necessitatibus doloribus libero non ducimus praesentium sint!
        Totam, doloribus officiis mollitia ducimus, quaerat recusandae sequi ullam earum neque est excepturi, tenetur minus harum? Iste alias, voluptate vitae, corrupti ipsa eos doloremque accusamus itaque cum magnam nemo! Sed.
        Nam neque deserunt iure soluta dolore qui veniam ea, tempore aut assumenda ipsam accusamus, exercitationem accusantium dolorum adipisci eos consectetur facilis ratione quam illo reiciendis distinctio magnam? Excepturi, nemo velit.
        Qui provident id esse impedit. Alias voluptates vitae tempora, enim quia sint quisquam temporibus nobis possimus mollitia deserunt consequatur, similique quos adipisci atque dolorum rem repellat et cum, esse odio?
        Vel aut ea, ipsum eaque autem nobis reiciendis cumque saepe error sunt repudiandae sequi voluptatibus voluptatum officia, cum praesentium voluptates accusantium quisquam placeat eius quod rerum aperiam totam! Enim, quibusdam?
        Nemo aliquam libero voluptatibus? Eum deleniti quae consequuntur similique esse, magnam officia molestias ipsam. Explicabo in, possimus accusantium officia rerum, doloremque consequuntur libero expedita perspiciatis placeat officiis nostrum? Eum, ex.
        Veritatis officia nihil omnis doloribus odit adipisci, velit blanditiis earum expedita reprehenderit delectus minima laudantium mollitia, magni vel nesciunt! Sunt sit dolorum aliquam ipsam odio veritatis asperiores repudiandae. Culpa, nam.</p>  </div>

      <div className="grid md:grid-cols-2 gap-8 mt-12">
        {/* mission and vision with icons */}

        {/* mission */}
        <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100 flex flex-col items-center text-center hover:shadow-xl transition-shadow duration-300">
          {/* from bootstrap icons */}
          <div className="text-blue-600 mb-6 p-4 bg-blue-50 rounded-full">
            <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" fill="currentColor" className="bi bi-journal" viewBox="0 0 16 16">
              <path d="M3 0h10a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2v-1h1v1a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H3a1 1 0 0 0-1 1v1H1V2a2 2 0 0 1 2-2"/>
              <path d="M1 5v-.5a.5.5 0 0 1 1 0V5h.5a.5.5 0 0 1 0 1h-2a.5.5 0 0 1 0-1zm0 3v-.5a.5.5 0 0 1 1 0V8h.5a.5.5 0 0 1 0 1h-2a.5.5 0 0 1 0-1zm0 3v-.5a.5.5 0 0 1 1 0v.5h.5a.5.5 0 0 1 0 1h-2a.5.5 0 0 1 0-1z"/>
            </svg>
          </div>
          <h3 className="text-2xl font-bold text-gray-800 mb-4">Our Mission</h3>
          <p className="text-gray-600">Lorem ipsum dolor sit amet consectetur adipisicing elit. Adipisci.</p>
        </div>

        {/* vission */}
        <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100 flex flex-col items-center text-center hover:shadow-xl transition-shadow duration-300">
          {/* from bootsrap icons */}
          <div className="text-blue-600 mb-6 p-4 bg-blue-50 rounded-full">
            <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" fill="currentColor" className="bi bi-send" viewBox="0 0 16 16">
              <path d="M15.854.146a.5.5 0 0 1 .11.54l-5.819 14.547a.75.75 0 0 1-1.329.124l-3.178-4.995L.643 7.184a.75.75 0 0 1 .124-1.33L15.314.037a.5.5 0 0 1 .54.11ZM6.636 10.07l2.761 4.338L14.13 2.576zm6.787-8.201L1.591 6.602l4.339 2.76z"/>
            </svg>
          </div>
          <h3 className="text-2xl font-bold text-gray-800 mb-4">Our Vision</h3>
          <p className="text-gray-600">Lorem ipsum dolor sit amet consectetur adipisicing elit. Possimus!.</p>
        </div>
      </div>
    </section>
  )
}

export default AboutSection
