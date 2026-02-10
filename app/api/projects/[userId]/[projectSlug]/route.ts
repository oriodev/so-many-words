// app/api/projects/[userId]/[projectId/route.ts
import { createClient } from "@/lib/supabase/server";
import { NextRequest, NextResponse } from 'next/server';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ userId: string, projectSlug: string }> }
) {
  const supabase = await createClient();
  const { userId, projectSlug } = await params;

  const { data: project, error } = await supabase
    .from("projects")
    .select('*')
    .eq('user_id', userId)
    .eq('slug', projectSlug);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(project);
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ userId: string, projectSlug: string }> }
) {

  try {

    const { userId, projectSlug } = await params;

    const supabase = await createClient();

    const { error } = await supabase
      .from('projects')
      .delete()
      .eq('user_id', userId)
      .eq('slug', projectSlug);

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ message: 'Deleted project'}, { status: 200 });
    
  } catch (error) {
    return NextResponse.json({ error })
  }

}