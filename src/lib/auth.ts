import { v4 as uuidv4 } from 'uuid';
import pkceChallenge from 'pkce-challenge';
import { apiClient } from './apiClient';

export async function initiateLogin() {
  const state = uuidv4();
  const { code_verifier, code_challenge } = await pkceChallenge();

  sessionStorage.setItem('pkce_state', state);
  sessionStorage.setItem('pkce_code_verifier', code_verifier);

  const params = new URLSearchParams({
    response_type: 'code',
    client_id: process.env.NEXT_PUBLIC_CLIENT_ID!,
    state,
    code_challenge: code_challenge,
    code_challenge_method: 'S256',
    redirect_uri: `${process.env.NEXT_PUBLIC_APP_URL}/login/callback`,
  });

  window.location.href = `${process.env.NEXT_PUBLIC_KEYCLOAK_URL}/protocol/openid-connect/auth?${params}`;
}

export async function handleAuthCallback() {
  const urlParams = new URLSearchParams(window.location.search);
  const code = urlParams.get('code');
  const state = urlParams.get('state');
  const error = urlParams.get('error');

  if (error) {
    throw new Error(error);
  }

  if (!code || !state) {
    throw new Error('Missing code or state');
  }

  const storedState = sessionStorage.getItem('pkce_state');
  const codeVerifier = sessionStorage.getItem('pkce_code_verifier');

  if (state !== storedState) {
    throw new Error('Invalid state');
  }

  const tokenResponse = await apiClient.post(
    `${process.env.NEXT_PUBLIC_KEYCLOAK_URL}/protocol/openid-connect/token`,
    new URLSearchParams({
      grant_type: 'authorization_code',
      client_id: process.env.NEXT_PUBLIC_CLIENT_ID!,
      code,
      code_verifier: codeVerifier!,
      redirect_uri: `${process.env.NEXT_PUBLIC_APP_URL}/login/callback`,
    })
  );

  const { access_token, refresh_token } = tokenResponse.data;
  sessionStorage.setItem('access_token', access_token);
  sessionStorage.setItem('refresh_token', refresh_token);
}

export function getStoredTokens() {
  const accessToken = sessionStorage.getItem('access_token');
  const refreshToken = sessionStorage.getItem('refresh_token');

  if (accessToken && refreshToken) {
    return { accessToken, refreshToken };
  }

  return null;
}

export function decodeToken(token: string) {
  const base64Url = token.split('.')[1];
  const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
  const jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
    return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
  }).join(''));

  return JSON.parse(jsonPayload);
}
