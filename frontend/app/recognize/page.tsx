"use client";

import { useState, useCallback } from "react";
import Link from "next/link";
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Upload,
  Camera,
  Image as ImageIcon,
  Scan,
  Info,
  CheckCircle,
  AlertCircle,
  X,
  Fish,
  MapPin,
  BookOpen,
  Save,
} from "lucide-react";

// Mock recognition results
const mockResults = [
  {
    species: "Blue Tang",
    scientificName: "Paracanthurus hepatus",
    confidence: 94,
    status: "Least Concern",
    habitat: "Coral Reefs",
    image:
      "https://images.unsplash.com/photo-1535591273668-578e31182c4f?w=400&h=300&fit=crop",
  },
  {
    species: "Clownfish",
    scientificName: "Amphiprioninae",
    confidence: 78,
    status: "Least Concern",
    habitat: "Coral Reefs",
    image:
      "https://images.unsplash.com/photo-1535591273668-578e31182c4f?w=400&h=300&fit=crop",
  },
  {
    species: "Moorish Idol",
    scientificName: "Zanclus cornutus",
    confidence: 45,
    status: "Least Concern",
    habitat: "Coral Reefs",
    image:
      "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=400&h=300&fit=crop",
  },
];

export default function RecognizePage() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [results, setResults] = useState<typeof mockResults | null>(null);
  const [dragActive, setDragActive] = useState(false);

  const handleFileSelect = useCallback((file: File) => {
    if (file && file.type.startsWith("image/")) {
      setSelectedFile(file);
      setPreviewUrl(URL.createObjectURL(file));
      setResults(null);
    }
  }, []);

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  }, []);

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      e.stopPropagation();
      setDragActive(false);

      if (e.dataTransfer.files && e.dataTransfer.files[0]) {
        handleFileSelect(e.dataTransfer.files[0]);
      }
    },
    [handleFileSelect],
  );

  const handleAnalyze = async () => {
    if (!selectedFile) return;

    setIsAnalyzing(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2500));
    setResults(mockResults);
    setIsAnalyzing(false);
  };

  const clearSelection = () => {
    setSelectedFile(null);
    setPreviewUrl(null);
    setResults(null);
  };

  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 80) return "text-green-500";
    if (confidence >= 50) return "text-yellow-500";
    return "text-red-500";
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      <main className="flex-1">
        {/* Header */}
        <section className="bg-[#0a1628] py-16 md:py-20">
          <div className="w-full mx-auto px-4 md:px-6 text-center">
            <div className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 text-sm text-primary-foreground mb-4">
              <Scan className="h-4 w-4" />
              <span>AI-Powered Recognition</span>
            </div>
            <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl">
              Identify Marine Species
            </h1>
            <p className="mt-4 text-lg text-gray-300 max-w-2xl mx-auto">
              Upload a photo of any marine creature and our AI will identify the
              species, provide detailed information, and help you contribute to
              citizen science.
            </p>
          </div>
        </section>

        {/* Main Content */}
        <section className="py-12">
          <div className="w-full mx-auto px-4 md:px-6">
            <div className="grid lg:grid-cols-2 gap-8">
              {/* Upload Section */}
              <div>
                <Card>
                  <CardHeader>
                    <CardTitle>Upload Image</CardTitle>
                    <CardDescription>
                      Upload a clear photo of the marine species you want to
                      identify.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    {!previewUrl ? (
                      <div
                        className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
                          dragActive
                            ? "border-primary bg-primary/5"
                            : "border-border"
                        }`}
                        onDragEnter={handleDrag}
                        onDragLeave={handleDrag}
                        onDragOver={handleDrag}
                        onDrop={handleDrop}
                      >
                        <div className="flex flex-col items-center gap-4">
                          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-muted">
                            <Upload className="h-8 w-8 text-muted-foreground" />
                          </div>
                          <div>
                            <p className="font-medium">
                              Drag and drop your image here
                            </p>
                            <p className="text-sm text-muted-foreground mt-1">
                              or click to browse
                            </p>
                          </div>
                          <input
                            type="file"
                            accept="image/*"
                            onChange={(e) =>
                              e.target.files?.[0] &&
                              handleFileSelect(e.target.files[0])
                            }
                            className="hidden"
                            id="file-upload"
                          />
                          <div className="flex gap-2">
                            <Button asChild>
                              <label
                                htmlFor="file-upload"
                                className="cursor-pointer"
                              >
                                <ImageIcon className="mr-2 h-4 w-4" />
                                Choose File
                              </label>
                            </Button>
                            <Button variant="outline">
                              <Camera className="mr-2 h-4 w-4" />
                              Take Photo
                            </Button>
                          </div>
                          <p className="text-xs text-muted-foreground">
                            Supports JPG, PNG, WebP up to 10MB
                          </p>
                        </div>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        <div className="relative aspect-video rounded-lg overflow-hidden bg-muted">
                          <img
                            src={previewUrl}
                            alt="Preview"
                            className="w-full h-full object-contain"
                          />
                          <Button
                            variant="secondary"
                            size="icon"
                            className="absolute top-2 right-2"
                            onClick={clearSelection}
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        </div>
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-muted-foreground truncate max-w-[200px]">
                            {selectedFile?.name}
                          </span>
                          <span className="text-muted-foreground">
                            {selectedFile &&
                              (selectedFile.size / 1024 / 1024).toFixed(2)}{" "}
                            MB
                          </span>
                        </div>
                        <Button
                          className="w-full"
                          size="lg"
                          onClick={handleAnalyze}
                          disabled={isAnalyzing}
                        >
                          {isAnalyzing ? (
                            <>
                              <span className="animate-spin mr-2">
                                <Scan className="h-5 w-5" />
                              </span>
                              Analyzing...
                            </>
                          ) : (
                            <>
                              <Scan className="mr-2 h-5 w-5" />
                              Analyze Image
                            </>
                          )}
                        </Button>
                      </div>
                    )}
                  </CardContent>
                </Card>

                {/* Tips */}
                <Card className="mt-6">
                  <CardHeader>
                    <CardTitle className="text-base flex items-center gap-2">
                      <Info className="h-4 w-4 text-primary" />
                      Tips for Better Results
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                        Use clear, well-lit photos with the subject in focus
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                        Include the whole animal when possible
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                        Multiple angles improve accuracy
                      </li>
                      <li className="flex items-start gap-2">
                        <AlertCircle className="h-4 w-4 text-amber-500 mt-0.5 flex-shrink-0" />
                        Avoid heavily filtered or edited images
                      </li>
                    </ul>
                  </CardContent>
                </Card>
              </div>

              {/* Results Section */}
              <div>
                <Card className="h-full">
                  <CardHeader>
                    <CardTitle>Recognition Results</CardTitle>
                    <CardDescription>
                      AI-powered species identification and information.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    {isAnalyzing ? (
                      <div className="flex flex-col items-center justify-center py-12 gap-4">
                        <div className="relative">
                          <div className="h-16 w-16 rounded-full border-4 border-muted border-t-primary animate-spin" />
                          <Scan className="h-6 w-6 text-primary absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
                        </div>
                        <div className="text-center">
                          <p className="font-medium">Analyzing image...</p>
                          <p className="text-sm text-muted-foreground">
                            This may take a few seconds
                          </p>
                        </div>
                      </div>
                    ) : results ? (
                      <div className="space-y-6">
                        {/* Top Result */}
                        <div className="p-4 rounded-lg bg-green-50 border border-green-200">
                          <div className="flex items-start gap-4">
                            <img
                              src={results[0].image}
                              alt={results[0].species}
                              className="w-20 h-20 rounded-lg object-cover"
                            />
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-1">
                                <Badge className="bg-green-500 text-white">
                                  Best Match
                                </Badge>
                                <span
                                  className={`font-bold ${getConfidenceColor(results[0].confidence)}`}
                                >
                                  {results[0].confidence}%
                                </span>
                              </div>
                              <h3 className="font-semibold text-lg">
                                {results[0].species}
                              </h3>
                              <p className="text-sm text-muted-foreground italic">
                                {results[0].scientificName}
                              </p>
                              <div className="flex gap-2 mt-2">
                                <Badge variant="outline">
                                  {results[0].habitat}
                                </Badge>
                                <Badge variant="outline">
                                  {results[0].status}
                                </Badge>
                              </div>
                            </div>
                          </div>
                          <div className="flex gap-2 mt-4">
                            <Button size="sm" asChild>
                              <Link href="/species/4">
                                <BookOpen className="mr-2 h-4 w-4" />
                                Learn More
                              </Link>
                            </Button>
                            <Button size="sm" variant="outline">
                              <Save className="mr-2 h-4 w-4" />
                              Save as Observation
                            </Button>
                          </div>
                        </div>

                        {/* Other Matches */}
                        <div>
                          <h4 className="text-sm font-medium mb-3">
                            Other Possible Matches
                          </h4>
                          <div className="space-y-3">
                            {results.slice(1).map((result, index) => (
                              <div
                                key={index}
                                className="flex items-center gap-3 p-3 rounded-lg border"
                              >
                                <img
                                  src={result.image}
                                  alt={result.species}
                                  className="w-12 h-12 rounded object-cover"
                                />
                                <div className="flex-1 min-w-0">
                                  <p className="font-medium truncate">
                                    {result.species}
                                  </p>
                                  <p className="text-xs text-muted-foreground italic">
                                    {result.scientificName}
                                  </p>
                                </div>
                                <div className="text-right">
                                  <span
                                    className={`font-bold ${getConfidenceColor(result.confidence)}`}
                                  >
                                    {result.confidence}%
                                  </span>
                                  <Progress
                                    value={result.confidence}
                                    className="w-20 h-1.5 mt-1"
                                  />
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Actions */}
                        <div className="pt-4 border-t">
                          <p className="text-sm text-muted-foreground mb-3">
                            Not the right species? Help improve our AI by
                            submitting a correction.
                          </p>
                          <Button variant="outline" size="sm">
                            Submit Correction
                          </Button>
                        </div>
                      </div>
                    ) : (
                      <div className="flex flex-col items-center justify-center py-12 text-center">
                        <Fish className="h-16 w-16 text-muted-foreground/50 mb-4" />
                        <h3 className="font-medium text-lg">No Results Yet</h3>
                        <p className="text-sm text-muted-foreground mt-1 max-w-sm">
                          Upload an image and click Analyze to identify marine
                          species using our AI.
                        </p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section className="py-12 bg-card">
          <div className="w-full mx-auto px-4 md:px-6">
            <h2 className="text-2xl font-bold text-center mb-8">
              How It Works
            </h2>
            <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
              <div className="text-center">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 mx-auto mb-4">
                  <span className="text-xl font-bold text-primary">1</span>
                </div>
                <h3 className="font-semibold mb-2">Upload Photo</h3>
                <p className="text-sm text-muted-foreground">
                  Take or upload a clear photo of the marine species you want to
                  identify.
                </p>
              </div>
              <div className="text-center">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 mx-auto mb-4">
                  <span className="text-xl font-bold text-primary">2</span>
                </div>
                <h3 className="font-semibold mb-2">AI Analysis</h3>
                <p className="text-sm text-muted-foreground">
                  Our AI analyzes the image using deep learning trained on
                  thousands of species.
                </p>
              </div>
              <div className="text-center">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 mx-auto mb-4">
                  <span className="text-xl font-bold text-primary">3</span>
                </div>
                <h3 className="font-semibold mb-2">Get Results</h3>
                <p className="text-sm text-muted-foreground">
                  Receive identification results with confidence scores and
                  species information.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
