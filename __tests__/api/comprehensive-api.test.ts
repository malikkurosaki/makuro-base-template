import { describe, expect, it } from 'bun:test';

// Get base URL from environment, default to localhost:3000
const BASE_URL = process.env.VITE_PUBLIC_URL || 'http://localhost:3000';

// Comprehensive API tests based on the API documentation
describe('Comprehensive API Tests', () => {
  it('should have working health endpoint', async () => {
    const response = await fetch(`${BASE_URL}/api/health`);
    expect(response.status).toBe(200);
    
    const data = await response.json();
    expect(data).toBeDefined();
  });

  it('should properly handle session endpoint', async () => {
    const response = await fetch(`${BASE_URL}/api/session`);
    // The session endpoint should return either:
    // - 200 with session data if authenticated
    // - 401/422 if not authenticated
    expect([200, 401, 422]).toContain(response.status);
  });

  it('should require authentication for API key endpoints', async () => {
    // Test GET /api/apikey/
    const getResponse = await fetch(`${BASE_URL}/api/apikey/`);
    expect([401, 422]).toContain(getResponse.status);

    // Test POST /api/apikey/
    const postResponse = await fetch(`${BASE_URL}/api/apikey/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name: 'Test Key' })
    });
    expect([401, 422]).toContain(postResponse.status);

    // Test POST /api/apikey/update
    const updateResponse = await fetch(`${BASE_URL}/api/apikey/update`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id: 'test-id', isActive: true })
    });
    expect([401, 422]).toContain(updateResponse.status);

    // Test POST /api/apikey/delete
    const deleteResponse = await fetch(`${BASE_URL}/api/apikey/delete`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id: 'test-id' })
    });
    expect([401, 422]).toContain(deleteResponse.status);
  });

  it('should require authentication for profile update', async () => {
    const response = await fetch(`${BASE_URL}/api/profile/update`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name: 'Updated Name' })
    });
    
    expect([401, 422]).toContain(response.status);
  });

  it('should handle open-in-editor endpoint correctly', async () => {
    const response = await fetch(`${BASE_URL}/api/__open-in-editor`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        file: './src/index.ts',
        line: 10
      })
    });
    
    expect(response.status).toBe(200);
  });

  it('should return valid JSON responses for valid endpoints', async () => {
    const response = await fetch(`${BASE_URL}/api/health`);
    expect(response.status).toBe(200);
    
    const data = await response.json();
    // Verify that the response is valid JSON
    expect(typeof data).toBe('object');
  });
});