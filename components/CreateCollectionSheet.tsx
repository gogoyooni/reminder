import { ReactNode } from "react";

import { useForm } from "react-hook-form";

import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from "./ui/sheet";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Separator } from "./ui/separator";
import { Button } from "./ui/button";
import { toast } from "./ui/use-toast";
import { Input } from "./ui/input";
import { ReloadIcon } from "@radix-ui/react-icons";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";

import { createCollectionSchema, createCollectionSchemaType } from "@/schema/createCollection";

import { zodResolver } from "@hookform/resolvers/zod";

import { CollectionColor, CollectionColors } from "@/lib/constants";
import { cn } from "@/lib/utils";

import { createCollection } from "@/actions/collection";
import { useRouter } from "next/navigation";

type Props = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

function CreateCollectionSheet({ open, onOpenChange }: Props): ReactNode {
  const form = useForm<createCollectionSchemaType>({
    resolver: zodResolver(createCollectionSchema),
    defaultValues: {
      name: "",
      color: "",
    },
  });

  const router = useRouter();

  const onSubmit = async (data: createCollectionSchemaType) => {
    try {
      await createCollection(data);
      // close the sidebar( sheet component)
      openChangeSidebar(false);

      // after sending data to the db, it is not refreshed automatically -> I need to refresh the page
      router.refresh();
      // show toast for sucess
      toast({
        title: "Success",
        description: "A new collection has been created successfully !",
      });
    } catch (error: any) {
      // show toast for error
      toast({
        title: "Error",
        description: "Something went wrong. Please try again later",
        variant: "destructive",
      });
      console.log("Error while creating collection");
    }
  };

  //폼 값 리셋 & sidebar open 상태 변경
  const openChangeSidebar = (open: boolean) => {
    form.reset();
    onOpenChange(open);
  };

  return (
    <Sheet open={open} onOpenChange={openChangeSidebar}>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Add new collection</SheetTitle>
          <SheetDescription>Collections are a way to group tasks</SheetDescription>
        </SheetHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 flex flex-col">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormDescription>Create your collection name</FormDescription>
                  <FormControl>
                    <Input placeholder="Your own collection name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="color"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Color</FormLabel>
                  <FormDescription>Select a color for your collection</FormDescription>
                  <FormControl>
                    <Select onValueChange={(color) => field.onChange(color)}>
                      <SelectTrigger
                        className={cn(
                          "w-full h-8 text-white",
                          CollectionColors[field.value as CollectionColor]
                        )}
                      >
                        <SelectValue placeholder="Color" className="w-full h-8" />
                      </SelectTrigger>
                      <SelectContent className="w-full">
                        {Object.keys(CollectionColors).map((color) => (
                          <SelectItem
                            key={color}
                            value={color}
                            className={cn(
                              `w-full h-8 rounded-md my-1 text-white focus:font-bold ring-neutral-600 focus:ring-inset focus:ring-2 dark:focus:ring-white focus:px-8`,
                              `${CollectionColors[color as CollectionColor]}`
                            )}
                          >
                            {color}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </form>
        </Form>
        <div className="flex flex-col gap-3 mt-4">
          <Separator />
          <Button
            disabled={form.formState.isSubmitting}
            variant={"outline"}
            className={
              form.watch("color") &&
              cn(CollectionColors[form.getValues("color") as CollectionColor])
            }
            onClick={form.handleSubmit(onSubmit)}
          >
            Confirm
            {form.formState.isSubmitting && <ReloadIcon className="ml-2 h-4 w-4 animate-spin" />}
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
}

export default CreateCollectionSheet;
