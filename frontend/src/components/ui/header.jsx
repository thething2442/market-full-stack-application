"use client";

import React, { useState } from 'react';
import { LogOut, Search, ShoppingCart, User } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import * as dropdown from './dropdown-menu'
import * as alert_dialog from './alert-dialog'
import * as sheet from './sheet'
import Link from 'next/link';
import { useSession, signOut } from "next-auth/react";

const userList = [
  {id:'My Cart',url:'/mykart'},
  {id:'Settings',url:'/settings'},
  {id:'Support',url:'/support'},
  {id:'Payments Method',url:'/payments-method'},
]

export function Header() {
  const { data: session, status } = useSession();
  const [isAlertDialogOpen, setIsAlertDialogOpen] = useState(false);

  const handleLogoutClick = () => {
    setIsAlertDialogOpen(true);
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/60">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center space-x-8">
          <Link href="/" className="text-2xl font-bold text-primary">ShopHub</Link>
          <nav className="hidden md:flex items-center space-x-6">
            <Link href="/about" className="text-foreground hover:text-primary transition-colors">About</Link>
            <Link href="/contact" className="text-foreground hover:text-primary transition-colors">Contact</Link>
          </nav>
        </div>

        <div className="flex-1 max-w-md mx-8">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input placeholder="Search products..." className="pl-10 bg-background" />
          </div>
        </div>

        <div className="flex items-center space-x-4">
          {status === "authenticated" ? (
            <>
              <dropdown.DropdownMenu>
                <dropdown.DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <User className="h-5 w-5" />
                  </Button>
                </dropdown.DropdownMenuTrigger>
                <dropdown.DropdownMenuContent>
                  <div className="p-4 text-xl font-bold">{session.user.name}</div>
                  <dropdown.DropdownMenuSeparator />
                  <dropdown.DropdownMenuGroup>
                    {userList.map((i,x) =>(
                        <dropdown.DropdownMenuItem key={x}>
                          <Link href={i.url}>
                            {i.id}
                          </Link>
                        </dropdown.DropdownMenuItem>
                    ))}
                  </dropdown.DropdownMenuGroup>
                  <dropdown.DropdownMenuSeparator />
                  <dropdown.DropdownMenuItem
                    onClick={handleLogoutClick}
                    className="flex items-center justify-start gap-2 bg-black text-white transition duration-500 hover:bg-white hover:text-black"
                  >
                    <LogOut className="h-4 w-4" />
                    Log out
                  </dropdown.DropdownMenuItem>
                </dropdown.DropdownMenuContent>
              </dropdown.DropdownMenu>
              
              <sheet.Sheet>
                <sheet.SheetTrigger>
                  <ShoppingCart className="h-5 w-5" />
                </sheet.SheetTrigger>
                <sheet.SheetContent>
                  <sheet.SheetHeader>
                    <sheet.SheetTitle>
                      My kart
                    </sheet.SheetTitle>
                  </sheet.SheetHeader>
                  <sheet.SheetDescription className='p-4'>
                    You have no items.
                  </sheet.SheetDescription>
                </sheet.SheetContent>
              </sheet.Sheet>
            </>
          ) : (
            <div className="flex items-center space-x-2">
              <Button asChild variant="outline">
                <Link href="/login">Sign In</Link>
              </Button>
              <Button asChild>
                <Link href="/register">Sign Up</Link>
              </Button>
            </div>
          )}
        </div>
      </div>

      <alert_dialog.AlertDialog open={isAlertDialogOpen} onOpenChange={setIsAlertDialogOpen}>
        <alert_dialog.AlertDialogContent>
          <alert_dialog.AlertDialogHeader>
            <alert_dialog.AlertDialogTitle>Log out?</alert_dialog.AlertDialogTitle>
            <alert_dialog.AlertDialogDescription>
                Are you sure you want to log out?
            </alert_dialog.AlertDialogDescription>
          </alert_dialog.AlertDialogHeader>
          <alert_dialog.AlertDialogFooter>
            <alert_dialog.AlertDialogCancel>Cancel</alert_dialog.AlertDialogCancel>
            <alert_dialog.AlertDialogAction onClick={() => signOut()}>Log Out</alert_dialog.AlertDialogAction>
          </alert_dialog.AlertDialogFooter>
        </alert_dialog.AlertDialogContent>
      </alert_dialog.AlertDialog>
    </header>
  );
}