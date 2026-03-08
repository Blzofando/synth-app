import { BookOpen, Calendar, RotateCcw, FileText, Home, LogOut } from "lucide-react";
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export function Sidebar() {
  const pathname = usePathname();

  const menuItems = [
    { name: "Início", icon: Home, route: "/" },
    { name: "Matérias", icon: BookOpen, route: "/materias" },
    { name: "Calendário", icon: Calendar, route: "/calendario" },
    { name: "Revisão", icon: RotateCcw, route: "/revisao" },
    { name: "Glossário", icon: FileText, route: "/glossario" },
  ];

  return (
    <>
      {/* Mobile Bottom Bar */}
      <nav className="md:hidden fixed bottom-0 left-0 w-full bg-[#140D26]/95 backdrop-blur-md border-t border-[#231C3B] z-50 px-2 py-3 flex justify-around">
        {menuItems.map((item) => {
          const isActive = pathname === item.route;
          return (
            <Link key={item.name} href={item.route} className={`flex flex-col items-center gap-1 px-3 py-2 rounded-xl transition-colors ${isActive ? 'text-[#A753FF]' : 'text-gray-400 hover:text-gray-200'}`}>
              <item.icon className="w-5 h-5" />
              <span className="text-[10px] font-medium">{item.name}</span>
            </Link>
          );
        })}
      </nav>

      {/* Desktop Sidebar */}
      <aside className="hidden md:flex flex-col w-64 fixed left-0 top-0 h-screen bg-[#140D26] border-r border-[#231C3B] z-40 p-6">
        <div className="flex items-center gap-3 mb-10">
           <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#7C28D6] to-[#F72585] flex items-center justify-center font-bold text-white shadow-[0_0_15px_rgba(124,40,214,0.5)]">S</div>
           <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400">Synth</span>
        </div>

        <div className="flex flex-col gap-2 flex-grow">
           <span className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2 px-3">Menu Principal</span>
           {menuItems.map((item) => {
             const isActive = pathname === item.route;
             return (
               <Link key={item.name} href={item.route} className={`flex items-center w-full gap-3 px-3 py-3 rounded-xl transition-all ${isActive ? 'bg-[#7C28D6]/10 text-[#A753FF] font-semibold border border-[#7C28D6]/20' : 'text-gray-400 hover:text-gray-200 hover:bg-[#231C3B]/50'}`}>
                 <item.icon className={`w-5 h-5 ${isActive ? 'text-[#A753FF]' : ''}`} />
                 {item.name}
               </Link>
             );
           })}
        </div>

        {/* User profile snippet at bottom */}
        <div className="mt-auto flex items-center justify-between pt-6 border-t border-[#231C3B]">
          <div className="flex items-center gap-3 overflow-hidden">
            <div className="w-10 h-10 rounded-full bg-gray-800 border-2 border-[#231C3B] flex-shrink-0"></div>
            <div className="flex flex-col overflow-hidden text-left">
              <span className="text-sm font-semibold text-white truncate max-w-[100px]">Alex Estudante</span>
              <span className="text-xs text-gray-400 truncate">Plano Pro</span>
            </div>
          </div>
          <button className="p-2 text-gray-500 hover:text-rose-500 hover:bg-rose-500/10 rounded-xl transition-colors" title="Sair">
            <LogOut className="w-5 h-5" />
          </button>
        </div>
      </aside>
    </>
  );
}
