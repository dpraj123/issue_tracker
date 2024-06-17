"use client";
import { Button, TextArea, TextField } from "@radix-ui/themes";
import axios from "axios";
import { useRouter } from "next/navigation";
import React from "react";
import { Controller, useForm } from "react-hook-form";

interface IssueForm {
  title: string;
  description: string;
}

const NewIssuePage = () => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<IssueForm>();

  const handleNewIssueForm = (values: IssueForm) => {
    console.log(values);
  };

  return (
    <form
      onSubmit={handleSubmit(async (data) => {
        await axios.post("/api/issues", data);
        router.push("/issues");
      })}
    >
      <div className="max-w-xl space-y-4 p-5">
        <TextField.Root
          placeholder="Title"
          {...register("title", { required: "Title is required" })}
        />
        {errors.title && (
          <div className="text-red-500 text-sm">{errors.title.message}</div>
        )}

        <Controller
          name="description"
          control={control}
          rules={{ required: "Description is required" }}
          render={({ field }) => (
            <TextArea
              value={field.value}
              onChange={field.onChange}
              placeholder="Description"
            />
          )}
        />
        {errors.description && (
          <div className="text-red-500 text-sm">
            {errors.description.message}
          </div>
        )}

        <Button type="submit">Submit New Issue</Button>
      </div>
    </form>
  );
};

export default NewIssuePage;
