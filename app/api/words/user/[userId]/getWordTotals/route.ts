// app/api/words/[userId]/getWordTotals/route.ts
import { createClient } from "@/lib/supabase/server";
import { endOfWeek, format, parseISO, startOfWeek } from "date-fns";
import { NextRequest, NextResponse } from 'next/server';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ userId: string }> }
) {
  const supabase = await createClient();
  const { userId } = await params;

  const { searchParams } = new URL(request.url);
  const date = searchParams.get('date');
  const period = searchParams.get('period');

  if (!date || !period) {
    return NextResponse.json({ error: "Missing parameters" }, { status: 400 });
  }

  if (period !== 'year' && period !== 'month' && period !== 'week') {
    return NextResponse.json({ error: "Period must be 'month' 'year' or 'week'" }, { status: 400 });
  }

  const parsedDate = parseISO(date);

  const year = parsedDate.getFullYear();
  const month = parsedDate.getMonth() + 1; // returns jan as 0 by default

  let startDate;
  let endDate;

  if (period === 'year') {
    startDate = `${year}-01-01`;
    endDate = `${year + 1}-01-01`
  }

  if (period === 'month') {
    startDate = `${year}-${month}-01`;
    endDate = `${year}-${month + 1}-01`
  }

  if (period === 'week') {
    const startOfWeekDate = startOfWeek(parsedDate, { weekStartsOn: 1 });
    const endOfWeekDate = endOfWeek(parsedDate, { weekStartsOn: 1 });

    startDate = format(startOfWeekDate, 'yyyy-MM-dd');
    endDate = format(endOfWeekDate, 'yyyy-MM-dd');
  }

  const { data: words, error } = await supabase
    .from("words")
    .select('wordcount')
    .eq('user_id', userId)
    .gte('date', startDate)
    .lt('date', endDate);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  const totalWordCount = words.reduce((acc, item) => acc + (item.wordcount || 0), 0);

  return NextResponse.json(totalWordCount);
}