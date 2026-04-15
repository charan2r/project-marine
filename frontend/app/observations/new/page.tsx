"use client";

import { useState } from "react";
import Link from "next/link";
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  ArrowLeft,
  Upload,
  MapPin,
  Calendar,
  Camera,
  Image as ImageIcon,
  X,
  Scan,
  CheckCircle,
} from "lucide-react";

export default function NewObservationPage() {
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [previewUrls, setPreviewUrls] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleFileSelect = (files: FileList | null) => {
    if (!files) return;

    const newFiles = Array.from(files).filter((f) =>
      f.type.startsWith("image/"),
    );
    const newUrls = newFiles.map((f) => URL.createObjectURL(f));

    setSelectedFiles((prev) => [...prev, ...newFiles]);
    setPreviewUrls((prev) => [...prev, ...newUrls]);
  };

  const removeFile = (index: number) => {
    setSelectedFiles((prev) => prev.filter((_, i) => i !== index));
    setPreviewUrls((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate submission
    await new Promise((resolve) => setTimeout(resolve, 2000));
    setIsSubmitting(false);
    setIsSubmitted(true);
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navigation />
        <main className="flex-1 flex items-center justify-center py-12">
          <Card className="max-w-md w-full mx-4">
            <CardContent className="pt-6 text-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-green-100 mx-auto mb-4">
                <CheckCircle className="h-8 w-8 text-green-600" />
              </div>
              <h2 className="text-2xl font-bold mb-2">
                Observation Submitted!
              </h2>
              <p className="text-muted-foreground mb-6">
                Thank you for your contribution! Your observation has been
                submitted for review and will be verified by our team.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Button asChild>
                  <Link href="/observations">View Observations</Link>
                </Button>
                <Button
                  variant="outline"
                  onClick={() => {
                    setIsSubmitted(false);
                    setSelectedFiles([]);
                    setPreviewUrls([]);
                  }}
                >
                  Submit Another
                </Button>
              </div>
            </CardContent>
          </Card>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      <main className="flex-1">
        {/* Header */}
        <section className="bg-[#0a1628] py-12 md:py-16">
          <div className="w-full mx-auto px-4 md:px-6">
            <Button
              variant="ghost"
              className="mb-4 text-white hover:text-white hover:bg-white/20"
              asChild
            >
              <Link href="/observations">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Observations
              </Link>
            </Button>
            <h1 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Submit New Observation
            </h1>
            <p className="mt-2 text-gray-300 max-w-2xl">
              Share your marine sighting with the community. Your observations
              help scientists track species and protect our oceans.
            </p>
          </div>
        </section>

        {/* Form */}
        <section className="py-12">
          <div className="w-full mx-auto px-4 md:px-6">
            <form onSubmit={handleSubmit} className="max-w-3xl mx-auto">
              <div className="grid gap-8">
                {/* Photo Upload */}
                <Card>
                  <CardHeader>
                    <CardTitle>Photos</CardTitle>
                    <CardDescription>
                      Upload clear photos of the species you observed. Multiple
                      angles help with identification.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    {previewUrls.length > 0 && (
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                        {previewUrls.map((url, index) => (
                          <div
                            key={index}
                            className="relative aspect-square rounded-lg overflow-hidden bg-muted"
                          >
                            <img
                              src={url}
                              alt={`Preview ${index + 1}`}
                              className="w-full h-full object-cover"
                            />
                            <Button
                              type="button"
                              variant="secondary"
                              size="icon"
                              className="absolute top-2 right-2 h-6 w-6"
                              onClick={() => removeFile(index)}
                            >
                              <X className="h-3 w-3" />
                            </Button>
                          </div>
                        ))}
                      </div>
                    )}

                    <div className="border-2 border-dashed rounded-lg p-6 text-center">
                      <input
                        type="file"
                        accept="image/*"
                        multiple
                        onChange={(e) => handleFileSelect(e.target.files)}
                        className="hidden"
                        id="photo-upload"
                      />
                      <div className="flex flex-col items-center gap-3">
                        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-muted">
                          <Upload className="h-6 w-6 text-muted-foreground" />
                        </div>
                        <div>
                          <p className="font-medium">Add photos</p>
                          <p className="text-sm text-muted-foreground">
                            Drag and drop or click to browse
                          </p>
                        </div>
                        <div className="flex gap-2">
                          <Button type="button" variant="outline" asChild>
                            <label
                              htmlFor="photo-upload"
                              className="cursor-pointer"
                            >
                              <ImageIcon className="mr-2 h-4 w-4" />
                              Choose Files
                            </label>
                          </Button>
                        </div>
                      </div>
                    </div>

                    <div className="mt-4 flex items-center gap-2">
                      <Button
                        type="button"
                        variant="secondary"
                        size="sm"
                        asChild
                      >
                        <Link href="/recognize">
                          <Scan className="mr-2 h-4 w-4" />
                          Use AI Recognition
                        </Link>
                      </Button>
                      <span className="text-sm text-muted-foreground">
                        to help identify the species
                      </span>
                    </div>
                  </CardContent>
                </Card>

                {/* Species Info */}
                <Card>
                  <CardHeader>
                    <CardTitle>Species Information</CardTitle>
                    <CardDescription>
                      Provide details about the species you observed.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="species">Species Name</Label>
                        <Input id="species" placeholder="e.g., Blue Tang" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="scientific">
                          Scientific Name (optional)
                        </Label>
                        <Input
                          id="scientific"
                          placeholder="e.g., Paracanthurus hepatus"
                        />
                      </div>
                    </div>

                    <div className="grid sm:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="category">Category</Label>
                        <Select>
                          <SelectTrigger id="category">
                            <SelectValue placeholder="Select category" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="fish">Fish</SelectItem>
                            <SelectItem value="mammals">Mammals</SelectItem>
                            <SelectItem value="reptiles">Reptiles</SelectItem>
                            <SelectItem value="invertebrates">
                              Invertebrates
                            </SelectItem>
                            <SelectItem value="birds">Birds</SelectItem>
                            <SelectItem value="other">Other</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="count">Number Observed</Label>
                        <Input
                          id="count"
                          type="number"
                          placeholder="1"
                          min="1"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="behavior">
                        Behavior Notes (optional)
                      </Label>
                      <Textarea
                        id="behavior"
                        placeholder="Describe what the animal was doing..."
                        rows={3}
                      />
                    </div>
                  </CardContent>
                </Card>

                {/* Location & Date */}
                <Card>
                  <CardHeader>
                    <CardTitle>Location & Date</CardTitle>
                    <CardDescription>
                      Where and when did you make this observation?
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="location">Location</Label>
                      <div className="relative">
                        <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input
                          id="location"
                          placeholder="e.g., Great Barrier Reef, Australia"
                          className="pl-10"
                        />
                      </div>
                    </div>

                    <div className="grid sm:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="latitude">Latitude (optional)</Label>
                        <Input id="latitude" placeholder="-18.2871" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="longitude">Longitude (optional)</Label>
                        <Input id="longitude" placeholder="147.6992" />
                      </div>
                    </div>

                    <div className="grid sm:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="date">Date of Observation</Label>
                        <div className="relative">
                          <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                          <Input id="date" type="date" className="pl-10" />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="time">Time (optional)</Label>
                        <Input id="time" type="time" />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="habitat">Habitat</Label>
                      <Select>
                        <SelectTrigger id="habitat">
                          <SelectValue placeholder="Select habitat" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="coral-reef">Coral Reef</SelectItem>
                          <SelectItem value="open-ocean">Open Ocean</SelectItem>
                          <SelectItem value="coastal">
                            Coastal Waters
                          </SelectItem>
                          <SelectItem value="deep-sea">Deep Sea</SelectItem>
                          <SelectItem value="mangroves">Mangroves</SelectItem>
                          <SelectItem value="seagrass">
                            Seagrass Meadows
                          </SelectItem>
                          <SelectItem value="kelp">Kelp Forest</SelectItem>
                          <SelectItem value="polar">Polar Waters</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </CardContent>
                </Card>

                {/* Additional Notes */}
                <Card>
                  <CardHeader>
                    <CardTitle>Additional Notes</CardTitle>
                    <CardDescription>
                      Any other details that might be helpful for researchers.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Textarea
                      placeholder="Water conditions, weather, any notable observations..."
                      rows={4}
                    />
                  </CardContent>
                </Card>

                {/* Submit */}
                <div className="flex flex-col sm:flex-row gap-4 justify-end">
                  <Button type="button" variant="outline" asChild>
                    <Link href="/observations">Cancel</Link>
                  </Button>
                  <Button
                    type="submit"
                    disabled={isSubmitting || selectedFiles.length === 0}
                  >
                    {isSubmitting ? (
                      <>
                        <span className="animate-spin mr-2">
                          <Upload className="h-4 w-4" />
                        </span>
                        Submitting...
                      </>
                    ) : (
                      <>
                        <Upload className="mr-2 h-4 w-4" />
                        Submit Observation
                      </>
                    )}
                  </Button>
                </div>
              </div>
            </form>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
