import { createClient } from "@/lib/supabase/server";
import { WordsSchema } from "@/types";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ userId: string, projectId: string, date: string }> }
) {
  const supabase = await createClient();
  const { userId, projectId, date } = await params;

  const { data: words, error } = await supabase
    .from("words")
    .select('*')
    .eq('user_id', userId)
    .eq('project_id', projectId)
    .eq('date', new Date(date))

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(words);
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ userId: string, projectId: string, date: string }> }
) {

  try {

    const { userId, projectId, date } = await params;

    const supabase = await createClient();

    const { error } = await supabase
      .from('words')
      .delete()
      .eq('user_id', userId)
      .eq('project_id', projectId)
      .eq('date', new Date(date));

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ message: 'Deleted project'}, { status: 200 });
    
  } catch (error) {
    return NextResponse.json({ error })
  }

}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ userId: string, projectId: string, date: string, words: WordsSchema }> }
) {
  try {

    const { userId, projectId, date } = await params;
    const { words } = await request.json();
    const { wordcount } = words;

    const supabase = await createClient();

    const { data, error } = await supabase
      .from('words')
      .update({ wordcount })
      .eq('user_id', userId)
      .eq('project_id', projectId)
      .eq('date', new Date(date))
      .select()

    if (error) return NextResponse.json({ error: error.message }, { status: 500 });

    return NextResponse.json({ data }, { status: 200 });
    
  } catch (error) {
    return NextResponse.json({ error })
  }
}