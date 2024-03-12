export async function GET(request: Request) {
  const { search, pathname } = new URL(request.url);

  const apiPath = pathname.replace(/^\/api/, '');
  const targetUrl = `https://www.dnd5eapi.co/api/${apiPath}${search}`;

  const res = await fetch(targetUrl, { headers: { 'Content-Type': 'application/json' } });

  if (!res.ok) {
    // Handle error response from the dnd5eapi.co API
    return new Response(JSON.stringify({ error: 'Error fetching data from dnd5eapi.co' }), {
      status: res.status,
    });
  }

  const data = await res.json();

  return Response.json(data);
}
