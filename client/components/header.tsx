"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Menu, X, ChevronDown, Phone, Mail, Facebook, Instagram,  } from "lucide-react"
import { menuData } from "@/data/menu-data"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { toast } from "@/components/ui/use-toast"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLinkedin } from "@fortawesome/free-brands-svg-icons";
export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [liked, setLiked] = useState(false)
  const [residentialServices, setResidentialServices] = useState([])
  const [commercialServices, setCommercialServices] = useState([])
  const [isResidentialOpen, setIsResidentialOpen] = useState(false)
  const [isCommercialOpen, setIsCommercialOpen] = useState(false)
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }

    const hasLiked = localStorage.getItem("liked") === "true"
    setLiked(hasLiked)

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await fetch(`${process.env.BASE_URL}/api/services`) // ✅ Correct URL format
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`)
        }
        const data = await response.json()
          console.log("data",data)
        setResidentialServices(data.filter((service: { category: string }) => service.category === "residential"))
        setCommercialServices(data.filter((service: { category: string }) => service.category === "commercial"))
      } catch (error) {
        console.error("Error fetching services:", error)
      }
    }
  
    fetchServices()
  }, [isResidentialOpen,isCommercialOpen])
  

  return (
    <>
      {/* Top Bar */}
      <div className="bg-gray-900 text-white py-2 hidden md:block">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <div className="flex items-center space-x-4">
           
            <a href="mailto:info@repairmyconcrete.com" className="flex items-center text-sm hover:text-primary transition-colors">
              <Mail className="h-4 w-4 mr-1" />
              <span>info@repairmyconcrete.com</span>
            </a>
          </div>
          <div className="flex items-center space-x-4">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">
              <Facebook className="h-4 w-4" />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">
              <Instagram className="h-4 w-4" />
            </a>
            <a href="https://www.linkedin.com/" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">
            <FontAwesomeIcon icon={faLinkedin} size="1x" className="text-light" />
            </a>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <header className={`sticky top-0 left-0 right-0 z-50 pt-6 pb-6 transition-all duration-300 ${isScrolled ? "bg-white shadow-md py-2" : "bg-white py-4"}`}>
        <div className="container mx-auto px-4 flex items-center justify-between">
          <Link href="/" className="text-2xl font-bold text-primary">
            Repair my Concrete
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-6">
            {menuData.mainMenu.slice(0,2).map((item:any) => (
              <div key={item.id} className="relative group">
                {item.hasDropdown ? (
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <button className="flex items-center text-gray-700 hover:text-primary font-medium transition-colors duration-200">
                        {item.label}
                        <ChevronDown className="ml-1 h-4 w-4" />
                      </button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="start" className="horizontal-dropdown p-4">
                      {item.dropdownItems?.map((dropdownItem:any) => (
                        <DropdownMenuItem key={dropdownItem.id} asChild>
                          <Link href={dropdownItem.url} className="w-full hover:bg-secondary hover:text-primary transition-colors duration-200 p-2 rounded">
                            {dropdownItem.label}
                          </Link>
                        </DropdownMenuItem>
                      ))}
                    </DropdownMenuContent>
                  </DropdownMenu>
                ) : (
                  <Link href={item.url} className="text-gray-700 hover:text-primary font-medium transition-colors duration-200">
                    {item.label}
                  </Link>
                )}
              </div>
            ))}

  {/* Residential Services Dropdown */}
  <DropdownMenu>
  <DropdownMenuTrigger asChild>
    <button className="flex items-center text-gray-700 hover:text-primary font-medium transition-colors duration-200">
      Residential Services
      <ChevronDown className="ml-1 h-4 w-4" />
    </button>
  </DropdownMenuTrigger>
  <DropdownMenuContent align="start" className="p-4 w-[800px]"> {/* Wider dropdown for 4 columns */}
    <div className="grid grid-cols-4 gap-4"> {/* 4 columns layout */}
      {/* Concrete Repair */}
      <div>
        <h3 className="text-sm font-semibold text-gray-800 mb-2 pb-2 border-b">Concrete Repair</h3>
        {residentialServices
          .filter((service: any) => service.subheading === "CONCRETE REPAIR")
          .map((service: any) => (
            <DropdownMenuItem key={service._id} asChild>
              <Link 
                href={`/description?id=${service._id}`} 
                className="block text-left px-3 py-1 rounded hover:bg-gray-200 border-b-[0.2px]"
              >
                {service.name}
              </Link>
            </DropdownMenuItem>
          ))}
      </div>

      {/* Foundation Repair */}
      <div>
        <h3 className="text-sm font-semibold text-gray-800 mb-2 pb-2 border-b">Foundation Repair</h3>
        {residentialServices
          .filter((service: any) => service.subheading === "FOUNDATION REPAIR")
          .map((service: any) => (
            <DropdownMenuItem key={service._id} asChild>
              <Link 
                href={`/description?id=${service._id}`} 
                className="block text-left px-3 py-1 rounded hover:bg-gray-200 border-b-[0.2px]"
              >
                {service.name}
              </Link>
            </DropdownMenuItem>
          ))}
      </div>

      {/* New Concrete */}
      <div>
        <h3 className="text-sm font-semibold text-gray-800 mb-2 pb-2 border-b">New Concrete</h3>
        {residentialServices
          .filter((service: any) => service.subheading === "NEW CONCRETE")
          .map((service: any) => (
            <DropdownMenuItem key={service._id} asChild>
              <Link 
                href={`/description?id=${service._id}`} 
                className="block text-left px-3 py-1 rounded hover:bg-gray-200 border-b-[0.2px]"
              >
                {service.name}
              </Link>
            </DropdownMenuItem>
          ))}
      </div>

      {/* Waterproofing */}
      <div>
        <h3 className="text-sm font-semibold text-gray-800 mb-2 pb-2 border-b">Waterproofing</h3>
        {residentialServices
          .filter((service: any) => service.subheading === "WATERPROOFING")
          .map((service: any) => (
            <DropdownMenuItem key={service._id} asChild>
              <Link 
                href={`/description?id=${service._id}`} 
                className="block text-left px-3 py-1 rounded hover:bg-gray-200 border-b-[0.2px]"
              >
                {service.name}
              </Link>
            </DropdownMenuItem>
          ))}
      </div>
    </div>
  </DropdownMenuContent>
</DropdownMenu>


{/* Commercial Services Dropdown */}
<DropdownMenu>
  <DropdownMenuTrigger asChild>
    <button className="flex items-center text-gray-700 hover:text-primary font-medium transition-colors duration-200 ">
      Commercial Services
      <ChevronDown className="ml-1 h-4 w-4" />
    </button>
  </DropdownMenuTrigger>
  <DropdownMenuContent align="start" className="p-4 w-[800px]"> {/* Adjusted width for 3 columns */}
    <div className="grid grid-cols-3 gap-4">
      
      {/* Column 1 - Commercial Services */}
      <div>
        <h3 className="text-sm font-semibold text-gray-800 mb-2 pb-2 border-b">Commercial Services</h3>
        {commercialServices
          .filter((service: any) => service.subheading === "COMMERCIAL SERVICES")
          .map((service: any) => (
            <DropdownMenuItem key={service._id} asChild>
              <Link 
                href={`/description?id=${service._id}`} 
                className="block text-left px-3 py-2 rounded hover:bg-gray-200 border-b-[0.2px]"
              >
                {service.name}
              </Link>
            </DropdownMenuItem>
          ))}
      </div>

      {/* Column 2 - Partnered Industries */}
      <div>
        <h3 className="text-sm font-semibold text-gray-800 mb-2 pb-2 border-b">Partnered Industries</h3>
        {commercialServices
          .filter((service: any) => service.subheading === "PARTNERD INDUSTRIES")
          .map((service: any) => (
            <DropdownMenuItem key={service._id} asChild>
              <Link 
                href={`/description?id=${service._id}`} 
                className="block text-left px-3 py-2 rounded hover:bg-gray-200 border-b-[0.2px]"
              >
                {service.name}
              </Link>
            </DropdownMenuItem>
          ))}
      </div>

      {/* Column 3 - Premier Partner */}
      <div>
        <h3 className="text-sm font-semibold text-gray-800 mb-2 pb-2 border-b">Premier Partner</h3>
        {commercialServices
          .filter((service: any) => service.subheading === "Premier Partner")
          .map((service: any) => (
            <DropdownMenuItem key={service._id} asChild>
              <Link 
                href={`/description?id=${service._id}`} 
                className="block text-left px-3 py-2 rounded hover:bg-gray-200 border-b-[0.2px]"
              >
                {service.name}
              </Link>
            </DropdownMenuItem>
          ))}
      </div>

    </div>
  </DropdownMenuContent>
</DropdownMenu>



            {menuData.mainMenu.slice(2).map((item:any) => (
              <div key={item.id} className="relative group">
                {item.hasDropdown ? (
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <button className="flex items-center text-gray-700 hover:text-primary font-medium transition-colors duration-200">
                        {item.label}
                        <ChevronDown className="ml-1 h-4 w-4" />
                      </button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="start" className="horizontal-dropdown p-4">
                      {item.dropdownItems?.map((dropdownItem:any) => (
                        <DropdownMenuItem key={dropdownItem.id} asChild>
                          <Link href={dropdownItem.url} className="w-full hover:bg-secondary hover:text-primary transition-colors duration-200 p-2 rounded">
                            {dropdownItem.label}
                          </Link>
                        </DropdownMenuItem>
                      ))}
                    </DropdownMenuContent>
                  </DropdownMenu>
                ) : (
                  <Link href={item.url} className="text-gray-700 hover:text-primary font-medium transition-colors duration-200">
                    {item.label}
                  </Link>
                )}
              </div>
            ))}
          </nav>

          <div className="hidden lg:flex items-center space-x-4">
            <Button asChild className="btn-hover transition-all duration-300 hover:shadow-lg">
            <a href="tel:720-555-1234" className="flex items-center text-sm hover:text-primary transition-colors">
              <Phone className="h-4 w-4 mr-1" />
              <span>720-555-1234</span>
            </a>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button className="lg:hidden text-gray-700" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
        {isMenuOpen && (
          <div className="absolute top-full left-0 w-full bg-white shadow-md lg:hidden">
            <div className="flex flex-col space-y-4 p-4">
              {menuData.mainMenu.map((item: any) => (
                <Link key={item.id} href={item.url} className="text-gray-700 hover:text-primary font-medium transition-colors duration-200">
                  {item.label}
                </Link>
              ))}

              {/* Residential Services */}
              <button onClick={() => setIsResidentialOpen(!isResidentialOpen)} className="flex items-center justify-between text-gray-700 hover:text-primary font-medium transition-colors">
                Residential Services
                <ChevronDown className={`h-4 w-4 transition-transform ${isResidentialOpen ? "rotate-180" : ""}`} />
              </button>
              {isResidentialOpen && (
                <div className="pl-4 space-y-2">
                  {residentialServices.map((service: any) => (
                    <Link key={service._id} href={`/description?id=${service._id}`} className="block hover:text-primary">
                      {service.name}
                    </Link>
                  ))}
                </div>
              )}

              {/* Commercial Services */}
              <button onClick={() => setIsCommercialOpen(!isCommercialOpen)} className="flex items-center justify-between text-gray-700 hover:text-primary font-medium transition-colors">
                Commercial Services
                <ChevronDown className={`h-4 w-4 transition-transform ${isCommercialOpen ? "rotate-180" : ""}`} />
              </button>
              {isCommercialOpen && (
                <div className="pl-4 space-y-2">
                  {commercialServices.map((service: any) => (
                    <Link key={service._id} href={`/description?id=${service._id}`} className="block hover:text-primary">
                      {service.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

      </header>
    </>
  )
}
