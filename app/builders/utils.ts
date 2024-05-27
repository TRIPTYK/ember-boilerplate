export function pluralize(s: string): string {
  if (s.endsWith('s') || s.endsWith('x') || s.endsWith('z') || s.endsWith('ch') || s.endsWith('sh')) {
    return s + 'es';
  } else if (s.endsWith('y')) {
    return s.slice(0, -1) + 'ies';
  } else {
    return s + 's';
  }
}
