"use client"

import type React from "react"
import axios from "axios"
import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Upload, X, FileText } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"
import ChatBot from "@/components/chat-bot"
const API_URL = `${process.env.BASE_URL}/api/services/`;
export default function EstimatePage() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    companyName: "",
    email: "",
    emailConsent: false,
    phone: "",
    smsConsent: false,
    street1: "",
    street2: "",
    city: "",
    state: "CO",
    zipCode: "",
    services: {} as Record<string, boolean>, // Allow dynamic keys
    schedulePreference: "present",
    propertyType: "",
    details: "",
  })

  const [files, setFiles] = useState<File[]>([])
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [services,setServices] = useState([])
  const { toast } = useToast()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleCheckboxChange = (name: string, checked: boolean) => {
    if (name.startsWith("services.")) {
      const serviceName = name.split(".")[1]
      setFormData((prev) => ({
        ...prev,
        services: {
          ...prev.services,
          [serviceName]: checked,
        },
      }))
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: checked,
      }))
    }
  }

  const handleRadioChange = (name: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files)
      setFiles((prev) => [...prev, ...newFiles])
    }
  }

  const removeFile = (index: number) => {
    setFiles((prev) => prev.filter((_, i) => i !== index))
  }

const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  setIsSubmitting(true);

  try {
    const formDataToSend = new FormData();

    // Extract selected services as an object with key-value pairs
    const selectedServices = Object.entries(formData.services)
      .filter(([_, value]) => value) // Keep only selected (true) services
      .reduce((acc, [key]) => ({ ...acc, [key]: key }), {}); // Convert to { concreteLeveling: "concreteLeveling" }

    // Append each field separately
    Object.entries({
      ...formData,
      services: JSON.stringify(selectedServices), // Ensure backend gets proper object
      status: "pending",
    }).forEach(([key, value]) => {
      formDataToSend.append(key, value as string); // Convert value to string before appending
    });

    // Append files
    files.forEach((file) => {
      formDataToSend.append("images", file);
    });

    // Send to API using Axios
    const response = await axios.post(`${process.env.BASE_URL}/api/estimates`, formDataToSend, {
      headers: { "Content-Type": "multipart/form-data" },
    });

    if (response.status !== 201) throw new Error("Failed to submit estimate request");

    setIsSubmitted(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  } catch (error) {
    console.error("Error submitting form:", error);
    toast({
      title: "Error",
      description: "There was a problem submitting your request. Please try again.",
      variant: "destructive",
    });
  } finally {
    setIsSubmitting(false);
  }
};

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    try {
      const response = await fetch(API_URL);
      const data = await response.json();
      setServices(data);
    } catch (error) {
      console.error("Error fetching services:", error);
    }
  };

  if (isSubmitted) {
    return (
      <div className="pt-24 pb-16 md:pt-32 md:pb-24">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="bg-green-50 text-green-800 p-8 rounded-lg mb-8">
              <svg
                className="w-16 h-16 mx-auto mb-4 text-green-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <h2 className="text-2xl font-bold mb-4">Thank You for Your Request!</h2>
              <p className="text-lg mb-6">
                We've received your estimate request and our team will get back to you shortly.
              </p>
              {/* <p className="mb-6">
                A confirmation email has been sent to <strong>{formData.email}</strong>.
              </p> */}
              <Button asChild className="btn-hover transition-all duration-300 hover:shadow-lg">
                <a href="/">Return to Home</a>
              </Button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="pt-24 pb-16 md:pt-32 md:pb-24">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">Request a Free Estimate</h1>
            <p className="text-gray-600">
              Fill out the form below and our team will contact you to schedule your free estimate.
            </p>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-6 md:p-10">
            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Contact Details Section */}
              <div>
                <h2 className="text-xl font-bold mb-4 text-primary">Contact Details</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">First Name *</Label>
                    <Input
                      id="firstName"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName">Last Name *</Label>
                    <Input id="lastName" name="lastName" value={formData.lastName} onChange={handleChange} required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="companyName">Company Name (if applicable)</Label>
                    <Input id="companyName" name="companyName" value={formData.companyName} onChange={handleChange} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email *</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                    />
                    <div className="flex items-start space-x-2 mt-1">
                      <Checkbox
                        id="emailConsent"
                        checked={formData.emailConsent}
                        onCheckedChange={(checked) => handleCheckboxChange("emailConsent", checked as boolean)}
                      />
                      <Label htmlFor="emailConsent" className="text-xs text-gray-500 font-normal leading-tight">
                        By providing your email, you consent to receiving marketing emails and promotions. You can
                        unsubscribe at any time.
                      </Label>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number *</Label>
                    <Input id="phone" name="phone" type="tel" value={formData.phone} onChange={handleChange} required />
                    <div className="flex items-start space-x-2 mt-1">
                      <Checkbox
                        id="smsConsent"
                        checked={formData.smsConsent}
                        onCheckedChange={(checked) => handleCheckboxChange("smsConsent", checked as boolean)}
                      />
                      <Label htmlFor="smsConsent" className="text-xs text-gray-500 font-normal leading-tight">
                        By providing your phone number, you agree to receive text messages (SMS) from Repair my
                        Concrete. You can unsubscribe at anytime by replying STOP. Message and data rates may apply.
                        Message frequency varies.
                      </Label>
                    </div>
                  </div>
                </div>
              </div>

              {/* Address Section */}
              <div>
                <h2 className="text-xl font-bold mb-4 text-primary">Address</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="street1">Street 1 *</Label>
                    <Input id="street1" name="street1" value={formData.street1} onChange={handleChange} required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="street2">Street 2</Label>
                    <Input id="street2" name="street2" value={formData.street2} onChange={handleChange} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="city">City *</Label>
                    <Input id="city" name="city" value={formData.city} onChange={handleChange} required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="state">State *</Label>
                    <Select defaultValue={formData.state} onValueChange={(value) => handleSelectChange("state", value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select state" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="CO">Colorado</SelectItem>
                        <SelectItem value="WY">Wyoming</SelectItem>
                        <SelectItem value="NM">New Mexico</SelectItem>
                        <SelectItem value="UT">Utah</SelectItem>
                        <SelectItem value="AZ">Arizona</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="zipCode">ZIP Code *</Label>
                    <Input id="zipCode" name="zipCode" value={formData.zipCode} onChange={handleChange} required />
                  </div>
                </div>
              </div>

              {/* Service Details Section */}
              <div>
                <h2 className="text-xl font-bold mb-4 text-primary">Service Details</h2>
                <div className="space-y-6">
                <div>
  <Label className="text-base font-medium mb-3 block">Services Interested In:</Label>
  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
    {services.map((service:any) => (
      <div key={service._id} className="flex items-center space-x-2">
        <Checkbox
          id={service._id}
          checked={formData.services[service.name] || false}
          onCheckedChange={(checked) =>
            handleCheckboxChange(`services.${service.name}`, checked as boolean)
          }
        />
        <Label htmlFor={service._id}>{service.name}</Label>
      </div>
    ))}
  </div>
</div>


                  <div>
                    <Label className="text-base font-medium mb-3 block">Estimate Scheduling Preference:</Label>
                    <RadioGroup
                      defaultValue={formData.schedulePreference}
                      onValueChange={(value) => handleRadioChange("schedulePreference", value)}
                      className="space-y-3"
                    >
                      <div className="flex items-start space-x-2">
                        <RadioGroupItem value="present" id="present" />
                        <div>
                          <Label htmlFor="present" className="font-medium">
                            I would like to be present.
                          </Label>
                          <p className="text-sm text-gray-500">
                            Please schedule the estimate when I'm available to attend. *Required for Foundation Repair &
                            Waterproofing repair estimates.
                          </p>
                        </div>
                      </div>
                      <div className="flex items-start space-x-2">
                        <RadioGroupItem value="flexible" id="flexible" />
                        <div>
                          <Label htmlFor="flexible" className="font-medium">
                            Fastest estimate option. I'm flexible.
                          </Label>
                          <p className="text-sm text-gray-500">
                            It's not necessary I'm home during the estimate. Repair my Concrete can stop by anytime.
                          </p>
                        </div>
                      </div>
                    </RadioGroup>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="propertyType">Type Of Property *</Label>
                    <Select
                      defaultValue={formData.propertyType}
                      onValueChange={(value) => handleSelectChange("propertyType", value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Choose an option" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="residential">Residential</SelectItem>
                        <SelectItem value="commercial">Commercial</SelectItem>
                      
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="details">Provide Details About What You Want Evaluated: *</Label>
                    <Textarea
                      id="details"
                      name="details"
                      value={formData.details}
                      onChange={handleChange}
                      rows={5}
                      required
                      placeholder="Please describe the issues you're experiencing or the project you're planning..."
                    />
                  </div>

                  {/* File Upload Section */}
                  <div className="space-y-3">
                    <Label className="text-base font-medium">Upload Images (Optional)</Label>
                    <p className="text-sm text-gray-500">
                      Upload photos of the area you'd like us to evaluate. This helps us provide a more accurate
                      estimate.
                    </p>

                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                      <Input
                        type="file"
                        id="fileUpload"
                        onChange={handleFileChange}
                        className="hidden"
                        accept="image/*"
                        multiple
                      />
                      <Label htmlFor="fileUpload" className="cursor-pointer">
                        <div className="flex flex-col items-center">
                          <Upload className="h-10 w-10 text-gray-400 mb-2" />
                          <p className="text-sm font-medium">Click to upload or drag and drop</p>
                          <p className="text-xs text-gray-500 mt-1">PNG, JPG, GIF up to 10MB</p>
                        </div>
                      </Label>
                    </div>

                    {/* File List */}
                    {files.length > 0 && (
                      <div className="mt-4 space-y-2">
                        <p className="text-sm font-medium">Uploaded Files:</p>
                        <div className="space-y-2">
                          {files.map((file, index) => (
                            <div key={index} className="flex items-center justify-between bg-gray-50 p-2 rounded-md">
                              <div className="flex items-center">
                                <FileText className="h-5 w-5 text-gray-500 mr-2" />
                                <span className="text-sm truncate max-w-[200px]">{file.name}</span>
                              </div>
                              <button
                                type="button"
                                onClick={() => removeFile(index)}
                                className="text-gray-500 hover:text-red-500"
                              >
                                <X className="h-5 w-5" />
                              </button>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <Button
                type="submit"
                size="lg"
                className="w-full md:w-auto btn-hover transition-all duration-300 hover:shadow-lg"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Submitting..." : "Submit Estimate Request"}
              </Button>
            </form>
          </div>
        </div>
      </div>
      <ChatBot />
    </div>
  )
}

