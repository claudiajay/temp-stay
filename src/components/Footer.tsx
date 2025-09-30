

const Footer = () => (
  <footer className="bg-gray-100 border-t border-gray-200 mt-16">
    <div className="max-w-7xl mx-auto px-6 py-12">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        <div>
          <h3 className="font-semibold text-gray-900 mb-4">Support</h3>
          <ul className="space-y-3 text-sm text-gray-600">
            <li><a href="#" className="hover:underline">Help Center</a></li>
            <li><a href="#" className="hover:underline">Get help with a safety issue</a></li>
            <li><a href="#" className="hover:underline">NookCover</a></li>
            <li><a href="#" className="hover:underline">Anti-discrimination</a></li>
            <li><a href="#" className="hover:underline">Disability support</a></li>
          </ul>
        </div>
        <div>
          <h3 className="font-semibold text-gray-900 mb-4">Hosting</h3>
          <ul className="space-y-3 text-sm text-gray-600">
            <li><a href="#" className="hover:underline">Nook your home</a></li>
            <li><a href="#" className="hover:underline">NookCover for Hosts</a></li>
            <li><a href="#" className="hover:underline">Hosting resources</a></li>
            <li><a href="#" className="hover:underline">Community forum</a></li>
            <li><a href="#" className="hover:underline">Hosting responsibly</a></li>
          </ul>
        </div>
        <div>
          <h3 className="font-semibold text-gray-900 mb-4">Nook</h3>
          <ul className="space-y-3 text-sm text-gray-600">
            <li><a href="#" className="hover:underline">Newsroom</a></li>
            <li><a href="#" className="hover:underline">New features</a></li>
            <li><a href="#" className="hover:underline">Careers</a></li>
            <li><a href="#" className="hover:underline">Investors</a></li>
            <li><a href="#" className="hover:underline">Gift cards</a></li>
          </ul>
        </div>
        <div>
          <h3 className="font-semibold text-gray-900 mb-4">Legal</h3>
          <ul className="space-y-3 text-sm text-gray-600">
            <li><a href="#" className="hover:underline">Privacy</a></li>
            <li><a href="#" className="hover:underline">Terms</a></li>
            <li><a href="#" className="hover:underline">Sitemap</a></li>
            <li><a href="#" className="hover:underline">Company details</a></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-gray-200 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
        <p className="text-sm text-gray-600">© 2025 Nook, Inc. All rights reserved.</p>
        <div className="flex items-center space-x-4 mt-4 md:mt-0">
          <button className="text-sm text-gray-600 hover:underline">English (US)</button>
          <button className="text-sm text-gray-600 hover:underline">$ USD</button>
        </div>
      </div>
    </div>
  </footer>
);

export default Footer;
