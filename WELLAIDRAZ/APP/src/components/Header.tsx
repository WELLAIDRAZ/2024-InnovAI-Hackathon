import Link from 'next/link';
import { useState } from 'react';
import { Menu, Home, Folder, File, Database, Share, ShoppingCart, LogOut, FileQuestion, ChevronDown, ClipboardCheck, GraduationCap, Pill, User, Settings } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { ModeToggle } from "@/components/ui/mode-toggle";
import { HelpToggle } from "@/components/ui/help-toggle";
import { UserToggle } from '@/components/ui/user-toggle';
import { useSidebar } from '@/app/contexts/SideBar';
import { NotificationToggle } from './ui/notification-toggle';
import Logo from "@/assets/logo/logo.png";
import Image from 'next/image';

const Header = ({ activePage, handleSignOut }) => {
    const { toggleSidebar } = useSidebar();
    const [isDatasetOpen, setIsDatasetOpen] = useState(false); // State for toggling the dataset submenu

    const links = [
        { href: '/dashboard', label: 'Dashboard', icon: <Home className="h-5 w-5" /> },
        { href: '/orders', label: 'Orders', icon: <ClipboardCheck className="h-5 w-5" /> },
        { href: '/patients', label: 'Patients', icon: <User className="h-5 w-5" /> },
        { href: '/doctors', label: 'Doctors', icon: <GraduationCap className="h-5 w-5" />, hasSubmenu: true },
        { href: '/drugs', label: 'Drugs', icon: <Pill className="h-5 w-5" /> },
        { href: '/settings', label: 'Settings', icon: <Settings className="h-5 w-5" /> },
    ];
    const isDatasetActive = activePage.startsWith('/datasets');
    const toggleDatasetDropdown = () => {
        setIsDatasetOpen(!isDatasetOpen); // Toggle the dataset submenu visibility
    };

    return (
        <header className="flex h-14 items-center gap-4 border-b bg-muted/40 px-4 lg:h-[60px] lg:px-6">
            {/* Sidebar trigger for mobile */}
            <Sheet>
                <SheetTrigger asChild>
                    <Button variant="outline" size="icon" className="shrink-0 md:hidden">
                        <Menu className="h-5 w-5" />
                        <span className="sr-only">Toggle navigation menu</span>
                    </Button>
                </SheetTrigger>
                <SheetContent side="left" className="flex flex-col">
                    <nav className="grid gap-2 text-lg font-medium">
                        <Link href="/" className="flex items-center gap-2 text-lg font-semibold">
                        <Image src={Logo} alt="alt" width={40} height={40} />
                            <span className="">IPHA</span>
                        </Link>
                        {links.map(({ href, label, icon }) => (
                            <Link
                                key={href}
                                href={href}
                                className={`mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 ${activePage === href ? 'bg-muted text-foreground' : 'text-muted-foreground hover:text-foreground'
                                    }`}
                            >
                                {icon} {label}
                            </Link>
                        ))}
                    </nav>
                    {/* <div className="mt-auto">
                        <Link
                            onClick={handleSignOut}
                            href="#"
                            className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-[var(--main-color)]"
                        >
                            <LogOut className="h-4 w-4" />
                            Sign Out
                        </Link>
                    </div> */}
                </SheetContent>
            </Sheet>
            {/* Main navigation */}
            <div className="w-full flex-1">
                <Link href={activePage}>{activePage}</Link>
            </div>
            {/* Additional components */}
            <NotificationToggle />
            <ModeToggle />
            <HelpToggle />
            <UserToggle />
        </header>
    );
};

export default Header;
