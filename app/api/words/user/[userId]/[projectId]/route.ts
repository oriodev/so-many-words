import { createClient } from "@/lib/supabase/server";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ userId: string, projectId: string }> }
) {
  const supabase = await createClient();
  const { userId, projectId } = await params;

  const { data: words, error } = await supabase
    .from("words")
    .select('*')
    .eq('user_id', userId)
    .eq('project_id', projectId);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(words);
}