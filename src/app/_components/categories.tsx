import Image from "next/image";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { FolderOpen, Tag } from "lucide-react";
import Link from "next/link";
import { getAllCategories } from "../(public)/_actions/getAllCategories";

export default async function Categories() {
  const result = await getAllCategories();

  if (!result.success) {
    return (
      <div className="container mx-auto py-12">
        <Card>
          <CardContent className="py-10 text-center">
            <p className="text-destructive">{result.message}</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-10">
      <div className="mb-8 flex items-center gap-3">
        <FolderOpen className="h-8 w-8 text-primary" />
        <div>
          <h1 className="text-3xl font-bold">Service Categories</h1>
          <p className="text-muted-foreground">
            Browse all available service categories.
          </p>
        </div>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {result.data.map((category) => (
          <Link key={category.id} href={`/services?categoryId=${category.id}`}>
            <Card className="h-full transition-shadow hover:shadow-lg">
              <CardHeader className="items-center text-center">
                <div className="relative mb-4 flex h-20 w-20 items-center justify-center overflow-hidden rounded-full border bg-muted">
                  {category.icon ? (
                    <Image
                      src={category.icon}
                      alt={category.name}
                      fill
                      unoptimized
                      className="object-cover"
                    />
                  ) : (
                    <Tag className="h-8 w-8 text-muted-foreground" />
                  )}
                </div>

                <CardTitle>{category.name}</CardTitle>

                <Badge variant="secondary">
                  {category._count?.services ?? 0} services
                </Badge>
              </CardHeader>

              <CardContent className="space-y-3">
                {category.description && (
                  <CardDescription className="line-clamp-3">
                    {category.description}
                  </CardDescription>
                )}

                <p className="text-muted-foreground text-xs">
                  Added {new Date(category.createdAt).toLocaleDateString()}
                </p>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>

      {result.data.length === 0 && (
        <Card className="mt-10">
          <CardContent className="py-10 text-center text-muted-foreground">
            No categories found.
          </CardContent>
        </Card>
      )}
    </div>
  );
}
