import { createClient } from "@/lib/supabase/server";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ wordsId: string }> }
) {
  try {
    const { wordsId } = await params;
    const { wordcount } = await request.json();

    const supabase = await createClient();

    const { data, error } = await supabase
      .from('words')
      .update({ wordcount })
      .eq('id', wordsId)
      .select()

    if (error) return NextResponse.json({ error: error.message }, { status: 500 });

    return NextResponse.json({ data }, { status: 200 });
    
  } catch (error) {
    return NextResponse.json({ error })
  }
}