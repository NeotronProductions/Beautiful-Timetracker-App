#!/bin/bash
# CrewAI Activation Script for Beautiful Timetracker App
# This script activates the virtual environment and sets up CrewAI

cd "$(dirname "$0")"

echo "🚀 Activating CrewAI Environment..."
echo ""

# Activate virtual environment
if [ -d "venv" ]; then
    source venv/bin/activate
    echo "✅ Virtual environment activated"
else
    echo "❌ Virtual environment not found. Run: python3 -m venv venv"
    exit 1
fi

# Check if .env exists and has API keys
if [ -f ".env" ]; then
    if grep -q "OPENAI_API_KEY=" .env && ! grep -q "^#.*OPENAI_API_KEY=" .env; then
        echo "✅ OpenAI API key found in .env"
    elif grep -q "ANTHROPIC_API_KEY=" .env && ! grep -q "^#.*ANTHROPIC_API_KEY=" .env; then
        echo "✅ Anthropic API key found in .env"
    else
        echo "⚠️  .env file exists but no API keys found (or they're commented out)"
        echo "   Edit .env and add your API keys"
    fi
else
    echo "⚠️  .env file not found. Creating template..."
    cat > .env << 'EOF'
# CrewAI Environment Variables
# Add your API keys here

# OpenAI (if using OpenAI models)
# OPENAI_API_KEY=your_openai_api_key_here

# Anthropic (if using Claude models)
# ANTHROPIC_API_KEY=your_anthropic_api_key_here
EOF
    echo "   Created .env template - please add your API keys"
fi

# Load environment variables
if [ -f ".env" ]; then
    export $(grep -v '^#' .env | xargs)
    echo "✅ Environment variables loaded"
fi

echo ""
echo "✅ CrewAI is ready to use!"
echo ""
echo "Quick commands:"
echo "  python verify_crewai_setup.py    # Verify setup"
echo "  python crewai_config.py          # Test configuration"
echo "  python -c \"from crewai_config import implement_feature; print(implement_feature('Test feature'))\""
echo ""
echo "Python shell is ready. Type 'exit' to deactivate."
