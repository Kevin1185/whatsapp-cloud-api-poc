export async function httpPost<T>(
  url: string,
  body: unknown,
  accessToken: string
): Promise<T> {
  const response = await fetch(url, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      `Meta API error: ${response.status} - ${JSON.stringify(data)}`
    );
  }

  return data;
}
