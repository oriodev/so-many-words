import Link from "next/link";
import { Card, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Project } from "@/types";

export default function ProjectCard ({ project }: { project: Project }) {
  return (
    <Link href={`/projects/project/${project.slug}`}>
      <Card className="hover:cursor-pointer hover:scale-105 transition">
        <CardHeader>
          <CardTitle className="font-bold">{project.title}</CardTitle>
          <CardDescription>{project.totalWordsWritten} out of {project.wordcountGoal} Words</CardDescription>
        </CardHeader>
      </Card>
    </Link>
  )
}