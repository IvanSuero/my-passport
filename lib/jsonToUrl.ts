export async function jsonToUrl({jsonData, baseUrl = "http://localhost:3000/"}: {jsonData: any, baseUrl?: string}): Promise<string> {
  const jsonString = JSON.stringify(jsonData, Object.keys(jsonData).sort())

  const base64 = btoa(jsonString).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, ""); // URL-safe Base64
  console.log(`${baseUrl}?data=${base64}`)
  return `${baseUrl}?data=${base64}`
}

export function urlToJson(base64Url: string) {
  // Extraer el parámetro 'data' de la URL
  const urlParams = new URL(base64Url).searchParams;
  const base64 = urlParams.get("data");

  if (!base64) {
      throw new Error("No se encontró el parámetro 'data' en la URL");
  }

  // Decodificar Base64
  const jsonString = atob(base64.replace(/-/g, "+").replace(/_/g, "/"));
  
  // Convertir a JSON
  console.log(JSON.parse(jsonString))
}