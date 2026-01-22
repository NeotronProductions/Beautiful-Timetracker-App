# GitHub API Timeout Error Fix

## Problem
You're seeing connection timeout errors like:
```
WARNING:urllib3.connectionpool:Retrying (GithubRetry(total=9, ...)) after connection broken by 'ConnectTimeoutError(..., 'Connection to api.github.com timed out. (connect timeout=15)')'
```

## Root Cause
The default connection timeout for GitHub API calls is 15 seconds, which is too short for slower network connections or when GitHub's API is under load.

## Solutions

### Solution 1: Quick Fix (Already Applied)
The `crewai_config.py` file has been updated to increase the default timeout to 60 seconds. This should resolve most timeout issues.

### Solution 2: Suppress Warnings (If Operations Still Succeed)
If the operations are completing successfully despite the warnings, you can suppress the warnings by uncommenting this line in `crewai_config.py`:

```python
urllib3.disable_warnings(urllib3.exceptions.ConnectTimeoutError)
```

### Solution 3: Use the Advanced Timeout Configuration
For more control, use the `github_timeout_fix.py` module:

```python
from github_timeout_fix import configure_github_timeouts, patch_github_client

# Configure timeouts before making GitHub API calls
configure_github_timeouts()
patch_github_client()
```

### Solution 4: Environment Variables
Set these environment variables before running your scripts:

```bash
export GITHUB_API_TIMEOUT=60
export REQUESTS_TIMEOUT=60
```

Or add to your `.env` file:
```
GITHUB_API_TIMEOUT=60
REQUESTS_TIMEOUT=60
```

### Solution 5: Check Network Connectivity
If timeouts persist, check your network connection:

```bash
# Test connectivity to GitHub API
curl -I https://api.github.com

# Check DNS resolution
nslookup api.github.com

# Test with longer timeout
curl --connect-timeout 60 https://api.github.com
```

## Verification
After applying the fix, you should see:
- Fewer or no timeout warnings
- Successful GitHub API operations
- Pull requests created without retry warnings

## Note
The timeout fix has been applied to `crewai_config.py`. If you're still seeing errors, try:
1. Restarting your Python environment
2. Checking your network connection
3. Using Solution 3 for more advanced configuration
