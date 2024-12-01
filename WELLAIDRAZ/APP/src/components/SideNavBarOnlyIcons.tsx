import Link from 'next/link';
import { Home, Folder, File, Database, Share, Settings, ShoppingCart, LogOut, ChevronLeft, ChevronRight, Code2, FileQuestion, ClipboardCheck, User, GraduationCap, Pill } from 'lucide-react'; // replace with your icons
import { signOut } from 'next-auth/react';
import Image from 'next/image';
import { Button } from './ui/button';
import Logo from "@/assets/logo/logo.png";
import { useSidebar } from '@/app/contexts/SideBar';
import { useRouter } from 'next/navigation';
import { IoHome, IoSettingsSharp } from "react-icons/io5";
import { FaClipboardCheck, FaUser } from 'react-icons/fa';
import { FaUserDoctor } from "react-icons/fa6";
import { PiPillFill } from "react-icons/pi";
const SidebarOnlyIcons = ({ activePage }) => {
    const { isCollapsed, toggleSidebar } = useSidebar();
    const router = useRouter();
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

    return (
        <div className="hidden border-r bg-muted/40 md:block">
            <div className="flex h-full max-h-screen flex-col gap-2">
                <div className="flex h-14 items-center gap-2 border-b px-4 lg:h-[60px] lg:px-6">
                    <Button
                        variant="outline"
                        size="icon"
                        className="ml-auto h-10 w-10"
                        onClick={toggleSidebar}
                    >
                        <ChevronRight className="h-5 w-5" />
                        <span className="sr-only">Toggle Menu</span>
                    </Button>
                </div>
                <div className="flex justify-center items-center py-2">
                    <Image className='cursor-pointer ' onClick={()=>{router.replace("/")}} src={Logo} alt="alt" width={60} height={60} />
                </div>
                <div className="flex-1">
                    <nav className="grid justify-center items-start gap-3 px-2 text-sm font-medium lg:px-4">
                        {links.map(({ href, icon }) => (
                            <Link
                                key={href}
                                href={href}
                                className={`flex items-center gap-3 rounded-lg px-3 py-2 transition-all hover:text-primary ${activePage === href ? 'bg-muted text-primary' : 'text-muted-foreground'
                                    }`}
                            >
                                {icon}

                            </Link>
                        ))}
                    </nav>
                </div>
                {/* <div className="mt-auto p-4">
                    <Link
                        onClick={handleSignOut}
                        href=""
                        className="flex justify-center items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
                    >
                        <LogOut className="h-5 w-5" />
                    </Link>
                </div> */}
            </div>
        </div>
    );
};

export default SidebarOnlyIcons;
