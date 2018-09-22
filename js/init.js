import createObjects from './createObjects'
import { delta, rad, count, lineW } from './setup'
import { distance } from './extras'
import colorsArray from './colors'


const value = document.getElementsByClassName('center')[0]
const valueOfAngle = count / Math.PI 

export default function (canvas) {
  const ctx = canvas.getContext('2d')
  // Arrays with lines (not drawed yet)
  const { outsideCircle, insideCircle } = createObjects(ctx)
  // Background
  // ctx.fillStyle = '#261132'
  ctx.clearRect(0, 0, canvas.width, canvas.height)

  // Draw outside-circle lines
  let fl = false
  outsideCircle.forEach((el, i) => {
    el.style = {
      color: '#3E2F5B',
      width: 4
    }

    let fi = Math.acos(
      (el.posTo.x - delta) / distance(el.posTo.x, el.posTo.y, delta, delta)
    )
    if (el.posTo.x - delta > 0 && el.posTo.y - delta > 0) {
      fi = -fi
    } else if (el.posTo.x - delta < 0 && el.posTo.y - delta > 0) {
      fi = 2 * Math.PI - fi
    }
    // This return updated line to begining size
    if (el.updated) {
      el.updated = false
      el.posFrom.x -= 20 * Math.cos(fi)
      el.posFrom.y += 20 * Math.sin(fi)
    }
    // If the angle of line > angle of pointer then change the line
    if (fi > 1) {
      el.style = {
        color: colorsArray[i],
        width: 4
      }
      // Change the size of first line
      if (!fl) {
        fl = true
        el.style = {
          color: '#ff5050',
          width: 6
        }
        el.updated = true
        el.posFrom.x += 20 * Math.cos(fi)
        el.posFrom.y -= 20 * Math.sin(fi)

        value.innerHTML = Math.round(-fi * valueOfAngle) + 40
      }
    }
    // Actually redraw the line
    el.update()
  })
  // Draw inside-circle lines
  insideCircle.forEach(el => {
    el.update()
  })
}
