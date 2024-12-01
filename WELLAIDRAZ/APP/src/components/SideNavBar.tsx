import Link from 'next/link';
import { Home, ChevronDown, Settings, LogOut, ChevronLeft, ClipboardCheck, GraduationCap, Pill, User } from 'lucide-react'; // replace with your icons
import { signOut } from 'next-auth/react';
import Image from 'next/image';
import { Button } from './ui/button';
import Logo from "@/assets/logo/logo.png";
import { useSidebar } from '@/app/contexts/SideBar';
import { IoHome, IoSettingsSharp } from "react-icons/io5";
import { FaClipboardCheck, FaUser } from 'react-icons/fa';
import { FaUserDoctor } from "react-icons/fa6";
import { PiPillFill } from "react-icons/pi";

const Sidebar = ({ activePage }) => {
    const { toggleSidebar } = useSidebar();
    const links = [
        { href: '/dashboard', label: 'Dashboard', icon: <IoHome  className="h-7 w-7" /> },
        { href: '/orders', label: 'Orders', icon: <FaClipboardCheck  className="h-7 w-7" /> },
        { href: '/patients', label: 'Patients', icon: <FaUser  className="h-7 w-7" /> },
        { href: '/doctors', label: 'Doctors', icon: <FaUserDoctor  className="h-7 w-7" />, hasSubmenu: true },
        { href: '/drugs', label: 'Drugs', icon: <PiPillFill  className="h-7 w-7" /> },
        { href: '/settings', label: 'Settings', icon: <IoSettingsSharp  className="h-7 w-7" /> },
    ];

    const handleSignOut = async () => {
        try {
            await signOut({ callbackUrl: "/" });
        } catch (error) {
            console.log(error);
        }
    };

    // Determine if any of the settingss subpages is active
    const isSettingsActive = activePage.startsWith('/settings');

    return (
        <div className="hidden border-r bg-muted/40 md:block">
            <div className="flex h-full max-h-screen flex-col gap-2">
                <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
                    <Link
                        href="/"
                        className="flex items-center font-semibold text-lg"
                    >
                        <Image src={Logo} alt="alt" width={60} height={60} />
                        <span className="pl-2">IPHA</span>
                    </Link>
                    <Button
                        variant="outline"
                        size="icon"
                        className="ml-auto h-10 w-10"
                        onClick={toggleSidebar}
                    >
                        <ChevronLeft className="h-5 w-5" />
                        <span className="sr-only">Toggle Menu</span>
                    </Button>
                </div>
                <div className="flex-1">
                    <nav className="grid items-start gap-3 px-2 text-sm font-medium lg:px-4">
                        {links.map(({ href, label, icon }) => (
                            <div key={href} className={`relative group ${href === '/settings' ? 'transition-all duration-300 overflow-hidden' : ''}`}>
                                <Link
                                    href={href}
                                    className={`flex items-center justify-between gap-3 rounded-lg px-3 py-2 transition-all hover:text-primary ${(activePage === href || (href === '/settings' && isSettingsActive)) ? 'bg-muted text-primary' : 'text-muted-foreground'
                                        }`}
                                >
                                    <div className="flex items-center gap-3">
                                        {icon} {label}
                                    </div>
                                    {href === '/settings' && (
                                        <ChevronDown className={`h-4 w-4 transition-transform duration-200 group-hover:rotate-180 ${isSettingsActive ? 'rotate-180' : ''}`} />
                                    )}
                                </Link>
                                {href === '/settings' && (
                                    <div className={`max-h-0 group-hover:max-h-40 transition-all duration-1000 ease-in-out overflow-hidden ${isSettingsActive ? 'max-h-40' : ''}`}>
                                        <ul className="pl-6 ml-6">
                                            <li>
                                                <Link
                                                    href="/settings/profile"
                                                    className={`block py-1 transition-all hover:text-primary ${activePage === '/settings/profile' ? 'text-primary' : 'text-muted-foreground'
                                                        }`}
                                                >
                                                    Profile
                                                </Link>
                                            </li>
                                            <li>
                                                <Link
                                                    href="/settings/notifications"
                                                    className={`block py-1 transition-all hover:text-primary ${activePage === '/settings/notifications' ? 'text-primary' : 'text-muted-foreground'
                                                        }`}
                                                >
                                                    Notificaions
                                                </Link>
                                            </li>
                                            <li>
                                                <Link
                                                    href="/settings/apperance"
                                                    className={`block py-1 transition-all hover:text-primary ${activePage === '/settings/apperance' ? 'text-primary' : 'text-muted-foreground'
                                                        }`}
                                                >
                                                    Apperance
                                                </Link>
                                            </li>
                                        </ul>
                                    </div>
                                )}
                            </div>
                        ))}
                    </nav>
                </div>
                {/* <div className="mt-auto p-4">
                    <Link
                        onClick={handleSignOut}
                        href=""
                        className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-[var(--main-color)]"
                    >
                        <LogOut className="h-5 w-5" />
                        Sign Out
                    </Link>
                </div> */}
            </div>
        </div>
    );
};

export default Sidebar;
