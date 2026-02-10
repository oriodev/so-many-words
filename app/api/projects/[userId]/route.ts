// app/api/projects/[userId]/route.ts
import { createClient } from "@/lib/supabase/server";
import { NextRequest, NextResponse } from 'next/server';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ userId: string }> }
) {
  const supabase = await createClient();
  const { userId } = await params

  const { data: projects, error } = await supabase
    .from("projects")
    .select('*')
    .eq('user_id', userId);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(projects);
}

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ userId: string }> }
) {

  try {

    const { userId } = await params;
    const { title, description } = await request.json();

    if (!title) return NextResponse.json({ error: "Title required"});

    const supabase = await createClient();

    const { data, error } = await supabase
      .from('projects')
      .insert([
        { title, description, user_id: userId  },
      ])
      .select()
      

    console.log('error: ', error);
    console.log('data: ', data);

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ data }, { status: 200 });
    
  } catch (error) {
    return NextResponse.json({ error })
  }
}

