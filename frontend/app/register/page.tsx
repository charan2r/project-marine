"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Separator } from "@/components/ui/separator"
import { Progress } from "@/components/ui/progress"
import { 
  Waves, 
  Mail, 
  Lock, 
  Eye, 
  EyeOff, 
  ArrowRight, 
  User,
  CheckCircle,
  Circle
} from "lucide-react"

const passwordRequirements = [
  { id: "length", label: "At least 8 characters", regex: /.{8,}/ },
  { id: "uppercase", label: "One uppercase letter", regex: /[A-Z]/ },
  { id: "lowercase", label: "One lowercase letter", regex: /[a-z]/ },
  { id: "number", label: "One number", regex: /[0-9]/ },
]

export default function RegisterPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  })
  const [agreeTerms, setAgreeTerms] = useState(false)
  const [agreeNewsletter, setAgreeNewsletter] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const getPasswordStrength = () => {
    const metRequirements = passwordRequirements.filter(req => 
      req.regex.test(formData.password)
    ).length
    return (metRequirements / passwordRequirements.length) * 100
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000))
    setIsLoading(false)
  }

  return (
    <div className="min-h-screen flex">
      {/* Left Side - Decorative */}
      <div className="hidden lg:flex lg:w-1/2 bg-secondary relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/patterns/waves.svg')] opacity-10" />
        <div className="absolute inset-0 bg-gradient-to-br from-secondary via-secondary to-primary/50" />
        
        <div className="relative z-10 flex flex-col justify-between p-12 text-secondary-foreground">
          <div>
            <Link href="/" className="flex items-center gap-2">
              <Waves className="h-8 w-8" />
              <span className="text-2xl font-bold">OceanWatch</span>
            </Link>
          </div>
          
          <div className="space-y-6">
            <h1 className="text-4xl font-bold leading-tight">
              Join our global ocean conservation community
            </h1>
            <p className="text-lg text-secondary-foreground/80 max-w-md">
              Be part of a worldwide network of marine enthusiasts, scientists, 
              and conservationists working together to protect our oceans.
            </p>
            
            <div className="space-y-4 pt-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-secondary-foreground/20 flex items-center justify-center">
                  <CheckCircle className="h-5 w-5" />
                </div>
                <div>
                  <p className="font-medium">AI-Powered Species Recognition</p>
                  <p className="text-sm text-secondary-foreground/70">Identify marine life instantly</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-secondary-foreground/20 flex items-center justify-center">
                  <CheckCircle className="h-5 w-5" />
                </div>
                <div>
                  <p className="font-medium">Contribute to Citizen Science</p>
                  <p className="text-sm text-secondary-foreground/70">Your observations matter</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-secondary-foreground/20 flex items-center justify-center">
                  <CheckCircle className="h-5 w-5" />
                </div>
                <div>
                  <p className="font-medium">Connect with Experts</p>
                  <p className="text-sm text-secondary-foreground/70">Learn from marine biologists</p>
                </div>
              </div>
            </div>
          </div>
          
          <p className="text-sm text-secondary-foreground/60">
            Every new member strengthens our mission.
          </p>
        </div>
      </div>

      {/* Right Side - Register Form */}
      <div className="flex-1 flex items-center justify-center p-8 bg-background overflow-y-auto">
        <div className="w-full max-w-md py-8">
          {/* Mobile Logo */}
          <div className="lg:hidden mb-8 text-center">
            <Link href="/" className="inline-flex items-center gap-2">
              <Waves className="h-8 w-8 text-primary" />
              <span className="text-2xl font-bold text-foreground">OceanWatch</span>
            </Link>
          </div>

          <Card className="border-0 shadow-none lg:shadow-sm lg:border">
            <CardHeader className="space-y-1 text-center lg:text-left">
              <CardTitle className="text-2xl font-bold">Create an account</CardTitle>
              <CardDescription>
                Start your marine conservation journey today
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="name"
                      name="name"
                      type="text"
                      placeholder="John Doe"
                      value={formData.name}
                      onChange={handleChange}
                      className="pl-9"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="name@example.com"
                      value={formData.email}
                      onChange={handleChange}
                      className="pl-9"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="password"
                      name="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Create a strong password"
                      value={formData.password}
                      onChange={handleChange}
                      className="pl-9 pr-9"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                    >
                      {showPassword ? (
                        <EyeOff className="h-4 w-4" />
                      ) : (
                        <Eye className="h-4 w-4" />
                      )}
                    </button>
                  </div>
                  
                  {/* Password Strength */}
                  {formData.password && (
                    <div className="space-y-2 mt-2">
                      <Progress value={getPasswordStrength()} className="h-1.5" />
                      <div className="grid grid-cols-2 gap-2">
                        {passwordRequirements.map((req) => (
                          <div key={req.id} className="flex items-center gap-1.5 text-xs">
                            {req.regex.test(formData.password) ? (
                              <CheckCircle className="h-3 w-3 text-primary" />
                            ) : (
                              <Circle className="h-3 w-3 text-muted-foreground" />
                            )}
                            <span className={req.regex.test(formData.password) ? "text-foreground" : "text-muted-foreground"}>
                              {req.label}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">Confirm Password</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="confirmPassword"
                      name="confirmPassword"
                      type="password"
                      placeholder="Confirm your password"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      className="pl-9"
                      required
                    />
                  </div>
                  {formData.confirmPassword && formData.password !== formData.confirmPassword && (
                    <p className="text-xs text-destructive">Passwords do not match</p>
                  )}
                </div>

                <div className="space-y-3 pt-2">
                  <div className="flex items-start gap-2">
                    <Checkbox 
                      id="terms" 
                      checked={agreeTerms}
                      onCheckedChange={(checked) => setAgreeTerms(checked as boolean)}
                      className="mt-0.5"
                      required
                    />
                    <Label htmlFor="terms" className="text-sm font-normal cursor-pointer leading-snug">
                      I agree to the{" "}
                      <Link href="/terms" className="text-primary hover:underline">Terms of Service</Link>
                      {" "}and{" "}
                      <Link href="/privacy" className="text-primary hover:underline">Privacy Policy</Link>
                    </Label>
                  </div>
                  
                  <div className="flex items-start gap-2">
                    <Checkbox 
                      id="newsletter" 
                      checked={agreeNewsletter}
                      onCheckedChange={(checked) => setAgreeNewsletter(checked as boolean)}
                      className="mt-0.5"
                    />
                    <Label htmlFor="newsletter" className="text-sm font-normal cursor-pointer leading-snug">
                      Send me updates about ocean conservation and new features
                    </Label>
                  </div>
                </div>

                <Button 
                  type="submit" 
                  className="w-full" 
                  disabled={isLoading || !agreeTerms || formData.password !== formData.confirmPassword}
                >
                  {isLoading ? (
                    "Creating account..."
                  ) : (
                    <>
                      Create account
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </>
                  )}
                </Button>
              </form>

              <div className="relative my-6">
                <Separator />
                <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-background px-2 text-xs text-muted-foreground">
                  Or sign up with
                </span>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <Button variant="outline" type="button">
                  <svg className="mr-2 h-4 w-4" viewBox="0 0 24 24">
                    <path
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                      fill="#4285F4"
                    />
                    <path
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                      fill="#34A853"
                    />
                    <path
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                      fill="#FBBC05"
                    />
                    <path
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                      fill="#EA4335"
                    />
                  </svg>
                  Google
                </Button>
                <Button variant="outline" type="button">
                  <svg className="mr-2 h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                  </svg>
                  GitHub
                </Button>
              </div>

              <p className="mt-6 text-center text-sm text-muted-foreground">
                Already have an account?{" "}
                <Link href="/login" className="text-primary font-medium hover:underline">
                  Sign in
                </Link>
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
