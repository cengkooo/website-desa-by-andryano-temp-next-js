"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function ComponentTestingPage() {
  const [inputValue, setInputValue] = useState("");
  const [textareaValue, setTextareaValue] = useState("");

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-950 dark:to-slate-900 p-8">
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Component Testing Page
          </h1>
          <p className="text-slate-600 dark:text-slate-400 text-lg">
            Testing semua komponen UI yang sudah dibuat
          </p>
        </div>

        {/* Tabs untuk organisasi komponen */}
        <Tabs defaultValue="buttons" className="w-full">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="buttons">Buttons</TabsTrigger>
            <TabsTrigger value="forms">Forms</TabsTrigger>
            <TabsTrigger value="cards">Cards</TabsTrigger>
            <TabsTrigger value="data">Data Display</TabsTrigger>
            <TabsTrigger value="overlays">Overlays</TabsTrigger>
          </TabsList>

          {/* Tab: Buttons & Badges */}
          <TabsContent value="buttons" className="space-y-8">
            <Card>
              <CardHeader>
                <CardTitle>Button Variants</CardTitle>
                <CardDescription>
                  Testing berbagai variant dari komponen Button
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex flex-wrap gap-4">
                  <Button variant="default">Default</Button>
                  <Button variant="destructive">Destructive</Button>
                  <Button variant="outline">Outline</Button>
                  <Button variant="secondary">Secondary</Button>
                  <Button variant="ghost">Ghost</Button>
                  <Button variant="link">Link</Button>
                </div>
                <div className="flex flex-wrap gap-4">
                  <Button size="sm">Small</Button>
                  <Button size="default">Default</Button>
                  <Button size="lg">Large</Button>
                  <Button size="icon">🚀</Button>
                </div>
                <div className="flex flex-wrap gap-4">
                  <Button disabled>Disabled</Button>
                  <Button variant="outline" disabled>
                    Disabled Outline
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Badge Variants</CardTitle>
                <CardDescription>
                  Testing berbagai variant dari komponen Badge
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-4">
                  <Badge variant="default">Default</Badge>
                  <Badge variant="secondary">Secondary</Badge>
                  <Badge variant="destructive">Destructive</Badge>
                  <Badge variant="outline">Outline</Badge>
                  <Badge variant="success">Success</Badge>
                  <Badge variant="warning">Warning</Badge>
                  <Badge variant="info">Info</Badge>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Tab: Forms */}
          <TabsContent value="forms" className="space-y-8">
            <Card>
              <CardHeader>
                <CardTitle>Form Components</CardTitle>
                <CardDescription>
                  Testing komponen Input, Label, dan Textarea
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="input-test">Input Field</Label>
                  <Input
                    id="input-test"
                    placeholder="Masukkan teks di sini..."
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                  />
                  <p className="text-sm text-slate-500">
                    Value: {inputValue || "(kosong)"}
                  </p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="input-disabled">Disabled Input</Label>
                  <Input
                    id="input-disabled"
                    placeholder="Input yang disabled"
                    disabled
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="input-email">Email Input</Label>
                  <Input
                    id="input-email"
                    type="email"
                    placeholder="email@example.com"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="textarea-test">Textarea</Label>
                  <Textarea
                    id="textarea-test"
                    placeholder="Masukkan teks panjang di sini..."
                    value={textareaValue}
                    onChange={(e) => setTextareaValue(e.target.value)}
                    rows={4}
                  />
                  <p className="text-sm text-slate-500">
                    Characters: {textareaValue.length}
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Tab: Cards */}
          <TabsContent value="cards" className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Simple Card</CardTitle>
                  <CardDescription>Card dengan header dan content</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-slate-600 dark:text-slate-400">
                    Ini adalah contoh card sederhana dengan content.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Card with Footer</CardTitle>
                  <CardDescription>Card dengan footer button</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-slate-600 dark:text-slate-400">
                    Card ini memiliki footer dengan action buttons.
                  </p>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button variant="outline">Cancel</Button>
                  <Button>Submit</Button>
                </CardFooter>
              </Card>

              <Card className="border-2 border-blue-500">
                <CardHeader>
                  <CardTitle>Highlighted Card</CardTitle>
                  <CardDescription>Card dengan border khusus</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-slate-600 dark:text-slate-400">
                    Card ini memiliki border berwarna untuk highlight.
                  </p>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Tab: Data Display */}
          <TabsContent value="data" className="space-y-8">
            <Card>
              <CardHeader>
                <CardTitle>Avatar Component</CardTitle>
                <CardDescription>Testing komponen Avatar</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-6 items-center">
                  <Avatar>
                    <AvatarImage src="https://github.com/shadcn.png" />
                    <AvatarFallback>CN</AvatarFallback>
                  </Avatar>
                  <Avatar>
                    <AvatarFallback>AB</AvatarFallback>
                  </Avatar>
                  <Avatar className="h-16 w-16">
                    <AvatarFallback className="text-2xl">XL</AvatarFallback>
                  </Avatar>
                  <Avatar className="h-8 w-8">
                    <AvatarFallback className="text-xs">SM</AvatarFallback>
                  </Avatar>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Table Component</CardTitle>
                <CardDescription>Testing komponen Table</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableCaption>Daftar contoh data untuk testing</TableCaption>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Nama</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Role</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell className="font-medium">John Doe</TableCell>
                      <TableCell>
                        <Badge variant="success">Active</Badge>
                      </TableCell>
                      <TableCell>Admin</TableCell>
                      <TableCell className="text-right">
                        <Button size="sm" variant="ghost">
                          Edit
                        </Button>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Jane Smith</TableCell>
                      <TableCell>
                        <Badge variant="warning">Pending</Badge>
                      </TableCell>
                      <TableCell>User</TableCell>
                      <TableCell className="text-right">
                        <Button size="sm" variant="ghost">
                          Edit
                        </Button>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Bob Johnson</TableCell>
                      <TableCell>
                        <Badge variant="destructive">Inactive</Badge>
                      </TableCell>
                      <TableCell>Moderator</TableCell>
                      <TableCell className="text-right">
                        <Button size="sm" variant="ghost">
                          Edit
                        </Button>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Tab: Overlays */}
          <TabsContent value="overlays" className="space-y-8">
            <Card>
              <CardHeader>
                <CardTitle>Dialog Component</CardTitle>
                <CardDescription>Testing komponen Dialog (Modal)</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Dialog>
                  <DialogTrigger asChild>
                    <Button>Open Dialog</Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Dialog Title</DialogTitle>
                      <DialogDescription>
                        Ini adalah contoh dialog/modal. Anda bisa menambahkan
                        form atau konten lainnya di sini.
                      </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4 py-4">
                      <div className="space-y-2">
                        <Label htmlFor="dialog-name">Name</Label>
                        <Input id="dialog-name" placeholder="Enter your name" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="dialog-email">Email</Label>
                        <Input
                          id="dialog-email"
                          type="email"
                          placeholder="Enter your email"
                        />
                      </div>
                    </div>
                    <DialogFooter>
                      <Button variant="outline">Cancel</Button>
                      <Button>Save Changes</Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Dropdown Menu Component</CardTitle>
                <CardDescription>
                  Testing komponen Dropdown Menu
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline">Open Menu</Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuLabel>My Account</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>Profile</DropdownMenuItem>
                    <DropdownMenuItem>Settings</DropdownMenuItem>
                    <DropdownMenuItem>Billing</DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem className="text-red-600">
                      Logout
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Footer */}
        <Card className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-950 dark:to-purple-950 border-2">
          <CardContent className="pt-6">
            <p className="text-center text-slate-600 dark:text-slate-400">
              🎨 Semua komponen UI sudah siap untuk digunakan dalam project
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
