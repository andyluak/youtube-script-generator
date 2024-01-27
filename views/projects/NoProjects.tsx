import React from "react"
import { SelectValue } from "@radix-ui/react-select"
import { useMutation } from "@tanstack/react-query"
import { HeartCrack } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from "@/components/ui/select"
import Typography from "@/components/ui/typography"

type Props = {}

function NoProjects({}: Props) {
  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    const title = formData.get("title") as string
    const description = formData.get("description") as string
    const videoType = formData.get("videoType") as string

    mutation.mutate({ title, description, videoType })

    e.currentTarget.reset()
  }

  const mutation = useMutation({
    mutationFn: ({
      title,
      description,
      videoType,
    }: {
      title: string
      description: string
      videoType: string
    }) => {
      return fetch("/api/projects", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title,
          description,
          videoType,
        }),
      })
    },
  })

  return (
    <section className="flex flex-col items-center gap-10">
      <div className="flex flex-row items-center gap-8 justify-center">
        <HeartCrack className="text-primary size-20" />
        <div>
          <Typography.h2>No projects yet</Typography.h2>
          <Typography.p>Get started by creating a project</Typography.p>
        </div>
      </div>
      <form className="flex flex-col gap-4 w-96" onSubmit={handleSubmit}>
        <div>
          <Label htmlFor="title">Project title</Label>
          <Input id="title" placeholder="My project" name="title" />
        </div>
        <div>
          <Label htmlFor="description">Project description</Label>
          <Input
            id="description"
            name="description"
            placeholder="My kickass project description"
          />
        </div>
        <div>
          <Label htmlFor="videoType">Video Type</Label>
          <Select name="videoType">
            <SelectTrigger>
              <SelectValue placeholder="Video Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="youtube">YouTube</SelectItem>
              <SelectItem value="tiktok">TikTok</SelectItem>
              <SelectItem value="linkedin">LinkedIn</SelectItem>
              <SelectItem value="facebook">Facebook</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <Button className="shadow-brutal self-start" type="submit">
          Create a project
        </Button>
      </form>
    </section>
  )
}

export default NoProjects
