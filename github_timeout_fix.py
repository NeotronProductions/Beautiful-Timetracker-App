"""
GitHub API Timeout Configuration Fix

This script configures urllib3 and GitHub API clients to use longer timeouts
and better retry strategies to avoid connection timeout errors.
"""

import os
import urllib3
from urllib3.util.retry import Retry
from urllib3.poolmanager import PoolManager

# Disable urllib3 warnings (optional - only if you want to suppress warnings)
# urllib3.disable_warnings(urllib3.exceptions.InsecureRequestWarning)

def configure_github_timeouts():
    """
    Configure urllib3 with longer timeouts and better retry strategy.
    This should be called before making any GitHub API calls.
    """
    
    # Create a custom HTTPAdapter with longer timeouts
    # Default timeout is 15 seconds, we'll increase it to 60 seconds
    timeout_config = {
        'connect': 60,  # Connection timeout (was 15)
        'read': 60,     # Read timeout
        'total': 120    # Total timeout for the entire request
    }
    
    # Configure retry strategy with exponential backoff
    retry_strategy = Retry(
        total=10,  # Total number of retries
        backoff_factor=2,  # Exponential backoff: 1s, 2s, 4s, 8s, etc.
        status_forcelist=[429, 500, 502, 503, 504],  # Retry on these status codes
        allowed_methods=["HEAD", "GET", "PUT", "DELETE", "OPTIONS", "TRACE", "POST", "PATCH"]
    )
    
    # Create a custom PoolManager with our settings
    http = PoolManager(
        timeout=urllib3.Timeout(**timeout_config),
        retries=retry_strategy,
        maxsize=10
    )
    
    return http

def patch_github_client():
    """
    Patch PyGithub or other GitHub clients to use our custom timeout settings.
    This should be called before creating any GitHub client instances.
    """
    try:
        import github
        from github import Github
        
        # Store original __init__ method
        original_init = Github.__init__
        
        def patched_init(self, *args, **kwargs):
            # Set default timeout if not provided
            if 'timeout' not in kwargs:
                kwargs['timeout'] = 60
            # Call original __init__
            original_init(self, *args, **kwargs)
            
            # Patch the requester's session with our custom timeout
            if hasattr(self, '_Github__requester'):
                requester = self._Github__requester
                if hasattr(requester, 'session'):
                    # Configure session with longer timeout
                    adapter = requester.session.get_adapter('https://')
                    if adapter:
                        adapter.config.timeout = 60
        
        # Apply the patch
        Github.__init__ = patched_init
        print("✅ GitHub client timeout patched successfully")
        
    except ImportError:
        print("⚠️  PyGithub not found, skipping client patch")
    except Exception as e:
        print(f"⚠️  Could not patch GitHub client: {e}")

def configure_environment():
    """
    Set environment variables that some libraries respect for timeout configuration.
    """
    # Set timeout environment variables
    os.environ['GITHUB_API_TIMEOUT'] = '60'
    os.environ['REQUESTS_TIMEOUT'] = '60'
    
    # Configure urllib3 connection pool
    urllib3.util.timeout.Timeout.DEFAULT_TIMEOUT = 60

if __name__ == "__main__":
    print("🔧 Configuring GitHub API timeouts...")
    
    # Configure environment
    configure_environment()
    
    # Configure urllib3
    http = configure_github_timeouts()
    
    # Patch GitHub client if available
    patch_github_client()
    
    print("✅ Timeout configuration complete!")
    print("\nTo use this in your scripts, add at the top:")
    print("  from github_timeout_fix import configure_github_timeouts, patch_github_client")
    print("  configure_github_timeouts()")
    print("  patch_github_client()")
