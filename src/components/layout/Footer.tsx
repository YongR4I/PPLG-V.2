export default function Footer() {
  return (
    <footer className="bg-black py-8 border-t border-white/10 text-center">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <p className="text-gray-400 text-sm">
          &copy; {new Date().getFullYear()} Kelas PPLG. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
