import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

const startBtn = document.querySelector('[data-start]');
const inputDate = document.querySelector('#datetime-picker');
const timerFields = {
  days: document.querySelector('[data-days]'),
  hours: document.querySelector('[data-hours]'),
  minutes: document.querySelector('[data-minutes]'),
  seconds: document.querySelector('[data-seconds]'),
};

let userSelectedDate = null;
let timerId = null;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    const selectedDate = selectedDates[0];

    // Додаємо порівняння "менше або дорівнює" (<=)
    // Це відсікає і минуле, і теперішній момент
    if (selectedDate <= new Date()) {
      iziToast.error({
        title: 'Error',
        message: 'Please choose a date in the future',
        position: 'topRight',
      });
      
      // Обов'язково деактивуємо кнопку, якщо дата не валідна
      startBtn.disabled = true;
    } else {
      userSelectedDate = selectedDate;
      startBtn.disabled = false;
      
      // Можна додати успішне сповіщення (опціонально)
      iziToast.success({
        title: 'OK',
        message: 'Date is valid! Press Start.',
        position: 'topRight',
      });
    }
  },
};

flatpickr(inputDate, options);

startBtn.addEventListener('click', () => {
  startBtn.disabled = true;
  inputDate.disabled = true;

  timerId = setInterval(() => {
    const diff = userSelectedDate - new Date();

    if (diff <= 0) {
      clearInterval(timerId);
      inputDate.disabled = false;
      updateTimerDisplay(0, 0, 0, 0);
      return;
    }

    const time = convertMs(diff);
    updateTimerDisplay(time.days, time.hours, time.minutes, time.seconds);
  }, 1000);
});

function updateTimerDisplay(d, h, m, s) {
  timerFields.days.textContent = addLeadingZero(d);
  timerFields.hours.textContent = addLeadingZero(h);
  timerFields.minutes.textContent = addLeadingZero(m);
  timerFields.seconds.textContent = addLeadingZero(s);
}

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}