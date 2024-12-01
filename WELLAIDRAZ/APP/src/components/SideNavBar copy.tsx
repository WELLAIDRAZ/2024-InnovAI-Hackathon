import Link from 'next/link';
import { Home, ChevronDown, Folder, File, Database, Share, Settings, ShoppingCart, LogOut, ChevronLeft, Code2, FileQuestion, ClipboardCheck, GraduationCap, Pill, User } from 'lucide-react'; // replace with your icons
import { signOut } from 'next-auth/react';
import Image from 'next/image';
import { Button } from './ui/button';
import Logo from "@/assets/logo/logo.png";
import { useSidebar } from '@/app/contexts/SideBar';

const Sidebar = ({ activePage }) => {
    const { toggleSidebar } = useSidebar();
    const links = [
        { href: '/dashboard', label: 'Dashboard', icon: <Home className="h-5 w-5" /> },
        { href: '/orders', label: 'Orders', icon: <ClipboardCheck className="h-5 w-5" /> },
        { href: '/patients', label: 'Patients', icon: <User className="h-5 w-5" /> },
        { href: '/doctors', label: 'Doctors', icon: <GraduationCap className="h-5 w-5" />, hasSubmenu: true },
        { href: '/drugs', label: 'Drugs', icon: <Pill className="h-5 w-5" /> },
        { href: '/settings', label: 'Settings', icon: <Settings className="h-5 w-5" /> },
    ];

    const handleSignOut = async () => {
        try {
            await signOut({ callbackUrl: "/" });
        } catch (error) {
            console.log(error);
        }
    };

    // Determine if any of the settingss subpages is active
    const isSettingsActive = activePage.startsWith('/settingss');

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
                        <Link
                            key={href}
                            href={href}
                            className={`flex items-center gap-3 rounded-lg px-3 py-2 transition-all hover:text-[var(--main-color)] ${activePage === href ? 'bg-muted text-[var(--main-color)]' : 'text-muted-foreground'
                                }`}
                        >
                            {icon} {label}
                        </Link>
                    ))}
                </nav>
            </div>
            <div className="mt-auto p-4">
                <Link
                    onClick={handleSignOut}
                    href=""
                    className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-[var(--main-color)]"
                >
                    <LogOut className="h-5 w-5" />
                    Sign Out
                </Link>
            </div>
        </div>
        </div>
    );
};

export default Sidebar;
