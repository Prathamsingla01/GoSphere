// Helper to parse, validate and normalize manual date input (DD-MM-YYYY or YYYY-MM-DD)
export function validateManualDate(dateStr) {
  if (!dateStr || typeof dateStr !== 'string') {
    return { valid: false, error: 'Please enter a travel date.' };
  }

  const clean = dateStr.trim();
  if (!clean) {
    return { valid: false, error: 'Please enter a travel date.' };
  }

  let day, month, year;
  const dmyMatch = clean.match(/^(\d{1,2})[-/](\d{1,2})[-/](\d{4})$/);
  const ymdMatch = clean.match(/^(\d{4})[-/](\d{1,2})[-/](\d{1,2})$/);

  if (dmyMatch) {
    day = parseInt(dmyMatch[1], 10);
    month = parseInt(dmyMatch[2], 10);
    year = parseInt(dmyMatch[3], 10);
  } else if (ymdMatch) {
    year = parseInt(ymdMatch[1], 10);
    month = parseInt(ymdMatch[2], 10);
    day = parseInt(ymdMatch[3], 10);
  } else {
    return { valid: false, error: 'Please enter date in DD-MM-YYYY format (e.g. 29-10-2026).' };
  }

  if (month < 1 || month > 12) {
    return { valid: false, error: 'Invalid month. Month must be between 01 and 12.' };
  }

  if (year < 2024 || year > 2100) {
    return { valid: false, error: 'Please enter a valid year (e.g. 2026).' };
  }

  // Check days in that specific month (handles leap years)
  const maxDays = new Date(year, month, 0).getDate();
  if (day < 1 || day > maxDays) {
    return { valid: false, error: `Invalid date. Day must be between 01 and ${maxDays} for this month.` };
  }

  // Check if date is in the past
  const parsedDate = new Date(year, month - 1, day);
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  if (parsedDate < today) {
    return { valid: false, error: 'Travel date cannot be in the past.' };
  }

  const pad = (n) => String(n).padStart(2, '0');
  const formatted = `${pad(day)}-${pad(month)}-${year}`;

  return { valid: true, date: formatted };
}
