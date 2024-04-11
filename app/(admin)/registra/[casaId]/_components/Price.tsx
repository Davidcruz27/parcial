"use client";

import * as z from "zod";
import axios from "axios";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Pencil } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";
import { cn } from "@/lib/utils";
import { Casa } from "@prisma/client";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { formatPrice } from "@/lib/format";

interface PriceFromProps {
  initialData: Casa;
  casaId: string;
}

const formShema = z.object({
  precio: z.coerce.number(),
});

const PriceFrom = ({ initialData, casaId }: PriceFromProps) => {
  const router = useRouter();

  const [isEditing, setIsEditing] = useState(false);

  const toggleEdit = () => setIsEditing(!isEditing);

  const form = useForm<z.infer<typeof formShema>>({
    resolver: zodResolver(formShema),
    defaultValues: {
      precio: initialData?.precio || undefined,
    },
  });

  const { isSubmitting, isValid } = form.formState;

  const onSubmit = async (values: z.infer<typeof formShema>) => {
    try {
      await axios.patch(`/api/ciudad/${casaId}`, values);
      toast.success("succes");
      toggleEdit();
      router.refresh();
    } catch (error) {
      toast.error("Something webt wrong");
    }
  };
  return (
    <div className="mt-6 border bg-slate-100 rounded-md p-4">
      <div className="font-medium flex items-center justify-between">
        Home price
        <Button variant={"ghost"} onClick={toggleEdit}>
          {isEditing ? (
            <>Cancel</>
          ) : (
            <>
              <Pencil className="h-4 w-4 mr-2 " />
              Edit price
            </>
          )}
        </Button>
      </div>
      {!isEditing ? (
        <p
          className={cn(
            "text-sm mt-2",
            !initialData.precio && "text-slate-500 italic"
          )}
        >
          {initialData.precio ? formatPrice(initialData.precio) : "No price"}
        </p>
      ) : (
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-4 mt-4"
          >
            <FormField
              control={form.control}
              name="precio"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      type="number"
                      step={"0.01"}
                      disabled={isSubmitting}
                      placeholder="set a price for your course"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex items-center gap-x-2">
              <Button type="submit" disabled={!isValid || isSubmitting}>
                Save
              </Button>
            </div>
          </form>
        </Form>
      )}
    </div>
  );
};

export default PriceFrom;
