"use client"

import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Filter } from "lucide-react"

interface CredentialFiltersProps {
  selectedCategory: string
  selectedStatus: string
  onCategoryChange: (category: string) => void
  onStatusChange: (status: string) => void
}

export function CredentialFilters({
  selectedCategory,
  selectedStatus,
  onCategoryChange,
  onStatusChange,
}: CredentialFiltersProps) {
  const categories = [
    { value: "all", label: "All Categories" },
    { value: "identity", label: "Identity" },
    { value: "education", label: "Education" },
    { value: "professional", label: "Professional" },
    { value: "health", label: "Health" },
  ]

  const statuses = [
    { value: "all", label: "All Status" },
    { value: "verified", label: "Verified" },
    { value: "pending", label: "Pending" },
    { value: "expired", label: "Expired" },
  ]

  return (
    <div className="flex gap-2">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size="sm">
            <Filter className="mr-2 h-4 w-4" />
            Category
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          {categories.map((category) => (
            <DropdownMenuItem
              key={category.value}
              onClick={() => onCategoryChange(category.value)}
              className={selectedCategory === category.value ? "bg-accent" : ""}
            >
              {category.label}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size="sm">
            <Filter className="mr-2 h-4 w-4" />
            Status
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          {statuses.map((status) => (
            <DropdownMenuItem
              key={status.value}
              onClick={() => onStatusChange(status.value)}
              className={selectedStatus === status.value ? "bg-accent" : ""}
            >
              {status.label}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}
