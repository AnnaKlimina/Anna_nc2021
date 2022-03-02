ball.style.top = field.clientHeight / 2 - ball.clientHeight / 2 + "px";
ball.style.left = field.clientWidth / 2 - ball.clientWidth / 2 + "px";

// так как у field css-свойство position: relative, и у ball css-свойство position: absolute
// то позиция ball определяется относительно field
// field.clientHeight/Width - высота/ширина field без рамок
// ball.clientHeight/Width - высота/ширина ball без рамок
