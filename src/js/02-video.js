import Player from '@vimeo/player';
import throttle from 'lodash.throttle';

const iframe = document.querySelector('iframe');
const player = new Player(iframe);

player.on('loaded', function () {
  let seconds = localStorage.getItem('videoplayer-current-time');
  player
    .setCurrentTime(seconds)
    .then(function (seconds) {
      console.log('the actual time that the player seeked to' + seconds);
    })
    .catch(function (error) {
      switch (error.name) {
        case 'RangeError':
          console.log(
            'the time was less than 0 or greater than the video’s duration'
          );
          break;

        default:
          console.log('some other error occurred');
          break;
      }
    });
});
function timeUpdate({ seconds }) {
  localStorage.setItem('videoplayer-current-time', seconds);
  console.log(seconds);
}

player.on('timeupdate', throttle(timeUpdate, 1000));
