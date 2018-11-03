const TIMEOUT_IN_SECS = 1 * 60

const TEXT_STYLE = 'margin: 0; border: 0; padding: 0; font-size: 40px; text-align: center; line-height: 100%;'

const MAX_DEPTH_VALUE = 2147483647;
const MAIN_STYLE = `position: sticky; 
  width: 150px; 
  height: max-content; 
  top: 0; 
  z-index: ${MAX_DEPTH_VALUE}; 
  background-color: whitesmoke; 
  padding: 20px 10px;`

const TEMPLATE = `
  <h1 style="${TEXT_STYLE}">
    <span style="${TEXT_STYLE}" class="js-timer-minutes">00</span>:<span style="${TEXT_STYLE}" class="js-timer-seconds">00</span>
  </h1>`

const MOTIVATION_QUOTES = [
  "Never put off for tomorrow, what you can do today",
  "A year from now you may wish you had started today",
  "Don’t wait. The time will never be just right",
  "It is easier to resist at the beginning than at the end",
  "The best way to get something done is to begin",
  "Pretty please with sugar on top, get back to work",
]

function getRandomInt(maxInt) {
  return Math.floor(Math.random() * maxInt);
}

function getRandomQuote() {
  const randomIndex = getRandomInt(MOTIVATION_QUOTES.length - 1)
  return MOTIVATION_QUOTES[randomIndex]
}

function padZero(number) {
  return ("00" + String(number)).slice(-2);
}

class Timer {
  // IE does not support new style classes yet
  // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes
  constructor(timeout_in_secs) {
    this.initial_timeout_in_secs = timeout_in_secs
    this.reset()
  }
  getTimestamp() {
    var timestampInMilliseconds = new Date().getTime()
    return Math.round(timestampInMilliseconds / 1000)
  }
  start() {
    if (this.isRunning)
      return
    this.timestampOnStart = this.getTimestamp()
    this.isRunning = true
  }
  stop() {
    if (!this.isRunning)
      return
    this.timeout_in_secs = this.calculateSecsLeft()
    this.timestampOnStart = null
    this.isRunning = false
  }
  reset(timeout_in_secs) {
    this.isRunning = false
    this.timestampOnStart = null
    this.timeout_in_secs = this.initial_timeout_in_secs
  }
  calculateSecsLeft() {
    if (!this.isRunning)
      return this.timeout_in_secs
    var currentTimestamp = this.getTimestamp()
    var secsGone = currentTimestamp - this.timestampOnStart
    return Math.max(this.timeout_in_secs - secsGone, 0)
  }
}

class AlertTimer extends Timer {
  getTimestamp() {
    return new Date().getTime()
  }
}

class TimerWidget {
  // IE does not support new style classes yet
  // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes
  construct() {
    this.timerContainer = this.minutes_element = this.seconds_element = null
  }
  mount(rootTag) {
    if (this.timerContainer)
      this.unmount()

    // adds HTML tag to current page
    this.timerContainer = document.createElement('div')
    this.timerContainer.innerHTML = TEMPLATE
    this.timerContainer.style.cssText = MAIN_STYLE

    rootTag.insertBefore(this.timerContainer, rootTag.firstChild)

    this.minutes_element = this.timerContainer.getElementsByClassName('js-timer-minutes')[0]
    this.seconds_element = this.timerContainer.getElementsByClassName('js-timer-seconds')[0]
  }
  update(secsLeft) {
    var minutes = Math.floor(secsLeft / 60);
    var seconds = secsLeft - minutes * 60;

    this.minutes_element.innerHTML = padZero(minutes)
    this.seconds_element.innerHTML = padZero(seconds)
  }
  unmount() {
    if (!this.timerContainer)
      return
    this.timerContainer.remove()
    this.timerContainer = this.minutes_element = this.seconds_element = null
  }
}


function main() {

  var timer = new Timer(TIMEOUT_IN_SECS)
  var timerWiget = new TimerWidget()
  var intervalId = null

  timerWiget.mount(document.getElementsByClassName("layout")[0])

  alertUser = () => alert(getRandomQuote())
  var alertTimer = new AlertTimer(30000)
  var threeMinutesHasPassed = false

  function handleIntervalTick() {
    var secsLeft = timer.calculateSecsLeft()
    timerWiget.update(secsLeft)

    if (secsLeft == 0 && threeMinutesHasPassed == false) {
      threeMinutesHasPassed = true
      alertTimer.start()
    } else if (alertTimer.calculateSecsLeft() == 0 && threeMinutesHasPassed == true) {
      alertUser()
      alertTimer.reset()
      alertTimer.start()
    }
  }

  function handleVisibilityChange() {
    if (document.hidden) {
      timer.stop()
      alertTimer.stop()
      clearInterval(intervalId)
      intervalId = null
    } else {
      timer.start()
      alertTimer.start()
      intervalId = intervalId || setInterval(handleIntervalTick, 1001)
    }
  }

  // https://developer.mozilla.org/en-US/docs/Web/API/Page_Visibility_API
  document.addEventListener("visibilitychange", handleVisibilityChange, false);
  handleVisibilityChange()
}

document.onreadystatechange = () => {
  if (document.readyState === "complete" || document.readyState === "loaded") {
    main();
  }
}
