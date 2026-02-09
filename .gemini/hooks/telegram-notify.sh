#!/usr/bin/env bash
set -e

INPUT=$(cat)

BOT_TOKEN="${BOT_TOKEN:?BOT_TOKEN not set}"
CHAT_ID="${CHAT_ID:?CHAT_ID not set}"

SESSION_ID=$(echo "$INPUT" | jq -r '.session_id // "unknown"')
FINAL_TEXT=$(echo "$INPUT" | jq -r '.final_response.text // ""' | head -c 3500)

MESSAGE=$(cat <<EOF
✅ *Gemini Task Selesai*

🆔 Session:
\`$SESSION_ID\`

🧠 Output (ringkas):
$FINAL_TEXT
EOF
)

curl -s -X POST "https://api.telegram.org/bot${BOT_TOKEN}/sendMessage" \
  -d chat_id="$CHAT_ID" \
  -d parse_mode="Markdown" \
  --data-urlencode text="$MESSAGE" \
  > /dev/null

# WAJIB: response JSON ke Gemini
echo '{"decision":"allow"}'
