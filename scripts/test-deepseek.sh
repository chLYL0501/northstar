#!/usr/bin/env bash
# DeepSeek API connection test
# Usage: bash scripts/test-deepseek.sh
#
# Reads VITE_DEEPSEEK_API_KEY from .env.local

set -euo pipefail
SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
PROJECT_DIR="$(dirname "$SCRIPT_DIR")"
ENV_FILE="$PROJECT_DIR/.env.local"

if [ ! -f "$ENV_FILE" ]; then
  echo "❌ .env.local not found at $ENV_FILE"
  echo "   Create it with: VITE_DEEPSEEK_API_KEY=sk-your-key"
  exit 1
fi

API_KEY=$(grep VITE_DEEPSEEK_API_KEY "$ENV_FILE" | cut -d'=' -f2-)

if [ -z "$API_KEY" ] || [ "$API_KEY" = "sk-your-api-key-here" ]; then
  echo "❌ VITE_DEEPSEEK_API_KEY not set or still has placeholder value"
  echo "   Edit .env.local and replace with your real API key"
  exit 1
fi

echo "🔑 API Key: ${API_KEY:0:12}...${API_KEY: -4}"
echo "📡 Testing DeepSeek API connection..."

RESPONSE=$(curl -s -w "\n%{http_code}" "https://api.deepseek.com/v1/chat/completions" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $API_KEY" \
  -d '{
    "model": "deepseek-chat",
    "messages": [{"role": "user", "content": "Reply with exactly: OK"}],
    "max_tokens": 10
  }')

HTTP_CODE=$(echo "$RESPONSE" | tail -1)
BODY=$(echo "$RESPONSE" | sed '$d')

if [ "$HTTP_CODE" = "200" ]; then
  CONTENT=$(echo "$BODY" | python3 -c "import sys,json; print(json.load(sys.stdin)['choices'][0]['message']['content'])" 2>/dev/null || echo "parse error")
  echo "✅ Connection successful (HTTP $HTTP_CODE)"
  echo "   Response: $CONTENT"
  echo ""
  echo "🎉 Your DeepSeek API key is working correctly."
  echo "   The AI Narrative section on the homepage is ready to use."
else
  echo "❌ Connection failed (HTTP $HTTP_CODE)"
  echo "   Error: $(echo "$BODY" | python3 -c "import sys,json; print(json.load(sys.stdin).get('error',{}).get('message',''))" 2>/dev/null || echo "$BODY")"
  echo ""
  echo "Troubleshooting:"
  echo "  1. Check your API key at https://platform.deepseek.com/api_keys"
  echo "  2. Verify your account has available credits"
  echo "  3. Ensure the key starts with 'sk-'"
fi
