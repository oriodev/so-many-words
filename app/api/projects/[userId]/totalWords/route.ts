// app/api/projects/[userId]/totalWords/route.ts
import { createClient } from "@/lib/supabase/server";
import { NextRequest, NextResponse } from 'next/server';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ userId: string }> }
) {
  const supabase = await createClient();
  const { userId } = await params;

  const { data, error } = await supabase
    .from("projects")
    .select('total_words_written', { count: 'exact' })
    .eq('user_id', userId);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  const totalWordsWritten = data.reduce((sum, project) => {
    return sum + (project.total_words_written || 0);
  }, 0);

  return NextResponse.json( totalWordsWritten );

}