import Line from './components.js'
import {delta, rad, count, lineW} from './setup'

export default function (ctx) {
  const outsideCircle = []
  const insideCircle = []
  // Loop for creating lines and add them to array
  for (let i = -3; i <= count + 3; i++) {
    // Create line for outside-circle
    // newX – X-coordinate for begining of line (same newY)
    // (newX + delta) or (newY - delta) * -1 means that we need to fix coordinates
    //const ... =  new Line(ctx, start coord of line, finish coord of line, style of line)
    let newX = Math.cos(i * Math.PI / count) * rad
    let newY = Math.sin(i * Math.PI / count) * rad
    const outsideLine = new Line(
      ctx,
      {
        x: newX + delta,
        y: (newY - delta) * -1
      },
      {
        x: newX - 40 * Math.cos(i * Math.PI / count) + delta,
        y: (newY - 40 * Math.sin(i * Math.PI / count) - delta) * -1
      },
      {
        color: '#3E2F5B',
        width: 4
      }
    )
    outsideCircle.push(outsideLine)

    // Create line for inside-circle    
    newX = Math.cos(i * Math.PI / count) * (rad - 60)
    newY = Math.sin(i * Math.PI / count) * (rad - 60)
    const insideLine = new Line(
      ctx,
      {
        x: newX + delta,
        y: (newY - delta) * -1
      },
      {
        x: newX - 10 * Math.cos(i * Math.PI / count) + delta,
        y: (newY - 10 * Math.sin(i * Math.PI / count) - delta) * -1
      },
      {
        color: 'rgba(255, 255, 255, 0.2)',
        width: 3.5
      }
    )
    insideCircle.push(insideLine)
  }

  return {outsideCircle, insideCircle}
}
