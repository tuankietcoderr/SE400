'use client';
import {useAuthContext} from '@/context/AuthContext';
import {Button, cn} from '@nextui-org/react';
import {
  ArrowLeftRight,
  CalendarArrowUp,
  Hotel,
  LogOut,
  Star,
  Wifi,
} from 'lucide-react';
import Link from 'next/link';
import {usePathname} from 'next/navigation';

const sidebarItems = [
  {
    name: 'Quản lý khách sạn',
    href: '/hotel',
    icon: Hotel,
  },
  {
    name: 'Quản lý tiện ích',
    href: '/amenity',
    icon: Wifi,
  },
  {
    name: 'Quản lý đơn đặt phòng',
    href: '/booking',
    icon: CalendarArrowUp,
  },
  {
    name: 'Quản lý đánh giá',
    href: '/review',
    icon: Star,
  },
  {
    name: 'Lịch sử giao dịch',
    href: '/transaction',
    icon: ArrowLeftRight,
  },
];

const Sidebar = () => {
  const {user, logout} = useAuthContext();
  const pathname = usePathname();
  const isActive = (href: string) => {
    if (href === '/' && pathname === '/') return true;
    return href !== '/' && pathname.startsWith(href);
  };
  return (
    <div className="flex h-screen max-h-screen w-full max-w-[320px] flex-col justify-between overflow-auto border-r">
      <Link href={'/'}>
        <h1 className="mt-10 text-center text-3xl font-bold">Booking</h1>
      </Link>
      <div className="mt-12 flex-1 space-y-1">
        {sidebarItems.map((item, index) => (
          <Link
            href={item.href}
            key={item.name}
            className={cn(
              'flex cursor-pointer items-center p-4 transition-colors hover:bg-primary hover:text-white',
              isActive(item.href) && 'bg-primary text-white',
            )}>
            <item.icon className="mr-4 size-5" strokeWidth={1.5} />
            <span>{item.name}</span>
          </Link>
        ))}
      </div>
      <div className="flex items-center border-t p-4">
        <p className="flex-1 text-foreground-500">Xin chào, {user?.name}</p>
        <Button isIconOnly color="danger" variant="light" onPress={logout}>
          <LogOut size={24} strokeWidth={1.5} />
        </Button>
      </div>
    </div>
  );
};

export default Sidebar;
