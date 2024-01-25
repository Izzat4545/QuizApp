export default function generateSlug(name: string, id: number): string {
  // Trim the name and replace spaces with hyphens
  const trimmedName = name.trim().replace(/\s+/g, '-');

  // Combine the trimmed name and the id with a hyphen
  const slug = `${trimmedName}-${id}`;

  return slug;
}
