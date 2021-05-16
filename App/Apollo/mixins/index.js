export const parseTokenData = (data) => {
    let tokenData = {}
    tokenData.accessToken =data.access_token
    tokenData.refreshToken = data.refresh_token
    tokenData.refreshTokenExpiresIn = durationToMins(data.refresh_expires_in)
    tokenData.accessTokenExpiresIn = durationToMins(data.expires_in)
    tokenData.accessTokenExpired =  data.accessTokenExpired
    tokenData.refreshTokenExpired = data.refreshTokenExpired
 
    return tokenData;
}

function durationToMins(data) {
    var sec_num = parseInt(data, 10); // don't forget the second param
    return Math.floor(sec_num / 60);
}