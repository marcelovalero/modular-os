
import Link from 'next/link';

const Header = () => {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-transparent py-4 px-8">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <Link href="/" legacyBehavior>
          <a className="text-2xl font-bold text-white hover:text-blue-300 transition-colors">
            Sistema Modular
          </a>
        </Link>
        <nav>
          <Link href="/login" legacyBehavior>
            <a className="text-white hover:text-blue-300 transition-colors py-2 px-4 border border-transparent hover:border-blue-300 rounded-lg">
              Admin Login
            </a>
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;
