"use client"

import * as React from "react"
import { LucideCircleHelp } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export function HelpToggle() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon">
          <LucideCircleHelp className="h-[1.2rem] w-[1.2rem]" />
          <span className="sr-only">Help</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => alert("FAQ")}>
          FAQ
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => alert("Support")}>
          Support
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => alert("Contact")}>
          Contact
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
