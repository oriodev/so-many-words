import { createClient } from "@/lib/supabase/server";
import { NextRequest, NextResponse } from "next/server";

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ userId: string }> }
) {

  try {
    const { userId } = await params;
    const { projectId, wordcount, date } = await request.json();

    if (!projectId || !wordcount || !date) return NextResponse.json(
      { error: "Project ID, wordcount, and date required"});

    const supabase = await createClient();

    const { data, error } = await supabase
      .from('words')
      .insert([
        { project_id: projectId,
          wordcount,
          date,
          user_id: userId  },
      ])
      .select();
      
    if (error) {
      console.log('error: ', error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    console.log('data: ', data);
    return NextResponse.json({ data }, { status: 200 });
    
  } catch (error) {
    console.error('Unexpected error:', error);
    return NextResponse.json({ error: 'An unexpected error occurred' }, { status: 500 });
  }
}
