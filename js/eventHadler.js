import { distance } from './extras'
import animate from './animate'
import {delta, rad, count, lineW} from './setup'

export default function (canvas) {
  // Register addEventListeners on canvas
  // First for touchscreens, second and third are for desktop
  canvas.addEventListener('touchstart', () => {
    canvas.addEventListener('touchmove', mousemoveHandler)
  })

  canvas.addEventListener('mousedown', () => {
    canvas.addEventListener('mousemove', mousemoveHandler)
  })

  canvas.addEventListener('mouseup', () => {
    canvas.removeEventListener('mousemove', mousemoveHandler)
  })

  function mousemoveHandler (e) {
    // Condition only for touchscreens
    if (e.touches) {
      e.preventDefault()
      e.x = e.touches[0].clientX
      e.y = e.touches[0].clientY
    }
    // Checking if the actual pointer inside the arc
    // Distance between the pointer and the center of arc
    if (
      distance(e.x, e.y, delta, delta) < rad + 100 &&
      distance(e.x, e.y, delta, delta) > rad - lineW - 50
    ) {
      // We need graduis for performing changes (e.g color of lines, size)
      let grad = Math.acos((e.x - delta) / distance(e.x, e.y, delta, delta))
      if (e.x - delta > 0 && e.y - delta > 0) {
        grad = -grad
      } else if (e.x - delta < 0 && e.y - delta > 0) {
        grad = 2 * Math.PI - grad
      }
      // Logic for performing changes
      animate(canvas, grad)
    }
  }
}
