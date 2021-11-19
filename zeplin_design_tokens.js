const axios = require('axios');
const fs = require('fs');

const styleGuideId = '6196fde302d9b5adca2502aa';
const accessToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0eXBlIjoicGVyc29uYWxfYWNjZXNzX3Rva2VuIiwiY2xpZW50X2lkIjoiNjE5NzA1ZDc3MzBlZjNhODdhMzk0YTA5Iiwic2NvcGUiOiIiLCJpYXQiOjE2MzcyODczODMsImV4cCI6MTk1Mjg1NjY0MywiaXNzIjoiemVwbGluOmFwaS56ZXBsaW4uaW8iLCJzdWIiOiI1YTA5YWRmZDI4OTBmZDc3NWIzOWNiYWYiLCJqdGkiOiIyNTdiOTA1OS1iMzI3LTQ0NjQtOTEyMC01Yjg5OTJhYWU4NDQifQ.RP2GgZOU_LAKlpCxpwvmQ6Ec7f6ybp_6TS_aKNYet2o';

const updateZeplinDesignTokens = async () => {
  const { data } = await axios.get(`https://api.zeplin.dev/v1/styleguides/${styleGuideId}/design_tokens&token_name_case=kebab`, {
    headers: {
      'Accept': 'application/json',
      'Authorization': `Bearer ${accessToken}`
    }
  });

  console.log('RES =', data);
  fs.writeFile('./tokens/design_tokens.json', JSON.stringify(data, null, 2), 'utf8', function(err) {
    if (err) throw err;

    console.log('complete');
  });
}

updateZeplinDesignTokens();