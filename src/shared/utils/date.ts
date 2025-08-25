// Formate une date en chaîne lisible pour l'utilisateur, selon le format français et fuseau Europe/Paris
export function formatDateTime(date: string | Date): string {
  const d = typeof date === "string" ? new Date(date) : date;

  return d.toLocaleString("fr-FR", {
    timeZone: "Africa/Abidjan", // Force l'heure locale de Paris
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false, // Format 24h
  });
}

// Formate une date pour un champ input[type="datetime-local"]
export function formatDateTimeForInput(date: string | Date): string {
  const d = typeof date === "string" ? new Date(date) : date;
  const pad = (n: number) => n.toString().padStart(2, "0"); // Ajoute un zéro devant si besoin
  const year = d.getFullYear();
  const month = pad(d.getMonth() + 1); // Les mois commencent à 0
  const day = pad(d.getDate());
  const hours = pad(d.getHours());
  const minutes = pad(d.getMinutes());

  // Format attendu par l'input : "YYYY-MM-DDTHH:mm"
  return `${year}-${month}-${day}T${hours}:${minutes}`;
}