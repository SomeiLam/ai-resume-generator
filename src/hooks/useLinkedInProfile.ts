const CLIENT_ID = process.env.LINKEDIN_CLIENT_ID || ''
const CLIENT_SECRET = process.env.LINKEDIN_CLIENT_SECRET || ''
const REDIRECT_URI = process.env.LINKEDIN_REDIRECT_URI || ''
const SCOPE = 'r_liteprofile r_emailaddress'
const DEFAULT_STATE = 'someRandomStateString'

export function getLinkedInAuthUrl(state: string = DEFAULT_STATE): string {
  const baseUrl = 'https://www.linkedin.com/oauth/v2/authorization'
  const params = new URLSearchParams({
    response_type: 'code',
    client_id: CLIENT_ID,
    redirect_uri: REDIRECT_URI,
    state,
    scope: SCOPE,
  })
  return `${baseUrl}?${params.toString()}`
}

export async function exchangeLinkedInAuthCode(code: string): Promise<string> {
  const tokenUrl = 'https://www.linkedin.com/oauth/v2/accessToken'
  const params = new URLSearchParams({
    grant_type: 'authorization_code',
    code,
    redirect_uri: REDIRECT_URI,
    client_id: CLIENT_ID,
    client_secret: CLIENT_SECRET,
  })

  const response = await fetch(tokenUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: params.toString(),
  })

  if (!response.ok) {
    throw new Error(`Error fetching access token: ${response.statusText}`)
  }

  const data = await response.json()
  return data.access_token
}

export async function fetchLinkedInProfile(accessToken: string) {
  const profileUrl = 'https://api.linkedin.com/v2/me'
  const response = await fetch(profileUrl, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'X-Restli-Protocol-Version': '2.0.0',
    },
  })

  if (!response.ok) {
    throw new Error(`Error fetching profile: ${response.statusText}`)
  }

  return response.json()
}

export async function fetchLinkedInEmail(accessToken: string): Promise<string> {
  const emailUrl =
    'https://api.linkedin.com/v2/emailAddress?q=members&projection=(elements*(handle~))'
  const response = await fetch(emailUrl, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'X-Restli-Protocol-Version': '2.0.0',
    },
  })

  if (!response.ok) {
    throw new Error(`Error fetching email: ${response.statusText}`)
  }

  const data = await response.json()
  const email = data.elements?.[0]?.['handle~']?.emailAddress
  if (!email) {
    throw new Error('Email not found in response')
  }
  return email
}
