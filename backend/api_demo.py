#!/usr/bin/env python3
import os
import subprocess
import sys


def main():
    # Priority: CLI arg > API_URL env > default
    base = None
    if len(sys.argv) > 1:
        base = sys.argv[1]
    base = base or os.environ.get("API_URL") or "http://localhost:8000"
    url = f"{base.rstrip('/')}/api/v1/testall"
    cmd = [
        "curl",
        "-s",
        "-X",
        "GET",
        url,
    ]
    try:
        out = subprocess.check_output(cmd, stderr=subprocess.STDOUT).decode().strip()
        if out == '{"detail":"Not Found"}':
            # fallback to 8001 commonly used in dev
            fallback = base.replace(":8000", ":8001") if ":8000" in base else "http://localhost:8001"
            url2 = f"{fallback.rstrip('/')}/api/v1/testall"
            out = subprocess.check_output(["curl", "-s", "-X", "GET", url2], stderr=subprocess.STDOUT).decode().strip()
        print(out)
    except subprocess.CalledProcessError as e:
        print(e.output.decode() if e.output else str(e), file=sys.stderr)
        sys.exit(e.returncode or 1)


if __name__ == "__main__":
    main()
