import {
  MoreVertical,
  ChevronLast,
  ChevronFirst,
  Menu,
  Package2,
} from 'lucide-react';
import { useContext, createContext, useState } from 'react';
import logo from '../assets/logo.png';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';

const SidebarContext = createContext();

export default function Sidebar({ children }) {
  const [expanded, setExpanded] = useState(true);
  const [sheetOpen, setSheetOpen] = useState(false);

  return (
    <>
      <aside className="h-screen hidden md:block">
        <nav className="h-full flex flex-col bg-white border-r shadow-sm">
          <div className="p-4 pb-2 flex justify-between items-center">
            <img
              src={logo}
              className={`overflow-hidden transition-all ${
                expanded ? 'w-24' : 'w-0'
              }`}
              alt=""
            />
            <button
              onClick={() => setExpanded((curr) => !curr)}
              className="p-2 rounded-full bg-slate-50"
            >
              {expanded ? <ChevronFirst /> : <ChevronLast />}
            </button>
          </div>
          <SidebarContext.Provider value={{ expanded }}>
            <ul className="flex-1 px-3 mt-2">{children}</ul>
          </SidebarContext.Provider>
          <div className="border-t flex p-3">
            <img
              src="https://ui-avatars.com/api/?background=F1F5F9&color=2563EB&bold=true"
              alt=""
              className="w-10 h-10 rounded-md"
            />
            <div
              className={`flex justify-between items-center overflow-hidden transition-all ${
                expanded ? 'w-52 ml-3' : 'w-0'
              }`}
            >
              <div className="leading-4">
                <h4 className="font-semibold">John Doe</h4>
                <span className="text-xs text-gray-600">johndoe@gmail.com</span>
              </div>
              <MoreVertical size={20} />
            </div>
          </div>
        </nav>
      </aside>
    </>
  );
}

export function SidebarItem({ icon, text, active, alert }) {
  const { expanded } = useContext(SidebarContext);

  return (
    <li
      className={`relative flex items-center py-2 px-3 my-1 font-medium rounded-md cursor-pointer transition-colors group ${
        active ? 'bg-slate-200' : 'hover:bg-slate-100 text-gray-600'
      }`}
    >
      {icon}
      <span
        className={`overflow-hidden transition-all ${
          expanded ? 'w-52 ml-3' : 'w-0'
        }`}
      >
        {text}
      </span>
      {alert && (
        <div
          className={`absolute right-2 w-2 h-2 rounded bg-blue-400 ${
            expanded ? '' : 'top-2'
          }`}
        />
      )}
      {!expanded && (
        <div
          className={`absolute left-full rounded-md px-2 py-1 ml-6 bg-blue-100 text-blue-800 text-sm invisible opacity-20 -translate-x-3 transition-all group-hover:visible group-hover:opacity-100 group-hover:translate-x-0`}
        >
          {text}
        </div>
      )}
    </li>
  );
}
