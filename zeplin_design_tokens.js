const axios = require('axios');
const fs = require('fs');

const styleGuideId = '6196fde302d9b5adca2502aa';
const accessToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0eXBlIjoicGVyc29uYWxfYWNjZXNzX3Rva2VuIiwiY2xpZW50X2lkIjoiNjE5NzRhMDI4MDkxNTNhOWE0OWZhYTM5Iiwic2NvcGUiOiIiLCJpYXQiOjE2MzczMDQ4MzQsImV4cCI6MTk1Mjg3NDA5NCwiaXNzIjoiemVwbGluOmFwaS56ZXBsaW4uaW8iLCJzdWIiOiI1YTA5YWRmZDI4OTBmZDc3NWIzOWNiYWYiLCJqdGkiOiI3ZWY1NzIwMi1hMGNlLTQxZTYtYmYyMC00MDM0ZmZlMWU4MmMifQ.x8onSeDWxza0MD0lDsFTWJTjuwG0ei7Jxt3kfpDtmoM';

const updateZeplinDesignTokens = async (tokenCase) => {
  try {
    const token = tokenCase || 'kebab';
    const url = `https://api.zeplin.dev/v1/styleguides/${styleGuideId}/design_tokens?token_name_case=${token}`;
    const { data } = await axios.get(url, {
      headers: {
        'Accept': 'application/json',
        'Authorization': `Bearer ${accessToken}`
      }
    });

    const filePath = !!tokenCase 
      ? `./zeplin_tokens/design_tokens_${tokenCase}.json`
      : './zeplin_tokens/design_tokens.json';
    fs.writeFile(filePath, JSON.stringify(data, null, 2), 'utf8', function(err) {
      if (err) throw err;

      console.log('complete');
    });
  } catch (e) {
    console.log('API ERROR: ', e);
  }
}

const runUpdate = async () => {
  await Promise.all([
    updateZeplinDesignTokens(),
    updateZeplinDesignTokens('pascal'),
  ]);
}

runUpdate();