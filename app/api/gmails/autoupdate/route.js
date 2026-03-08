import { convertMBtoGB } from '@/utils/common';
import { createClient } from '@/utils/supabase/server';
import { NextResponse } from 'next/server';

export async function GET(request) {
  const supabase = await createClient();

  const { data: movies, error: movieError } = await supabase
    .from('movies')
    .select('*')
    .order('created_at', { ascending: false });

  if (movieError) {
    console.error('Error fetching categories:', error.message);
    return [];
  }

  const { data: gmails, error: gmailError } = await supabase
    .from('gmails')
    .select('*')
    .order('created_at', { ascending: false });

  if (gmailError) {
    console.error('Error fetching gmails:', error.message);
    return [];
  }

  if (movies.length > 0) {
    const groupedData = {};

    movies.forEach((item) => {


      const source = item.movie_source;
      if (!groupedData[source]) {
        groupedData[source] = [];
      }
      groupedData[source].push({
        title: item.title,
        size: item.size
      });
    });

    const groupedArray = Object.entries(groupedData).map(([source, titles]) => ({
      movie_source: source,
      titles: titles.reduce((acc, item) => { acc.title.push(item.title); return acc; }, { title: [] }),
      t_size: titles.reduce((acc, item) => acc + (item.size || 0), 0),
    }));




    for (const item of groupedArray) {
      const moviesText = item.titles.title.join(', ');

      const { error: insertError } = await supabase
        .from('gmails')
        .upsert(
          [
            {
              name: item.movie_source,
              movies: moviesText, 
              used_space: convertMBtoGB(item.t_size, true),
            },
          ],
          { onConflict: 'name', update: ['movies'] }
        );

      if (insertError) {
        console.error(`Error inserting ${item.movie_source}:`, insertError.message);
      }
    }

  }

  const { data: gmailsData, error: gmailsError } = await supabase
    .from('gmails')
    .select('*');

  if (gmailsError) {
    console.error('Error fetching gmails:', gmailsError.message);
  } else {



    for (const gmail of gmailsData) {
      const { data: movieCheck, error: movieError } = await supabase
        .from('movies')
        .select('movie_source')
        .eq('movie_source', gmail.name)
        .limit(1);
      if (movieError) {
        console.error(`Error checking movies for ${gmail.name}:`, movieError.message);
        continue;
      }

      if (!movieCheck || movieCheck.length === 0) {
        const { error: deleteError } = await supabase
          .from('gmails')
          .delete()
          .eq('id', gmail.id);

        if (deleteError) {
          console.error(`Error deleting ${gmail.name}:`, deleteError.message);
        } else {
          console.log(`🗑️ Deleted gmails entry: ${gmail.name}`);
        }
      }
    }
  }




  return NextResponse.json({
    message: 'Successfully synced to gmail_inventory',
  });


}