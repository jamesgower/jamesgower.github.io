var quotes = [
  ["  Life is about making an impact, not making an income.  ", "- Kevin Kruse"],
  ["  Whatever the mind of man can conceive and believe, it can achieve.  ", "- Napoleon Hill"],
  ["  Strive not to be a success, but rather to be of value.  ", "- Albert Einstein"],
  ["  Two roads diverged in a wood, and I — I took the one less traveled by, And that has made all the difference.  ", "- Robert Frost"],
  ["  I attribute my success to this: I never gave or took any excuse.  ", "- Florence Nightingale"],
  ["  You miss 100% of the shots you don’t take.  ", "- Wayne Gretzky"],
  ["  I've missed more than 9000 shots in my career. I've lost almost 300 games. 26 times I've been trusted to take the game winning shot and missed. I've failed over and over and over again in my life. And that is why I succeed.  ", "- Michael Jordan"],
  ["  The most difficult thing is the decision to act, the rest is merely tenacity.  ", "- Amelia Earhart"],
  ["  Every strike brings me closer to the next home run.  ", "- Babe Ruth"],
  ["  Definiteness of purpose is the starting point of all achievement.  ", "- W. Clement Stone"],
  ["  Life isn't about getting and having, it's about giving and being.  ", "- Kevin Kruse"],
  ["  Life is what happens to you while you’re busy making other plans.  ", "- John Lennon"],
  ["  We become what we think about.  ", "- Earl Nightingale"],
  ["  Twenty years from now you will be more disappointed by the things that you didn’t do than by the ones you did do, so throw off the bowlines, sail away from safe harbor, catch the trade winds in your sails. Explore, Dream, Discover.  ", "- Mark Twain"],
  ["  Life is 10% what happens to me and 90% of how I react to it.  ", "- Charles Swindoll"],
  [" Believe in yourself! Have faith in your abilities! Without a humble but reasonable confidence in your own powers you cannot be successful or happy. ","- Norman Vincent Peale"],
  [" If you can dream it, you can do it. ","- Walt Disney"],
  [" Where there is a will, there is a way. If there is a chance in a million that you can do something, anything, to keep what you want from ending, do it. Pry the door open or, if need be, wedge your foot in that door and keep it open. ","- Pauline Kael"],
  [" Do not wait; the time will never be ‘just right.’ Start where you stand, and work with whatever tools you may have at your command, and better tools will be found as you go along ","-George Herbert"],
  [" Press forward. Do not stop, do not linger in your journey, but strive for the mark set before you. ","-George Whitefield"],
  [" The future belongs to those who believe in the beauty of their dreams. ","-Eleanor Roosevelt"],
];

var colors = ['#16a085', '#27ae60', '#2c3e50', '#f39c12', '#e74c3c', '#9b59b6', '#FB6964', '#342224', "#472E32", "#BDBB99", "#77B1A9", "#73A857", "#0a228f", "#795e55", "#6173f5", "#f75b2f", "#c0a06a", "#51ce44", "#9c49e1", "#ea2bcd", "#8f2795"];

function newQuote() {
  var randomNumber = Math.floor(Math.random() * quotes.length);
  var randomColor = Math.floor(Math.random() * colors.length);
  document.getElementById("quoteDisplay").innerHTML = quotes[randomNumber][0];
  document.getElementById("quoteDisplay").style.color = colors[randomColor];
  document.getElementById("quoteAuthor").innerHTML = quotes[randomNumber][1];
  document.getElementById("quoteAuthor").style.color = colors[randomColor];
  document.getElementById("quoteBody").style.background = colors[randomColor];
  document.getElementById("mark1").style.color = colors[randomColor];
  document.getElementById("mark2").style.color = colors[randomColor];
  document.getElementById("btn").style.background = colors[randomColor];
  document.getElementById("btn").style.border = colors[randomColor];

}
