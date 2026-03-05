import { Leaf, Mail, Phone, MapPin, Globe, Instagram, Share2 } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-background-dark text-slate-400 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          <div className="col-span-1 md:col-span-1">
            <div className="flex items-center gap-3 text-white mb-6">
              <Leaf className="text-primary w-8 h-8" />
              <span className="text-xl font-extrabold tracking-tight">GreenDog Academy</span>
            </div>
            <p className="text-sm leading-relaxed mb-6">
              Dedicated to enhancing the lives of dogs and their owners through psychology-based training and professional care.
            </p>
            <div className="flex gap-4">
              {[Globe, Instagram, Share2].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="w-10 h-10 rounded-full border border-slate-700 flex items-center justify-center hover:border-primary hover:text-primary transition-colors"
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>
          <div>
            <h4 className="text-white font-bold mb-6 uppercase text-xs tracking-widest">Navigation</h4>
            <ul className="space-y-4 text-sm">
              {['Home', 'The Philosophy', 'Training Services', 'Boarding Suites', 'Our Team'].map((item) => (
                <li key={item}>
                  <a href="#" className="hover:text-primary transition-colors">{item}</a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="text-white font-bold mb-6 uppercase text-xs tracking-widest">Knowledge</h4>
            <ul className="space-y-4 text-sm">
              {['Behavior Articles', 'Success Stories', 'FAQ', 'Puppy Guide'].map((item) => (
                <li key={item}>
                  <a href="#" className="hover:text-primary transition-colors">{item}</a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="text-white font-bold mb-6 uppercase text-xs tracking-widest">Contact</h4>
            <ul className="space-y-4 text-sm">
              <li className="flex items-start gap-3">
                <MapPin className="text-primary w-4 h-4 mt-1" />
                123 Canine Lane, Training Hills, CA
              </li>
              <li className="flex items-start gap-3">
                <Mail className="text-primary w-4 h-4 mt-1" />
                hello@greendogacademy.com
              </li>
              <li className="flex items-start gap-3">
                <Phone className="text-primary w-4 h-4 mt-1" />
                (555) 123-4567
              </li>
            </ul>
          </div>
        </div>
        <div className="pt-8 border-t border-slate-800 flex flex-col md:flex-row justify-between items-center gap-4 text-xs">
          <p>© 2024 GreenDog Academy. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
