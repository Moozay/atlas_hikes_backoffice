"""
Converts PostgreSQL COPY FROM stdin blocks to INSERT INTO statements.
Run: python convert_to_inserts.py
Output: backup_supabase.sql (safe to paste into Supabase SQL editor)
"""

import re

INPUT_FILE = "backup_final.sql"
OUTPUT_FILE = "backup_supabase.sql"

# Lines/patterns to skip that Supabase doesn't need or doesn't support
SKIP_PATTERNS = [
    r"^\\",            # psql meta-commands: \connect, \unrestrict, \copy, etc.
    r"^SET statement_timeout",
    r"^SET lock_timeout",
    r"^SET idle_in_transaction",
    r"^SET client_encoding",
    r"^SET standard_conforming",
    r"^SELECT pg_catalog\.set_config",
    r"^SET check_function_bodies",
    r"^SET xmloption",
    r"^SET client_min_messages",
    r"^SET row_security",
    r"^SET default_tablespace",
    r"^SET default_table_access_method",
]


def escape_pg_value(raw: str) -> str:
    """Convert a raw COPY field value to a SQL literal."""
    if raw == r"\N":
        return "NULL"
    # Unescape PostgreSQL COPY escape sequences
    val = raw.replace(r"\\", "\x00BACKSLASH\x00")
    val = val.replace(r"\t", "\t")
    val = val.replace(r"\n", "\n")
    val = val.replace(r"\r", "\r")
    val = val.replace("\x00BACKSLASH\x00", "\\")
    # Escape single quotes for SQL
    val = val.replace("'", "''")
    return f"'{val}'"


def copy_line_to_values(line: str, col_count: int) -> list[str]:
    """Split a tab-separated COPY data line into SQL value strings."""
    parts = line.rstrip("\n").split("\t")
    if len(parts) != col_count:
        raise ValueError(
            f"Expected {col_count} columns, got {len(parts)}: {line[:80]!r}"
        )
    return [escape_pg_value(p) for p in parts]


def parse_copy_header(line: str):
    """Extract table name and column list from a COPY statement line."""
    m = re.match(
        r"COPY\s+([\w\.]+)\s*\(([^)]+)\)\s+FROM\s+stdin\s*;", line, re.IGNORECASE
    )
    if not m:
        return None, None
    table = m.group(1)
    columns = [c.strip() for c in m.group(2).split(",")]
    return table, columns


def convert(input_path: str, output_path: str):
    skip_re = [re.compile(p) for p in SKIP_PATTERNS]

    with open(input_path, "r", encoding="utf-8") as fin, open(
        output_path, "w", encoding="utf-8", newline="\n"
    ) as fout:

        in_copy = False
        table_name = None
        columns = None
        row_buffer = []

        def flush_inserts():
            if not row_buffer:
                return
            col_str = ", ".join(columns)
            fout.write(f"INSERT INTO {table_name} ({col_str}) VALUES\n")
            for i, row_vals in enumerate(row_buffer):
                suffix = "," if i < len(row_buffer) - 1 else ";"
                fout.write(f"  ({', '.join(row_vals)}){suffix}\n")
            fout.write("\n")
            row_buffer.clear()

        for raw_line in fin:
            line = raw_line.rstrip("\n")

            if in_copy:
                if line == r"\.":
                    flush_inserts()
                    in_copy = False
                    table_name = None
                    columns = None
                else:
                    try:
                        vals = copy_line_to_values(line, len(columns))
                        row_buffer.append(vals)
                    except ValueError as e:
                        fout.write(f"-- WARNING: skipped malformed row: {e}\n")
                continue

            # Check if this is a COPY statement
            if re.match(r"COPY\s+", line, re.IGNORECASE):
                table_name, columns = parse_copy_header(line)
                if table_name:
                    fout.write(
                        f"-- Inserting data into {table_name}\n"
                    )
                    in_copy = True
                    row_buffer = []
                    continue

            # Skip unsupported SET / config lines
            if any(p.match(line) for p in skip_re):
                continue

            fout.write(raw_line)

    print(f"Done! Output written to: {output_path}")
    print("You can now paste backup_supabase.sql into the Supabase SQL editor.")


if __name__ == "__main__":
    convert(INPUT_FILE, OUTPUT_FILE)
