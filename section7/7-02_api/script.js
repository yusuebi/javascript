'use strict';

// geolocation
function success(pos) {
  ajaxRequest(pos.coords.latitude, pos.coords.longitude);
}

function fail(error) {
  alert('位置情報の取得に失敗しました。エラーコード：' + error.code);
}

navigator.geolocation.getCurrentPosition(success, fail);

// UTCをミリ秒に
function utcToJSTime(utcTime) {
  return utcTime * 1000;
}

// データ取得
function ajaxRequest(lat, long) {
  const url = 'https://api.openweathermap.org/data/2.5/forecast';
  const appId = '23de24730e3acc14fda545fe053f540a';

  $.ajax({
    url: url,
    date: {
      appid: appId,
      lat: lat,
      lon: long,
      units: 'metric',
      lang: 'ja'
    }
  })
  .done(function(data) {
    console.log(data);

    // 都市名、国名
    console.log('都市名：' + date.city.name);
    console.log('国名：' + date.city.country);

    // 天気予報データ
    data.list.forEach(function(forecast, index){
      const dataTime = new Date(utcToJSTime(forecast.dt));
      const month = dateTime.getMonth() + 1;
      const date = dateTime.getDate();
      const hours = dateTime.getHours();
      const min = String(dataTime.getMinutes()).padStart(2, '0');
      const temperature = Math.round(forecast.main.temp);
      const description = forecast.weather[0].description;
      const iconPath = `images/${forecast.weather[0].icon}.svg`;

      console.log('日時：' + `${month}/${data} ${hours}:${min}`);
      console.log('気温：' + temperature);
      console.log('天気：' + description);
      console.log('画像パス：' + iconPath);
    });
  })
  .fail(function() {
    console.log('$.ajax failed!');
  })
}
