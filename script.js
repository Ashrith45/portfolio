
function changeColor() {
    const welcomeText = document.getElementById('welcome-text');
    
  
    const colors = ['#0984e3', '#00cec9', '#6c5ce7', '#fab1a0', '#e17055'];
    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    
    welcomeText.style.color = randomColor;
    console.log("Color changed to: " + randomColor);
}


window.onload = function() {
    console.log("Portfolio Loaded Successfully");
};
