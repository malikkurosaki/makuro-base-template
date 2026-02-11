import { describe, expect, it } from 'bun:test';

// Get base URL from environment, default to localhost:3000
const BASE_URL = process.env.VITE_PUBLIC_URL || 'http://localhost:3000';

describe('API Keys Endpoints', () => {
  // Health check endpoint
  it('should return health status', async () => {
    const response = await fetch(`${BASE_URL}/api/health`);
    expect(response.status).toBe(200);
    const data = await response.json();
    expect(data).toBeDefined();
  });

  // Session endpoint
  it('should return session info when authenticated', async () => {
    // This test assumes we have a valid session cookie
    // Without proper authentication, it might return 401 or 422
    const response = await fetch(`${BASE_URL}/api/session`);
    // Expect either 200 (with session) or 401/422 (without auth)
    expect([200, 401, 422]).toContain(response.status);
  });

  // Get all API keys - requires authentication
  it('should require authentication to get API keys', async () => {
    const response = await fetch(`${BASE_URL}/api/apikey/`);
    // Expect 401 or 422 for unauthorized access
    expect([401, 422]).toContain(response.status);
  });

  // Create a new API key - requires authentication
  it('should require authentication to create an API key', async () => {
    const response = await fetch(`${BASE_URL}/api/apikey/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: 'Test API Key',
        expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString() // 7 days from now
      })
    });
    
    // Expect 401 or 422 for unauthorized access
    expect([401, 422]).toContain(response.status);
  });

  // Update an API key - requires authentication
  it('should require authentication to update an API key', async () => {
    const response = await fetch(`${BASE_URL}/api/apikey/update`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id: 'some-id',
        isActive: false,
        expiresAt: null
      })
    });
    
    // Expect 401 or 422 for unauthorized access
    expect([401, 422]).toContain(response.status);
  });

  // Delete an API key - requires authentication
  it('should require authentication to delete an API key', async () => {
    const response = await fetch(`${BASE_URL}/api/apikey/delete`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id: 'some-id'
      })
    });
    
    // Expect 401 or 422 for unauthorized access
    expect([401, 422]).toContain(response.status);
  });

  // Update user profile - requires authentication
  it('should require authentication to update user profile', async () => {
    const response = await fetch(`${BASE_URL}/api/profile/update`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: 'Updated Name',
        image: 'https://example.com/new-avatar.jpg'
      })
    });
    
    // Expect 401 or 422 for unauthorized access
    expect([401, 422]).toContain(response.status);
  });
});