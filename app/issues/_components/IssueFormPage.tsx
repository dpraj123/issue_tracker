"use client";
import React, { useState } from "react";
import { z } from "zod";
import { issueSchema } from "@/app/validationSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, TextField } from "@radix-ui/themes";
import axios from "axios";
import { useRouter } from "next/navigation";
import { Controller, useForm } from "react-hook-form";
import { ErrorMessage, Spinner } from "@/app/components";
import "easymde/dist/easymde.min.css";
import dynamic from "next/dynamic";
import { Issue } from "@prisma/client";
const SimpleMDE = dynamic(() => import("react-simplemde-editor"), {
  ssr: false,
});
type IssueForm = z.infer<typeof issueSchema>;
const IssueFormPage = ({ issue }: { issue?: Issue }) => {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<IssueForm>({
    resolver: zodResolver(issueSchema),
  });

  const handleNewIssueForm = async (FormValue: IssueForm) => {
    try {
      setIsSubmitting(true);
      if (issue) {
        await axios.patch("/api/issues/" + issue?.id, FormValue);
      } else await axios.post("/api/issues", FormValue);
      router.push("/issues");
      router.refresh();
    } catch (error) {
      console.error("Error submitting form: ", error);
    } finally {
      setIsSubmitting(false);
    }
  };
  return (
    <form onSubmit={handleSubmit(handleNewIssueForm)}>
      <div className="max-w-xl space-y-4 p-5">
        <TextField.Root
          defaultValue={issue?.title}
          placeholder="Title"
          {...register("title", { required: "Title is required" })}
        />
        <ErrorMessage>{errors.title?.message}</ErrorMessage>
        <Controller
          name="description"
          control={control}
          defaultValue={issue?.description}
          rules={{ required: "Description is required" }}
          render={({ field }) => (
            <SimpleMDE
              value={field.value}
              onChange={field.onChange}
              placeholder="Description"
            />
          )}
        />
        <ErrorMessage>{errors.description?.message}</ErrorMessage>
        <Button type="submit" disabled={isSubmitting}>
          {issue ? "Update Issue" : "Submit New Issue"}
          {isSubmitting && <Spinner />}
        </Button>
      </div>
    </form>
  );
};

export default IssueFormPage;
